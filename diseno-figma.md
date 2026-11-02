# Especificación del diseño en Figma

Guía para armar el archivo de Figma de forma que coincida con el código.

## Páginas del archivo

1. **01 Wireframe:** versión móvil de baja fidelidad (grises, sin tipografía final).
2. **02 Diseño final:** cuatro frames: `Móvil 375 / TV Azteca`, `Móvil 375 / Azteca Estudios`, `Escritorio 1440 / TV Azteca`, `Escritorio 1440 / Azteca Estudios`.
3. **03 Componentes:** estilos y componentes con sus variantes.

Nombra todas las capas (nada de "Frame 23") y usa Auto Layout en todos los contenedores.

## Arquitectura de información

```
Encabezado (marca)
Hero
├── Título, bajada y botón "Consulta las promociones"
└── Tarjeta "Hoy en el Mercado" (resumen del día)
Barra de sede (fija al hacer scroll)
├── Pestaña TV Azteca
│   ├── Promociones de la semana
│   │   ├── Selector de día (Lun–Vie, marca "Hoy")
│   │   └── Tarjetas de promoción del día seleccionado
│   ├── ¿Antojo de algo dulce? (agrupado por días: Lunes y jueves / Lunes a viernes)
│   ├── Septiembre sabe a México (temporada)
│   └── ¡Más variedad llega para ti! (eventos con fecha)
└── Pestaña Azteca Estudios
    ├── Recomendaciones: loza, calefactores, microondas
    └── Bloque de reporte por WhatsApp
Pie con lema "Calidad, sabor y precio"
```

Criterio: primero lo que cambia cada día (lo que el colaborador busca al abrir la página desde su celular), después lo recurrente (postres) y al final lo temporal (septiembre y eventos).

## Wireframe móvil

```
┌───────────────────────┐
│ ▲▲▲ papel picado ▲▲▲  │
│ ◉ Mercado Gastr. Azt. │
│                       │
│ COME BIEN Y A UN      │
│ EXCELENTE PRECIO      │
│ bajada…               │
│ [Consulta las promos] │
│ ┌───────────────────┐ │
│ │ Hoy es lunes      │ │
│ │ 2 promociones…    │ │
│ │ [Ver promos hoy]  │ │
│ └───────────────────┘ │
├───────────────────────┤
│ [TV Azteca][Estudios] │  ← fija
├───────────────────────┤
│ Promociones semana    │
│ [Lun][Mar][Mié][Jue][Vie]
│ ┌ logo │ local      ┐ │
│ │      │ promoción  │ │
│ │      │ [$ precio] │ │
│ └───────────────────┘ │
│ ¿Antojo de algo dulce?│
│ Septiembre…           │
│ ¡Más variedad…        │
├───────────────────────┤
│ Calidad, sabor y      │
│ precio                │
└───────────────────────┘
```

## Estilos de color

| Nombre | Hex | Uso |
|---|---|---|
| rosa | #B0154F | Color principal, botones, pestaña activa, pie |
| rosa-claro | #FCE4EE | Hover de pestañas y días |
| verde | #1D6B3B | "Hoy", insignias, WhatsApp |
| verde-claro | #E2F1E7 | Fondos de iconos y del bloque de reporte |
| maiz | #F5B700 | Etiquetas de precio |
| maiz-claro | #FFF4CF | Fondo de la sección de postres y avisos |
| tinta | #26161D | Texto principal, día seleccionado |
| tinta-suave | #5E4B53 | Texto secundario |
| borde | #EBDDE3 | Bordes de tarjetas |

## Estilos de texto

| Nombre | Fuente | Móvil | Escritorio |
|---|---|---|---|
| Display / H1 | Bricolage Grotesque ExtraBold | 44 / 42 | 80 / 76 |
| H2 | Bricolage Grotesque ExtraBold | 30 / 32 | 44 / 46 |
| H3 tarjeta | Atkinson Hyperlegible Bold | 19 / 25 | 19 / 25 |
| Cuerpo | Atkinson Hyperlegible Regular | 17 / 27 | 17 / 27 |
| Pequeño | Atkinson Hyperlegible Regular | 15 / 22 | 15 / 22 |
| Precio | Bricolage Grotesque ExtraBold | 20 | 20 |

## Retícula

- Móvil 375: 4 columnas, márgenes de 20 px, medianil de 16 px.
- Escritorio 1440: 12 columnas, ancho máximo 1152 px centrado, medianil de 24 px.

## Componentes y variantes

- **Botón:** tipo = primario / claro / verde; estado = normal / hover / foco.
- **Pestaña de sede:** estado = activa / inactiva / hover.
- **Día:** estado = normal / hover / seleccionado; hoy = sí / no; tamaño = corto (móvil) / largo (escritorio).
- **Tarjeta de promoción:** logo = sí / no; detalle = sí / no; precio = sí / no; ubicación = sí / no.
- **Etiqueta de precio:** forma de etiqueta con orificio, rotada -2°.
- **Tarjeta de evento:** con bloque de fecha (mes + día).
- **Tarjeta de recomendación:** icono, título y lista con palomitas.
- **Insignia:** "Disponible hoy".
