import type { Translations } from './types';

// ──────────────────────────────────────────────────────────────────────────
// 简体中文（zh）——机器生成的翻译，上线前需经人工审校。
// Machine-generated translation. Needs human review before launch.
// 结构严格镜像 en.ts（由 Translations 类型强制约束）。
// ──────────────────────────────────────────────────────────────────────────

export const zh: Translations = {
  seo: {
    title:
      '字符计数器 — 免费在线字符和单词计数工具 | PostTruncate',
    description:
      '免费的社交媒体帖子预览工具。查看LinkedIn折叠点，拆分X/Twitter串文，实时检测话题标签上限和无障碍问题——直接在浏览器中运行。',
    skipLink: '跳转到编辑器',
  },

  nav: {
    brandAria: 'PostTruncate 首页',
    homeAria: 'PostTruncate 首页',
    links: { editor: '编辑器', guides: '平台指南', faq: '常见问题', about: '关于', contact: '联系我们' },
    cta: '打开编辑器',
    themeToDark: '切换到深色主题',
    themeToLight: '切换到浅色主题',
    language: '语言',
    languageAria: '选择语言',
    menuAria: '切换导航菜单',
  },

  hero: {
    eyebrow: '社交预览与截断模拟器',
    title: '精准查看每个平台会在哪里截断你的文字。',
    lede: '写一次，即可看到你的帖子在 LinkedIn、X、Instagram 和 Facebook 的原生预览中呈现的样子——折叠行、串文拆分、话题标签上限以及无障碍提醒，全部随你输入实时更新。',
    primary: '开始写作',
    secondary: '查看平台限制',
  },

  howItWorks: {
    heading: '使用方法',
    steps: [
      {
        name: '粘贴或输入您的文本',
        text: '将草稿粘贴到编辑器中，字符计数器会随着您的输入实时更新。',
      },
      {
        name: '所有平台同时渲染',
        text: 'LinkedIn、X、Threads、Instagram、Facebook 和短信预览卡同时更新，无需手动选择。',
      },
      {
        name: '精确查看截断位置',
        text: '预览会突出显示截断点，让您清楚地了解读者将看到的内容。',
      },
    ],
  },

  toolPage: {
    onThisPage: '本页内容',
    lastUpdated: '最后更新：{date}',
    crossPromo: {
      heading: '需要检查其他平台吗？',
      text: 'PostTruncate 不只适用于 {platform}。主页上的完整编辑器可同时预览你的内容在 LinkedIn、X、Instagram、Facebook、Threads 和 SMS 上的效果——让你一次性发现每个平台的折叠点、字符上限和编码陷阱。写一次，处处检查。',
      cta: '打开完整编辑器',
    },
  },

  images: {
    logoAlt: 'PostTruncate 标志',
    platformLogo: '{platform}标志',
  },

  breadcrumbs: {
    home: '首页',
  },

  workspace: {
    title: '你的实时工作区',
    sub: '下方的一切都会即时更新，并始终保留在你的设备上。',
  },

  seoCopy: {
    ariaLabel: '关于 PostTruncate',
    sections: [
      {
        heading: '专为社交媒体设计的字符计数器',
        paragraphs: [
          '<strong>PostTruncate</strong> 是一款完全在浏览器中运行的免费字符计数器，无需上传文件，也不需要注册账号。粘贴或输入任意文本，字符数、字数、阅读时长和字母分布会立即显示，并随输入实时更新。',
          '它适合任何需要在字数限制下工作的人：调整标题的文案人员、验证字符串的开发者、核查论文字数的学生。由于所有处理都在本地完成，你的文稿始终不会离开你的设备。',
        ],
      },
      {
        heading: '短信编码与分段计算',
        paragraphs: [
          '短信有两种编码方式，大多数工具都忽视了这一区别。PostTruncate 会自动检测你的消息使用的是标准 <strong>GSM-7</strong>（每条 160 字符）还是 <strong>Unicode</strong>（70 字符）——只要输入一个表情符号或特殊字符，模式就可能发生切换。',
          '工具还会标记 GSM 扩展表中的字符——如欧元符号 (€)、方括号和竖线——这些字符虽然保持在 GSM-7 模式，但每个字符会占用两个位置而不是一个。这种隐藏消耗正是消息意外分段的常见原因。',
          '当文本横跨多个分段时，内置的<strong>分段计算器</strong>会精确显示将发送的短信数量，并计入 UDH 开销——该开销将每段可用字符数减少至 GSM 的 153 个或 Unicode 的 67 个。',
        ],
      },
      {
        heading: 'X（Twitter）的字符限制与自动串文拆分',
        paragraphs: [
          'X（Twitter）有两条常被忽视的规则：280 字符的限制，以及所有链接——无论实际长度——都被计为恰好 23 个字符。PostTruncate 同时应用这两条规则，因此显示的计数与 X 在应用 t.co 短链后的实际计数完全一致。',
          '当草稿过长时，内置的<strong>串文拆分器</strong>会在自然的句子边界处将文本拆分为带编号的推文——绝不在单词中间断开。每张卡片都显示字符数和位置，方便你在发布前检查完整的串文。',
        ],
      },
      {
        heading: 'Instagram 和 Facebook 的字符限制',
        paragraphs: [
          'Instagram 允许标题最多使用 2,200 个字符，但在「查看更多」链接之前只显示约前 125 个字符。PostTruncate 会精确标注这个截断位置，确保信息流中第一眼看到的内容，始终是你最想传达的那句话。',
          '仪表板还会实时监控<strong>话题标签数量</strong>。Instagram 会静默地拒绝发布超过 5 个话题标签的帖子，因此系统会在达到上限之前发出提醒。空格始终被计入字符数，与平台本身的行为保持一致。',
        ],
      },
      {
        heading: '字数、可读性与跨平台分析',
        paragraphs: [
          '除了平台字数限制，PostTruncate 还能实时统计单词数、句子数、段落数和符号数。无论是撰写 SEO 元描述、审阅技术文档，还是任何需要不止字符计数的写作场景，都能派上用场。',
          '仪表板能正确处理多语言文本，包括字符数具有不同语义权重的中日韩文字。无论你用中文、英文、日文还是其他语言写作，统计结果都会如实反映目标平台看到的内容。',
        ],
      },
    ],
  },

  guides: {
    eyebrow: '平台指南',
    title: '发布前先了解每一项限制。',
    lede: '一份关于截断点、硬性上限和格式陷阱的快速参考，帮你避开那些在每个平台上悄悄压低触达的坑。',
    items: {
      linkedin: {
        name: 'LinkedIn',
        tag: '“…查看更多”折叠',
        body: 'LinkedIn 在桌面端约 210 个字符、移动端约 140 个字符后就会折叠帖子，把其余内容藏在“…查看更多”链接后面。折叠线以上的内容就是你在信息流里的全部卖点——如果你的钩子没有落在那里，大多数人永远不会展开。把张力、结果或问题放在最前面，把话题标签和链接放到折叠线以下。',
        facts: [
          ['桌面端折叠', '约 210 个字符'],
          ['移动端折叠', '约 140 个字符'],
          ['帖子硬性上限', '3,000 个字符'],
        ],
      },
      twitter: {
        name: 'X / Twitter',
        tag: '串文与链接计重',
        body: 'X 单条帖子按 280 个字符计算，但每个链接都会被 t.co 包装，无论真实网址多长都统一计为 23 个字符。超过 280 就需要发串文。好的串文在句子边界处断开，绝不在词语中间断开，并为每条推文编号，让读者能跟上顺序。PostTruncate 会自动拆分你的草稿，并为每张卡片标注它在串文中的位置。',
        facts: [
          ['单条推文上限', '280 个字符'],
          ['每个链接计为', '23 个字符'],
          ['串文推文数', '无限制'],
        ],
      },
      threads: {
        name: 'Threads',
        tag: '帖子串联',
        body: 'Threads 是 Meta 的文字应用，每条帖子有 500 个字符——几乎是 X 的两倍——并且按完整长度计算链接，而不会缩短它们。超过 500 后，其余内容就得以编号回复的形式串联下去。第一条帖子依然承载着信息流，所以要像在别处一样把钩子放在最前面。PostTruncate 按完整字符数计量，并把长文串联成一段干净的编号序列。',
        facts: [
          ['单条帖子上限', '500 个字符'],
          ['链接计算方式', '按完整长度'],
          ['溢出处理', '以回复串联'],
        ],
      },
      instagram: {
        name: 'Instagram',
        tag: '话题标签上限',
        body: 'Instagram 的标题最多可达 2,200 个字符，但在“更多”链接之前只显示大约前 125 个字符。更硬性的规则是话题标签：单条标题或评论中超过 5 个，帖子就会悄无声息地发布失败。堆砌几十个低意图标签也会被视为垃圾内容。让标签精炼且相关，并盯紧实时计量表，这样你就永远不会撞上 5 个标签的上限。',
        facts: [
          ['标题上限', '2,200 个字符'],
          ['话题标签硬性上限', '5 个标签'],
          ['标题预览', '约 125 个字符'],
        ],
      },
      facebook: {
        name: 'Facebook',
        tag: '信息流截断',
        body: 'Facebook 在大约 480 个字符处用“查看更多”链接截断信息流帖子，而长篇不分段的内容互动率会急剧下降。开头第一行清晰的较短帖子表现始终更好。同样的无障碍规则在任何地方都适用：伪 Unicode 的“花式字体”看起来像是粗体或手写体，但屏幕阅读器会逐字读出——或者干脆跳过——因此它们会悄悄缩小你的触达。',
        facts: [
          ['信息流折叠', '约 480 个字符'],
          ['表现最佳长度', '80 个字符以内'],
          ['花式字体', '破坏屏幕阅读器'],
        ],
      },
    },
  },

  hookband: {
    eyebrow: '写好钩子',
    title: '第一行往往是大多数人唯一会读的一行。',
    body: '在每个信息流里，折叠线以上的文字承担了全部工作。用一个结果、一种张力或一个问题开头——而不是铺垫。把链接和话题标签移到折叠线以下，让开头保持在平台的截断点之内，并在发布前让预览确认钩子能够留存。',
  },

  faq: {
    eyebrow: '常见问题',
    title: '问题，逐一解答。',
    items: [
      {
        q: '字符限制有多准确？',
        a: 'PostTruncate 采用各平台公布且被广泛验证的限制——X 为 280，LinkedIn 折叠为 210/140，Instagram 为 5 个话题标签，链接统一计为 23 个字符。平台偶尔会调整这些数值，渲染也会因设备而略有差异，因此请把预览当作接近的估算，而非像素级精确的保证。',
      },
      {
        q: '空格和标点算作字符吗？',
        a: '算。每个空格、换行和标点符号都算作一个字符，PostTruncate 的计数器和平台限制都会把它们计入。唯一常见的例外是 X/Twitter 上的链接，无论真实网址包含多少字母、符号或斜杠，都会统一折算为 23 个字符。',
      },
      {
        q: '表情符号如何影响字符计数？',
        a: 'PostTruncate 按 Unicode 码点计数，所以像 🙂 这样的简单表情符号算作一个字符。不过许多表情符号是由多个码点拼接而成的——肤色变体、旗帜以及 👨‍👩‍👧 这类组合字形——它们会被计为两个或更多。大多数平台（尤其是 X）对表情符号的计重也高于普通字母，因此一份表情符号密集的草稿会比可见的字形数量多占用一点你的限额。',
      },
      {
        q: '字符数和字数有什么区别？',
        a: '字符数是每个单独字符的总和——字母、空格、标点和表情符号全部计入——它才是平台限制实际衡量的对象。字数是以空白分隔的词语数量，无论每个词有多长。一条满 280 字符的推文可能只有 40 个词，所以要盯住字符数以保持在限制之内，并把字数当作可读性的参考。',
      },
      {
        q: '为什么我的链接在 X 上算作 23 个字符？',
        a: 'X 会自动用它的 t.co 缩短服务包装每个网址，无论原始链接多长或多短，它始终占用 23 个字符。所以一个 5 字符的链接和一个 200 字符的链接，对 280 限额都恰好消耗 23 个字符。PostTruncate 在计重计数器中如实反映了这一点。',
      },
      {
        q: '什么是“花式字体”，为什么会被标记？',
        a: '你从字体生成器粘贴来的那些粗体、斜体或手写体字母并不是真正的格式——它们是来自“数学字母数字符号”区块的伪 Unicode 字符。它们看起来很有样式，但屏幕阅读器要么逐字拼读，要么直接跳过，这既损害无障碍体验，也损害你的自然触达。监测器会把它们标记出来，方便你换回纯文本。',
      },
      {
        q: '“净化文本”会移除什么？',
        a: '它会剥除不可见和零宽字符——零宽空格、字节顺序标记、双向控制标记、软连字符以及零散的控制码。这些往往在你从其他应用复制时悄悄混入，会在较旧的移动客户端上悄无声息地破坏字符计数和无障碍体验，而且根本看不见。',
      },
      {
        q: '什么是关键词密度？过度使用监测器如何保护我的内容？',
        a: '关键词密度是某个词相对于全文总词数出现的比例。反复使用同一个词过多，会让搜索引擎和读者觉得是在堆砌关键词。监测器会实时跟踪词频，并标记超过安全 3.0% 阈值的词，方便你在发布前改写。',
      },
      {
        q: '预计阅读和朗读计时器如何计算我的帖子时长？',
        a: '阅读计时器会用总词数除以每分钟 275 词的平均阅读速度。朗读计时器使用每分钟 150 词的对话语速。这样你可以直接在编辑器中估算文章、脚本、 newsletter 或短视频文案的时长。',
      },
      {
        q: 'Social Sanitizer 会做什么？为什么要移除表情或提取话题标签？',
        a: '这些清理操作可以一键整理原始草稿。表情移除器会在你需要纯文本时删除图标和特殊符号；话题标签提取器会把正文中的标签移出并集中放到底部，让标题更易读。',
      },
      {
        q: '我的文字会被发送到任何地方吗？',
        a: '不会。整个编辑器和每一个预览都在你的浏览器本地运行。你的草稿永远不会离开你的设备——没有账户，没有上传，也没有服务器对你的内容进行任何处理。',
      },
      {
        q: '会话自动保存是否意味着我的数据会存到服务器？',
        a: '不会。你的草稿永远不会上传，也不会保存到任何外部基础设施。会话自动保存只使用你自己浏览器当前标签页中的 sessionStorage。如果你在同一标签页刷新页面，文字会被恢复；当标签页会话结束时，浏览器会清除这份临时缓存。',
      },
      {
        q: 'PostTruncate 是免费的吗？',
        a: '是的，完全免费使用，无需注册。本工具靠放置在预留位置的不打扰广告来支持，这些广告在你工作时绝不会移动页面布局。',
      },
      {
        q: '我的160个字符的短信为什么突然变成了两条消息？',
        a: '这是因为短信的编码方式发生了变化。标准短信使用 GSM-7 编码，单条消息最多可容纳 160 个字符。只要文本中包含一个非 GSM 字符——如表情符号、地区文字或某些符号——整条消息就会切换为 Unicode，每段只能容纳 70 个字符。如果 Unicode 消息超过 70 个字符，会自动添加多段合并头部，每段的实际可用空间降至 67 个字符。PostTruncate 实时显示当前的编码方式和段数，让你随时了解分割发生的位置。',
      },
      {
        q: '短信中的特殊字符和表情符号算作一个字符吗？',
        a: '不一定。标准字母和数字各算 1 个字符。GSM 扩展表中的符号——包括欧元符号（€）、方括号、花括号和竖线（|）——各算 2 个字符，即便消息仍保持在 GSM-7 模式下。表情符号则完全不同：添加一个表情符号会将整条消息强制切换为 Unicode，每段的字符上限从 160 个降至 70 个。',
      },
    ],
  },

  footer: {
    homeAria: 'PostTruncate 首页',
    tag: '在发布前，精准查看每个平台会在哪里截断你的文案。',
    columns: {
      tool: {
        title: '工具',
        links: [
          '文本编辑器',
          '实时预览',
          '串文拆分器',
          'Unicode 净化器',
          '嵌入式小部件',
        ],
      },
      platforms: {
        title: '平台',
        links: ['LinkedIn', 'X / Twitter', 'Threads', 'Instagram', 'Facebook'],
      },
      learn: {
        title: '学习',
        links: [
          '字符限制',
          '常见问题',
          '钩子写作',
          '无障碍',
        ],
      },
      legal: {
        title: '法律',
        links: ['隐私', '条款', '关于', '联系我们'],
      },
      guides: {
        title: '平台指南',
        links: [
          'X / Twitter',
          'Instagram',
          'LinkedIn',
          'Facebook',
          'SMS',
          'Threads',
          'Google SERP 预览',
        ],
      },
    },
    copyright: '© {year} PostTruncate。为世界各地的创作者打造。',
    disclaimer:
      '与 LinkedIn、X、Meta 或 Instagram 无任何关联。各项限制均为估算值，可能随时变动。',
  },

  pages: {
    common: {
      lastUpdated: '最后更新：{date}',
      lastUpdatedDate: '2026年6月1日',
      backHome: '← 返回编辑器',
    },

    privacy: {
      title: '隐私政策',
      description:
        'PostTruncate 如何处理你的数据：你的文字永远不会离开你的浏览器，没有账户，你所写的任何内容都不会被上传或存储。',
      intro:
        'PostTruncate 以隐私优先为原则打造。你输入的一切都在浏览器本地运行——你的草稿永远不会被上传、存储，也不会被我们看到。本政策将准确说明这意味着什么，以及涉及第三方的少数有限情形。',
      sections: [
        {
          heading: '你的文字保留在你的设备上',
          paragraphs: [
            '编辑器、每一个平台预览、串文拆分器以及 Unicode 净化器，全部完全在<strong>你的浏览器</strong>中运行。你撰写或粘贴的文字在你自己的设备上处理，<strong>永远不会传输到我们的服务器</strong>——事实上，PostTruncate 根本没有用于接收它的内容服务器。当你关闭标签页时，除非你的浏览器选择在本地保留，否则你的草稿就此消失。',
            '由于没有任何内容被上传，我们无法读取、存储、出售或分享你所写的内容。这里<strong>没有账户、没有注册，也没有登录</strong>，因此我们使用本工具时从不索取你的姓名、电子邮箱或任何个人信息。',
          ],
        },
        {
          heading: '我们在本地存储的内容',
          paragraphs: [
            '少量偏好设置会保存在你浏览器的 <strong>localStorage</strong> 中，以便站点记住你的使用习惯——具体来说就是你选择的主题（浅色或深色）和你偏好的语言。这些数值仅存在于你的设备上，只有 PostTruncate 能读取，永远不会传到我们这里。你随时都可以通过浏览器设置将它们清除。',
          ],
        },
        {
          heading: '广告',
          paragraphs: [
            'PostTruncate 靠在固定、预留位置展示的不打扰广告来支持，这些广告在你工作时绝不会移动页面布局。如果使用了第三方广告合作伙伴，他们可能会设置自己的 cookie 或使用设备标识符来展示相关广告，并受其各自隐私政策的约束。这些合作伙伴永远不会收到你草稿的内容，因为那些内容根本不会离开你的浏览器。',
          ],
        },
        {
          heading: '联系表单',
          paragraphs: [
            '唯一会把数据发送出你设备的功能是<strong>联系表单</strong>。当你选择向我们发送消息时，你填写的姓名、电子邮箱和消息会通过第三方表单处理服务送达我们，以便我们阅读并回复。我们仅将这些信息用于回复你，绝不会用于营销。如果你不想使用第三方服务，也可以直接给我们发电子邮件。',
          ],
        },
        {
          heading: '变更与联系',
          paragraphs: [
            '随着产品的演进，我们可能会更新本政策；上方的“最后更新”日期始终反映当前版本。如果你对隐私有任何疑问，请发送电子邮件至 <strong>contact@posttruncate.com</strong>。',
          ],
        },
      ],
    },

    terms: {
      title: '条款与条件',
      description:
        'PostTruncate 的使用条款：一款免费、按现状提供的工具，其平台限制均为估算值，不提供任何担保，且与任何社交网络无关联。',
      intro:
        '使用 PostTruncate 即表示你同意这些条款。它们刻意保持简短朴实——本工具免费，在你的浏览器中运行，并按现状提供。',
      sections: [
        {
          heading: '服务的使用',
          paragraphs: [
            'PostTruncate 是一款用于预览和优化社交媒体帖子的免费工具。你可以将它用于任何合法目的。你同意<strong>不滥用本服务</strong>——例如试图扰乱它、破解它的保护机制，或利用它违反法律或侵犯他人权利。',
          ],
        },
        {
          heading: '是估算，而非保证',
          paragraphs: [
            '这里展示的字符限制、折叠点和格式规则，均基于各平台公布且被广泛验证的行为。各平台会<strong>在不另行通知的情况下更改这些限制</strong>，渲染也会因设备和应用版本而异。请把每一个预览和计数都当作接近的估算，而非像素级精确的保证。你有责任在发布前自行检查你的帖子。',
          ],
        },
        {
          heading: '无关联声明',
          paragraphs: [
            'PostTruncate 是一款独立工具，<strong>与 LinkedIn、X (Twitter)、Meta、Instagram、Facebook 或 Threads 无任何关联，也未获得它们的认可或赞助</strong>。所有产品名称、徽标和品牌均归其各自所有者所有，在此仅用于描述各平台的行为。',
          ],
        },
        {
          heading: '按“现状”提供',
          paragraphs: [
            '本服务按<strong>“现状”和“现有可用”提供，不附带任何形式的明示或暗示担保</strong>。在法律允许的最大范围内，对于因你使用——或无法使用——本工具而产生的任何损失或损害，包括你基于其预览或计数所做的任何决定，我们概不负责。',
          ],
        },
        {
          heading: '本条款的变更',
          paragraphs: [
            '我们可能会不时修订这些条款；上方的“最后更新”日期反映当前版本，继续使用本工具即表示你接受最新条款。有疑问？请发送电子邮件至 <strong>contact@posttruncate.com</strong>。',
          ],
        },
      ],
    },

    about: {
      title: '关于 PostTruncate',
      description:
        'PostTruncate 是一款免费、隐私优先的工具，让创作者在点击发布之前，就精准看到每个社交平台会在哪里截断他们的文字。',
      intro:
        'PostTruncate 存在的理由只有一个：你帖子的第一行往往是大多数人唯一会读的一行，而每个平台都会在不同的位置把它截断。我们让这些看不见的限制变得可见。',
      sections: [
        {
          heading: '它能做什么',
          paragraphs: [
            '只需撰写或粘贴一次草稿，PostTruncate 就会按照 <strong>LinkedIn、X、Threads、Instagram 和 Facebook</strong> 实际呈现的方式渲染它——“…查看更多”折叠、280 个字符的串文拆分、23 个字符的链接计重、5 个话题标签的上限。在你决定发布之前，你就能精准看到折叠线以上有哪些内容能够留存。',
            '它还会捕捉那些悄悄压低你触达的隐患：破坏计数和屏幕阅读器的不可见零宽字符，以及看似有样式、却让辅助技术无法识别的伪 Unicode“花式字体”。',
          ],
        },
        {
          heading: '我们为什么打造它',
          paragraphs: [
            '大多数字符计数器只告诉你一个数字。创作者需要的远不止于此——他们需要知道文字在每个网络上会被截断的<strong>位置</strong>，因为钩子的成败就取决于那里。我们想要一个能同时模拟每个平台、即时运行并彻底尊重你隐私的工作区。',
          ],
        },
        {
          heading: '以隐私优先打造',
          paragraphs: [
            '一切都在你的浏览器中运行。你的文字永远不会被上传，没有账户，而且本工具免费使用。它靠预留位置中的不打扰广告来支持，这些广告绝不会移动页面布局。完整细节请阅读我们的<a href="../privacy/"><strong>隐私政策</strong></a>。',
          ],
        },
      ],
    },

    contact: {
      title: '联系我们',
      description:
        '与 PostTruncate 团队取得联系——给我们发消息，或直接发送电子邮件提交反馈、错误报告或疑问。',
      intro:
        '发现了 bug、注意到某个平台限制已经变动，或者有让 PostTruncate 变得更好的想法？我们非常乐意听到你的声音。',
      form: {
        name: '你的名字',
        email: '你的电子邮箱',
        subject: '主题',
        message: '消息',
        submit: '发送消息',
        sending: '发送中…',
        success: '谢谢——你的消息正在发送途中。我们会尽快回复你。',
        error:
          '发送你的消息时出了点问题。请重试，或直接给我们发电子邮件。',
      },
      altHeading: '更喜欢用电子邮件？',
      altBody:
        '你随时都可以通过 {email} 联系我们。我们会阅读每一条消息，并尽快回复。',
    },
  },

  embedWidget: {
    title: '免费字符计数嵌入式小部件 — PostTruncate',
    description:
      '只需一行 HTML，即可为任意博客或网站添加免费的实时字符计数器。支持 X、LinkedIn、Threads、Instagram 和短信的字符限制。',
    eyebrow: '免费嵌入',
    heading: '在你的网站上嵌入实时字符计数器',
    lede:
      '粘贴一行 HTML，即可为任意页面添加实时字符计数器。它能统计字符数和字数，并追踪 X、LinkedIn、Threads、Instagram 和短信的字符限制——无需离开你的网站。',
    previewLabel: '实时预览',
    copyButton: '复制嵌入代码',
    copiedButton: '已复制！',
    codeLabel: '嵌入代码',
    audienceHeading: '适合哪些人？',
    forBloggers:
      '博主和内容创作者可以直接在写作页面添加实时字符计数器，让读者无需切换标签页即可查看平台字符限制。',
    forEducators:
      '教育者和课程作者可以将计数器嵌入课程中，让学生在练习写作时实时了解字数限制。',
    forDevelopers:
      '开发者只需一个 <iframe>，即可将该小部件集成到任意 CMS、文档页面或内部工具中——无需 API 密钥、账号或构建步骤。',
    homepageLinkLabel: '嵌入到你的网站 →',
  },

  errors: {
    notFound: {
      code: '404',
      title: '页面未找到',
      description: '你要找的页面不存在。返回 PostTruncate 编辑器。',
      heading: '此页面被截断了',
      body: '你要找的页面不存在、已被移动，或从未存在过。编辑器仍在你离开时的位置。',
      cta: '返回编辑器',
    },
    serverError: {
      code: '500',
      title: '出了点问题',
      description: '发生了意外错误。返回 PostTruncate 编辑器并重试。',
      heading: '我们这边出了点问题',
      body: '这是服务器错误，不是你的问题。请稍后重试——编辑器完全在你的浏览器中运行，所以无论如何你的文本都是安全的。',
      cta: '返回编辑器',
    },
  },

  serpPage: {
    crossPromo: {
      heading: '同时检查您的社交媒体限制',
      editorLink: '或打开完整的 PostTruncate 编辑器 →',
      platforms: {
        twitter:   { name: 'X / Twitter',  desc: '每条推文280字符·链接计为23字符' },
        instagram: { name: 'Instagram',    desc: '图片说明2,200字符·标签上限30个' },
        linkedin:  { name: 'LinkedIn',     desc: '3,000字符·桌面端折叠210字符' },
        facebook:  { name: 'Facebook',     desc: '帖子63,206字符·动态折叠480字符' },
        threads:   { name: 'Threads',      desc: '每条Threads帖子500字符' },
        sms:       { name: 'SMS',          desc: 'GSM 160字符·Unicode 70字符/条' },
      },
    },
  },

  banner: {
    text: '{platform}的预览在下方',
    close: '关闭',
  },

  island: {
    dashboard: {
      loadSample: '加载示例帖子 →',
      sample:
        '上周我们上线了一个不起眼的小功能，悄悄地让我们的试用转付费率翻了一倍。\n\n' +
        '没有新的定价。没有增长黑客。只是对引导流程做了一处改动，从首屏移除了一个决定。\n\n' +
        '下面就是我们具体改了什么，以及在向所有人推出之前我们衡量的三件事 → https://posttruncate.com/blog/onboarding\n\n' +
        '#saas #productled #growth #startups',
      samples: {
        linkedin:
          '上周我们上线了一个不起眼的小功能，悄悄地让我们的试用转付费率翻了一倍。\n\n' +
          '没有新的定价。没有增长黑客。只是对引导流程做了一处改动，从首屏移除了一个决定。\n\n' +
          '下面就是我们具体改了什么，以及在向所有人推出之前我们衡量的三件事 → https://posttruncate.com/blog/onboarding\n\n' +
          '#saas #productled #growth #startups',
        twitter:
          '上周我们对引导流程做了一处小改动，试用转付费率就翻了一倍。\n\n' +
          '没有新定价，没有增长黑客。只是在首屏少做了一个决定。\n\n' +
          '完整复盘 → https://posttruncate.com/blog/onboarding\n\n' +
          '#buildinpublic #saas',
        instagram:
          '一处小改动，结果翻倍。🚀\n\n' +
          '上周我们从引导流程里移除了一个决定——然后眼看着试用转付费率翻了一倍。没有新定价，没有套路。✨\n\n' +
          '我们改了什么（以及衡量的 3 件事）完整复盘见主页链接。👀\n\n' +
          '.\n.\n.\n' +
          '#saas #创业 #产品设计 #引导流程 #增长 #buildinpublic #创业者 #techstartup',
        facebook:
          '分享一个上周的小故事 👇\n\n' +
          '我们对引导流程做了一处小改动——只是从首屏移除了一个决定——试用转付费率就翻了一倍。没有新定价，也没有花哨的增长黑客。\n\n' +
          '我们把具体改了什么、以及推出前衡量的三件事都写了下来。看看，然后告诉我们你的想法 → https://posttruncate.com/blog/onboarding',
        threads:
          '这事儿挺离谱的——上周我们从引导流程的首屏移除了一个决定，试用转付费率真的就翻倍了。\n\n' +
          '没有新定价。没有增长黑客。只是减少了一点摩擦。\n\n' +
          '还有谁靠这么小的改动看到过这么大的效果？',
        sms:
          '嗨！简单说一句——上周那处引导流程的小调整让我们的试用转付费率翻了一倍。改了什么＋衡量的 3 件事都在这： https://posttruncate.com/blog/onboarding',
      },
    },
    workspace: {
      eyebrow: '工作区',
      title: '撰写你的帖子',
      badgeEditor: '编辑器',
      hiddenBadge: { one: '{n} 个隐藏字符', other: '{n} 个隐藏字符' },
      placeholder:
        '开始输入你的帖子。粘贴一份草稿，放入几个链接和话题标签，看着右侧每个平台的预览实时更新……',
      counters: {
        characters: '字符',
        words: '字数',
        lines: '行数',
        paragraphs: '段落',
      },
      timers: {
        reading: '阅读',
        speaking: '口播',
        lessThan30Sec: '少于30秒',
        minute: { one: '分钟', other: '分钟' },
        second: { one: '秒', other: '秒' },
      },
      formatterLabel: '格式工具',
      uppercase: '大写',
      lowercase: '小写',
      titleCase: '标题格式',
      sentenceCase: '句子格式',
      emojiStripper: '移除表情',
      hashtagExtractor: '提取话题标签',
      engineLabel: '优化引擎',
      clean: '清理多余空格',
      sanitize: '净化文本',
      clear: '清空编辑器',
      hiddenWarning:
        '发现了会破坏计数和屏幕阅读器的不可见字符：{codes}。净化以将其剥除。',
    },
    common: {
      profileName: '你的名字',
      handle: '@you',
      charsSuffix: '{n} 个字符',
    },
    sms: {
      eyebrow: '短信',
      title: '全球短信字符计数器',
      characterCount: '字符数',
      charactersLeft: '剩余字符',
      parts: '短信段数',
      encoding: '编码',
      encodingGsm: 'GSM 7位',
      encodingUnicode: 'Unicode',
      partsValue: '{n} 条',
      gsmNote:
        'GSM 7-bit：单条短信最多160个字符，拼接短信每段153个字符。扩展表字符如 €、[、]、{、}、\\ 和 | 按2个字符计算。',
      unicodeNote:
        'Unicode UTF-16：单条短信最多70个字符，拼接短信每段67个字符。只要包含任何表情符号或非GSM文字，就会使用此规则。',
    },
    linkedin: {
      title: '钩子区预览',
      viewAriaLabel: 'LinkedIn 折叠视图',
      viewDesktop: '桌面端',
      viewMobile: '移动端',
      badgeTruncated: '被截断的信息流文字',
      badgeOverLimit: '超过帖子上限',
      badgeSafe: '安全的钩子行',
      beforeFold: '折叠前 {total} / {limit}',
      postLimit: '{total} / {limit} 帖子上限',
      seeMore: '…查看更多',
      profileMeta: '创始人 · 1度人脉 · 刚刚',
      placeholder: '你帖子的开头几行会显示在这里……',
      overLimitNote:
        'LinkedIn 帖子最多 {limit} 个字符。发布前请缩短 {excess}。',
      truncatedNote:
        '读者在信息流里只能看到前 {limit} 个字符。把你的钩子放在折叠线之前。',
      safeNote:
        '你的整篇帖子都能放进 LinkedIn 的{view}折叠线以上——不会出现“…查看更多”截断。',
    },
    twitter: {
      title: '串文拆分器',
      badgeIdle: '空闲',
      badgeThread: '{n} 条推文的串文',
      badgeSingle: '单条推文',
      links: {
        one: '{n} 个链接 · 每个计为 {weight}',
        other: '{n} 个链接 · 每个计为 {weight}',
      },
      weightedLength: '计重长度',
      placeholder:
        '你的推文预览会显示在这里。超过 {limit} 个字符，它会自动拆分为串文。',
    },
    threads: {
      title: '帖子与串联预览',
      badgeIdle: '空闲',
      badgeThread: '{n} 条帖子的串链',
      badgeSingle: '单条帖子',
      links: {
        one: '{n} 个链接 · 按完整长度计算',
        other: '{n} 个链接 · 按完整长度计算',
      },
      charLength: '字符长度',
      placeholder:
        '你的 Threads 预览会显示在这里。超过 {limit} 个字符，它会串联成一段编号的帖子序列。',
    },
    meta: {
      title: '格式监测器',
      badgeNeedsFix: '需要修正',
      badgeClean: '看起来不错',
      badgeCaptionOver: '说明文字过长',
      captionLimit: '{total} / {limit} 说明文字上限',
      captionOver:
        'Instagram 说明文字最多 {limit} 个字符。发布前请缩短 {excess}。',
      hashtagLabel: '话题标签密度',
      over: '超过了 Instagram {limit} 个话题标签的硬性上限——标题将发布失败。请移除 {excess}。',
      approaching:
        '接近 5 个标签的上限。精简到你最有意图的标签。',
      within: '稳稳地在 Instagram 的 5 个话题标签限制之内。',
      none: '尚未检测到话题标签。',
      a11yLabel: '无障碍 · 花式字体',
      flagged: '已标记 {n} 个',
      flaggedNone: '无',
      fancyDetected: {
        one: '检测到 {n} 个伪 Unicode“字体”字符（𝖁𝖔𝖑𝖉 / 𝓼𝓬𝓻𝓲𝓹𝓽）。它们看似有样式，但屏幕阅读器会跳过或逐字拼读——既损害触达，也损害无障碍体验。',
        other:
          '检测到 {n} 个伪 Unicode“字体”字符（𝖁𝖔𝖑𝖉 / 𝓼𝓬𝓻𝓲𝓹𝓽）。它们看似有样式，但屏幕阅读器会跳过或逐字拼读——既损害触达，也损害无障碍体验。',
      },
      fancyClean:
        '未检测到伪字体字符。你的文字在辅助技术上读起来很干净。',
      footnote:
        '{n} 个字符 · Facebook 折叠 ≈ 480 · Instagram 标题上限 2,200',
    },
    keywords: {
      eyebrow: '关键词',
      title: '过度使用监测器',
      badgeIdle: '空闲',
      badgeStuffing: '关键词堆砌',
      badgeBalanced: '均衡',
      colKeyword: '关键词',
      colUses: '次数',
      colDensity: '密度',
      overused: '过度使用',
      empty: '开始输入即可查看你最常用的关键词及其密度。',
      stuffingNote:
        '高亮的关键词密度超过 {threshold}%——搜索引擎可能会将其视为关键词堆砌。请变换你的措辞。',
      footnote:
        '{total} 个词 · 密度超过 {threshold}% 的关键词将被标记',
    },
    seoPreview: {
      eyebrow: 'SEO 预览',
      title: 'Google 搜索结果模拟器',
      badgeIdle: '空闲',
      badgeSafe: '良好',
      badgeWarn: '超出限制',
      titleLabel: '页面标题',
      titleCounter: '{n} / {limit}',
      pixelNote: '~{px}px · Google 截断于 ~{max}px',
      titleOverChar:
        '标题超过 {limit} 个字符——Google 可能在搜索结果中截断。',
      titleOverPixel:
        '标题在搜索结果中可能被截断（~{max}px 渲染限制）。',
      descLabel: '元描述',
      descCounter: '{n} / {limit}',
      descOverChar: '描述超过 {limit} 个字符。',
      previewLabel: 'Google 搜索预览',
      titlePlaceholder: '您的页面标题…',
      descPlaceholder: '为搜索结果提供的页面简短描述…',
    },
    readability: {
      eyebrow: '可读性',
      title: 'Flesch 阅读易度',
      scoreLabel: '阅读易度',
      gradeLabel: '年级水平',
      descriptors: {
        veryEasy: '非常容易',
        easy: '容易',
        fairlyEasy: '比较容易',
        standard: '标准',
        fairlyDifficult: '比较困难',
        difficult: '困难',
        veryDifficult: '非常困难',
      },
      tooltip:
        'Flesch 阅读易度在 0–100 的范围内对文本进行评分。分数越高，越容易阅读。60–70 分属于标准散文水平。',
      notApplicable:
        'Flesch 公式专为拉丁字母文本设计，不适用于中文。建议以字数作为主要的可读性衡量标准。',
    },
    toolLinks: {
      linkedin: '了解LinkedIn字符限制 →',
      twitter: '了解X / Twitter字符限制 →',
      instagram: '了解Instagram字符限制 →',
      facebook: '了解Facebook字符限制 →',
      threads: '了解Threads字符限制 →',
    },
    embed: {
      placeholder: '开始输入以统计字符数…',
      charCount: '字符数',
      wordCount: '字数',
      remaining: '还剩 {n} 个字符',
      overLimit: '超出 {n} 个字符',
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
