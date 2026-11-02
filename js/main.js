(() => {
  'use strict';

  const DATA = window.MGA_DATA;
  const DIAS = [
    { id: 'lunes', corto: 'Lun', largo: 'Lunes' },
    { id: 'martes', corto: 'Mar', largo: 'Martes' },
    { id: 'miercoles', corto: 'Mié', largo: 'Miércoles' },
    { id: 'jueves', corto: 'Jue', largo: 'Jueves' },
    { id: 'viernes', corto: 'Vie', largo: 'Viernes' }
  ];
  const TONOS = ['rosa', 'verde', 'maiz'];
  const PALABRAS_VACIAS = ['el', 'la', 'los', 'las', 'de', 'del', 'y'];

  /* ---------- Utilidades ---------- */

  const escapar = (texto) =>
    String(texto).replace(/[&<>"']/g, (c) => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));

  // Iniciales para el logo provisional: "Olas Urbanas" -> "OU", "Munchify" -> "MU".
  const iniciales = (nombre) => {
    const palabras = nombre.split(/\s+/).filter((p) => !PALABRAS_VACIAS.includes(p.toLowerCase()));
    if (palabras.length === 1) return palabras[0].slice(0, 2).toUpperCase();
    return (palabras[0][0] + palabras[1][0]).toUpperCase();
  };

  // El mismo local siempre recibe el mismo color.
  const tonoDe = (nombre) => {
    let suma = 0;
    for (const letra of nombre) suma += letra.codePointAt(0);
    return TONOS[suma % TONOS.length];
  };

  // Día de la semana en la Ciudad de México (0 = domingo), sin depender
  // de la zona horaria configurada en el dispositivo.
  const diaSemanaCDMX = () => {
    try {
      const nombre = new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        timeZone: 'America/Mexico_City'
      }).format(new Date());
      return { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[nombre];
    } catch (error) {
      return new Date().getDay();
    }
  };

  const ICONO_UBICACION =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg>';

  /* ---------- Plantillas ---------- */

  const tarjetaPromo = (promo) => {
    const logo = promo.lugar
      ? `<span class="promo__logo promo__logo--${tonoDe(promo.lugar)}" aria-hidden="true">${escapar(iniciales(promo.lugar))}</span>`
      : '';
    return `
      <li class="promo${promo.lugar ? '' : ' promo--sin-logo'}">
        ${logo}
        <div class="promo__info">
          ${promo.lugar ? `<p class="promo__lugar">${escapar(promo.lugar)}</p>` : ''}
          <h3 class="promo__nombre">${escapar(promo.nombre)}</h3>
          ${promo.detalle ? `<p class="promo__detalle">${escapar(promo.detalle)}</p>` : ''}
          ${promo.ubicacion ? `<p class="ubicacion">${ICONO_UBICACION}<span>${escapar(promo.ubicacion)}</span></p>` : ''}
        </div>
        ${promo.precio ? `<p class="promo__precio"><span class="sr-only">Precio: </span><span class="precio">${escapar(promo.precio)}</span></p>` : ''}
      </li>`;
  };

  const tarjetaEvento = (evento) => {
    const fecha = evento.datetime
      ? `<time datetime="${escapar(evento.datetime)}">${escapar(evento.fechaTexto)}</time>`
      : escapar(evento.fechaTexto);
    const rango = evento.dia.length > 2 ? ' evento__dia--rango' : '';
    return `
      <li class="evento">
        <span class="evento__fecha" aria-hidden="true">
          <span class="evento__mes">${escapar(evento.mes)}</span>
          <span class="evento__dia${rango}">${escapar(evento.dia)}</span>
        </span>
        <div>
          <h3 class="evento__nombre">${escapar(evento.nombre)}</h3>
          <p class="evento__detalle">${escapar(evento.detalle)}</p>
          <p class="evento__meta">${fecha}${evento.hora ? `. ${escapar(evento.hora)}` : ''}</p>
          <p class="ubicacion">${ICONO_UBICACION}<span>${escapar(evento.ubicacion)}</span></p>
        </div>
      </li>`;
  };

  /* ---------- Pestañas accesibles (patrón WAI-ARIA, activación automática) ---------- */

  const crearPestanas = (lista, { panelCompartido = false, alCambiar } = {}) => {
    const tabs = [...lista.querySelectorAll('[role="tab"]')];

    const seleccionar = (tab, { enfocar = false } = {}) => {
      tabs.forEach((t) => {
        const activa = t === tab;
        t.setAttribute('aria-selected', String(activa));
        t.tabIndex = activa ? 0 : -1;
        if (!panelCompartido) {
          const panel = document.getElementById(t.getAttribute('aria-controls'));
          if (panel) panel.hidden = !activa;
        }
      });
      if (enfocar) tab.focus();
      if (alCambiar) alCambiar(tab);
    };

    lista.addEventListener('click', (evento) => {
      const tab = evento.target.closest('[role="tab"]');
      if (tab) seleccionar(tab);
    });

    lista.addEventListener('keydown', (evento) => {
      const actual = tabs.indexOf(document.activeElement);
      if (actual < 0) return;
      const destinos = {
        ArrowRight: (actual + 1) % tabs.length,
        ArrowLeft: (actual - 1 + tabs.length) % tabs.length,
        Home: 0,
        End: tabs.length - 1
      };
      if (!(evento.key in destinos)) return;
      evento.preventDefault();
      seleccionar(tabs[destinos[evento.key]], { enfocar: true });
    });

    return { tabs, seleccionar };
  };

  /* ---------- Secciones ---------- */

  const iniciarSedes = () => {
    const lista = document.querySelector('[data-pestanas-sede]');
    const sedes = crearPestanas(lista);
    const tabTva = document.getElementById('tab-tva');
    const tabEstudios = document.getElementById('tab-estudios');

    // Enlaces directos: index.html#azteca-estudios abre esa pestaña.
    if (location.hash === '#azteca-estudios') sedes.seleccionar(tabEstudios);

    // Los botones que llevan a las promociones siempre muestran TV Azteca.
    document.querySelectorAll('[data-ir-tva]').forEach((enlace) => {
      enlace.addEventListener('click', () => sedes.seleccionar(tabTva));
    });
  };

  const iniciarSemana = (hoyId) => {
    const contenedorDias = document.querySelector('[data-dias]');
    const panel = document.querySelector('[data-promos-dia]');
    const aviso = document.querySelector('[data-aviso]');

    contenedorDias.innerHTML = DIAS.map((dia) => {
      const esHoy = dia.id === hoyId;
      return `
        <button type="button" role="tab" class="dia" id="dia-${dia.id}" aria-controls="panel-dia"
          aria-selected="false" tabindex="-1" aria-label="${dia.largo}${esHoy ? ', hoy' : ''}">
          <span class="dia__corto" aria-hidden="true">${dia.corto}</span>
          <span class="dia__largo" aria-hidden="true">${dia.largo}</span>
          ${esHoy ? '<span class="dia__hoy" aria-hidden="true">Hoy</span>' : ''}
        </button>`;
    }).join('');

    const mostrarDia = (tab) => {
      const id = tab.id.replace('dia-', '');
      const promos = DATA.semana[id] || [];
      panel.setAttribute('aria-labelledby', tab.id);
      panel.innerHTML = promos.length
        ? `<ul class="promos promos--animadas">${promos.map(tarjetaPromo).join('')}</ul>`
        : '<p class="aviso">Aún no hay promociones para este día. Revisa los demás días de la semana.</p>';
    };

    const dias = crearPestanas(contenedorDias, { panelCompartido: true, alCambiar: mostrarDia });

    // ?dia=viernes permite revisar cualquier día (útil para pruebas y para compartir).
    const diaParametro = new URLSearchParams(location.search).get('dia');
    const valido = (id) => DIAS.some((d) => d.id === id);
    const inicial = valido(diaParametro) ? diaParametro : (hoyId || 'lunes');

    if (!hoyId && !valido(diaParametro)) {
      aviso.textContent = 'Es fin de semana: te mostramos las promociones del lunes.';
      aviso.hidden = false;
    }

    // Primera carga sin animación.
    dias.seleccionar(document.getElementById(`dia-${inicial}`));
    panel.querySelector('.promos')?.classList.remove('promos--animadas');

    return dias;
  };

  const iniciarPostres = (hoyId) => {
    document.querySelector('[data-postres]').innerHTML = DATA.postres.map((grupo, indice) => {
      const disponibleHoy = hoyId && grupo.dias.includes(hoyId);
      return `
        <section class="grupo" aria-labelledby="postres-grupo-${indice}">
          <h3 class="grupo__titulo" id="postres-grupo-${indice}">
            ${escapar(grupo.grupo)}
            ${disponibleHoy ? '<span class="insignia">Disponible hoy</span>' : ''}
          </h3>
          <ul class="promos promos--postres">${grupo.items.map(tarjetaPromo).join('')}</ul>
        </section>`;
    }).join('');
  };

  const iniciarHoy = (hoyId, dias) => {
    const tarjeta = document.querySelector('[data-hoy]');
    const dia = tarjeta.querySelector('[data-hoy-dia]');
    const resumen = tarjeta.querySelector('[data-hoy-resumen]');
    const enlace = tarjeta.querySelector('[data-hoy-enlace]');

    if (hoyId) {
      const promos = DATA.semana[hoyId] || [];
      const locales = [...new Set(promos.map((p) => p.lugar).filter(Boolean))];
      const nombreDia = DIAS.find((d) => d.id === hoyId).largo.toLowerCase();
      dia.textContent = `Hoy es ${nombreDia}`;
      resumen.textContent = promos.length === 1
        ? '1 promoción te espera.'
        : `${promos.length} promociones te esperan${locales.length ? ` en ${new Intl.ListFormat('es', { type: 'conjunction' }).format(locales)}` : ''}.`;
    } else {
      dia.textContent = 'Es fin de semana';
      resumen.textContent = 'El lunes vuelven las promociones. Mientras, revisa cuáles vienen.';
      enlace.textContent = 'Ver promociones del lunes';
    }
    // El botón de la tarjeta lleva al día de hoy (o al lunes en fin de semana).
    enlace.addEventListener('click', () => {
      dias.seleccionar(document.getElementById(`dia-${hoyId || 'lunes'}`));
    });

    tarjeta.hidden = false;
  };

  /* ---------- Inicio ---------- */

  const numeroDia = diaSemanaCDMX();
  const hoyId = numeroDia >= 1 && numeroDia <= 5 ? DIAS[numeroDia - 1].id : null;

  document.querySelector('[data-temporada]').innerHTML = DATA.temporada.map(tarjetaPromo).join('');
  document.querySelector('[data-eventos]').innerHTML = DATA.eventos.map(tarjetaEvento).join('');
  iniciarPostres(hoyId);
  const dias = iniciarSemana(hoyId);
  iniciarHoy(hoyId, dias);
  iniciarSedes();
})();
