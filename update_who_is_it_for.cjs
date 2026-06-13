const fs = require('fs');
const path = require('path');

const i18nDir = 'd:\\AICodingProjects\\PostTruncate.com\\src\\i18n';

const translations = {
  en: { eyebrow: "WHO IS IT FOR?", title: "Perfect for every content creator", roles: { marketers: { title: "Marketers", desc: "Optimize campaigns, ad copy, and social posts for maximum reach and engagement." }, creators: { title: "Creators", desc: "Write better captions and threads that get more likes, shares, and saves." }, agencies: { title: "Agencies", desc: "Manage multiple clients and ensure every post is perfectly optimized." }, founders: { title: "Founders", desc: "Share updates and build your brand with clear, impactful content." } } },
  da: { eyebrow: "HVEM ER DET TIL?", title: "Perfekt til enhver indholdsskaber", roles: { marketers: { title: "Markedsførere", desc: "Optimer kampagner, annoncetekster og sociale opslag for maksimal rækkevidde og engagement." }, creators: { title: "Skabere", desc: "Skriv bedre billedtekster og tråde, der får flere likes, delinger og gemmer." }, agencies: { title: "Bureauer", desc: "Administrer flere kunder og sørg for, at hvert opslag er perfekt optimeret." }, founders: { title: "Stiftere", desc: "Del opdateringer og opbyg dit brand med klart, virkningsfuldt indhold." } } },
  de: { eyebrow: "FÜR WEN IST ES?", title: "Perfekt für jeden Content Creator", roles: { marketers: { title: "Marketer", desc: "Optimiere Kampagnen, Anzeigentexte und Social-Media-Posts für maximale Reichweite und Interaktion." }, creators: { title: "Creators", desc: "Schreibe bessere Bildunterschriften und Threads, die mehr Likes, Shares und Saves erhalten." }, agencies: { title: "Agenturen", desc: "Verwalte mehrere Kunden und stelle sicher, dass jeder Post perfekt optimiert ist." }, founders: { title: "Gründer", desc: "Teile Updates und baue deine Marke mit klaren, wirkungsvollen Inhalten auf." } } },
  es: { eyebrow: "¿PARA QUIÉN ES?", title: "Perfecto para cada creador de contenido", roles: { marketers: { title: "Marketers", desc: "Optimiza campañas, textos publicitarios y publicaciones sociales para maximizar el alcance y la participación." }, creators: { title: "Creadores", desc: "Escribe mejores subtítulos e hilos que obtengan más me gusta, compartidos y guardados." }, agencies: { title: "Agencias", desc: "Gestiona múltiples clientes y asegúrate de que cada publicación esté perfectamente optimizada." }, founders: { title: "Fundadores", desc: "Comparte actualizaciones y construye tu marca con contenido claro e impactante." } } },
  fr: { eyebrow: "POUR QUI EST-CE ?", title: "Parfait pour chaque créateur de contenu", roles: { marketers: { title: "Marketeurs", desc: "Optimisez les campagnes, les textes publicitaires et les posts sociaux pour une portée et un engagement maximums." }, creators: { title: "Créateurs", desc: "Rédigez de meilleures légendes et threads qui obtiennent plus de likes, de partages et d'enregistrements." }, agencies: { title: "Agences", desc: "Gérez plusieurs clients et assurez-vous que chaque post est parfaitement optimisé." }, founders: { title: "Fondateurs", desc: "Partagez des mises à jour et développez votre marque avec un contenu clair et percutant." } } },
  it: { eyebrow: "PER CHI È?", title: "Perfetto per ogni creatore di contenuti", roles: { marketers: { title: "Marketer", desc: "Ottimizza campagne, testi pubblicitari e post social per massimizzare la portata e il coinvolgimento." }, creators: { title: "Creator", desc: "Scrivi didascalie e thread migliori che ottengano più mi piace, condivisioni e salvataggi." }, agencies: { title: "Agenzie", desc: "Gestisci più clienti e assicurati che ogni post sia perfettamente ottimizzato." }, founders: { title: "Fondatori", desc: "Condividi aggiornamenti e costruisci il tuo marchio con contenuti chiari e di impatto." } } },
  ja: { eyebrow: "対象ユーザー", title: "すべてのコンテンツクリエイターに最適", roles: { marketers: { title: "マーケター", desc: "キャンペーン、広告コピー、ソーシャル投稿を最適化して、リーチとエンゲージメントを最大化します。" }, creators: { title: "クリエイター", desc: "より多くの「いいね」、共有、保存を獲得できる魅力的なキャプションやスレッドを作成します。" }, agencies: { title: "代理店", desc: "複数のクライアントを管理し、すべての投稿が完全に最適化されていることを確認します。" }, founders: { title: "創業者", desc: "明確でインパクトのあるコンテンツで最新情報を共有し、ブランドを構築します。" } } },
  nl: { eyebrow: "VOOR WIE IS HET?", title: "Perfect voor elke content creator", roles: { marketers: { title: "Marketeers", desc: "Optimaliseer campagnes, advertentieteksten en sociale posts voor maximaal bereik en betrokkenheid." }, creators: { title: "Creators", desc: "Schrijf betere bijschriften en threads die meer likes, shares en saves krijgen." }, agencies: { title: "Bureaus", desc: "Beheer meerdere klanten en zorg ervoor dat elke post perfect is geoptimaliseerd." }, founders: { title: "Oprichters", desc: "Deel updates en bouw je merk op met duidelijke, impactvolle content." } } },
  pt: { eyebrow: "PARA QUEM É?", title: "Perfeito para todos os criadores de conteúdo", roles: { marketers: { title: "Marketers", desc: "Otimize campanhas, textos publicitários e posts sociais para maximizar o alcance e o engajamento." }, creators: { title: "Criadores", desc: "Escreva legendas e threads melhores que obtenham mais curtidas, compartilhamentos e salvamentos." }, agencies: { title: "Agências", desc: "Gerencie vários clientes e garanta que cada postagem seja perfeitamente otimizada." }, founders: { title: "Fundadores", desc: "Compartilhe atualizações e construa sua marca com conteúdo claro e impactante." } } },
  zh: { eyebrow: "适用人群", title: "适合所有内容创作者", roles: { marketers: { title: "营销人员", desc: "优化广告活动、广告文案和社交帖子，实现覆盖面和互动率最大化。" }, creators: { title: "创作者", desc: "撰写更优质的字幕和长文，获得更多点赞、分享和收藏。" }, agencies: { title: "代理机构", desc: "管理多个客户并确保每篇帖子都得到完美优化。" }, founders: { title: "创始人", desc: "通过清晰、有影响力的内容分享动态并打造您的品牌。" } } }
};

for (const lang of Object.keys(translations)) {
  const filePath = path.join(i18nDir, `${lang}.ts`);
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('whoIsItFor:')) {
    console.log(`Already in ${lang}.ts`);
    continue;
  }
  
  let toInsert = `whoIsItFor: ${JSON.stringify(translations[lang], null, 4).replace(/"([^"]+)":/g, '$1:').replace(/\n/g, '\n  ')},\n\n  island: {`;
  content = content.replace('island: {', toInsert);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${lang}.ts`);
}

const typesPath = path.join(i18nDir, 'types.ts');
let typesContent = fs.readFileSync(typesPath, 'utf8');
if (!typesContent.includes('whoIsItFor:')) {
  const typesInsert = `whoIsItFor: {
    eyebrow: string;
    title: string;
    roles: {
      marketers: { title: string; desc: string };
      creators: { title: string; desc: string };
      agencies: { title: string; desc: string };
      founders: { title: string; desc: string };
    };
  };

  island: {`;
  typesContent = typesContent.replace('island: {', typesInsert);
  fs.writeFileSync(typesPath, typesContent, 'utf8');
  console.log('Updated types.ts');
}
