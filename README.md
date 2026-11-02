# Come bien y a un excelente precio · Mercado Gastronómico Azteca

Landing de comunicación interna para la campaña del Mercado Gastronómico Azteca (MGA), dirigida a colaboradores de TV Azteca y Azteca Estudios. Está pensada primero para celular, porque es donde la mayoría la abrirá.

- **Sitio publicado:** _(agregar liga de GitHub Pages)_
- **Diseño en Figma:** https://www.figma.com/design/SGoIPsJyu3fPfrr6HAU0mN

## Cómo correr el proyecto

No necesita instalación ni compilación.

1. Clona el repositorio: `git clone <url-del-repo>`
2. Abre `index.html` en el navegador.

Si prefieres un servidor local: `npx serve .` o `python3 -m http.server` y entra a `http://localhost:3000` (o al puerto que indique).

Para revisar cualquier día sin esperar a que llegue, agrega el parámetro `dia` a la URL: `index.html?dia=viernes`. Para abrir directo la pestaña de Azteca Estudios: `index.html#azteca-estudios`.

## Tecnologías

- HTML5 semántico
- CSS3 con variables (tokens), Grid y Flexbox, enfoque mobile first, sin frameworks
- JavaScript sin dependencias
- Tipografías de Google Fonts: Bricolage Grotesque (títulos) y Atkinson Hyperlegible (texto), esta última diseñada para lectura fácil
- Publicación en GitHub Pages

## Estructura

```
├── index.html        Estructura y contenido fijo (recomendaciones)
├── css/styles.css    Tokens de diseño y estilos
├── js/data.js        Contenido de las promociones (lo que más cambia)
├── js/main.js        Pestañas, selector de día y armado de tarjetas
└── docs/             Especificación del diseño en Figma
```

## Funcionalidades

- **Pestañas TV Azteca / Azteca Estudios:** solo se muestra el contenido de la pestaña activa. Siguen el patrón de pestañas de WAI-ARIA: se pueden usar con mouse, toque o teclado (flechas, Inicio y Fin).
- **Selector de día:** al abrir la página se muestra el día actual de lunes a viernes; en fin de semana se muestra el lunes con un aviso. El día se calcula con la zona horaria de la Ciudad de México, sin depender de la configuración del celular.
- **Tarjeta "Hoy en el Mercado":** resume cuántas promociones hay hoy y en qué locales, con un botón que lleva directo a ellas.
- **Postres:** cada grupo indica si está disponible hoy.
- **Contenido separado del código:** todas las promociones viven en `js/data.js`.

## Accesibilidad

- Contraste de texto AA o superior en todas las combinaciones de color (el texto secundario tiene 8:1 sobre blanco).
- Enlace para saltar al contenido, foco visible en todos los elementos interactivos y áreas táctiles de al menos 44 px.
- Pestañas con roles `tablist`, `tab` y `tabpanel`, `aria-selected` y navegación con teclado.
- Las ilustraciones e iconos decorativos están ocultos a lectores de pantalla (`aria-hidden`); el sitio no usa imágenes con información, por lo que no requiere textos alternativos adicionales.
- Se respeta la preferencia de movimiento reducido del sistema.
- Funciona sin desplazamiento horizontal desde 360 px hasta 1440 px.

## Errores e inconsistencias del copy y cómo los resolví

