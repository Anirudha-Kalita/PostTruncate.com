import type { Translations } from './types';

// ──────────────────────────────────────────────────────────────────────────
// Traduction française — GÉNÉRÉE PAR MACHINE. À FAIRE RELIRE PAR UN HUMAIN
// AVANT TOUT LANCEMENT. Cette traduction reflète la structure exacte de en.ts ;
// vérifiez la fluidité, le ton et la terminologie avant la mise en production.
// ──────────────────────────────────────────────────────────────────────────

export const fr: Translations = {
  seo: {
    title:
      'Compteur de Caractères — Outil Gratuit de Comptage de Caractères et de Mots | PostTruncate',
    description:
      'Outil gratuit d’aperçu pour les réseaux sociaux. Visualisez le pli « …voir plus » de LinkedIn, découpez automatiquement vos longs textes en fils X/Twitter clairs, et repérez la surcharge de hashtags ou les polices qui cassent les lecteurs d’écran avant de publier.',
    skipLink: 'Aller à l’éditeur',
  },

  nav: {
    brandAria: 'Accueil PostTruncate',
    homeAria: 'Accueil PostTruncate',
    links: { editor: 'Éditeur', guides: 'Guides des plateformes', faq: 'FAQ', about: 'À propos', contact: 'Contact' },
    cta: 'Ouvrir l’éditeur',
    themeToDark: 'Passer au thème sombre',
    themeToLight: 'Passer au thème clair',
    language: 'Langue',
    languageAria: 'Sélectionner la langue',
    menuAria: 'Afficher ou masquer le menu de navigation',
  },

  hero: {
    eyebrow: 'Simulateur d’aperçu social et de troncature',
    title: 'Voyez exactement où chaque plateforme coupe votre texte.',
    lede: 'Écrivez une seule fois et regardez votre publication s’afficher dans les aperçus natifs de LinkedIn, X, Instagram et Facebook — lignes de pli, découpes en fils, limites de hashtags et avertissements d’accessibilité, le tout en direct pendant que vous écrivez.',
    primary: 'Commencer à écrire',
    secondary: 'Voir les limites des plateformes',
  },

  workspace: {
    title: 'Votre espace de travail en direct',
    sub: 'Tout ce qui suit se met à jour instantanément et reste sur votre appareil.',
  },

  seoCopy: {
    ariaLabel: 'À propos de PostTruncate',
    sections: [
      {
        heading: 'Compteur de caractères en ligne ultime & vérificateur de longueur de texte',
        paragraphs: [
          '<strong>PostTruncate</strong> est un compteur de caractères gratuit qui fonctionne entièrement dans votre navigateur — sans téléchargement, sans compte. Collez ou saisissez n’importe quel texte, et vous voyez instantanément le nombre de caractères, de mots, le temps de lecture et la répartition des lettres, mis à jour au fil de la frappe.',
          'Il s’adresse à toute personne travaillant avec des limites de texte : rédacteurs qui raccourcissent un titre, développeurs qui vérifient une chaîne, ou étudiants qui contrôlent la longueur d’un devoir. Comme tout se traite localement, vos brouillons ne quittent jamais votre appareil.',
        ],
      },
      {
        heading: 'Compteur de caractères SMS avancé et calculateur de segments',
        paragraphs: [
          'Les SMS fonctionnent avec deux modes d’encodage, et la plupart des outils ignorent cette différence. PostTruncate détecte automatiquement si votre message utilise le <strong>GSM-7</strong> standard (160 caractères par message) ou l’<strong>Unicode</strong> (70 caractères) — et la bascule peut intervenir dès qu’un seul emoji ou caractère spécial est tapé.',
          'Il signale également les caractères de la table GSM étendue — comme le signe euro (€), les crochets ou la barre verticale — qui restent en mode GSM-7 mais occupent chacun deux emplacements au lieu d’un. Ce coût caché est souvent à l’origine d’une segmentation inattendue.',
          'Quand votre texte dépasse un segment, le <strong>calculateur de segments</strong> intégré indique exactement combien de messages seront envoyés, en tenant compte de l’overhead UDH qui ramène le contenu utile à 153 caractères (GSM) ou 67 (Unicode) par segment.',
        ],
      },
      {
        heading: 'Compteur de caractères 𝕏 (Twitter) & diviseur automatique de fils',
        paragraphs: [
          'X (Twitter) applique deux règles qui prennent souvent les utilisateurs par surprise : la limite de 280 caractères, et le fait que tout lien — quelle que soit sa longueur réelle — compte exactement pour 23 caractères. PostTruncate intègre ces deux règles, de sorte que le compteur affiché correspond exactement à ce que X affichera après application du raccourcisseur t.co.',
          'Si votre brouillon est trop long, le <strong>diviseur de fil</strong> intégré le découpe en tweets numérotés aux limites naturelles des phrases — jamais en plein milieu d’un mot. Chaque carte indique son nombre de caractères et sa position, pour que vous puissiez relire l’intégralité du fil avant de publier.',
        ],
      },
      {
        heading: 'Compteur de caractères Instagram & Facebook espaces inclus',
        paragraphs: [
          'Instagram autorise jusqu’à 2 200 caractères dans une légende, mais n’affiche que les 125 premiers environ avant de masquer le reste derrière un lien « plus ». PostTruncate indique exactement où tombe cette coupure, afin que la première ligne visible dans le fil soit toujours celle qui compte.',
          'Le tableau de bord surveille également le <strong>nombre de hashtags</strong> en temps réel. Instagram ne publie silencieusement pas les posts dépassant 5 hashtags, donc une alerte s’affiche avant d’atteindre cette limite. Les espaces sont toujours comptabilisés, conformément au comportement de la plateforme.',
        ],
      },
      {
        heading: 'Comptage avancé de mots, symboles et analyses de contenu par plateforme',
        paragraphs: [
          'Au-delà des limites de plateformes, PostTruncate compte aussi les mots, phrases, paragraphes et symboles — en temps réel pendant la frappe. Utile pour les méta-descriptions SEO, les révisions de documentation ou tout flux de rédaction nécessitant plus qu’un simple décompte de caractères.',
          'Le tableau de bord traite correctement les textes multilingues, y compris les systèmes d’écriture CJK où le nombre de caractères a un poids sémantique différent. Que vous écriviez en français, en anglais, en japonais ou en chinois, les compteurs reflètent ce que la plateforme cible verra réellement.',
        ],
      },
    ]
  },

  guides: {
    eyebrow: 'Guides des plateformes',
    title: 'Connaissez chaque limite avant de publier.',
    lede: 'Une référence rapide des points de troncature, des limites strictes et des pièges de mise en forme qui plafonnent discrètement votre portée sur chaque réseau.',
    items: {
      linkedin: {
        name: 'LinkedIn',
        tag: 'Le pli « …voir plus »',
        body: 'LinkedIn replie les publications après environ 210 caractères sur ordinateur et 140 sur mobile, en masquant tout le reste derrière un lien « …voir plus ». Ce qui se trouve au-dessus de ce pli constitue tout votre argumentaire dans le fil — si votre accroche ne fait pas mouche là, la plupart des gens ne déplieront jamais le reste. Placez la tension, le résultat ou la question en tête, et reléguez les hashtags et les liens sous le pli.',
        facts: [
          ['Pli sur ordinateur', '~210 caractères'],
          ['Pli sur mobile', '~140 caractères'],
          ['Limite stricte du post', '3 000 caractères'],
        ],
      },
      twitter: {
        name: 'X / Twitter',
        tag: 'Fils et pondération des liens',
        body: 'X compte chaque publication sur une limite de 280 caractères, mais tout lien est encapsulé par t.co et facturé forfaitairement 23 caractères, quelle que soit la longueur réelle de l’URL. Dépassez 280 et il vous faut un fil. Les bons fils se coupent en fin de phrase, jamais au milieu d’un mot, et numérotent chaque tweet pour que les lecteurs suivent l’ordre. PostTruncate découpe automatiquement votre brouillon et marque chaque carte avec sa position.',
        facts: [
          ['Limite par tweet', '280 caractères'],
          ['Chaque lien compte pour', '23 caractères'],
          ['Tweets dans un fil', 'Illimités'],
        ],
      },
      threads: {
        name: 'Threads',
        tag: 'Enchaînement des publications',
        body: 'Threads, l’application de texte de Meta, accorde 500 caractères à chaque publication — presque le double de X — et compte les liens en entier plutôt que de les raccourcir. Dépassez 500 et le reste doit s’enchaîner sous forme de réponses numérotées. La première publication porte toujours le fil, alors placez l’accroche en tête comme partout ailleurs. PostTruncate mesure le nombre total de caractères et enchaîne les longs textes en une séquence numérotée et claire.',
        facts: [
          ['Limite par publication', '500 caractères'],
          ['Liens comptés', 'En entier'],
          ['Débordement', 'Enchaîné en réponses'],
        ],
      },
      instagram: {
        name: 'Instagram',
        tag: 'Plafond de hashtags',
        body: 'Les légendes Instagram peuvent atteindre 2 200 caractères mais n’en affichent qu’environ 125 avant un lien « plus ». La règle la plus stricte concerne les hashtags : au-delà de 5 dans une même légende ou un même commentaire, la publication échoue silencieusement. Empiler des dizaines de tags à faible intention passe aussi pour du spam. Gardez vos tags concis et pertinents, et surveillez le compteur en direct pour ne jamais heurter le mur des 5 tags.',
        facts: [
          ['Limite de légende', '2 200 caractères'],
          ['Limite stricte de hashtags', '5 tags'],
          ['Aperçu de légende', '~125 caractères'],
        ],
      },
      facebook: {
        name: 'Facebook',
        tag: 'Troncature du fil',
        body: 'Facebook tronque les publications du fil à environ 480 caractères avec un lien « Voir plus », et l’engagement chute fortement sur les longs blocs ininterrompus. Les publications plus courtes avec une première ligne claire surpassent régulièrement les autres. La même règle d’accessibilité s’applique partout : les « polices fantaisie » en pseudo-Unicode paraissent en gras ou en cursive mais sont lues caractère par caractère — ou complètement ignorées — par les lecteurs d’écran, ce qui réduit discrètement votre portée.',
        facts: [
          ['Pli du fil', '~480 caractères'],
          ['Longueur la plus performante', 'Moins de 80 caractères'],
          ['Polices fantaisie', 'Cassent les lecteurs d’écran'],
        ],
      },
    },
  },

  hookband: {
    eyebrow: 'Rédiger l’accroche',
    title: 'La première ligne est la seule que la plupart des gens lisent.',
    body: 'Dans chaque fil, le texte au-dessus du pli fait tout le travail. Ouvrez sur un résultat, une tension ou une question — pas sur une mise en bouche. Reléguez les liens et les hashtags sous le pli, gardez votre ouverture en deçà du seuil de coupure de la plateforme, et laissez l’aperçu confirmer que l’accroche survit avant de publier.',
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Vos questions, nos réponses.',
    items: [
      {
        q: 'Quelle est la précision des limites de caractères ?',
        a: 'PostTruncate utilise les limites publiées et largement observées de chaque plateforme — 280 pour X, 210/140 pour le pli LinkedIn, 5 hashtags pour Instagram, et un poids forfaitaire de 23 caractères pour les liens. Les plateformes les ajustent parfois, et le rendu varie légèrement selon l’appareil, alors considérez les aperçus comme une estimation proche plutôt qu’une garantie au pixel près.',
      },
      {
        q: 'Les espaces et la ponctuation comptent-ils comme des caractères ?',
        a: 'Oui. Chaque espace, retour à la ligne et signe de ponctuation compte pour un caractère, et le compteur de PostTruncate comme les limites des plateformes les incluent. La seule exception courante concerne les liens sur X/Twitter, qui se réduisent à 23 caractères forfaitaires, quel que soit le nombre de lettres, de symboles ou de barres obliques que contient l’URL réelle.',
      },
      {
        q: 'Comment les emojis affectent-ils le nombre de caractères ?',
        a: 'PostTruncate compte par points de code Unicode, donc un emoji simple comme 🙂 compte pour un seul caractère. De nombreux emojis sont toutefois composés de plusieurs points de code joints — variantes de teinte de peau, drapeaux et glyphes combinés comme 👨‍👩‍👧 — et ceux-là comptent pour deux ou plus. La plupart des plateformes, X tout particulièrement, pondèrent aussi les emojis plus lourdement que les lettres ordinaires, si bien qu’un brouillon riche en emojis consomme un peu plus de votre limite que le nombre de glyphes visibles ne le laisse penser.',
      },
      {
        q: 'Quelle est la différence entre le nombre de caractères et le nombre de mots ?',
        a: 'Le nombre de caractères est le total de chaque caractère individuel — lettres, espaces, ponctuation et emojis inclus — et c’est ce sur quoi les limites des plateformes sont réellement mesurées. Le nombre de mots est le nombre de mots séparés par des espaces, quelle que soit leur longueur. Un tweet bien rempli de 280 caractères peut ne compter que 40 mots, alors surveillez le nombre de caractères pour rester sous une limite et servez-vous du nombre de mots comme indicateur de lisibilité.',
      },
      {
        q: 'Pourquoi mon lien compte-t-il pour 23 caractères sur X ?',
        a: 'X encapsule automatiquement chaque URL avec son raccourcisseur t.co, qui occupe toujours 23 caractères, quelle que soit la longueur du lien d’origine. Ainsi, un lien de 5 caractères et un lien de 200 caractères vous coûtent tous deux exactement 23 sur la limite de 280. PostTruncate reproduit ce comportement dans le compteur pondéré.',
      },
      {
        q: 'Que sont les « polices fantaisie » et pourquoi sont-elles signalées ?',
        a: 'Ces lettres en gras, en italique ou en style script que vous collez depuis des générateurs de polices ne sont pas une vraie mise en forme — ce sont des caractères pseudo-Unicode issus du bloc des symboles alphanumériques mathématiques. Ils paraissent stylisés, mais les lecteurs d’écran les épellent lettre par lettre ou les ignorent, ce qui nuit à la fois à l’accessibilité et à votre portée organique. Le moniteur les signale pour que vous puissiez revenir au texte brut.',
      },
      {
        q: 'Que supprime « Nettoyer le texte » ?',
        a: 'Cela retire les caractères invisibles et de largeur nulle — espaces de largeur nulle, marques d’ordre des octets, marques de contrôle bidirectionnel, traits d’union conditionnels et codes de contrôle parasites. Ils se glissent souvent lors d’un copier-coller depuis d’autres applications, et ils faussent silencieusement le nombre de caractères et l’accessibilité sur les anciens clients mobiles sans jamais être visibles.',
      },
      {
        q: 'Qu’est-ce que la densité de mots-clés, et comment le moniteur de surutilisation protège-t-il mon contenu ?',
        a: 'La densité de mots-clés correspond au pourcentage d’apparition d’un mot par rapport au nombre total de mots. Répéter trop souvent le même terme peut ressembler à du bourrage de mots-clés pour les moteurs de recherche et les lecteurs. Le moniteur suit la fréquence en temps réel et signale tout terme qui dépasse le seuil sûr de 3,0%, afin que vous puissiez reformuler avant de publier.',
      },
      {
        q: 'Comment les minuteurs de lecture et de prise de parole calculent-ils la durée de mon post ?',
        a: 'Le minuteur de lecture divise votre nombre total de mots par une vitesse moyenne de 275 mots par minute. Le minuteur de prise de parole utilise un rythme conversationnel de 150 mots par minute. Vous pouvez ainsi estimer articles, scripts, newsletters ou vidéos courtes directement dans l’éditeur.',
      },
      {
        q: 'Que fait le Social Sanitizer, et pourquoi supprimer les emojis ou extraire les hashtags ?',
        a: 'Les actions de nettoyage remettent vos brouillons au propre en un clic. Le suppresseur d’emojis retire les icônes et symboles spéciaux lorsque vous avez besoin d’un texte brut, tandis que l’extracteur de hashtags sort les tags du corps du texte et les regroupe en bas pour rendre la légende plus lisible.',
      },
      {
        q: 'Mon texte est-il envoyé quelque part ?',
        a: 'Non. L’ensemble de l’éditeur et chaque aperçu fonctionnent localement dans votre navigateur. Votre brouillon ne quitte jamais votre appareil — pas de compte, pas de téléversement et aucun traitement de votre contenu sur un serveur.',
      },
      {
        q: 'L’enregistrement automatique de session signifie-t-il que mes données sont stockées sur un serveur ?',
        a: 'Non. Vos brouillons ne sont jamais téléversés ni stockés sur une infrastructure externe. L’enregistrement automatique de session utilise sessionStorage dans votre propre navigateur, uniquement dans cet onglet. Si vous actualisez la page dans le même onglet, le texte est restauré; lorsque la session de l’onglet se termine, le navigateur efface ce cache temporaire.',
      },
      {
        q: 'PostTruncate est-il gratuit ?',
        a: 'Oui, son utilisation est entièrement gratuite et sans inscription. L’outil est financé par des publicités discrètes placées dans des espaces réservés qui ne décalent jamais la mise en page pendant que vous travaillez.',
      },
      {
        q: 'Pourquoi mon SMS de 160 caractères a-t-il soudainement compté comme deux messages ?',
        a: 'Cela se produit en raison d\'un changement dans le style d\'encodage de votre texte. Les SMS standards utilisent l\'encodage GSM 7 bits, ce qui permet exactement 160 caractères par paquet SMS. Cependant, dès que vous insérez un seul caractère non-GSM (comme un emoji, un symbole spécial ou un caractère d\'écriture régionale comme l\'assamais ou le hindi), l\'intégralité du message bascule instantanément vers l\'encodage Unicode. Lorsqu\'un message passe en Unicode, la capacité maximale par paquet SMS individuel chute considérablement, passant de 160 caractères à seulement 70 caractères. De plus, si votre texte dépasse ce seuil de 70 caractères, le système doit utiliser des données de concaténation multipartites (User Data Headers), ce qui réduit la taille de votre paquet à 67 caractères par segment SMS concaténé. Pour éviter les surprises inattendues sur votre facture de télécommunications, utilisez toujours un compteur de caractères SMS en ligne pour surveiller votre badge d\'encodage actif avant de lancer une campagne de masse !',
      },
      {
        q: 'Les caractères spéciaux et les emojis comptent-ils pour un seul caractère dans un SMS ?',
        a: 'Non. Alors qu\'une lettre ou un chiffre standard compte comme un seul caractère, les symboles spéciaux et les emojis sont traités très différemment par les réseaux de télécommunications mondiaux. Les symboles spéciaux appartenant à la table d\'extension de base GSM standard (comme le symbole Euro (€), les crochets [ ], les accolades { } et la barre verticale |) comptent en réalité pour 2 caractères chacun, même s\'ils maintiennent votre message dans le mode efficace GSM 7 bits. D\'autre part, les emojis sont des paquets de données très complexes qui ne peuvent pas tenir dans un texte standard de 7 bits. L\'ajout d\'un emoji force votre message en Unicode 16 bits, compressant votre allocation totale de message par segment de 160 caractères à 70 caractères.',
      },
    ],
  },

  footer: {
    homeAria: 'Accueil PostTruncate',
    tag: 'Voyez exactement où chaque plateforme coupe votre texte — avant de publier.',
    columns: {
      tool: {
        title: 'Outil',
        links: [
          'Éditeur de texte',
          'Aperçus en direct',
          'Découpeur de fils',
          'Nettoyeur Unicode',
          'Widget à intégrer',
        ],
      },
      platforms: {
        title: 'Plateformes',
        links: ['LinkedIn', 'X / Twitter', 'Threads', 'Instagram', 'Facebook'],
      },
      learn: {
        title: 'En savoir plus',
        links: [
          'Limites de caractères',
          'FAQ',
          'Rédaction d’accroches',
          'Accessibilité',
        ],
      },
      legal: {
        title: 'Mentions légales',
        links: ['Confidentialité', 'Conditions', 'À propos', 'Contact'],
      },
      guides: {
        title: 'Guides de plateformes',
        links: [
          'X / Twitter',
          'Instagram',
          'LinkedIn',
          'Facebook',
          'SMS',
          'Threads',
          'Aperçu SERP Google',
        ],
      },
    },
    copyright: '© {year} PostTruncate. Conçu pour les créateurs du monde entier.',
    disclaimer:
      'Sans affiliation avec LinkedIn, X, Meta ou Instagram. Les limites sont des estimations et peuvent changer.',
  },

  pages: {
    common: {
      lastUpdated: 'Dernière mise à jour : {date}',
      lastUpdatedDate: '1 juin 2026',
      backHome: '← Retour à l’éditeur',
    },

    privacy: {
      title: 'Politique de confidentialité',
      description:
        'Comment PostTruncate traite vos données : votre texte ne quitte jamais votre navigateur, il n’y a aucun compte, et rien de ce que vous écrivez n’est téléversé ni stocké.',
      intro:
        'PostTruncate est conçu selon le principe de confidentialité avant tout. Tout ce que vous tapez s’exécute localement dans votre navigateur — votre brouillon n’est jamais téléversé, stocké ni vu par nous. Cette politique explique exactement ce que cela signifie et les rares cas limités où des tiers interviennent.',
      sections: [
        {
          heading: 'Votre texte reste sur votre appareil',
          paragraphs: [
            'L’éditeur, chaque aperçu de plateforme, le découpeur de fils et le nettoyeur Unicode s’exécutent entièrement dans <strong>votre navigateur</strong>. Le texte que vous écrivez ou collez est traité sur votre propre appareil et n’est <strong>jamais transmis à nos serveurs</strong> — en réalité, PostTruncate n’a aucun serveur de contenu vers lequel l’envoyer. Lorsque vous fermez l’onglet, votre brouillon disparaît, à moins que votre navigateur ne choisisse de le conserver localement.',
            'Comme rien n’est téléversé, nous ne pouvons pas lire, stocker, vendre ni partager ce que vous écrivez. Il n’y a <strong>aucun compte, aucune inscription et aucune connexion</strong>, nous ne vous demandons donc jamais votre nom, votre adresse e-mail ni aucune donnée personnelle pour utiliser l’outil.',
          ],
        },
        {
          heading: 'Ce que nous stockons localement',
          paragraphs: [
            'Un petit nombre de préférences sont enregistrées dans le <strong>localStorage</strong> de votre navigateur afin que le site se souvienne de vos réglages — précisément le thème que vous avez choisi (clair ou sombre) et votre langue préférée. Ces valeurs ne résident que sur votre appareil, ne sont lisibles que par PostTruncate et ne nous parviennent jamais. Vous pouvez les effacer à tout moment dans les paramètres de votre navigateur.',
          ],
        },
        {
          heading: 'Publicité',
          paragraphs: [
            'PostTruncate est financé par des publicités discrètes affichées dans des espaces fixes et réservés qui ne décalent jamais la mise en page pendant que vous travaillez. Si des partenaires publicitaires tiers sont utilisés, ils peuvent déposer leurs propres cookies ou utiliser des identifiants d’appareil pour afficher des publicités pertinentes, conformément à leurs propres politiques de confidentialité. Ces partenaires ne reçoivent jamais le contenu de votre brouillon, car ce contenu ne quitte jamais votre navigateur.',
          ],
        },
        {
          heading: 'Le formulaire de contact',
          paragraphs: [
            'La seule fonctionnalité qui envoie des données hors de votre appareil est le <strong>formulaire de contact</strong>. Lorsque vous choisissez de nous envoyer un message, le nom, l’adresse e-mail et le message que vous saisissez nous sont transmis via un service tiers de traitement des formulaires afin que nous puissions les lire et y répondre. Nous utilisons ces informations uniquement pour vous répondre et ne les utilisons pas à des fins de marketing. Si vous préférez ne pas passer par un tiers, vous pouvez nous écrire directement par e-mail.',
          ],
        },
        {
          heading: 'Modifications et contact',
          paragraphs: [
            'Nous pouvons mettre à jour cette politique à mesure que le produit évolue ; la date de « dernière mise à jour » ci-dessus reflète toujours la version actuelle. Si vous avez des questions concernant la confidentialité, écrivez-nous à <strong>contact@posttruncate.com</strong>.',
          ],
        },
      ],
    },

    terms: {
      title: 'Conditions générales',
      description:
        'Les conditions d’utilisation de PostTruncate : un outil gratuit, fourni en l’état, dont les limites de plateforme sont des estimations, sans garantie et sans affiliation à aucun réseau social.',
      intro:
        'En utilisant PostTruncate, vous acceptez ces conditions. Elles sont volontairement courtes et simples — l’outil est gratuit, s’exécute dans votre navigateur et est fourni en l’état.',
      sections: [
        {
          heading: 'Utilisation du service',
          paragraphs: [
            'PostTruncate est un outil gratuit pour prévisualiser et optimiser les publications sur les réseaux sociaux. Vous pouvez l’utiliser à toute fin licite. Vous vous engagez à <strong>ne pas détourner le service</strong> — par exemple en tentant de le perturber, de contourner ses protections ou de l’utiliser pour enfreindre la loi ou les droits d’autrui.',
          ],
        },
        {
          heading: 'Des estimations, pas des garanties',
          paragraphs: [
            'Les limites de caractères, les points de pli et les règles de mise en forme présentés ici reposent sur le comportement publié et largement observé de chaque plateforme. Les plateformes <strong>modifient ces limites sans préavis</strong>, et le rendu varie selon l’appareil et la version de l’application. Considérez chaque aperçu et chaque décompte comme une estimation proche, et non comme une garantie au pixel près. Il vous appartient de relire vos propres publications avant de les publier.',
          ],
        },
        {
          heading: 'Aucune affiliation',
          paragraphs: [
            'PostTruncate est un outil indépendant et n’est <strong>ni affilié à, ni approuvé par, ni sponsorisé par</strong> LinkedIn, X (Twitter), Meta, Instagram, Facebook ou Threads. Tous les noms de produits, logos et marques sont la propriété de leurs détenteurs respectifs et ne sont utilisés ici que pour décrire le comportement de chaque plateforme.',
          ],
        },
        {
          heading: 'Fourni « en l’état »',
          paragraphs: [
            'Le service est fourni <strong>« en l’état » et « selon disponibilité », sans garantie d’aucune sorte</strong>, expresse ou implicite. Dans toute la mesure permise par la loi, nous ne sommes pas responsables des pertes ou dommages découlant de votre utilisation — ou de votre impossibilité d’utiliser — l’outil, y compris toute décision que vous prenez sur la base de ses aperçus ou décomptes.',
          ],
        },
        {
          heading: 'Modifications de ces conditions',
          paragraphs: [
            'Nous pouvons réviser ces conditions de temps à autre ; la date de « dernière mise à jour » ci-dessus reflète la version actuelle, et le fait de continuer à utiliser l’outil signifie que vous acceptez les dernières conditions. Des questions ? Écrivez à <strong>contact@posttruncate.com</strong>.',
          ],
        },
      ],
    },

    about: {
      title: 'À propos de PostTruncate',
      description:
        'PostTruncate est un outil gratuit et respectueux de la vie privée qui montre aux créateurs exactement où chaque plateforme sociale coupe leur texte — avant qu’ils ne publient.',
      intro:
        'PostTruncate existe pour une seule raison : la première ligne de votre publication est la seule que la plupart des gens lisent, et chaque plateforme la coupe à un endroit différent. Nous rendons visibles ces limites invisibles.',
      sections: [
        {
          heading: 'Ce qu’il fait',
          paragraphs: [
            'Écrivez ou collez un brouillon une seule fois, et PostTruncate l’affiche tel que <strong>LinkedIn, X, Threads, Instagram et Facebook</strong> le feront réellement — le pli « …voir plus », la découpe en fil à 280 caractères, la pondération des liens à 23 caractères, le plafond de 5 hashtags. Vous voyez exactement ce qui survit au-dessus du pli avant de vous engager à publier.',
            'Il repère aussi les problèmes discrets qui réduisent votre portée : les caractères invisibles de largeur nulle qui faussent les décomptes et les lecteurs d’écran, et les « polices fantaisie » en pseudo-Unicode qui paraissent stylisées mais sont illisibles pour les technologies d’assistance.',
          ],
        },
        {
          heading: 'Pourquoi nous l’avons créé',
          paragraphs: [
            'La plupart des compteurs de caractères vous donnent un seul chiffre. Les créateurs ont besoin de plus que cela — ils doivent savoir <strong>où</strong> le texte est coupé sur chaque réseau, car c’est là que l’accroche vit ou meurt. Nous voulions un seul espace de travail qui simule toutes les plateformes à la fois, s’exécute instantanément et respecte totalement votre vie privée.',
          ],
        },
        {
          heading: 'Conçu selon le principe de confidentialité avant tout',
          paragraphs: [
            'Tout s’exécute dans votre navigateur. Votre texte n’est jamais téléversé, il n’y a aucun compte, et l’outil est gratuit. Il est financé par des publicités discrètes dans des espaces réservés qui ne décalent jamais la mise en page. Lisez tous les détails dans notre <a href="../privacy/"><strong>Politique de confidentialité</strong></a>.',
          ],
        },
      ],
    },

    contact: {
      title: 'Nous contacter',
      description:
        'Entrez en contact avec l’équipe PostTruncate — envoyez-nous un message ou écrivez-nous directement par e-mail pour nous faire part de vos retours, signaler un bug ou poser une question.',
      intro:
        'Vous avez trouvé un bug, repéré une limite de plateforme qui a évolué, ou avez une idée pour améliorer PostTruncate ? Nous serions ravis de vous lire.',
      form: {
        name: 'Votre nom',
        email: 'Votre adresse e-mail',
        subject: 'Objet',
        message: 'Message',
        submit: 'Envoyer le message',
        sending: 'Envoi…',
        success: 'Merci — votre message est en route. Nous vous répondrons bientôt.',
        error:
          'Une erreur s’est produite lors de l’envoi de votre message. Veuillez réessayer ou nous écrire directement par e-mail.',
      },
      altHeading: 'Vous préférez l’e-mail ?',
      altBody:
        "",
    },
  },

  embedWidget: {
    title: "Widget de compteur de caractères gratuit à intégrer — PostTruncate",
    description:
      "Ajoutez un compteur de caractères en direct à n’importe quel blog ou site web avec une seule ligne HTML. Suit les limites pour X, LinkedIn, Threads, Instagram et SMS.",
    eyebrow: "Intégration gratuite",
    heading: "Intégrez un compteur de caractères en direct sur votre site",
    lede:
      "Collez une ligne HTML pour ajouter un compteur de caractères en temps réel à n’importe quelle page. Il compte les caractères et les mots, et suit les limites de X, LinkedIn, Threads, Instagram et SMS — sans quitter votre site.",
    previewLabel: "Aperçu en direct",
    copyButton: "Copier le code d’intégration",
    copiedButton: "Copié !",
    codeLabel: "Code d’intégration",
    audienceHeading: "Pour qui est-ce ?",
    forBloggers:
      "Les blogueurs et créateurs de contenu peuvent ajouter un compteur de caractères en direct directement sur leur page de rédaction pour que les lecteurs vérifient les limites des plateformes sans changer d’onglet.",
    forEducators:
      "Les enseignants et auteurs de cours peuvent intégrer le compteur dans une leçon, permettant aux étudiants de s’entraîner à écrire avec des contraintes de longueur.",
    forDevelopers:
      "Les développeurs peuvent intégrer le widget dans n’importe quel CMS, page de documentation ou outil interne avec un seul <iframe> — sans clé API, compte ou étape de compilation.",
    homepageLinkLabel: "Intégrer sur votre site →",
  },

  errors: {
    notFound: {
      code: '404',
      title: 'Page introuvable',
      description:
        'La page que vous cherchez n’existe pas. Retournez à l’éditeur PostTruncate.',
      heading: 'Cette page a été tronquée',
      body: 'La page que vous cherchez n’existe pas, a été déplacée ou n’a jamais existé. L’éditeur est toujours là où vous l’avez laissé.',
      cta: 'Retour à l’éditeur',
    },
    serverError: {
      code: '500',
      title: 'Une erreur est survenue',
      description:
        'Une erreur inattendue s’est produite. Retournez à l’éditeur PostTruncate et réessayez.',
      heading: 'Une erreur est survenue de notre côté',
      body: 'C’est une erreur serveur, pas la vôtre. Réessayez dans un instant — l’éditeur fonctionne entièrement dans votre navigateur, votre texte est donc à l’abri dans tous les cas.',
      cta: 'Retour à l’éditeur',
    },
  },

  serpPage: {
    crossPromo: {
      heading: 'Vérifiez aussi vos limites sur les réseaux sociaux',
      editorLink: 'Ou ouvrir l\'éditeur complet PostTruncate →',
      platforms: {
        twitter:   { name: 'X / Twitter',  desc: '280 caract. par tweet · les liens comptent comme 23' },
        instagram: { name: 'Instagram',    desc: '2 200 caract. de légende · limite de 30 hashtags' },
        linkedin:  { name: 'LinkedIn',     desc: '3 000 caract. · pliage bureau à 210 caract.' },
        facebook:  { name: 'Facebook',     desc: '63 206 caract. · pliage fil à 480 caract.' },
        threads:   { name: 'Threads',      desc: '500 caract. par publication Threads' },
        sms:       { name: 'SMS',          desc: '160 GSM · 70 Unicode caract. par SMS' },
      },
    },
  },

  banner: {
    text: 'Votre aperçu {platform} est ci-dessous',
    close: 'Fermer',
  },

  island: {
    dashboard: {
      loadSample: 'Charger un exemple de publication →',
      sample:
        'La semaine dernière, nous avons livré une toute petite fonctionnalité qui a discrètement doublé notre taux de conversion d’essai en abonnement payant.\n\n' +
        'Aucune nouvelle tarification. Aucune astuce de croissance. Juste un changement dans le parcours d’intégration qui a supprimé une seule décision du premier écran.\n\n' +
        'Voici exactement ce que nous avons changé et les trois éléments que nous avons mesurés avant de le déployer à tous → https://posttruncate.com/blog/onboarding\n\n' +
        '#saas #productled #growth #startups',
    },
    workspace: {
      eyebrow: 'Espace de travail',
      title: 'Rédigez votre publication',
      badgeEditor: 'Éditeur',
      hiddenBadge: { one: '{n} caractère masqué', other: '{n} caractères masqués' },
      placeholder:
        'Commencez à taper votre publication. Collez un brouillon, ajoutez quelques liens et hashtags, et regardez l’aperçu de chaque plateforme se mettre à jour à droite…',
      counters: {
        characters: 'Caractères',
        words: 'Mots',
        lines: 'Lignes',
        paragraphs: 'Paragraphes',
      },
      timers: {
        reading: 'Lecture',
        speaking: 'Oral',
        lessThan30Sec: '< 30 s',
        minute: { one: 'min', other: 'min' },
        second: { one: 's', other: 's' },
      },
      formatterLabel: 'Outils de formatage',
      uppercase: 'MAJUSCULES',
      lowercase: 'minuscules',
      titleCase: 'Casse titre',
      sentenceCase: 'Casse phrase',
      emojiStripper: 'Supprimer emojis',
      hashtagExtractor: 'Extraire hashtags',
      engineLabel: 'Moteur d’optimisation',
      clean: 'Nettoyer les espaces en trop',
      sanitize: 'Nettoyer le texte',
      clear: 'Vider l’éditeur',
      hiddenWarning:
        'Caractères invisibles détectés qui faussent les comptages et les lecteurs d’écran : {codes}. Nettoyez pour les supprimer.',
    },
    common: {
      profileName: 'Votre nom',
      handle: '@vous',
      charsSuffix: '{n} caractères',
    },
    sms: {
      eyebrow: 'SMS',
      title: 'Compteur global de caractères',
      characterCount: 'Nombre de caractères',
      charactersLeft: 'Caractères restants',
      parts: 'Messages',
      encoding: 'Encodage',
      encodingGsm: 'GSM 7 bits',
      encodingUnicode: 'Unicode',
      partsValue: '{n} messages',
      gsmNote:
        'GSM 7-bit : 160 caractères pour un SMS, puis 153 par SMS concaténé. Les caractères de la table étendue comme €, [, ], {, }, \\ et | comptent pour 2.',
      unicodeNote:
        'Unicode UTF-16 : 70 caractères pour un SMS, puis 67 par SMS concaténé. Cela s’applique dès qu’un emoji ou une écriture non GSM est présent.',
    },
    linkedin: {
      title: 'Aperçu de la zone d’accroche',
      viewAriaLabel: 'Vue du pli LinkedIn',
      viewDesktop: 'Ordinateur',
      viewMobile: 'Mobile',
      badgeTruncated: 'Texte du fil tronqué',
      badgeOverLimit: 'Limite de publication dépassée',
      badgeSafe: 'Ligne d’accroche sûre',
      beforeFold: '{total} / {limit} avant le pli',
      postLimit: '{total} / {limit} limite de publication',
      seeMore: '…voir plus',
      profileMeta: 'Fondateur · 1er · À l’instant',
      placeholder: 'Les premières lignes de votre publication apparaissent ici…',
      overLimitNote:
        'Les publications LinkedIn sont limitées à {limit} caractères. Raccourcissez de {excess} avant de publier.',
      truncatedNote:
        'Les lecteurs ne voient que les {limit} premiers caractères dans le fil. Placez votre accroche en tête, avant le pli.',
      safeNote:
        'Toute votre publication tient au-dessus du pli {view} de LinkedIn — aucune troncature « …voir plus ».',
    },
    twitter: {
      title: 'Découpeur de fils',
      badgeIdle: 'Inactif',
      badgeThread: 'Fil de {n} tweets',
      badgeSingle: 'Tweet unique',
      links: {
        one: '{n} lien · compté comme {weight} chacun',
        other: '{n} liens · comptés comme {weight} chacun',
      },
      weightedLength: 'Longueur pondérée',
      placeholder:
        'L’aperçu de votre tweet apparaît ici. Dépassez {limit} caractères et il se découpe automatiquement en fil.',
    },
    threads: {
      title: 'Aperçu de publication et d’enchaînement',
      badgeIdle: 'Inactif',
      badgeThread: 'Chaîne de {n} publications',
      badgeSingle: 'Publication unique',
      links: {
        one: '{n} lien · compté en entier',
        other: '{n} liens · comptés en entier',
      },
      charLength: 'Nombre de caractères',
      placeholder:
        'L’aperçu Threads apparaît ici. Dépassez {limit} caractères et il s’enchaîne en une séquence de publications numérotées.',
    },
    meta: {
      title: 'Moniteur de mise en forme',
      badgeNeedsFix: 'À corriger',
      badgeClean: 'Semble propre',
      badgeCaptionOver: 'Légende trop longue',
      captionLimit: '{total} / {limit} limite de légende',
      captionOver:
        'Les légendes Instagram sont limitées à {limit} caractères. Raccourcissez de {excess} avant de publier.',
      hashtagLabel: 'Concentration de hashtags',
      over: 'Au-delà de la limite stricte de {limit} hashtags d’Instagram — la légende ne pourra pas être publiée. Retirez-en {excess}.',
      approaching:
        'Vous approchez du plafond de 5 tags. Réduisez à vos tags les plus pertinents.',
      within: 'Confortablement sous la limite de 5 hashtags d’Instagram.',
      none: 'Aucun hashtag détecté pour l’instant.',
      a11yLabel: 'Accessibilité · polices fantaisie',
      flagged: '{n} signalé(s)',
      flaggedNone: 'Aucun',
      fancyDetected: {
        one: '{n} caractère pseudo-Unicode de « police » détecté (𝖁𝖔𝖑𝖉 / 𝓼𝓬𝓻𝓲𝓹𝓽). Ils paraissent stylisés mais les lecteurs d’écran les ignorent ou les épellent — ils nuisent à la portée et à l’accessibilité.',
        other:
          '{n} caractères pseudo-Unicode de « police » détectés (𝖁𝖔𝖑𝖉 / 𝓼𝓬𝓻𝓲𝓹𝓽). Ils paraissent stylisés mais les lecteurs d’écran les ignorent ou les épellent — ils nuisent à la portée et à l’accessibilité.',
      },
      fancyClean:
        'Aucun caractère de pseudo-police détecté. Votre texte se lit clairement sur les technologies d’assistance.',
      footnote:
        '{n} caractères · pli Facebook ≈ 480 · limite de légende Instagram 2 200',
    },
    keywords: {
      eyebrow: 'Mots-clés',
      title: 'Détecteur de surutilisation',
      badgeIdle: 'Inactif',
      badgeStuffing: 'Bourrage de mots-clés',
      badgeBalanced: 'Équilibré',
      colKeyword: 'Mot-clé',
      colUses: 'Occurrences',
      colDensity: 'Densité',
      overused: 'Surutilisé',
      empty: 'Commencez à écrire pour voir vos mots-clés les plus utilisés et leur densité.',
      stuffingNote:
        'Les mots-clés surlignés dépassent {threshold} % de densité — les moteurs de recherche peuvent y voir du bourrage de mots-clés. Variez votre formulation.',
      footnote:
        '{total} mots · les mots-clés au-delà de {threshold} % de densité sont signalés',
    },
    seoPreview: {
      eyebrow: 'Aperçu SEO',
      title: 'Simulateur de SERP Google',
      badgeIdle: 'Inactif',
      badgeSafe: 'Correct',
      badgeWarn: 'Limite dépassée',
      titleLabel: 'Titre de la page',
      titleCounter: '{n} / {limit}',
      pixelNote: '~{px}px · Google coupe à ~{max}px',
      titleOverChar:
        'Le titre dépasse {limit} caractères — Google pourrait le tronquer dans les résultats.',
      titleOverPixel:
        "Le titre risque d'être coupé dans les résultats de recherche (~{max}px de limite d'affichage).",
      descLabel: 'Méta-description',
      descCounter: '{n} / {limit}',
      descOverChar: 'La description dépasse {limit} caractères.',
      previewLabel: 'Aperçu dans Google Search',
      titlePlaceholder: 'Le titre de votre page…',
      descPlaceholder: 'Une brève description de votre page pour les résultats de recherche…',
    },
    readability: {
      eyebrow: 'Lisibilité',
      title: 'Score de Flesch',
      scoreLabel: 'Facilité de lecture',
      gradeLabel: 'Niveau scolaire',
      descriptors: {
        veryEasy: 'Très facile',
        easy: 'Facile',
        fairlyEasy: 'Assez facile',
        standard: 'Standard',
        fairlyDifficult: 'Assez difficile',
        difficult: 'Difficile',
        veryDifficult: 'Très difficile',
      },
      tooltip:
        'Le score de Flesch évalue le texte sur une échelle de 0 à 100. Plus le score est élevé, plus la lecture est facile. Entre 60 et 70 correspond à une prose standard.',
      notApplicable:
        "La formule de Flesch est conçue pour les textes en écriture latine et ne s’applique pas à cette langue. Utilisez le nombre de mots comme mesure principale de lisibilité.",
    },
    toolLinks: {
      linkedin: 'En savoir plus sur les limites de caractères LinkedIn →',
      twitter: 'En savoir plus sur les limites de caractères X / Twitter →',
      instagram: 'En savoir plus sur les limites de caractères Instagram →',
      facebook: 'En savoir plus sur les limites de caractères Facebook →',
      threads: 'En savoir plus sur les limites de caractères Threads →',
    },
    embed: {
      placeholder: "Commencez à taper pour compter les caractères…",
      charCount: "Caractères",
      wordCount: "Mots",
      remaining: "{n} restants",
      overLimit: "{n} en trop",
      platforms: {
        twitter: "X / Twitter",
        linkedin: "LinkedIn",
        threads: "Threads",
        instagram: "Instagram",
        sms: "SMS",
      },
    },
  },
};
