(function () {
    'use strict';

    var slider = document.querySelector('.ba-slider');
    if (slider) {
        var PASO_TECLADO = 5;
        var posicion = 50;
        var arrastrando = false;

        function aplicar(valor) {
            posicion = Math.max(0, Math.min(100, valor));
            slider.style.setProperty('--pos', posicion + '%');
            slider.setAttribute('aria-valuenow', String(Math.round(posicion)));
        }

        function desdePuntero(e) {
            var caja = slider.getBoundingClientRect();
            if (!caja.width) return;
            aplicar(((e.clientX - caja.left) / caja.width) * 100);
        }

        slider.addEventListener('pointerdown', function (e) {
            if (e.button !== 0) return;
            arrastrando = true;
            if (slider.setPointerCapture) slider.setPointerCapture(e.pointerId);
            desdePuntero(e);
        });

        slider.addEventListener('pointermove', function (e) {
            if (!arrastrando) return;
            desdePuntero(e);
        });

        function soltar(e) {
            if (!arrastrando) return;
            arrastrando = false;
            if (slider.releasePointerCapture && slider.hasPointerCapture && slider.hasPointerCapture(e.pointerId)) {
                slider.releasePointerCapture(e.pointerId);
            }
        }

        slider.addEventListener('pointerup', soltar);
        slider.addEventListener('pointercancel', soltar);

        slider.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft') {
                aplicar(posicion - PASO_TECLADO);
                e.preventDefault();
            } else if (e.key === 'ArrowRight') {
                aplicar(posicion + PASO_TECLADO);
                e.preventDefault();
            } else if (e.key === 'Home') {
                aplicar(0);
                e.preventDefault();
            } else if (e.key === 'End') {
                aplicar(100);
                e.preventDefault();
            }
        });

        aplicar(posicion);
    }

    var filtros = document.querySelectorAll('.chip[data-filter]');
    var piezas = document.querySelectorAll('.masonry__item[data-category]');

    if (filtros.length && piezas.length) {
        function filtrar(categoria) {
            for (var i = 0; i < piezas.length; i++) {
                var visible = categoria === 'todos' || piezas[i].dataset.category === categoria;
                piezas[i].hidden = !visible;
            }
        }

        for (var f = 0; f < filtros.length; f++) {
            filtros[f].addEventListener('click', function () {
                for (var j = 0; j < filtros.length; j++) filtros[j].setAttribute('aria-pressed', 'false');
                this.setAttribute('aria-pressed', 'true');
                filtrar(this.dataset.filter);
            });
        }
    }
})();
