(function () {
    'use strict';

    var form = document.getElementById('contact-form');
    if (!form) return;

    var status = document.getElementById('contact-status');
    var submitBtn = form.querySelector('.contact-form-card__submit');
    var spinner = submitBtn ? submitBtn.querySelector('.btn__spinner') : null;
    var label = submitBtn ? submitBtn.querySelector('[data-submit-label]') : null;
    var enviando = false;
    var ESPERA_MS = 900;

    var CAMPOS = ['name', 'email', 'subject', 'message'];

    var REGLAS = {
        name: function (valor) { return valor.trim().length >= 2; },
        email: function (valor) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim()); },
        subject: function (valor) { return valor !== ''; },
        message: function (valor) { return valor.trim().length >= 10; }
    };

    function control(nombre) {
        return form.elements[nombre];
    }

    function mensaje(nombre) {
        return form.querySelector('[data-error-for="' + nombre + '"]');
    }

    function marcarError(nombre, mostrar) {
        var campo = control(nombre);
        var aviso = mensaje(nombre);
        if (campo) campo.setAttribute('aria-invalid', mostrar ? 'true' : 'false');
        if (aviso) aviso.hidden = !mostrar;
    }

    function limpiarEstado() {
        if (status) {
            status.hidden = true;
            status.textContent = '';
        }
    }

    function mostrarEstado(texto) {
        if (!status) return;
        status.textContent = texto;
        status.hidden = false;
    }

    function validar() {
        var primerError = null;

        for (var i = 0; i < CAMPOS.length; i++) {
            var nombre = CAMPOS[i];
            var campo = control(nombre);
            if (!campo) continue;
            var ok = REGLAS[nombre](campo.value);
            marcarError(nombre, !ok);
            if (!ok && !primerError) primerError = campo;
        }

        return primerError;
    }

    function bloquear(bloqueado) {
        enviando = bloqueado;
        if (submitBtn) {
            submitBtn.disabled = bloqueado;
            submitBtn.setAttribute('aria-busy', bloqueado ? 'true' : 'false');
        }
        if (spinner) spinner.hidden = !bloqueado;
        if (label) label.hidden = bloqueado;
    }

    form.addEventListener('input', function (e) {
        if (REGLAS[e.target.name]) marcarError(e.target.name, false);
    });

    form.addEventListener('change', function (e) {
        if (REGLAS[e.target.name]) marcarError(e.target.name, false);
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (enviando) return;
        limpiarEstado();

        var primerError = validar();
        if (primerError) {
            mostrarEstado('Revisa los campos marcados para enviar tu mensaje.');
            primerError.focus();
            return;
        }

        bloquear(true);

        // TODO: enviar los datos al backend (fetch/POST) antes de confirmar el envío.
        window.setTimeout(function () {
            bloquear(false);
            form.reset();
            for (var i = 0; i < CAMPOS.length; i++) marcarError(CAMPOS[i], false);
            mostrarEstado('Recibimos tu mensaje. Te responderemos a la brevedad.');
        }, ESPERA_MS);
    });
})();
