/* =========================================================================
   CONFIGURACIÓN DEL SITIO
   -------------------------------------------------------------------------
   Este es el ÚNICO archivo que hay que tocar para cambiar datos de contacto,
   textos clave, enlaces de redes y horario.
   No repitas estos valores dentro del HTML: usa los atributos data-cfg-*
   (ver js/script.js) o edítalos aquí.
   ========================================================================= */

window.siteConfig = {
  /* ---------- Identidad ---------- */
  clinicName: 'Clínica Fisio San Martín',
  clinicShortName: 'Clínica San Martín',

  /* ---------- Contacto ---------- */
  // Formato visible del teléfono principal
  phone: '2665-2526',
  // Formato internacional para enlaces tel: (Costa Rica = +506)
  phoneIntl: '+50626652526',
  // Segundo teléfono
  phoneAlt: '8869-2763',
  phoneAltIntl: '+50688692763',
  email: 'clinicafisiosanmartin@gmail.com',

  /* ---------- WhatsApp ----------
     PENDIENTE: no se ha confirmado un número de WhatsApp. Mientras
     `whatsapp` esté vacío, los enlaces de WhatsApp se eliminan solos del
     HTML. Para activarlos: poner aquí el número con código de país y solo
     dígitos (por ejemplo '50688692763'). */
  whatsapp: '',
  whatsappLabel: 'Escribinos por WhatsApp',
  whatsappMessage: 'Hola, me gustaría agendar una cita de fisioterapia.',

  /* ---------- Redes sociales ----------
     Dejar en cadena vacía ('') para ocultar automáticamente el enlace. */
  instagram: 'https://www.instagram.com/clinicasanmartincr/',
  // PENDIENTE: página de Facebook, si existe.
  facebook: '',

  /* ---------- Ubicación ----------
     Referencia exacta de Google Maps:
     JHP9+FF3, 25 mts de la clínica 25 de Julio, Moracia, Liberia,
     Provincia de Guanacaste, 50101. */
  address:
    '50 metros al norte de la Iglesia Hosanna, Barrio Moracia, Liberia, Guanacaste.',
  addressDetail: 'Costa Rica',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=JHP9%2BFF3%20Liberia%2C%20Guanacaste%2C%20Costa%20Rica',
  // Iframe del mapa (el "plus code" ubica el punto exacto).
  googleMapsEmbedUrl:
    'https://www.google.com/maps?q=JHP9%2BFF3%20Liberia%2C%20Guanacaste%2C%20Costa%20Rica&z=17&output=embed',
  // Waze busca por referencia: cuando se tengan las coordenadas exactas,
  // sustituir por 'https://waze.com/ul?ll=LAT,LON&navigate=yes'.
  wazeUrl:
    'https://waze.com/ul?q=Iglesia%20Hosanna%2C%20Barrio%20Moracia%2C%20Liberia%2C%20Guanacaste',

  /* ---------- Horario ---------- */
  schedule: [
    { days: 'Lunes a viernes', hours: '8:00 am – 7:00 pm' },
    { days: 'Sábado', hours: '8:00 am – 12:00 pm' },
    { days: 'Domingo', hours: 'Cerrado' }
  ]
};
