# Portfolio · Siro Fernández García

Portfolio personal publicado con GitHub Pages: https://sirofernandez.github.io/Portfolio/

Diseño "Chiaroscuro": barroco italiano histórico. Portada y contacto en claroscuro (cielo de tormenta y silueta de Roma barroca); salas interiores en papel de grabado, con láminas numeradas, marcos dorados y cartelas. Código limpio en HTML, CSS y JavaScript, sin dependencias ni paso de compilación.

## Estructura

```
index.html            Estructura de la página
favicon.svg
css/
  fonts.css           Fuentes autoalojadas (IM Fell English, IM Fell English SC, Inter)
  tokens.css          Tokens de diseño: colores, tipografía, espaciado, sombras, movimiento
  base.css            Reset, papel envejecido, tipografía, cartelas, apariciones
  components.css      Cabecera, botones, filtros, tarjetas de obra, ficha, modal
  sections.css        Hero, galería, taller, sobre mí, contacto y pie
js/
  content.js          ← TODO EL CONTENIDO (ES/EN), enlaces y proyectos. Edita aquí.
  app.js              Idioma, render de secciones, contacto y navegación
  gallery.js          Tarjetas, filtros con animación FLIP y modal de proyecto
  motion.js           Parallax multicapa, apariciones y luz del puntero
  utils.js            Utilidades compartidas
assets/img/           Cielo, nubes, silueta de Roma, papel, grano y mármol (WebP/PNG)
assets/works/         Láminas de cada proyecto (SVG)
assets/ornaments/     Cartela y esquina con volutas (SVG)
fonts/                Archivos .woff2 (licencia SIL OFL 1.1)
```

## Cómo actualizar

- **Textos, enlaces o proyectos:** solo `js/content.js`. Cada proyecto tiene sus textos en `es` y `en`, su ilustración (`art`), sus filtros y sus enlaces. Si `links` está vacío, no se muestra ningún enlace.
- **Colores o tipografía:** `css/tokens.css`.

## Cómo subirlo (desde la web de GitHub)

1. En el repositorio, borra el `index.html` antiguo (o súbelo encima: se reemplaza).
2. *Add file → Upload files* y arrastra **el contenido** de esta carpeta (los archivos y las carpetas `css`, `js`, `assets` y `fonts`, no la carpeta que los contiene).
3. *Commit changes*. GitHub Pages lo publica en uno o dos minutos.

## Accesibilidad y rendimiento

- Contrastes WCAG AA verificados para todo el texto; foco visible; enlace "Saltar al contenido".
- Modal nativo (`<dialog>`) con Esc, retorno del foco y navegación con flechas.
- Respeta `prefers-reduced-motion`: sin parallax, sin luz de puntero y sin apariciones.
- Animaciones solo con `transform` y `opacity` en un único `requestAnimationFrame`; el parallax se detiene cuando el hero no está en pantalla.
- Fuentes autoalojadas y precargadas; imágenes de la galería con carga diferida.
