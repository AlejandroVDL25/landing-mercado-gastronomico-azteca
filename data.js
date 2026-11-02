/**
 * Contenido de la campaña "Come bien y a un excelente precio".
 *
 * Todo el contenido que cambia con frecuencia vive aquí, separado del
 * diseño y de la lógica. Para agregar una promoción de última hora basta
 * con añadir un objeto a la lista del día correspondiente; no hay que
 * tocar el HTML ni el CSS.
 *
 * Campos de una promoción:
 *   lugar   (opcional) Nombre del local. Si no existe, la tarjeta se muestra sin logo.
 *   nombre  (requerido) Nombre del platillo o promoción.
 *   detalle (opcional) Qué incluye.
 *   precio  (opcional) Texto del precio tal como se mostrará.
 */
window.MGA_DATA = {
  semana: {
    lunes: [
      { lugar: 'Munchify', nombre: 'Malteadas', precio: '2 x $100' },
      { lugar: 'Green Room', nombre: 'Botanas saludables', precio: '$35' }
    ],
    martes: [
      { lugar: 'El Chel', nombre: 'Menú Mestizo', detalle: '3 especialidades + tortillas + agua', precio: '$107' },
      { lugar: 'Munchify', nombre: 'Combo de flautas de papa y zanahoria', detalle: 'Incluye agua y sopa del día', precio: '$100' },
      { lugar: 'Pastino', nombre: 'Pastes', precio: '2 x $49' }
    ],
    miercoles: [
      { lugar: 'Munchify', nombre: 'Ensalada César o Spicy Tuna', precio: '$125' },
      { lugar: 'Mexicanísimo', nombre: 'Tacos de carnitas + cerveza', precio: '$120' }
    ],
    jueves: [
      { lugar: 'Olas Urbanas', nombre: 'Clamato con cerveza', precio: '$85' },
      { lugar: 'Mexicanísimo', nombre: 'Tacos de carnitas + cerveza', precio: '$120' }
    ],
    viernes: [
      // El copy no indica el local de esta promoción (pendiente de confirmar con el área).
      { nombre: 'Tacos de canasta', precio: '$10 c/u' },
      { lugar: 'Doña Blanca', nombre: 'Chilaquiles + atole', precio: '$70' },
      { lugar: 'Deli House y Deli Gourmet', nombre: 'Tortas', precio: 'Desde $65' },
      { lugar: 'Olas Urbanas', nombre: 'Micheladas', precio: '3 x $155' },
      { lugar: 'Emilia', nombre: 'Clericot', precio: '$80' },
      { lugar: 'Taco Perrón', nombre: 'Tacotes', precio: '3 x $100' },
      { lugar: 'Bobo', nombre: 'Latones', precio: '3 x $145' }
    ]
  },

  postres: [
    {
      grupo: 'Lunes y jueves',
      dias: ['lunes', 'jueves'],
      items: [
        { nombre: 'Palomitas gourmet', precio: 'Desde $45', ubicacion: 'Mercado Gastronómico Azteca' },
        { nombre: 'Helados Moyo', precio: 'Precio especial $90', ubicacion: 'Rampa del Mercado Gastronómico Azteca' },
        { nombre: 'Fresas y uvas con crema', detalle: 'Elige tu crema y topping favorito', precio: 'Desde $80', ubicacion: 'A un costado de Soru' }
      ]
    },
    {
      grupo: 'Lunes a viernes',
      dias: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'],
      items: [
        // El copy no incluye precio para las paletas.
        { nombre: 'Paletas heladas', ubicacion: 'Mercado Gastronómico Azteca' }
      ]
    }
  ],

  temporada: [
    { lugar: 'Pastino', nombre: 'Paste en nogada', precio: '$65' },
    { lugar: 'Doña Blanca', nombre: 'Un platillo mexicano diferente cada semana' },
    { lugar: 'Emilia', nombre: 'Prueba un pedacito de México cada viernes' },
    { lugar: 'El Chel', nombre: 'Chiles en nogada', detalle: 'Combo los jueves y viernes', precio: '$220' }
  ],

  eventos: [
    {
      nombre: 'Tacos "Los de Azteca"',
      detalle: '3 x $100',
      dia: '10', mes: 'Sep', datetime: '09-10',
      fechaTexto: '10 de septiembre',
      hora: 'A partir de las 13:00 h',
      ubicacion: 'Atrás de la tiendita'
    },
    {
      nombre: 'Corte y Norte',
      detalle: 'Boutique de complementos y asado',
      dia: '17–18', mes: 'Sep',
      fechaTexto: '17 y 18 de septiembre',
      ubicacion: 'A un costado de Munchify'
    },
    {
      nombre: 'Peribán',
      detalle: 'Tacos y gorditas $35',
      dia: '30', mes: 'Sep', datetime: '09-30',
      fechaTexto: '30 de septiembre',
      ubicacion: 'Atrás de la tiendita'
    }
  ]
};
