# Peluquería Arriaga · rediseño conceptual

> **Rediseño conceptual no oficial.** Propuesta de [Víctor Ramos](https://victorramos.vercel.app),
> sin relación con Peluquería Arriaga.

Propuesta de web para [Peluquería Arriaga](https://www.google.com/maps/search/?api=1&query=Peluquer%C3%ADa%20Arriaga%2C%20C.%20Padre%20Flores%2C%201%2C%2028805%20Alcal%C3%A1%20de%20Henares),
una peluquería de caballeros y niños de Alcalá de Henares que hoy no tiene web propia ni reserva
online. La he hecho para mi portfolio y para enseñársela al dueño como punto de partida de la web
real.

## Qué es (y qué no es)

- **Es un concepto.** Todas las vistas muestran el aviso arriba y en el pie, y en la cabecera
  aparece siempre la etiqueta «Concepto».
- **No se indexa.** `<meta name="robots" content="noindex, nofollow">`, `robots.txt` con
  `Disallow: /` y, en Vercel, la cabecera `X-Robots-Tag: noindex, nofollow` (`vercel.json`).
- **No recoge datos.** El formulario de cita es una maqueta: valida en el navegador y, al enviar,
  solo muestra un resumen avisando de que no se ha enviado nada. No hay backend, ni `fetch`, ni
  almacenamiento, ni login, ni pagos.
- **No inventa nada.** No hay reseñas inventadas, los precios dicen «Consultar», y los textos son
  propios (no se ha copiado nada de terceros). Tampoco hay fotos: el diseño es tipográfico, con
  huecos preparados.
- **Cuesta 0 €.** Es una web estática publicada en el subdominio gratuito de Vercel. Las fuentes se
  sirven desde el propio dominio con `next/font`.

## Stack

Next.js 16 (App Router, exportación estática) · React 19 · TypeScript estricto · Tailwind CSS v4.
En producción solo depende de `next`, `react` y `react-dom`.

## Cómo arrancarlo

Necesitas Node.js 20 o superior.

```bash
npm install
npm run dev        # http://localhost:3000
```

Otros comandos:

| Comando             | Qué hace                                         |
| ------------------- | ------------------------------------------------ |
| `npm run build`     | Genera la web estática en `out/`                 |
| `npm run lint`      | ESLint (incluye reglas de accesibilidad)         |
| `npm run typecheck` | Comprueba los tipos de TypeScript                |
| `npm run format`    | Formatea con Prettier (`format:check` solo mira) |

**Publicar en Vercel:** importa el repositorio en Vercel y deja la configuración por defecto.
Detecta Next.js y sirve la carpeta `out/`. No hace falta tarjeta ni variables de entorno.

## Dónde se cambia el contenido

Todo el texto de la web está en datos tipados en `src/content/`, separado de los componentes:

| Archivo           | Contenido                                                                            |
| ----------------- | ------------------------------------------------------------------------------------ |
| `business.ts`     | Nombre, dueño, dirección, teléfono, enlace a Google Maps y valoración media          |
| `schedule.ts`     | Horario semanal. Alimenta la tabla, «Abierto ahora» y las franjas de cita            |
| `services.ts`     | Servicios y precios (`price: null` se muestra como «Consultar»)                      |
| `values.ts`       | Lo que destacan los clientes (sección «Nosotros»)                                    |
| `reviews.ts`      | Reseñas reales: **vacía a propósito** (ver abajo)                                    |
| `photos.ts`       | Huecos de fotos                                                                      |
| `concept.ts`      | Texto del aviso de concepto y crédito                                                |
| `navigation.ts`   | Anclas de las secciones y menú                                                       |
| `sections.ts`     | Titulares, entradillas y textos de cada sección, del pie y de la página 404          |
| `booking-form.ts` | Etiquetas, ayudas, errores y confirmación del formulario de cita                     |
| `ui.ts`           | Textos de interfaz comunes: botones, menú, horario, avisos para lectores de pantalla |

**Reseñas.** Pega en `reviews.ts` solo reseñas reales, copiadas tal cual, con autor (o inicial),
fecha (`"AAAA-MM"`), puntuación y, si quieres, el enlace a la reseña. El formato está en el
comentario del archivo. Mientras la lista esté vacía, se muestra solo la valoración media con un
enlace a Google Maps.

**Fotos.** Copia la imagen a `public/fotos/` (mejor en `.webp` y a no más de 1600 px de lado) y
rellena `src`, `width` y `height` del hueco en `photos.ts`. El marco ya tiene la proporción
definitiva.

**Valoración.** 4,9 sobre 5 con 74 reseñas (consultado en octubre de 2026). Hay que actualizarla a
mano en `business.ts`.

## Detalles técnicos

- **«Abierto ahora»** se calcula en el navegador con la hora de Madrid
  (`Intl.DateTimeFormat` con `timeZone: "Europe/Madrid"`), sea cual sea la zona del visitante, y se
  actualiza cada minuto. El HTML estático muestra el horario resumido para evitar desajustes de
  hidratación (`src/lib/use-madrid-now.ts`, `src/lib/opening.ts`).
- **Selector de día:** botones con los próximos 12 días con horario. Nunca aparecen domingos, y
  el sábado solo permite la franja de mañana. Hoy solo aparece si aún queda alguna franja abierta.
- **Sin mapa incrustado:** el iframe de Google Maps pesa cerca de 1 MB, así que se usa un enlace
  «Cómo llegar», que en el móvil abre la app de mapas.
- **Accesibilidad:** contraste AA comprobado (los valores están en `src/app/globals.css`), foco
  visible, enlace «Saltar al contenido», menú móvil con `aria-expanded` que se cierra con Esc, errores
  del formulario asociados a cada campo con el foco en el primero, y respeto a
  `prefers-reduced-motion`.
- **Móvil primero:** barra inferior fija con «Llamar» y «Pedir cita», que aparece al dejar atrás
  el inicio y se oculta en el formulario.
- **Animaciones:** pequeñas y solo con CSS. Los botones se elevan al pasar el ratón, el icono del
  teléfono «suena», el sello de valoración cae como un tampón al cargar, los encabezados aparecen al
  hacer scroll (en navegadores que lo permiten, sin JavaScript), los errores del formulario tiemblan
  y la marca de la confirmación se dibuja. Todas se desactivan si el sistema pide menos movimiento
  (`prefers-reduced-motion`).

## Datos pendientes de confirmar con el negocio

- [ ] Nombre del dueño: **Julián** (sale en el inicio y en «Nosotros»).
- [ ] Lista de servicios: corte de caballero, corte infantil, arreglo de barba, lavado y peinado,
      color. ¿Falta o sobra alguno? (Por ejemplo, afeitado a navaja).
- [ ] Precios de cada servicio (ahora todos dicen «Consultar»).
- [ ] Horario: L–V 9:30–14:00 y 16:30–20:30; S 9:00–14:00; D cerrado. Falta saber qué pasa en
      festivos, en agosto y en Navidad.
- [ ] Si atienden sin cita o solo con cita, y cómo prefieren recibir las peticiones en la web real
      (llamada, WhatsApp, formulario…).
- [ ] Enlace exacto de su ficha de Google Maps (ahora es un enlace de búsqueda).
- [ ] Permiso para usar fotos del local y de Julián, y para citar reseñas.
- [ ] Revisión de los textos de «Nosotros» y de las descripciones de servicios, que he redactado
      a partir de lo que destacan las reseñas.
