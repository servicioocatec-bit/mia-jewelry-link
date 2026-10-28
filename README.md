# Mia Jewelry — página de links

Página tipo link-in-bio (también la que abre la etiqueta NFC).

## Seguimiento

Agrega en Railway la variable:

| Variable | Valor |
|---|---|
| `TRACKER_URL` | URL del QR Tracker, ej. `https://qr-mia.up.railway.app` |

Con eso la página carga el script de seguimiento y cada visita y botón tocado aparece en el panel del tracker (pestaña **Página de links**).
Sin `TRACKER_URL` la página funciona igual, solo que sin seguimiento.

El nombre que sale en el panel para cada botón es el atributo `data-t` del enlace. Si agregas un botón nuevo, ponle `data-t="Nombre"`.

## Ventas

Los botones que llevan a la tienda (`data-store="miajewelry.com.mx"` en el script) salen con etiquetas de origen, así el panel y Shopify saben qué ventas vinieron de esta página y desde dónde llegó la persona (NFC, Instagram, TikTok…).
