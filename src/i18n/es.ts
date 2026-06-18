import type { Translations } from './types';

// ──────────────────────────────────────────────────────────────────────────
// Español — traducción generada automáticamente. REQUIERE REVISIÓN HUMANA
// antes del lanzamiento. Refleja la estructura exacta de en.ts (impuesta por
// el tipo Translations); solo se han traducido los valores de cadena.
// ──────────────────────────────────────────────────────────────────────────

export const es: Translations = {
  seo: {
    title:
      'Contador de Caracteres — Herramienta Gratuita de Recuento de Caracteres y Palabras | PostTruncate',
    description:
      'Previsualiza publicaciones gratis. Pliegue LinkedIn, hilos X/Twitter, límites de hashtag y trampas de accesibilidad — directo en tu navegador.',
    skipLink: 'Saltar al editor',
  },

  nav: {
    brandAria: 'Inicio de PostTruncate',
    homeAria: 'Inicio de PostTruncate',
    links: {
      editor: 'Editor',
      guides: 'Guías de plataformas',
      limits: 'Todos los límites de plataformas',
      tools: 'Herramientas',
      counters: 'Contadores de caracteres',
      adPreviews: 'Ad Previews',
      faq: 'Preguntas frecuentes',
      about: 'Acerca de',
      contact: 'Contacto',
    },
    cta: 'Abrir el editor',
    themeToDark: 'Cambiar al tema oscuro',
    themeToLight: 'Cambiar al tema claro',
    language: 'Idioma',
    languageAria: 'Seleccionar idioma',
    menuAria: 'Mostrar u ocultar el menú de navegación',
    backToTop: 'Volver arriba',
  },

  hero: {
    eyebrow: 'Simulador de previsualización y truncamiento social',
    title: 'Mira exactamente dónde cada plataforma corta tu texto.',
    lede: 'Escribe una vez y observa cómo se renderiza tu publicación en previsualizaciones nativas de LinkedIn, X, Threads, Instagram y Facebook: con líneas del pliegue, divisiones de hilos, límites de hashtags y avisos de accesibilidad en vivo mientras escribes, más IA de un toque para mejorar tu publicación al instante.',
    primary: 'Empezar a escribir',
    secondary: 'Ver los límites de cada plataforma',
    badge: 'Vistas previas en tiempo real. Se acabaron las conjeturas.',
    trust: '100 % gratis — sin registro · Tu texto nunca sale del navegador · Más de 10 límites de plataformas',
  },

  howItWorks: {
    heading: 'Cómo funciona',
    steps: [
      {
        name: 'Pega o escribe tu texto',
        text: 'Introduce tu borrador en el editor y el contador de caracteres se actualiza al instante mientras escribes.',
      },
      {
        name: 'Todas las plataformas se muestran a la vez',
        text: 'Las tarjetas de vista previa de LinkedIn, X, Threads, Instagram, Facebook y SMS se actualizan simultáneamente, sin necesidad de selección.',
      },
      {
        name: 'Ve exactamente dónde se corta el texto',
        text: 'La vista previa resalta el punto de truncamiento para que sepas exactamente qué verán tus lectores.',
      },
    ],
  },

  toolPage: {
    onThisPage: 'En esta página',
    lastUpdated: 'Última actualización: {date}',
    crossPromo: {
      heading: '¿Necesitas revisar otras plataformas?',
      text: 'PostTruncate no es solo para {platform}. El editor completo de la página de inicio previsualiza tu publicación en LinkedIn, X, Instagram, Facebook, Threads y SMS a la vez, para que detectes el corte, el límite y los problemas de codificación de cada plataforma de una sola pasada. Escríbelo una vez y compruébalo en todas partes.',
      cta: 'Abrir el editor completo',
    },
    cta: {
      heading: '¿Listo para ver cómo queda realmente tu publicación?',
      blurb: 'Pega tu borrador en el editor de PostTruncate y ve al instante vistas previas en vivo para LinkedIn, X, Instagram, Facebook, Threads y SMS — con líneas de corte, divisiones de hilo y avisos de límite actualizándose mientras escribes. Gratis, instantáneo y nada sale de tu navegador.',
      button: 'Empieza a escribir — es gratis',
    },
  },

  images: {
    logoAlt: 'Logotipo de PostTruncate',
    platformLogo: 'Logotipo de {platform}',
  },

  breadcrumbs: {
    home: 'Inicio',
  },

  workspace: {
    title: 'Tu espacio de trabajo en vivo',
    sub: 'Todo lo de abajo se actualiza al instante y permanece en tu dispositivo.',
  },

  seoCopy: {
    ariaLabel: 'Acerca de PostTruncate',
    sections: [
      {
        heading: 'Un contador de caracteres para redes sociales',
        paragraphs: [
          '<strong>PostTruncate</strong> es un contador de caracteres gratuito que funciona directamente en tu navegador, sin necesidad de subir archivos ni crear una cuenta. Pega o escribe cualquier texto y verás al instante el recuento de caracteres, palabras, tiempo de lectura y distribución de letras, todo actualizado mientras escribes.',
          'Es útil para cualquier persona que trabaje con texto bajo un límite: redactores que ajustan un titular, desarrolladores que verifican la longitud de una cadena, o estudiantes que comprueban la extensión de un ensayo. Como todo se procesa localmente, tus borradores nunca salen de tu dispositivo.',
        ],
      },
      {
        heading: 'Codificación SMS y cálculo de segmentos',
        paragraphs: [
          'Los SMS funcionan con dos modos de codificación y la mayoría de herramientas ignoran la diferencia. PostTruncate detecta automáticamente si tu mensaje usa <strong>GSM-7</strong> estándar (160 caracteres por mensaje) o <strong>Unicode</strong> (70 caracteres), y el cambio puede producirse en cuanto escribes un solo emoji o carácter especial.',
          'También señala los caracteres de la tabla extendida de GSM —como el signo del euro (€), los corchetes o la barra vertical— que permanecen en modo GSM-7 pero consumen dos posiciones en lugar de una. Ese coste oculto es el motivo por el que algunos mensajes se fragmentan de forma inesperada.',
          'Cuando el texto ocupa varios segmentos, la <strong>calculadora de segmentos</strong> integrada muestra exactamente cuántos SMS se enviarán, teniendo en cuenta la sobrecarga del encabezado UDH que reduce el límite a 153 caracteres (GSM) o 67 (Unicode).',
        ],
      },
      {
        heading: 'X (Twitter): límites y divisor automático de hilos',
        paragraphs: [
          'X (Twitter) tiene dos reglas que suelen sorprender: el límite de 280 caracteres y el hecho de que cualquier enlace, independientemente de su longitud, cuenta exactamente como 23 caracteres. PostTruncate aplica ambas reglas, así que el contador que ves coincide con lo que X mostrará al aplicar el acortador t.co.',
          'Cuando tu borrador es demasiado largo, el <strong>divisor de hilos</strong> integrado lo divide en tuits numerados en los límites naturales de las frases, nunca a mitad de palabra. Cada tarjeta muestra su recuento de caracteres y posición, para que puedas revisar el hilo completo antes de publicar.',
        ],
      },
      {
        heading: 'Límites de caracteres en Instagram y Facebook',
        paragraphs: [
          'Instagram permite hasta 2 200 caracteres en una descripción, pero solo muestra los primeros 125 aproximadamente antes de ocultar el resto tras un enlace «ver más». PostTruncate indica exactamente dónde cae ese corte, de modo que la primera línea visible en el feed sea siempre la que necesitas.',
          'El panel también supervisa el <strong>número de hashtags</strong> en tiempo real. Instagram no publica de forma silenciosa las publicaciones con más de 5 etiquetas, por lo que se activa una advertencia antes de que alcances ese límite. Los espacios se cuentan siempre, igual que hace la propia plataforma.',
        ],
      },
      {
        heading: 'Recuento de palabras, legibilidad y análisis por plataforma',
        paragraphs: [
          'Más allá de los límites de las plataformas, PostTruncate también cuenta palabras, frases, párrafos y símbolos, todo en tiempo real mientras escribes. Es útil para metadescripciones SEO, revisión de documentación o cualquier flujo de trabajo donde necesites más que un simple recuento de caracteres.',
          'El panel gestiona correctamente el texto multilingüe, incluidos los sistemas de escritura CJK donde el recuento de caracteres tiene un peso semántico diferente. Ya escribas en español, inglés, japonés o chino, los recuentos reflejan lo que la plataforma de destino verá realmente.',
        ],
      },
    ],
  },

  guides: {
    eyebrow: 'Guías de plataformas',
    title: 'Conoce todos los límites antes de publicar.',
    lede: 'Una referencia rápida de los puntos de truncamiento, los límites estrictos y las trampas de formato que recortan en silencio tu alcance en cada red.',
    items: {
      linkedin: {
        name: 'LinkedIn',
        tag: 'El pliegue «…ver más»',
        body: 'LinkedIn colapsa las publicaciones tras unos 210 caracteres en escritorio y 140 en móvil, ocultando todo lo demás detrás de un enlace «…ver más». Lo que quede por encima de ese pliegue es todo tu argumento en el feed: si tu gancho no aterriza ahí, la mayoría de la gente nunca lo expande. Pon al frente la tensión, el resultado o la pregunta, y empuja los hashtags y los enlaces por debajo del pliegue.',
        facts: [
          ['Pliegue en escritorio', '~210 caracteres'],
          ['Pliegue en móvil', '~140 caracteres'],
          ['Límite máximo de la publicación', '3.000 caracteres'],
        ],
      },
      twitter: {
        name: 'X / Twitter',
        tag: 'Hilos y peso de los enlaces',
        body: 'X cuenta cada publicación contra un límite de 280 caracteres, pero todos los enlaces se envuelven con t.co y se cobran a un valor fijo de 23 caracteres sin importar lo largo que sea la URL real. Si superas los 280, necesitas un hilo. Los buenos hilos se cortan en los límites de las frases, nunca a mitad de palabra, y numeran cada tuit para que los lectores puedan seguir el orden. PostTruncate divide tu borrador automáticamente y etiqueta cada tarjeta con su posición.',
        facts: [
          ['Límite por tuit', '280 caracteres'],
          ['Cada enlace cuenta como', '23 caracteres'],
          ['Tuits del hilo', 'Ilimitados'],
        ],
      },
      threads: {
        name: 'Threads',
        tag: 'Encadenado de publicaciones',
        body: 'Threads, la app de texto de Meta, da a cada publicación 500 caracteres —casi el doble que X— y cuenta los enlaces completos en lugar de acortarlos. Si pasas de 500, el resto tiene que encadenarse como respuestas numeradas. La primera publicación sigue llevando el feed, así que pon al frente el gancho igual que en todas partes. PostTruncate mide por el recuento completo de caracteres y encadena los textos largos en una secuencia numerada y limpia.',
        facts: [
          ['Límite por publicación', '500 caracteres'],
          ['Enlaces contados', 'Completos'],
          ['Desbordamiento', 'Se encadena como respuestas'],
        ],
      },
      instagram: {
        name: 'Instagram',
        tag: 'Tope de hashtags',
        body: 'Las descripciones de Instagram llegan hasta 2.200 caracteres, pero solo muestran unos 125 antes de un enlace «más». La regla más estricta son los hashtags: más de 5 en una sola descripción o comentario y la publicación falla en silencio al publicarse. Amontonar decenas de etiquetas de baja intención también se lee como spam. Mantén tus etiquetas ajustadas y relevantes, y vigila el medidor en vivo para no chocar nunca con el muro de las 5 etiquetas.',
        facts: [
          ['Límite de la descripción', '2.200 caracteres'],
          ['Límite estricto de hashtags', '5 etiquetas'],
          ['Vista previa de la descripción', '~125 caracteres'],
        ],
      },
      facebook: {
        name: 'Facebook',
        tag: 'Truncamiento del feed',
        body: 'Facebook trunca las publicaciones del feed alrededor de los 480 caracteres con un enlace «Ver más», y la interacción cae bruscamente en los bloques largos sin pausas. Las publicaciones más cortas, con una primera línea clara, rinden mejor de forma constante. La misma regla de accesibilidad aplica en todas partes: las «fuentes elegantes» de pseudo-Unicode parecen negrita o cursiva, pero los lectores de pantalla las leen carácter por carácter —o las omiten por completo—, así que reducen tu alcance en silencio.',
        facts: [
          ['Pliegue del feed', '~480 caracteres'],
          ['Longitud de mejor rendimiento', 'Menos de 80 caracteres'],
          ['Fuentes elegantes', 'Rompen los lectores de pantalla'],
        ],
      },
    },
  },

  hookband: {
    eyebrow: 'Escribir el gancho',
    title: 'La primera línea es la única que lee la mayoría de la gente.',
    body: 'En todos los feeds, el texto por encima del pliegue hace todo el trabajo. Empieza con un resultado, una tensión o una pregunta, no con un calentamiento. Mueve los enlaces y los hashtags por debajo del pliegue, mantén tu apertura por debajo del corte de la plataforma y deja que la previsualización confirme que el gancho sobrevive antes de publicar.',
  },

  faq: {
    eyebrow: 'Preguntas frecuentes',
    title: 'Preguntas, respondidas.',
    viewAll: 'Ver todas las preguntas frecuentes',
    items: [
      {
        q: '¿Qué es el truncamiento de publicaciones?',
        a: 'El truncamiento ocurre cuando una plataforma corta tu publicación: oculta todo lo que queda tras el pliegue visual detrás de un enlace «…ver más» o rechaza los caracteres que superan un límite estricto. PostTruncate te muestra exactamente dónde hace ese corte cada plataforma, en vivo y mientras escribes, para que la parte importante nunca desaparezca bajo el pliegue.',
      },
      {
        q: '¿Por qué las redes sociales truncan las publicaciones?',
        a: 'Los feeds están hechos para escanear, así que las plataformas colapsan las publicaciones largas para mantener el scroll rápido y mostrar más contenido en pantalla. Cada plataforma traza la línea en un punto distinto: LinkedIn pliega alrededor de los 140–210 caracteres, Facebook entre 110 y 480 según el dispositivo, Instagram cerca de los 125, y X simplemente impone un límite estricto de 280 caracteres. Lo que queda tras el pliegue solo lo ven quienes tocan «más», y la mayoría de los lectores nunca lo hace.',
      },
      {
        q: '¿Qué plataformas admite PostTruncate?',
        a: 'PostTruncate previsualiza LinkedIn, X (Twitter), Threads, Instagram, Facebook y SMS, con recuento de caracteres en vivo, marcadores de pliegue, división en hilos y cálculo de segmentos SMS para cada una. También incluye una vista previa de Google SERP para títulos y meta descripciones, y un widget contador gratuito para incrustar en tu propio sitio.',
      },
      {
        q: '¿Qué tan precisos son los límites de caracteres?',
        a: 'PostTruncate usa los límites publicados y ampliamente observados de cada plataforma: 280 para X, 210/140 para el pliegue de LinkedIn, 5 hashtags para Instagram y un peso fijo de 23 caracteres para los enlaces. Las plataformas los ajustan de vez en cuando, y la renderización varía ligeramente según el dispositivo, así que toma las previsualizaciones como una estimación aproximada en lugar de una garantía perfecta al píxel.',
      },
      {
        q: '¿Los espacios y la puntuación cuentan como caracteres?',
        a: 'Sí. Cada espacio, salto de línea y signo de puntuación cuenta como un carácter, y tanto el contador de PostTruncate como los límites de las plataformas los incluyen. La única excepción común son los enlaces en X/Twitter, que se reducen a un valor fijo de 23 caracteres sin importar cuántas letras, símbolos o barras contenga la URL real.',
      },
      {
        q: '¿Cómo afectan los emojis al recuento de caracteres?',
        a: 'PostTruncate cuenta por puntos de código Unicode, así que un emoji simple como 🙂 cuenta como un solo carácter. Sin embargo, muchos emojis se componen de varios puntos de código unidos —variaciones de tono de piel, banderas y glifos combinados como 👨‍👩‍👧— y esos se registran como dos o más. La mayoría de las plataformas, X especialmente, también dan más peso a los emojis que a las letras normales, así que un borrador cargado de emojis consume un poco más de tu límite de lo que sugiere el número de glifos visibles.',
      },
      {
        q: '¿Cuál es la diferencia entre el recuento de caracteres y el recuento de palabras?',
        a: 'El recuento de caracteres es el total de cada carácter individual —letras, espacios, puntuación y emojis incluidos— y es contra lo que realmente se miden los límites de las plataformas. El recuento de palabras es la cantidad de palabras separadas por espacios, sin importar lo larga que sea cada una. Un tuit completo de 280 caracteres podría tener solo 40 palabras, así que vigila el recuento de caracteres para mantenerte por debajo de un límite y usa el recuento de palabras como medida de legibilidad.',
      },
      {
        q: '¿Por qué mi enlace cuenta como 23 caracteres en X?',
        a: 'X envuelve automáticamente cada URL con su acortador t.co, que siempre ocupa 23 caracteres sin importar lo largo o corto que sea el enlace original. Así que un enlace de 5 caracteres y uno de 200 caracteres te cuestan exactamente 23 cada uno del límite de 280. PostTruncate refleja esto en el contador ponderado.',
      },
      {
        q: '¿Qué son las «fuentes elegantes» y por qué se marcan?',
        a: 'Esas letras en negrita, cursiva o estilo manuscrito que pegas desde generadores de fuentes no son formato real: son caracteres de pseudo-Unicode del bloque de Símbolos Alfanuméricos Matemáticos. Parecen estilizados, pero los lectores de pantalla los deletrean letra por letra o los omiten, lo que perjudica tanto la accesibilidad como tu alcance orgánico. El monitor los marca para que puedas volver al texto plano.',
      },
      {
        q: '¿Qué elimina «Sanear el texto»?',
        a: 'Elimina los caracteres invisibles y de ancho cero: espacios de ancho cero, marcas de orden de bytes, marcas de control bidireccional, guiones suaves y códigos de control sueltos. Estos suelen colarse cuando copias desde otras apps, y rompen en silencio los recuentos de caracteres y la accesibilidad en clientes móviles antiguos sin llegar a ser visibles.',
      },
      {
        q: '¿Qué es la densidad de palabras clave y cómo protege mi contenido el monitor de exceso?',
        a: 'La densidad de palabras clave es el porcentaje de veces que una palabra aparece respecto al total de palabras. Repetir demasiado una misma palabra puede parecer relleno para buscadores y lectores. El monitor de exceso sigue la frecuencia en tiempo real y marca cualquier término que supere el umbral seguro del 3,0%, para que puedas sustituirlo antes de publicar.',
      },
      {
        q: '¿Cómo calculan los temporizadores la duración de lectura y habla?',
        a: 'El temporizador de lectura divide tu recuento de palabras por una velocidad media de 275 palabras por minuto. El temporizador de habla usa una velocidad conversacional de 150 palabras por minuto. Así puedes estimar artículos, guiones, newsletters o vídeos cortos sin salir del editor.',
      },
      {
        q: '¿Qué hace el saneador social y por qué debería quitar emojis o extraer hashtags?',
        a: 'Las acciones de saneado limpian borradores con un clic. El eliminador de emojis retira iconos y símbolos especiales cuando necesitas texto plano, y el extractor de hashtags saca las etiquetas del cuerpo y las agrupa al final para que la descripción sea más legible.',
      },
      {
        q: '¿Mi texto se envía a algún sitio?',
        a: 'No. Todo el editor y cada previsualización se ejecutan localmente en tu navegador. Tu borrador nunca sale de tu dispositivo: no hay cuenta, ni subida, ni procesamiento de tu contenido en ningún servidor.',
      },
      {
        q: '¿El guardado automático de sesión significa que mis datos se guardan en un servidor?',
        a: 'No. El borrador nunca se sube ni se guarda en infraestructura externa. El guardado automático de sesión usa sessionStorage en tu propio navegador, dentro de esa pestaña. Si refrescas la página en la misma pestaña, el texto se restaura; cuando termina la sesión de la pestaña, el navegador borra esa caché temporal.',
      },
      {
        q: '¿PostTruncate es gratis?',
        a: 'Sí, es completamente gratis y no requiere registro. La herramienta se financia con anuncios discretos colocados en espacios reservados que nunca desplazan el diseño mientras trabajas.',
      },
      {
        q: '¿Por qué mi SMS de 160 caracteres de repente contó como dos mensajes?',
        a: 'Esto ocurre por un cambio en la codificación del texto. Los SMS estándar usan codificación GSM-7, que permite hasta 160 caracteres en un solo mensaje. En cuanto el texto incluye un carácter no GSM — un emoji, un sistema de escritura regional o ciertos símbolos — el mensaje completo cambia a Unicode, que solo admite 70 caracteres por segmento. Si el mensaje Unicode supera los 70 caracteres, se añade un encabezado multipart y el espacio útil por segmento baja a 67 caracteres. PostTruncate muestra la codificación y el número de segmentos en tiempo real, para que siempre sepas dónde se produce el corte.',
      },
      {
        q: '¿Los caracteres especiales y los emojis cuentan como un solo carácter en un SMS?',
        a: 'No siempre. Las letras y los números estándar cuentan como un carácter cada uno. Los símbolos de la tabla extendida GSM — como el euro (€), los corchetes, las llaves y la barra vertical | — cuentan como dos caracteres cada uno, aunque el mensaje permanezca en modo GSM-7. Los emojis son distintos: añadir uno fuerza todo el mensaje a Unicode, lo que reduce el límite por segmento de 160 a 70 caracteres.',
      },
    ],
  },

  faqPage: {
    title: 'Preguntas frecuentes — Contador de caracteres y vistas previas de PostTruncate',
    description:
      'Todas las preguntas sobre PostTruncate, respondidas: límites de caracteres por plataforma, recuento de emojis y enlaces, segmentación de SMS, privacidad y cómo funcionan las vistas previas en vivo.',
    eyebrow: 'Preguntas frecuentes',
    heading: 'Preguntas frecuentes',
    lede: 'Todo sobre cómo PostTruncate cuenta, previsualiza y protege tus publicaciones, agrupado por tema. Haz clic en cualquier pregunta para ver la respuesta.',
    categories: {
      about: 'Sobre la herramienta',
      counting: 'Recuento y límites',
      cleanup: 'Limpieza y accesibilidad',
      insights: 'Métricas y análisis',
      privacy: 'Privacidad y datos',
      sms: 'SMS',
    },
  },

  limitsPage: {
    title: 'Límites de caracteres en redes sociales 2026 — Tabla completa',
    description:
      'La tabla completa de límites de caracteres para LinkedIn, X (Twitter), Threads, Instagram, Facebook y SMS: topes estrictos, pliegues de truncamiento y las reglas detrás de ellos.',
    eyebrow: 'Referencia',
    heading: 'Todos los límites de plataformas, en una tabla',
    lede: 'Topes estrictos, pliegues de texto visible y comportamiento de desbordamiento para cada plataforma que PostTruncate previsualiza. Los números de abajo son las mismas constantes que comprueba el editor en vivo.',
    table: {
      caption: 'Límites de caracteres y puntos de truncamiento por plataforma',
      platform: 'Plataforma',
      limit: 'Límite estricto',
      foldMobile: 'Pliegue (móvil)',
      foldDesktop: 'Pliegue (escritorio)',
      notes: 'Notas',
    },
    noFold: 'Sin pliegue',
    notes: {
      linkedin: 'El texto tras el pliegue se oculta detrás de «…ver más».',
      twitter: 'Sin pliegue: más de {limit} caracteres se divide en un hilo; cada enlace cuenta como {url} caracteres.',
      threads: 'Los enlaces cuentan completos; el texto que supera {limit} caracteres continúa como respuestas numeradas.',
      instagram: 'La descripción se pliega tras «más»; tope estricto de {hashtags} hashtags por publicación.',
      facebook: 'Las publicaciones del feed se colapsan tras «Ver más» mucho antes del tope técnico.',
      smsGsm: '{single} caracteres en un solo mensaje; {multi} por segmento cuando se divide.',
      smsUnicode: 'Un emoji o carácter no GSM cambia todo el mensaje a Unicode.',
    },
    rulesHeading: 'Reglas de truncamiento, plataforma por plataforma',
    rules: {
      linkedin: 'LinkedIn permite {limit} caracteres por publicación, pero pliega la vista del feed tras unos {mobile} caracteres en móvil y {desktop} en escritorio: el resto se oculta tras «…ver más». Los saltos de línea cuentan, y la primera frase concentra casi todos los clics, así que coloca el gancho al principio y los enlaces bajo el pliegue.',
      twitter: 'X impone un tope estricto de {limit} caracteres por publicación y no muestra ningún pliegue. Cada URL se envuelve con el acortador t.co y siempre cuesta {url} caracteres sin importar su longitud real, y muchos emojis pesan como dos caracteres. Los borradores más largos deben dividirse en un hilo; PostTruncate lo hace automáticamente respetando los límites de palabra.',
      threads: 'Threads permite {limit} caracteres por publicación y, a diferencia de X, cuenta los enlaces con su longitud completa. En móvil, el feed pliega las publicaciones largas hacia los {mobile} caracteres. Todo lo que supere el tope debe continuar como respuestas numeradas encadenadas bajo la primera.',
      instagram: 'Las descripciones de Instagram pueden llegar a {limit} caracteres, pero el feed solo muestra los primeros {mobile} aproximadamente antes del enlace «más». La regla más dura son los hashtags: más de {hashtags} en una descripción o primer comentario y la publicación puede fallar silenciosamente al publicarse.',
      facebook: 'El tope técnico de Facebook es de {limit} caracteres, pero las publicaciones del feed se colapsan tras «Ver más» hacia los {mobile} caracteres en móvil y {desktop} en escritorio. La interacción cae en picado con bloques largos sin pausas, así que el límite práctico es el pliegue, no el tope.',
      sms: 'Un SMS individual admite {gsmSingle} caracteres en codificación GSM de 7 bits, que bajan a {gsmMulti} por segmento cuando el mensaje se divide. Cualquier emoji o carácter no GSM cambia todo el mensaje a Unicode — {uniSingle} caracteres por mensaje único, {uniMulti} por segmento — y algunos símbolos GSM (€, corchetes, la barra vertical) cuentan como dos.',
    },
  },

  footer: {
    homeAria: 'Inicio de PostTruncate',
    tag: 'Mira exactamente dónde cada plataforma corta tu texto, antes de publicar.',
    columns: {
      tool: {
        title: 'Herramienta',
        links: [
          'Editor de texto',
          'Previsualizaciones en vivo',
          'Divisor de hilos',
          'Saneador de Unicode',
          'Widget de inserción',
        ],
      },
      platforms: {
        title: 'Plataformas',
        links: ['LinkedIn', 'X / Twitter', 'Threads', 'Instagram', 'Facebook'],
      },
      learn: {
        title: 'Aprende',
        links: [
          'Límites de caracteres',
          'Preguntas frecuentes',
          'Escritura de ganchos',
          'Accesibilidad',
        ],
      },
      legal: {
        title: 'Legal',
        links: ['Privacidad', 'Términos', 'Acerca de', 'Contacto'],
      },
      guides: {
        title: 'Guías de plataformas',
        links: [
          'X / Twitter',
          'Instagram',
          'LinkedIn',
          'Facebook',
          'Threads',
        ],
      },
    },
    copyright: '© {year} PostTruncate. Hecho para creadores de todo el mundo.',
    disclaimer:
      'No afiliado con LinkedIn, X, Meta ni Instagram. Los límites son estimaciones y pueden cambiar.',
  },

  pages: {
    common: {
      lastUpdated: 'Última actualización: {date}',
      lastUpdatedDate: '1 de junio de 2026',
      backHome: '← Volver al editor',
    },

    privacy: {
      title: 'Política de privacidad',
      description:
        'Cómo maneja PostTruncate tus datos: tu texto nunca sale de tu navegador, no hay cuentas y nada de lo que escribes se sube ni se almacena.',
      intro:
        'PostTruncate está construido con la privacidad como prioridad. Todo lo que escribes se ejecuta localmente en tu navegador: tu borrador nunca se sube, se almacena ni lo vemos nosotros. Esta política explica exactamente qué significa eso y los pocos casos limitados en los que intervienen terceros.',
      sections: [
        {
          heading: 'Tu texto permanece en tu dispositivo',
          paragraphs: [
            'El editor, cada previsualización de plataforma, el divisor de hilos y el saneador de Unicode se ejecutan por completo en <strong>tu navegador</strong>. El texto que escribes o pegas se procesa en tu propio dispositivo y <strong>nunca se transmite a nuestros servidores</strong>: de hecho, PostTruncate no tiene ningún servidor de contenido al que enviarlo. Cuando cierras la pestaña, tu borrador desaparece a menos que tu navegador decida conservarlo localmente.',
            'Como no se sube nada, no podemos leer, almacenar, vender ni compartir lo que escribes. <strong>No hay cuenta, ni registro, ni inicio de sesión</strong>, así que nunca te pedimos tu nombre, correo electrónico ni ningún dato personal para usar la herramienta.',
          ],
        },
        {
          heading: 'Qué almacenamos localmente',
          paragraphs: [
            'Un pequeño número de preferencias se guardan en el <strong>localStorage</strong> de tu navegador para que el sitio recuerde cómo te gusta: en concreto, el tema que elijas (claro u oscuro) y tu idioma preferido. Estos valores viven solo en tu dispositivo, solo PostTruncate puede leerlos y nunca llegan a nosotros. Puedes borrarlos en cualquier momento desde la configuración de tu navegador.',
          ],
        },
        {
          heading: 'Publicidad',
          paragraphs: [
            'PostTruncate se financia con anuncios discretos mostrados en espacios fijos y reservados que nunca desplazan el diseño mientras trabajas. Si se usan socios publicitarios de terceros, estos pueden establecer sus propias cookies o usar identificadores de dispositivo para mostrar anuncios relevantes, sujetos a sus propias políticas de privacidad. Estos socios nunca reciben el contenido de tu borrador, porque ese contenido nunca sale de tu navegador.',
          ],
        },
        {
          heading: 'El formulario de contacto',
          paragraphs: [
            'La única función que envía datos fuera de tu dispositivo es el <strong>formulario de contacto</strong>. Cuando eliges enviarnos un mensaje, el nombre, el correo electrónico y el mensaje que introduces nos llegan a través de un servicio externo de gestión de formularios para que podamos leerlo y responder. Usamos esa información únicamente para responderte y no la utilizamos con fines de marketing. Si prefieres no usar un tercero, puedes escribirnos directamente por correo electrónico.',
          ],
        },
        {
          heading: 'Cambios y contacto',
          paragraphs: [
            'Podemos actualizar esta política a medida que el producto evoluciona; la fecha de «última actualización» de arriba siempre refleja la versión actual. Si tienes alguna pregunta sobre privacidad, escríbenos a <strong>contact@posttruncate.com</strong>.',
          ],
        },
      ],
    },

    terms: {
      title: 'Términos y condiciones',
      description:
        'Las condiciones de uso de PostTruncate: una herramienta gratuita y tal cual, cuyos límites de plataforma son estimaciones, proporcionada sin garantía y no afiliada a ninguna red social.',
      intro:
        'Al usar PostTruncate aceptas estos términos. Son intencionadamente breves y sencillos: la herramienta es gratuita, se ejecuta en tu navegador y se proporciona tal cual.',
      sections: [
        {
          heading: 'Uso del servicio',
          paragraphs: [
            'PostTruncate es una herramienta gratuita para previsualizar y optimizar publicaciones en redes sociales. Puedes usarla con cualquier fin lícito. Aceptas <strong>no hacer un mal uso del servicio</strong>: por ejemplo, intentando interrumpirlo, revertir sus protecciones o usarlo para infringir la ley o vulnerar los derechos de otra persona.',
          ],
        },
        {
          heading: 'Estimaciones, no garantías',
          paragraphs: [
            'Los límites de caracteres, los puntos del pliegue y las reglas de formato que se muestran aquí se basan en el comportamiento publicado y ampliamente observado de cada plataforma. Las plataformas <strong>cambian estos límites sin previo aviso</strong>, y la renderización varía según el dispositivo y la versión de la app. Toma cada previsualización y recuento como una estimación aproximada, no como una garantía perfecta al píxel. Eres responsable de revisar tus propias publicaciones antes de publicarlas.',
          ],
        },
        {
          heading: 'Sin afiliación',
          paragraphs: [
            'PostTruncate es una herramienta independiente y <strong>no está afiliada, respaldada ni patrocinada por</strong> LinkedIn, X (Twitter), Meta, Instagram, Facebook ni Threads. Todos los nombres de productos, logotipos y marcas son propiedad de sus respectivos dueños y se usan aquí solo para describir el comportamiento de cada plataforma.',
          ],
        },
        {
          heading: 'Proporcionado «tal cual»',
          paragraphs: [
            'El servicio se proporciona <strong>«tal cual» y «según disponibilidad», sin garantías de ningún tipo</strong>, expresas o implícitas. En la máxima medida permitida por la ley, no somos responsables de ninguna pérdida o daño derivado de tu uso —o de tu imposibilidad de uso— de la herramienta, incluidas las decisiones que tomes basándote en sus previsualizaciones o recuentos.',
          ],
        },
        {
          heading: 'Cambios en estos términos',
          paragraphs: [
            'Podemos revisar estos términos de vez en cuando; la fecha de «última actualización» de arriba refleja la versión actual, y el uso continuado de la herramienta significa que aceptas los términos más recientes. ¿Preguntas? Escribe a <strong>contact@posttruncate.com</strong>.',
          ],
        },
      ],
    },

    about: {
      title: 'Acerca de PostTruncate',
      description:
        'PostTruncate es una herramienta gratuita y centrada en la privacidad que muestra a los creadores exactamente dónde cada plataforma social corta su texto, antes de pulsar publicar.',
      intro:
        'PostTruncate existe por una razón: la primera línea de tu publicación es la única que lee la mayoría de la gente, y cada plataforma la corta en un lugar diferente. Nosotros hacemos visibles esos límites invisibles.',
      sections: [
        {
          heading: 'Qué hace',
          paragraphs: [
            'Escribe o pega un borrador una vez, y PostTruncate lo renderiza tal como lo harán realmente <strong>LinkedIn, X, Threads, Instagram y Facebook</strong>: el pliegue «…ver más», la división de hilos de 280 caracteres, el peso de 23 caracteres de los enlaces, el tope de 5 hashtags. Ves exactamente qué sobrevive por encima del pliegue antes de comprometerte a publicar.',
            'También detecta los problemas silenciosos que reducen tu alcance: los caracteres invisibles de ancho cero que rompen los recuentos y los lectores de pantalla, y las «fuentes elegantes» de pseudo-Unicode que parecen estilizadas pero son ilegibles para la tecnología de asistencia.',
          ],
        },
        {
          heading: 'Por qué lo construimos',
          paragraphs: [
            'La mayoría de los contadores de caracteres te dan un solo número. Los creadores necesitan más que eso: necesitan saber <strong>dónde</strong> se corta el texto en cada red, porque ahí es donde el gancho vive o muere. Queríamos un único espacio de trabajo que simule todas las plataformas a la vez, se ejecute al instante y respete tu privacidad por completo.',
          ],
        },
        {
          heading: 'Construido con la privacidad como prioridad',
          paragraphs: [
            'Todo se ejecuta en tu navegador. Tu texto nunca se sube, no hay cuentas y la herramienta es gratuita. Se financia con anuncios discretos en espacios reservados que nunca desplazan el diseño. Lee todos los detalles en nuestra <a href="../privacy/"><strong>Política de privacidad</strong></a>.',
          ],
        },
      ],
    },

    contact: {
      title: 'Contáctanos',
      description:
        'Ponte en contacto con el equipo de PostTruncate: envíanos un mensaje o escríbenos directamente por correo con comentarios, informes de errores o preguntas.',
      intro:
        '¿Encontraste un error, detectaste un límite de plataforma que ha cambiado o tienes una idea para mejorar PostTruncate? Nos encantaría saber de ti.',
      form: {
        name: 'Tu nombre',
        email: 'Tu correo electrónico',
        subject: 'Asunto',
        message: 'Mensaje',
        submit: 'Enviar mensaje',
        sending: 'Enviando…',
        success: 'Gracias: tu mensaje está en camino. Te responderemos pronto.',
        error:
          'Algo salió mal al enviar tu mensaje. Inténtalo de nuevo o escríbenos directamente por correo.',
      },
      altHeading: '¿Prefieres el correo?',
      altBody:
        'Puedes escribirnos en cualquier momento a {email}. Leemos todos los mensajes y respondemos lo más rápido que podemos.',
    },
  },

  embedWidget: {
    title: 'Widget gratuito de contador de caracteres — PostTruncate',
    description:
      'Añade un contador de caracteres en vivo a cualquier blog o sitio web con una línea de HTML. Controla los límites de X, LinkedIn, Threads, Instagram y SMS.',
    eyebrow: 'Inserción gratuita',
    heading: 'Inserta un contador de caracteres en vivo en tu sitio',
    lede:
      'Pega una línea de HTML para añadir un contador de caracteres en tiempo real a cualquier página. Cuenta caracteres y palabras, y controla los límites de X, LinkedIn, Threads, Instagram y SMS, sin salir de tu sitio.',
    previewLabel: 'Vista previa en vivo',
    copyButton: 'Copiar código de inserción',
    copiedButton: '¡Copiado!',
    codeLabel: 'Código de inserción',
    audienceHeading: '¿Para quién es?',
    forBloggers:
      'Los bloggers y creadores de contenido pueden añadir un contador de caracteres en vivo directamente en su página de redacción para que los lectores comprueben los límites de las plataformas sin cambiar de pestaña.',
    forEducators:
      'Los educadores y autores de cursos pueden insertar el contador dentro de una lección, permitiendo a los estudiantes practicar la escritura con restricciones de longitud.',
    forDevelopers:
      'Los desarrolladores pueden añadir el widget en cualquier CMS, página de documentación o herramienta interna con un único <iframe>, sin clave de API, cuenta ni paso de compilación.',
    homepageLinkLabel: 'Insertar en tu sitio →',
  },

  errors: {
    notFound: {
      code: '404',
      title: 'Página no encontrada',
      description:
        'La página que buscas no existe. Vuelve al editor de PostTruncate.',
      heading: 'Esta página quedó truncada',
      body: 'La página que buscas no existe, se movió o nunca existió. El editor sigue justo donde lo dejaste.',
      cta: 'Volver al editor',
    },
    serverError: {
      code: '500',
      title: 'Algo salió mal',
      description:
        'Ocurrió un error inesperado. Vuelve al editor de PostTruncate e inténtalo de nuevo.',
      heading: 'Algo salió mal de nuestro lado',
      body: 'Es un error del servidor, no es culpa tuya. Inténtalo de nuevo en un momento: el editor funciona por completo en tu navegador, así que tu texto está a salvo igualmente.',
      cta: 'Volver al editor',
    },
  },


  banner: {
    text: 'La vista previa de {platform} está abajo',
    close: 'Cerrar',
  },

  whyPostTruncate: {
    eyebrow: '¿POR QUÉ POSTTRUNCATE?',
    title: 'Escribe con confianza.<br/>Publica sin preocupaciones.',
    p1: 'Cada plataforma tiene límites de caracteres y reglas de truncamiento diferentes. PostTruncate te muestra exactamente cómo aparecerá tu contenido antes de publicar.',
    p2: 'Ahorra tiempo, aumenta la interacción y haz que cada carácter cuente con vistas previas en tiempo real, información inteligente y reescritura de tono con IA en un toque.',
    features: {
      realTime: {
        title: 'Vistas previas en tiempo real',
        desc: 'Ve exactamente cómo aparecerá tu publicación en más de 6 plataformas al instante.',
      },
      insights: {
        title: 'Información inteligente',
        desc: 'Obtén puntuaciones de legibilidad, análisis de palabras clave y consejos de optimización de contenido.',
      },
      privacy: {
        title: 'Privacidad primero',
        desc: 'Tu contenido nunca se almacena ni se comparte. Todo permanece privado.',
      },
      aiTone: {
        title: 'Reescritor de tono con IA',
        desc: 'Reescribe tu publicación al instante en un tono profesional, casual, cercano o conciso con un toque — impulsado por IA.',
      },
    },
  },

  howTruncationWorks: {
    eyebrow: 'CÓMO FUNCIONA EL TRUNCAMIENTO',
    description: 'Cada plataforma tiene límites de caracteres y reglas de visualización únicos. Cuando tu contenido supera estos límites, se trunca con "..." o "Ver más". PostTruncate simula exactamente cómo aparecerá tu publicación.',
    platforms: {
      linkedin: { name: 'LinkedIn', desc: 'Muestra ~220 caracteres antes de "...ver más"' },
      twitter: { name: 'X (Twitter)', desc: 'Muestra ~125 caracteres antes de truncar (varía según el dispositivo)' },
      instagram: { name: 'Instagram', desc: 'Muestra ~125 caracteres, toca "más" para expandir' },
      facebook: { name: 'Facebook', desc: 'Muestra ~160 caracteres antes de "...ver más"' },
      threads: { name: 'Threads', desc: 'Similar a Instagram con ~125 caracteres antes de truncar' },
      sms: { name: 'SMS (GSM)', desc: '160 caracteres por SMS para GSM, 70 para Unicode' },
    },
  },

  platformCharacterLimits: {
    eyebrow: "LÍMITES DE CARACTERES POR PLATAFORMA",
    headers: {
      platform: "Plataforma",
      characterLimit: "Límite de caracteres",
      shownInFeed: "Mostrado en el feed",
      bestPractice: "Mejores prácticas",
      notes: "Notas"
    },
    viewAll: "Ver todos los límites de plataformas",
    platforms: {
      linkedin: {
        name: "LinkedIn",
        limit: "3,000",
        shown: "~220 caracteres",
        bestPractice: "Mantén el mensaje clave al principio",
        notes: "Los artículos admiten hasta 125,000 caracteres"
      },
      twitter: {
        name: "X (Twitter)",
        limit: "280",
        shown: "~125 caracteres",
        bestPractice: "Coloca la información importante al frente",
        notes: "Los enlaces reducen los caracteres disponibles"
      },
      instagram: {
        name: "Descripción de Instagram",
        limit: "2,200",
        shown: "~125 caracteres",
        bestPractice: "Engancha pronto, añade CTA",
        notes: "Los hashtags cuentan para el límite"
      },
      facebook: {
        name: "Publicación de Facebook",
        limit: "63,206",
        shown: "~160 caracteres",
        bestPractice: "Sé conciso",
        notes: "Las imágenes y los enlaces afectan la visualización"
      },
      threads: {
        name: "Threads",
        limit: "500",
        shown: "~125 caracteres",
        bestPractice: "Corto y atractivo",
        notes: "La plataforma basada en texto de Meta"
      },
      sms: {
        name: "SMS (GSM)",
        limit: "160",
        shown: "160 por SMS",
        bestPractice: "Mantener por debajo de 160",
        notes: "Los textos más largos se dividen en múltiples SMS"
      }
    }
  },

  whoIsItFor: {
      eyebrow: "¿PARA QUIÉN ES?",
      title: "Perfecto para cada creador de contenido",
      roles: {
          marketers: {
              title: "Marketers",
              desc: "Optimiza campañas, textos publicitarios y publicaciones sociales para maximizar el alcance y la participación."
          },
          creators: {
              title: "Creadores",
              desc: "Escribe mejores subtítulos e hilos que obtengan más me gusta, compartidos y guardados."
          },
          agencies: {
              title: "Agencias",
              desc: "Gestiona múltiples clientes y asegúrate de que cada publicación esté perfectamente optimizada."
          },
          founders: {
              title: "Fundadores",
              desc: "Comparte actualizaciones y construye tu marca con contenido claro e impactante."
          }
      }
  },

  ctaBanner: {
    title: '¿Listo para optimizar tu contenido?',
    body: 'Únete a miles de creadores y profesionales del marketing que escriben mejor, publican de forma más inteligente y consiguen más interacción.',
    cta: 'Empieza a escribir gratis',
    noCard: 'No se requiere tarjeta de crédito',
    free: 'Gratis para siempre',
  },

  island: {
    dashboard: {
      loadSample: 'Cargar una publicación de ejemplo →',
      sample:
        'La semana pasada lanzamos una función diminuta que, sin hacer ruido, duplicó nuestra tasa de conversión de prueba a pago.\n\n' +
        'Sin nuevos precios. Sin ningún truco de crecimiento. Solo un cambio en el flujo de incorporación que eliminó una única decisión de la primera pantalla.\n\n' +
        'Aquí tienes exactamente lo que cambiamos y las tres cosas que medimos antes de desplegarlo para todos → https://posttruncate.com/blog/onboarding\n\n' +
        '#saas #productled #growth #startups',
      samples: {
        linkedin:
          'La semana pasada lanzamos una función diminuta que, sin hacer ruido, duplicó nuestra tasa de conversión de prueba a pago.\n\n' +
          'Sin nuevos precios. Sin ningún truco de crecimiento. Solo un cambio en el flujo de incorporación que eliminó una única decisión de la primera pantalla.\n\n' +
          'Aquí tienes exactamente lo que cambiamos y las tres cosas que medimos antes de desplegarlo para todos → https://posttruncate.com/blog/onboarding\n\n' +
          '#saas #productled #growth #startups',
        twitter:
          'La semana pasada hicimos un cambio diminuto en la incorporación y nuestra tasa de prueba a pago se duplicó.\n\n' +
          'Sin nuevos precios. Sin trucos de crecimiento. Solo una decisión menos en la primera pantalla.\n\n' +
          'El análisis completo → https://posttruncate.com/blog/onboarding\n\n' +
          '#buildinpublic #saas',
        instagram:
          'Un cambio diminuto. El doble de resultados. 🚀\n\n' +
          'La semana pasada eliminamos una sola decisión de nuestro flujo de incorporación y vimos cómo nuestra tasa de prueba a pago se duplicaba. Sin nuevos precios, sin trucos. ✨\n\n' +
          'El desglose completo de lo que cambiamos (y las 3 cosas que medimos) está en nuestra bio. 👀\n\n' +
          '.\n.\n.\n' +
          '#saas #startup #diseñodeproducto #onboarding #crecimiento #buildinpublic #emprendedor #techstartup',
        facebook:
          'Una historia rápida de la semana pasada 👇\n\n' +
          'Hicimos un pequeño cambio en nuestra incorporación —solo eliminamos una decisión de la primera pantalla— y nuestra tasa de prueba a pago se duplicó. Sin nuevos precios, sin ningún truco de crecimiento elaborado.\n\n' +
          'Escribimos exactamente lo que cambiamos y las tres cosas que medimos antes de lanzarlo. Léelo y dinos qué te parece → https://posttruncate.com/blog/onboarding',
        threads:
          'vale, esto es bastante increíble: la semana pasada eliminamos UNA decisión de la primera pantalla de nuestra incorporación y la tasa de prueba a pago literalmente se duplicó.\n\n' +
          'sin nuevos precios. sin trucos de crecimiento. solo menos fricción.\n\n' +
          '¿alguien más ha visto resultados tan grandes con un cambio tan pequeño?',
        sms:
          '¡Hola! Algo rápido: ese ajuste de incorporación que lanzamos la semana pasada duplicó nuestra tasa de prueba a pago. Escribimos qué cambió y las 3 cosas que medimos: https://posttruncate.com/blog/onboarding',
      },
    },
    workspace: {
      eyebrow: 'Espacio de trabajo',
      title: 'Escribe tu publicación',
      badgeEditor: 'Editor',
      hiddenBadge: { one: '{n} carácter oculto', other: '{n} caracteres ocultos' },
      placeholder: 'Empieza a escribir tu publicación. Pega un borrador, suelta unos cuantos enlaces y hashtags, y observa cómo se actualiza la previsualización de cada plataforma a la derecha…',
      placeholders: {
        linkedin: "Comienza a escribir tu publicación. Pega un borrador, añade algunos enlaces y hashtags, y mira cómo se actualiza la vista previa en vivo en LinkedIn a la derecha...",
        facebook: "Comienza a escribir tu publicación. Pega un borrador, añade algunos enlaces y hashtags, y mira cómo se actualiza la vista previa en vivo en Facebook a la derecha...",
        instagram: "Comienza a escribir tu publicación. Pega un borrador, añade algunos enlaces y hashtags, y mira cómo se actualiza la vista previa en vivo en Instagram a la derecha...",
        twitter: "Comienza a escribir tu publicación. Pega un borrador, añade algunos enlaces y hashtags, y mira cómo se actualiza la vista previa en vivo en X (Twitter) a la derecha...",
        threads: "Comienza a escribir tu publicación. Pega un borrador, añade algunos enlaces y hashtags, y mira cómo se actualiza la vista previa en vivo en Threads a la derecha...",
        sms: "Comienza a escribir tu publicación. Pega un borrador, añade algunos enlaces y hashtags, y mira cómo se actualiza la vista previa en vivo en SMS a la derecha...",
      },
      counters: {
        characters: 'Caracteres',
        words: 'Palabras',
        lines: 'Líneas',
        paragraphs: 'Párrafos',
      },
      timers: {
        reading: 'Lectura',
        speaking: 'Voz',
        lessThan30Sec: '< 30 s',
        minute: { one: 'min', other: 'min' },
        second: { one: 's', other: 's' },
      },
      formatterLabel: 'Herramientas de formato',
      uppercase: 'MAYÚSCULAS',
      lowercase: 'minúsculas',
      titleCase: 'Estilo título',
      sentenceCase: 'Estilo oración',
      emojiStripper: 'Quitar emojis',
      hashtagExtractor: 'Extraer hashtags',
      engineLabel: 'Motor de optimización',
      clean: 'Limpiar espacio sobrante',
      sanitize: 'Sanear el texto',
      clear: 'Vaciar el editor',
      hiddenWarning:
        'Se encontraron caracteres invisibles que rompen los recuentos y los lectores de pantalla: {codes}. Sanea para eliminarlos.',
      statusLine: 'El análisis en tiempo real está activo',
    },
    imageUpload: {
      add: 'Añadir imagen',
      replace: 'Reemplazar imagen',
      remove: 'Quitar imagen',
      hint: 'Solo vista previa: nunca se sube ni se guarda. Se borra al recargar.',
    },
    aiImprove: {
      button: 'Mejorar con IA',
      pickTone: 'Mejorar con IA',
      pickToneSub: 'Elige un tono — la IA reescribe tu publicación.',
      tones: {
        professional: 'Profesional',
        casual: 'Casual',
        marketing: 'Marketing',
        friendly: 'Cercano',
        concise: 'Conciso',
      },
      cancel: 'Cancelar',
      improving: 'Mejorando tu publicación…',
      undo: 'Deshacer',
      reverted: 'Se restauró tu texto original.',
      remaining: {
        one: '{n} de {max} mejora de IA disponible',
        other: '{n} de {max} mejoras de IA disponibles',
      },
      limitReached: 'Has usado todas tus mejoras de IA. Inténtalo de nuevo en {time}.',
      errorGeneric: 'No se pudo mejorar el texto. Inténtalo de nuevo.',
      errorEmpty: 'Escribe algo primero.',
      errorTooLong: 'El texto es demasiado largo para Mejorar con IA (máx. {max} caracteres).',
      errorUnavailable: 'Mejorar con IA no está disponible temporalmente.',
    },
    previewPanel: {
      title: 'Vista previa de plataformas en vivo',
      tabAria: 'Vista previa de {platform}',
      compareAll: 'Comparar todas',
      showHidden: 'Mostrar texto oculto',
    },
    insights: {
      title: 'Análisis avanzado',
      sub: 'Análisis de escritura, legibilidad, palabras clave y más',
      subScoped: 'Legibilidad, Densidad de palabras clave',
    },
    hookStrip: {
      heading: 'Mira cómo rinde tu publicación en todas partes',
      viewAll: 'Ver todos los límites por plataforma',
      limitLabel: 'Límite: {n}',
      perSms: '{n} por SMS',
      survives: 'El gancho sobrevive',
      cut: 'Gancho cortado',
      risk: 'Gancho en riesgo',
      smsNeeded: '{n} SMS necesarios',
      chars: '{n} caracteres',
    },
    common: {
      displayName: 'Tu nombre',
      handle: 'tu',
      timestamp: '11 h',
      charsSuffix: '{n} caracteres',
      actions: {
        like: 'Me gusta',
        comment: 'Comentar',
        share: 'Compartir',
      },
    },
    sms: {
      placeholder: 'Escribe o pega aquí tu mensaje SMS: verás su codificación (GSM-7 o Unicode), el recuento de caracteres en vivo y cuántos segmentos enviará.',
      eyebrow: 'Mensaje de texto',
      title: 'Contador global de caracteres',
      characterCount: 'Recuento de caracteres',
      charactersLeft: 'Caracteres restantes',
      parts: 'Mensajes',
      encoding: 'Codificación',
      encodingGsm: 'GSM 7 bits',
      encodingUnicode: 'Unicode',
      partsValue: '{n} mensajes',
      gsmNote:
        'GSM 7-bit: 160 caracteres para un SMS, luego 153 por SMS concatenado. Los caracteres de la tabla extendida como €, [, ], {, }, \\ y | cuentan como 2.',
      unicodeNote:
        'Unicode UTF-16: 70 caracteres para un SMS, luego 67 por SMS concatenado. Se aplica cuando hay cualquier emoji o escritura no GSM.',
    },
    linkedin: {
      title: 'Previsualización de la zona del gancho',
      viewAriaLabel: 'Vista del pliegue de LinkedIn',
      viewDesktop: 'Escritorio',
      viewMobile: 'Móvil',
      badgeTruncated: 'Texto del feed truncado',
      badgeOverLimit: 'Supera el límite del post',
      badgeSafe: 'Línea de gancho segura',
      beforeFold: '{total} / {limit} antes del pliegue',
      postLimit: '{total} / {limit} límite del post',
      seeMore: '…ver más',
      headline: 'Fundador y CEO',
      connectionDegree: '3.º',
      placeholder: 'Las primeras líneas de tu publicación aparecen aquí…',
      overLimitNote:
        'Los posts de LinkedIn tienen un límite de {limit} caracteres. Acorta {excess} antes de publicar.',
      truncatedNote:
        'Los lectores solo ven los primeros {limit} caracteres en el feed. Pon tu gancho al frente, antes del pliegue.',
      safeNote:
        'Toda tu publicación cabe por encima del pliegue de {view} de LinkedIn: sin truncamiento «…ver más».',
    },
    twitter: {
      title: 'Divisor de hilos',
      badgeIdle: 'Inactivo',
      badgeThread: 'Hilo de {n} tuits',
      badgeSingle: 'Tuit único',
      links: {
        one: '{n} enlace · contado como {weight} cada uno',
        other: '{n} enlaces · contados como {weight} cada uno',
      },
      weightedLength: 'Longitud ponderada',
      placeholder:
        'La previsualización de tu tuit aparece aquí. Pasa de {limit} caracteres y se divide automáticamente en un hilo.',
    },
    threads: {
      title: 'Previsualización de publicación y cadena',
      badgeIdle: 'Inactivo',
      badgeThread: 'Cadena de {n} publicaciones',
      badgeSingle: 'Publicación única',
      links: {
        one: '{n} enlace · contado completo',
        other: '{n} enlaces · contados completos',
      },
      charLength: 'Longitud en caracteres',
      placeholder:
        'La previsualización de Threads aparece aquí. Pasa de {limit} caracteres y se encadena en una secuencia numerada de publicaciones.',
    },
    meta: {
      title: 'Monitor de formato',
      badgeNeedsFix: 'Necesita un arreglo',
      badgeClean: 'Se ve limpio',
      badgeCaptionOver: 'Pie de foto demasiado largo',
      captionLimit: '{total} / {limit} límite del pie de foto',
      captionOver:
        'Los pies de foto de Instagram tienen un límite de {limit} caracteres. Acorta {excess} antes de publicar.',
      hashtagLabel: 'Concentración de hashtags',
      over: 'Por encima del límite estricto de {limit} hashtags de Instagram: la descripción no se podrá publicar. Elimina {excess}.',
      approaching:
        'Acercándote al tope de 5 etiquetas. Recorta hasta tus etiquetas de mayor intención.',
      within: 'Cómodamente dentro del límite de 5 hashtags de Instagram.',
      none: 'Aún no se han detectado hashtags.',
      a11yLabel: 'Accesibilidad · fuentes elegantes',
      audiencePublic: 'Público',
      flagged: '{n} marcados',
      flaggedNone: 'Ninguno',
      fancyDetected: {
        one: 'Se detectó {n} carácter de «fuente» pseudo-Unicode (𝖁𝖔𝖑𝖉 / 𝓼𝓬𝓻𝓲𝓹𝓽). Parecen estilizados, pero los lectores de pantalla los omiten o los deletrean: perjudican el alcance y la accesibilidad.',
        other:
          'Se detectaron {n} caracteres de «fuente» pseudo-Unicode (𝖁𝖔𝖑𝖉 / 𝓼𝓬𝓻𝓲𝓹𝓽). Parecen estilizados, pero los lectores de pantalla los omiten o los deletrean: perjudican el alcance y la accesibilidad.',
      },
      fancyClean:
        'No se detectaron caracteres de pseudo-fuente. Tu texto se lee con claridad en la tecnología de asistencia.',
      footnote:
        '{n} caracteres · Pliegue de Facebook ≈ 480 · Límite de descripción de Instagram 2.200',
    },
    keywords: {
      eyebrow: 'Palabras clave',
      title: 'Monitor de uso excesivo',
      badgeIdle: 'Inactivo',
      badgeStuffing: 'Saturación de palabras clave',
      badgeBalanced: 'Equilibrado',
      colKeyword: 'Palabra clave',
      colUses: 'Usos',
      colDensity: 'Densidad',
      overused: 'Sobreutilizada',
      empty: 'Empieza a escribir para ver tus palabras clave más usadas y su densidad.',
      stuffingNote:
        'Las palabras clave resaltadas superan el {threshold}% de densidad — los motores de búsqueda pueden interpretarlo como saturación de palabras clave. Varía tu redacción.',
      footnote:
        '{total} palabras · se marcan las palabras clave que superan el {threshold}% de densidad',
    },
    seoPreview: {
      eyebrow: 'Vista previa SEO',
      title: 'Simulador de SERP de Google',
      badgeIdle: 'Inactivo',
      badgeSafe: 'Bien',
      badgeWarn: 'Límite superado',
      titleLabel: 'Título de página',
      titleCounter: '{n} / {limit}',
      pixelNote: '~{px}px · Google recorta a ~{max}px',
      titleOverChar:
        'El título supera los {limit} caracteres — Google podría truncarlo en los resultados.',
      titleOverPixel:
        'El título podría recortarse en los resultados (~{max}px de límite de representación).',
      descLabel: 'Meta descripción',
      descCounter: '{n} / {limit}',
      descOverChar: 'La descripción supera los {limit} caracteres.',
      previewLabel: 'Vista previa en Google Search',
      titlePlaceholder: 'El título de tu página…',
      descPlaceholder: 'Una breve descripción de tu página para los resultados de búsqueda…',
    },
    readability: {
      eyebrow: 'Legibilidad',
      title: 'Facilidad de lectura Flesch',
      scoreLabel: 'Facilidad de lectura',
      gradeLabel: 'Nivel de grado',
      descriptors: {
        veryEasy: 'Muy fácil',
        easy: 'Fácil',
        fairlyEasy: 'Bastante fácil',
        standard: 'Estándar',
        fairlyDifficult: 'Bastante difícil',
        difficult: 'Difícil',
        veryDifficult: 'Muy difícil',
      },
      tooltip:
        'La facilidad de lectura Flesch puntúa el texto en una escala de 0 a 100. A mayor puntuación, más fácil de leer. Entre 60 y 70 es prosa estándar.',
      notApplicable:
        'La fórmula Flesch está diseñada para texto en escritura latina y no se aplica a este idioma. Usa el recuento de palabras como medida principal de legibilidad.',
    },
    toolLinks: {
      linkedin: 'Más sobre los límites de caracteres en LinkedIn →',
      twitter: 'Más sobre los límites de caracteres en X / Twitter →',
      instagram: 'Más sobre los límites de caracteres en Instagram →',
      facebook: 'Más sobre los límites de caracteres en Facebook →',
      threads: 'Más sobre los límites de caracteres en Threads →',
    },
    embed: {
      placeholder: 'Empieza a escribir para contar caracteres…',
      charCount: 'Caracteres',
      wordCount: 'Palabras',
      remaining: '{n} restantes',
      overLimit: '{n} de más',
      platforms: {
        twitter: 'X / Twitter',
        linkedin: 'LinkedIn',
        threads: 'Threads',
        instagram: 'Instagram',
        sms: 'SMS',
      },
    },
    hook: {
      eyebrow: 'Visibilidad del gancho',
      title: 'Comprobación sobre el corte',
      statusPass: 'El gancho sobrevive',
      statusWarn: 'CTA bajo el corte',
      statusFail: 'Gancho truncado',
      statusIdle: 'Sin texto aún',
      reasonEmpty: 'Añade texto para ver qué sobrevive al corte.',
      reasonFits: 'Toda tu publicación cabe por encima del corte: no se oculta nada.',
      reasonHookCut: 'Tu gancho inicial queda cortado por el pliegue “…más”.',
      reasonCtaBelow: 'Tu CTA queda por debajo del pliegue “…más”.',
      reasonHookOnly: 'Tu gancho supera el corte; no se detectó ningún CTA.',
      reasonHookAndCta: 'Tu gancho y tu CTA superan el corte.',
      xReasonFits: 'Toda tu publicación cabe en un solo tweet.',
      xReasonHookCut: 'Tu gancho inicial se extiende a un segundo tweet.',
      xReasonCtaBelow: 'Tu CTA aparece en un tweet de hilo.',
      xReasonHookOnly: 'Tu gancho cabe en el primer tweet; no se detectó CTA.',
      xReasonHookAndCta: 'Tu gancho y tu CTA caben en el primer tweet.',
      foldLabel: 'corte',
      foldAria: 'Línea de corte: el texto inferior queda oculto tras “…más”.',
      summary: '{pass} de {total} plataformas mantienen visible tu gancho',
    },
    calculators: {
      wordsPerPage: {
        eyebrow: 'Palabras a páginas',
        title: 'Calculadora de páginas',
        badgeIdle: 'Escribe texto',
        badgeResult: 'Estimado',
        modeAria: 'Elige cómo introducir tu texto',
        modeText: 'Pegar texto',
        modeCount: 'N.º de palabras',
        placeholder: 'Pega o escribe tu texto aquí para contar las palabras…',
        wordsLabel: 'Número de palabras',
        wordsPlaceholder: 'p. ej. 1500',
        fontSizeLabel: 'Tamaño de fuente',
        spacingLabel: 'Interlineado',
        spacingSingle: 'Sencillo',
        spacingOneAndHalf: '1,5 líneas',
        spacingDouble: 'Doble',
        pagesLabel: 'Páginas',
        wordsStatLabel: 'Palabras',
        perPageNote: '{n} palabras por página con esta configuración',
        referenceHeading: 'Recuentos de palabras habituales',
        refWordsCol: 'Palabras',
        refPagesCol: 'Páginas',
        fontLabel: 'Fuente',
        pageFormatLabel: 'Tamaño de página',
        marginsLabel: 'Márgenes',
        marginTop: 'Superior',
        marginRight: 'Derecho',
        marginBottom: 'Inferior',
        marginLeft: 'Izquierdo',
        unitsLabel: 'Unidades',
        unitInch: 'pulgadas',
        unitCm: 'cm',
        printButton: 'Imprimir',
      },
      readingTime: {
        eyebrow: 'Tiempo de lectura y de habla',
        title: 'Calculadora de tiempo de lectura',
        badgeIdle: 'Escribe texto',
        badgeResult: 'Estimado',
        modeAria: 'Elige cómo introducir tu texto',
        modeText: 'Pegar texto',
        modeCount: 'N.º de palabras',
        placeholder: 'Pega o escribe tu texto aquí para estimar el tiempo de lectura y de habla…',
        wordsLabel: 'Número de palabras',
        wordsPlaceholder: 'p. ej. 1500',
        readingSpeedLabel: 'Velocidad de lectura',
        speakingSpeedLabel: 'Velocidad de habla',
        speedSlow: 'Lenta',
        speedAverage: 'Media',
        speedFast: 'Rápida',
        wpmShort: 'ppm',
        wordsStatLabel: 'Palabras',
        referenceHeading: 'Longitudes habituales',
        refWordsCol: 'Palabras',
        refReadingCol: 'Lectura',
        refSpeakingCol: 'Habla',
      },
      byteCounter: {
        eyebrow: 'Contador de bytes',
        title: 'Calculadora de bytes UTF-8',
        badgeIdle: 'Escribe texto',
        badgeResult: 'Contado',
        placeholder: 'Pega o escribe texto para contar su tamaño en bytes…',
        utf8Label: 'Bytes UTF-8',
        utf16Label: 'Bytes UTF-16',
        utf32Label: 'Bytes UTF-32',
        charactersLabel: 'Caracteres',
        codePointsLabel: 'Puntos de código',
        note: 'UTF-8 usa de 1 a 4 bytes por carácter: ASCII 1 byte, latín acentuado 2, la mayoría del CJK 3 y los emojis 4.',
      },
      emojiDetector: {
        eyebrow: 'Emojis y caracteres ocultos',
        title: 'Contador de emojis y detector de caracteres invisibles',
        badgeIdle: 'Escribe texto',
        badgeClean: 'Limpio',
        badgeWarn: 'Ocultos detectados',
        placeholder: 'Pega o escribe texto para contar emojis y detectar caracteres invisibles…',
        emojiLabel: 'Emojis',
        charactersLabel: 'Caracteres',
        hiddenLabel: 'Caracteres ocultos',
        cleanNote: 'No se detectaron caracteres invisibles ni de ancho cero.',
        removeButton: 'Eliminar caracteres ocultos',
        removedNote: 'Se eliminaron {n} caracteres ocultos.',
        note: 'Los caracteres invisibles, como los espacios de ancho cero, pueden romper el copiar y pegar, la búsqueda y los lectores de pantalla. Usa Eliminar para quitarlos.',
      },
      platformCounter: {
        title: 'Contador de caracteres',
        badgeIdle: 'Escribe texto',
        badgeSafe: 'Dentro del límite',
        badgeOver: 'Supera el límite',
        placeholder: 'Escribe o pega tu texto…',
        counter: '{n} / {limit}',
        remaining: '{n} disponibles',
        over: '{n} de más',
        fields: {
          title: 'Título',
          description: 'Descripción',
          caption: 'Pie de foto',
          bio: 'Biografía',
          post: 'Publicación',
          message: 'Mensaje',
          status: 'Estado',
          about: 'Información',
        },
      },
      sentenceCounter: {
        eyebrow: 'Frases y párrafos',
        title: 'Contador de frases y párrafos',
        badgeIdle: 'Escribe texto',
        badgeResult: 'Contado',
        placeholder: 'Pega o escribe texto para contar frases y párrafos…',
        sentencesLabel: 'Frases',
        note: 'El recuento de frases es una estimación: las abreviaturas y los decimales pueden alterar ligeramente el total.',
      },
      clear: 'Borrar',
    },
  },
};
