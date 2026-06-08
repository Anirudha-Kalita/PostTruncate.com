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
    links: { editor: 'Editor', guides: 'Guías de plataformas', faq: 'Preguntas frecuentes', about: 'Acerca de', contact: 'Contacto' },
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
    items: [
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
          'SMS',
          'Threads',
          'Vista previa SERP de Google',
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

  serpPage: {
    crossPromo: {
      heading: 'También comprueba tus límites en redes sociales',
      editorLink: 'O abre el editor completo de PostTruncate →',
      platforms: {
        twitter:   { name: 'X / Twitter',  desc: '280 caracteres por tweet · los enlaces cuentan como 23' },
        instagram: { name: 'Instagram',    desc: '2.200 caracteres de leyenda · límite de 30 hashtags' },
        linkedin:  { name: 'LinkedIn',     desc: '3.000 caracteres · pliegue de escritorio a 210' },
        facebook:  { name: 'Facebook',     desc: '63.206 caracteres · pliegue de feed a 480' },
        threads:   { name: 'Threads',      desc: '500 caracteres por publicación en Threads' },
        sms:       { name: 'SMS',          desc: '160 GSM · 70 Unicode caracteres por SMS' },
      },
    },
  },

  banner: {
    text: 'La vista previa de {platform} está abajo',
    close: 'Cerrar',
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
      placeholder:
        'Empieza a escribir tu publicación. Pega un borrador, suelta unos cuantos enlaces y hashtags, y observa cómo se actualiza la previsualización de cada plataforma a la derecha…',
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
  },
};