| # | Hallazgo | Decisión |
|---|---|---|
| 1 | Faltan acentos en casi todo el texto (Gastronómico, días, increíbles, más, qué, menú, miércoles, César, México, área, atrás, máximo, etc.). | Se corrigieron todos. |
| 2 | "Consultas las promociones" (conjugación incorrecta). | "Consulta las promociones". Se usa como botón principal. |
| 3 | "Disfruta desde increíbles platillos, hamburguesas…": el "desde" queda incompleto y "platillos" se repite con la lista. | "Disfruta platillos increíbles: hamburguesas, tacos, sushi, quesadillas, bebidas y más." |
| 4 | "(Al seleccionar alguna de estas opciones se desplegarán las promos)" es una indicación interna, no texto para el usuario. | No se publica; se convirtió en el comportamiento de las pestañas. |
| 5 | Formato distinto entre días: de lunes a jueves es "Local: promoción precio" y el viernes es "Promoción precio \| Local (logo)". | Se unificó en una sola tarjeta: local, promoción, detalle y precio. |
| 6 | Viernes: "Tacos de canasta $10 c/u" no indica el local. | Se muestra sin local y queda pendiente de confirmar con el área. |
| 7 | El copy indica "(logo)" pero no se entregaron los logos. | Se usan iniciales del local como logo provisional; se sustituyen al recibir los archivos. |
| 8 | Mexicanísimo tiene la misma promoción el miércoles y el jueves. | Se mantiene (puede ser intencional), marcada para confirmar. |
| 9 | Puntuación y mayúsculas inconsistentes ("Menu Mestizo $107. 3 especialidades…", "Incluye agua + sopa del dia", "Palomitas gourmet . Desde"). | El detalle de cada promoción se separa del precio y se normaliza la redacción. |
| 10 | "Paletas heladas" no tiene precio; Doña Blanca y Emilia (temporada) tampoco. | Se muestran sin precio en lugar de inventarlo. |
| 11 | "Rampa del MGA": la sigla no se explica en ninguna parte. | "Rampa del Mercado Gastronómico Azteca". |
| 12 | "Mercado Gastronómico" y "Mercado Gastronómico Azteca" se usan indistintamente. | Se usa siempre el nombre completo. |
| 13 | Las fechas de "Septiembre sabe a México" y "¡Más variedad llega para ti!" no tienen año, y solo el primer evento indica horario. | Se muestran las fechas como vienen; en producción se agregaría fecha de vencimiento para ocultar promociones pasadas. |
| 14 | "Taco Perron" y "Periban": posibles acentos faltantes en nombres de marca. | Se escribieron "Taco Perrón" y "Peribán"; queda pendiente confirmar la escritura oficial. |
| 15 | La pestaña Azteca Estudios no tiene promociones, solo recomendaciones, aunque el encabezado dice "Consulta las promociones que tenemos para ti". | Se respetó el copy (TV Azteca: promociones; Azteca Estudios: recomendaciones) y se dejó como pregunta para el área. |
| 16 | Numeración incompleta en recomendaciones: la primera no tiene número y las otras dicen "2." y "3.". | Se quitó la numeración porque no es un proceso en orden; cada recomendación es una tarjeta con título. |
| 17 | En calefactores los títulos están en plural y las instrucciones en singular ("Conéctalo"). | Se unificó en plural ("Conéctalos solo cuando los uses"). |
| 18 | El aviso de WhatsApp se repite dos veces y el agradecimiento aparece solo después de microondas. | Se combinaron en un solo bloque de reporte con botón directo a WhatsApp. |
| 19 | "Calidad, sabor y precio" se repite al final de cada pestaña. | Se usa una sola vez, como lema en el pie de página. |
| 20 | No hay promociones de fin de semana. | En sábado y domingo se muestra el lunes con un aviso, como pide la prueba. |

## Uso de IA

- **Claude (Anthropic):** revisión del copy para detectar errores e inconsistencias, generación del código (HTML, CSS y JavaScript), especificación del diseño en Figma, redacción de este README y apoyo en la publicación del repositorio.

## Qué mejoraría con más tiempo

- Agregar fechas de inicio y fin a cada promoción para que las de temporada se oculten solas.
- Mover el contenido a una hoja de cálculo o un CMS para que el área lo actualice sin tocar código.
- Usar los logos oficiales y fotos reales de los platillos.
- Pruebas automatizadas de accesibilidad (axe) y de la lógica del día.
- Modo oscuro.
