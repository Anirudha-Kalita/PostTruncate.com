import type { Translations } from './types';

// ──────────────────────────────────────────────────────────────────────────
// Español — traducción generada automáticamente. REQUIERE REVISIÓN HUMANA
// antes del lanzamiento. Refleja la estructura exacta de en.ts (impuesta por
// el tipo Translations); solo se han traducido los valores de cadena.
// ──────────────────────────────────────────────────────────────────────────

export const es: Translations = {
  seo: {
    title:
      'PostTruncate — Mira exactamente dónde las redes sociales cortan tu texto',
    description:
      'Herramienta gratuita de previsualización para redes sociales. Mira el pliegue «…ver más» de LinkedIn, divide automáticamente los textos largos en hilos limpios de X/Twitter y detecta el exceso de hashtags o las fuentes que rompen los lectores de pantalla antes de publicar.',
    skipLink: 'Saltar al editor',
  },

  nav: {
    brandAria: 'Inicio de PostTruncate',
    homeAria: 'Inicio de PostTruncate',
    links: { editor: 'Editor', guides: 'Guías de plataformas', faq: 'Preguntas frecuentes' },
    cta: 'Abrir el editor',
    themeToDark: 'Cambiar al tema oscuro',
    themeToLight: 'Cambiar al tema claro',
    language: 'Idioma',
    languageAria: 'Seleccionar idioma',
    menuAria: 'Mostrar u ocultar el menú de navegación',
  },

  hero: {
    eyebrow: 'Simulador de previsualización y truncamiento social',
    title: 'Mira exactamente dónde cada plataforma corta tu texto.',
    lede: 'Escribe una vez y observa cómo se renderiza tu publicación en previsualizaciones nativas de LinkedIn, X, Instagram y Facebook: líneas del pliegue, divisiones de hilos, límites de hashtags y avisos de accesibilidad, todo en vivo mientras escribes.',
    primary: 'Empezar a escribir',
    secondary: 'Ver los límites de cada plataforma',
  },

  workspace: {
    title: 'Tu espacio de trabajo en vivo',
    sub: 'Todo lo de abajo se actualiza al instante y permanece en tu dispositivo.',
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
        body: 'Las descripciones de Instagram llegan hasta 2.200 caracteres, pero solo muestran unos 125 antes de un enlace «más». La regla más estricta son los hashtags: más de 30 en una sola descripción o comentario y la publicación falla en silencio al publicarse. Amontonar decenas de etiquetas de baja intención también se lee como spam. Mantén tus etiquetas ajustadas y relevantes, y vigila el medidor en vivo para no chocar nunca con el muro de las 30 etiquetas.',
        facts: [
          ['Límite de la descripción', '2.200 caracteres'],
          ['Límite estricto de hashtags', '30 etiquetas'],
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
    items: [
      {
        q: '¿Qué tan precisos son los límites de caracteres?',
        a: 'PostTruncate usa los límites publicados y ampliamente observados de cada plataforma: 280 para X, 210/140 para el pliegue de LinkedIn, 30 hashtags para Instagram y un peso fijo de 23 caracteres para los enlaces. Las plataformas los ajustan de vez en cuando, y la renderización varía ligeramente según el dispositivo, así que toma las previsualizaciones como una estimación aproximada en lugar de una garantía perfecta al píxel.',
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
        q: '¿Mi texto se envía a algún sitio?',
        a: 'No. Todo el editor y cada previsualización se ejecutan localmente en tu navegador. Tu borrador nunca sale de tu dispositivo: no hay cuenta, ni subida, ni procesamiento de tu contenido en ningún servidor.',
      },
      {
        q: '¿PostTruncate es gratis?',
        a: 'Sí, es completamente gratis y no requiere registro. La herramienta se financia con anuncios discretos colocados en espacios reservados que nunca desplazan el diseño mientras trabajas.',
      },
    ],
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
        links: ['Privacidad', 'Términos', 'Contacto'],
      },
    },
    copyright: '© {year} PostTruncate. Hecho para creadores de todo el mundo.',
    disclaimer:
      'No afiliado con LinkedIn, X, Meta ni Instagram. Los límites son estimaciones y pueden cambiar.',
  },

  island: {
    dashboard: {
      loadSample: 'Cargar una publicación de ejemplo →',
      sample:
        'La semana pasada lanzamos una función diminuta que, sin hacer ruido, duplicó nuestra tasa de conversión de prueba a pago.\n\n' +
        'Sin nuevos precios. Sin ningún truco de crecimiento. Solo un cambio en el flujo de incorporación que eliminó una única decisión de la primera pantalla.\n\n' +
        'Aquí tienes exactamente lo que cambiamos y las tres cosas que medimos antes de desplegarlo para todos → https://posttruncate.com/blog/onboarding\n\n' +
        '#saas #productled #growth #startups',
    },
    workspace: {
      eyebrow: 'Espacio de trabajo',
      title: 'Escribe tu publicación',
      badgeEditor: 'Editor',
      hiddenBadge: { one: '{n} carácter oculto', other: '{n} caracteres ocultos' },
      placeholder:
        'Empieza a escribir tu publicación. Pega un borrador, suelta unos cuantos enlaces y hashtags, y observa cómo se actualiza la previsualización de cada plataforma a la derecha…',
      counters: {
        characters: 'Caracteres',
        words: 'Palabras',
        lines: 'Líneas',
        paragraphs: 'Párrafos',
      },
      engineLabel: 'Motor de optimización',
      clean: 'Limpiar espacio sobrante',
      sanitize: 'Sanear el texto',
      clear: 'Vaciar el editor',
      hiddenWarning:
        'Se encontraron caracteres invisibles que rompen los recuentos y los lectores de pantalla: {codes}. Sanea para eliminarlos.',
    },
    common: {
      profileName: 'Tu nombre',
      handle: '@tu',
      charsSuffix: '{n} caracteres',
    },
    linkedin: {
      title: 'Previsualización de la zona del gancho',
      viewAriaLabel: 'Vista del pliegue de LinkedIn',
      viewDesktop: 'Escritorio',
      viewMobile: 'Móvil',
      badgeTruncated: 'Texto del feed truncado',
      badgeSafe: 'Línea de gancho segura',
      beforeFold: '{total} / {limit} antes del pliegue',
      seeMore: '…ver más',
      profileMeta: 'Fundador · 1.º · Justo ahora',
      placeholder: 'Las primeras líneas de tu publicación aparecen aquí…',
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
      hashtagLabel: 'Concentración de hashtags',
      over: 'Por encima del límite estricto de {limit} hashtags de Instagram: la descripción no se podrá publicar. Elimina {excess}.',
      approaching:
        'Acercándote al tope de 30 etiquetas. Recorta hasta tus etiquetas de mayor intención.',
      within: 'Cómodamente dentro del límite de 30 hashtags de Instagram.',
      none: 'Aún no se han detectado hashtags.',
      a11yLabel: 'Accesibilidad · fuentes elegantes',
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
  },
};
