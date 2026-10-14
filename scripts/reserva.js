(function () {
    'use strict';

    var form = document.getElementById('booking-form');
    if (!form) return;

    var fecha = document.getElementById('fecha');
    var slotsEl = document.getElementById('slots');
    var horaInput = document.getElementById('hora');
    var errorBox = document.getElementById('booking-error');

    var modal = document.getElementById('booking-modal');
    if (!modal) return;

    var modalFields = {
        servicio: document.getElementById('modal-servicio'),
        barbero: document.getElementById('modal-barbero'),
        fecha: document.getElementById('modal-fecha'),
        hora: document.getElementById('modal-hora'),
        telefono: document.getElementById('modal-telefono')
    };

    var submitBtn = form.querySelector('.booking__submit');
    var closeTriggers = modal.querySelectorAll('[data-modal-close]');
    var ultimoFoco = null;
    var CIERRE_MS = 360;

    var sum = {
        servicio: document.getElementById('sum-servicio'),
        barbero: document.getElementById('sum-barbero'),
        fecha: document.getElementById('sum-fecha'),
        hora: document.getElementById('sum-hora'),
        total: document.getElementById('sum-total')
    };

    var HORARIOS = { 1: [9, 20], 2: [9, 20], 3: [9, 20], 4: [9, 20], 5: [9, 20], 6: [10, 18] };
    var PASO_MIN = 30;

    function pad(n) { return n < 10 ? '0' + n : String(n); }

    function hoyISO() {
        var d = new Date();
        return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
    }

    function parseFecha(iso) {
        var p = iso.split('-');
        return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
    }

    function servicioActual() {
        return form.querySelector('input[name="servicio"]:checked');
    }

    function barberoActual() {
        return form.querySelector('input[name="barbero"]:checked');
    }

    var param = new URLSearchParams(window.location.search).get('barbero');
    if (param) {
        var radio = form.querySelector('input[name="barbero"][value="' + param + '"]');
        if (radio) radio.checked = true;
    }

    fecha.min = hoyISO();

    function renderSlots() {
        slotsEl.innerHTML = '';
        horaInput.value = '';
        updateSummary();

        if (!fecha.value) {
            slotsEl.innerHTML = '<li class="slots__empty">Elige una fecha para ver los horarios.</li>';
            return;
        }

        var d = parseFecha(fecha.value);
        var rango = HORARIOS[d.getDay()];
        if (!rango) {
            slotsEl.innerHTML = '<li class="slots__empty">Los domingos permanecemos cerrados. Elige otra fecha.</li>';
            return;
        }

        var duracion = Number(servicioActual().dataset.duration);
        var inicio = rango[0] * 60;
        var fin = rango[1] * 60;
        var ahora = new Date();
        var esHoy = fecha.value === hoyISO();
        var minAhora = ahora.getHours() * 60 + ahora.getMinutes();
        var creados = 0;

        for (var t = inicio; t + duracion <= fin; t += PASO_MIN) {
            if (esHoy && t <= minAhora) continue;
            var label = pad(Math.floor(t / 60)) + ':' + pad(t % 60);
            var li = document.createElement('li');
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'slot';
            btn.textContent = label;
            btn.setAttribute('aria-pressed', 'false');
            btn.addEventListener('click', onSlotClick);
            li.appendChild(btn);
            slotsEl.appendChild(li);
            creados++;
        }

        if (!creados) {
            slotsEl.innerHTML = '<li class="slots__empty">No quedan horarios para esta fecha. Prueba con otro día.</li>';
        }
    }

    function onSlotClick(e) {
        var btns = slotsEl.querySelectorAll('.slot');
        for (var i = 0; i < btns.length; i++) btns[i].setAttribute('aria-pressed', 'false');
        e.currentTarget.setAttribute('aria-pressed', 'true');
        horaInput.value = e.currentTarget.textContent;
        updateSummary();
    }

    function updateSummary() {
        var s = servicioActual();
        var b = barberoActual();
        sum.servicio.textContent = s ? s.dataset.label : '—';
        sum.barbero.textContent = b ? b.dataset.label : '—';
        sum.total.textContent = s ? 'S/ ' + Number(s.dataset.price).toFixed(2) : '—';
        sum.hora.textContent = horaInput.value || '—';

        if (fecha.value) {
            sum.fecha.textContent = parseFecha(fecha.value).toLocaleDateString('es-PE', {
                weekday: 'long', day: 'numeric', month: 'long'
            });
        } else {
            sum.fecha.textContent = '—';
        }
    }

    function setError(name, show) {
        var input = form.elements[name];
        var msg = form.querySelector('[data-error-for="' + name + '"]');
        if (input) input.setAttribute('aria-invalid', show ? 'true' : 'false');
        if (msg) msg.hidden = !show;
    }

    function validar() {
        var ok = true;
        var nombre = form.elements.nombre.value.trim();
        var tel = form.elements.telefono.value.replace(/\D/g, '');
        var email = form.elements.email.value.trim();

        var nombreOk = nombre.length >= 2;
        var telOk = tel.length === 9 || (tel.length === 11 && tel.indexOf('51') === 0);
        var emailOk = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        setError('nombre', !nombreOk);
        setError('telefono', !telOk);
        setError('email', !emailOk);

        if (!nombreOk || !telOk || !emailOk) ok = false;
        return ok;
    }

    function mostrarError(msg) {
        errorBox.textContent = msg;
        errorBox.hidden = false;
    }

    var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function focusablesModal() {
        var lista = modal.querySelectorAll(FOCUSABLE);
        return Array.prototype.filter.call(lista, function (el) {
            return el.offsetParent !== null;
        });
    }

    function openModal() {
        if (!modal.hidden) return;
        ultimoFoco = document.activeElement;
        modal.hidden = false;
        void modal.offsetHeight;
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        var focusables = focusablesModal();
        if (focusables.length) focusables[0].focus();
    }

    function closeModal() {
        if (modal.hidden) return;
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
        form.reset();
        errorBox.hidden = true;
        renderSlots();
        var destino = (ultimoFoco && document.contains(ultimoFoco)) ? ultimoFoco : submitBtn;
        if (destino) destino.focus();
        window.setTimeout(function () {
            modal.hidden = true;
        }, CIERRE_MS);
    }

    function trapFocus(e) {
        if (e.key !== 'Tab') return;
        var focusables = focusablesModal();
        if (!focusables.length) return;
        var primero = focusables[0];
        var ultimo = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === primero) {
            e.preventDefault();
            ultimo.focus();
        } else if (!e.shiftKey && document.activeElement === ultimo) {
            e.preventDefault();
            primero.focus();
        }
    }

    for (var i = 0; i < closeTriggers.length; i++) {
        closeTriggers[i].addEventListener('click', closeModal);
    }

    modal.addEventListener('keydown', trapFocus);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !modal.hidden) closeModal();
    });

    fecha.addEventListener('change', renderSlots);
    form.addEventListener('change', function (e) {
        if (e.target.name === 'servicio') renderSlots();
        else updateSummary();
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        errorBox.hidden = true;

        if (!fecha.value) { mostrarError('Elige una fecha.'); fecha.focus(); return; }
        if (!HORARIOS[parseFecha(fecha.value).getDay()]) { mostrarError('Los domingos permanecemos cerrados. Elige otra fecha.'); fecha.focus(); return; }
        if (!horaInput.value) { mostrarError('Elige un horario disponible.'); return; }
        if (!validar()) { mostrarError('Revisa los campos marcados.'); return; }

        // TODO: enviar los datos al backend (fetch/POST) antes de mostrar la confirmación.
        var s = servicioActual().dataset.label;
        var b = barberoActual().dataset.label;

        if (modalFields.servicio) modalFields.servicio.textContent = s;
        if (modalFields.barbero) modalFields.barbero.textContent = b;
        if (modalFields.fecha) modalFields.fecha.textContent = sum.fecha.textContent;
        if (modalFields.hora) modalFields.hora.textContent = horaInput.value;
        if (modalFields.telefono) modalFields.telefono.textContent = form.elements.telefono.value.trim();

        openModal();
    });

    updateSummary();
})();