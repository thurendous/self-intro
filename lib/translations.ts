const en = {
  meta: {
    title: "Mark Wu | Blockchain engineer in Tokyo",
    description:
      "Mark Wu is a blockchain engineer based in Tokyo. Personal introduction, current products and project experience.",
  },
  ui: {
    skip: "Skip to content",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    mainNav: "Main",
    language: "Language",
    externalNote: "(opens in a new tab)",
  },
  nav: {
    products: "Products",
    about: "About",
    experience: "Experience",
    skills: "Skills",
    contact: "Contact",
  },
  hero: {
    name: "Mark Wu",
    role: "Blockchain engineer in Tokyo",
    intro:
      "I write and audit smart contracts, and I build small web products of my own. I work in Chinese, Japanese and English.",
    ctaProducts: "See my products",
    ctaContact: "Find me online",
  },
  products: {
    title: "Products",
    intro: "Two products you can open now.",
    open: "Open",
    items: {
      tickspace: {
        name: "Tickspace",
        summary: "A shared space for a family's values, long-term goals and daily to-dos.",
        note: "For families who want to keep what matters in view next to what is due today.",
      },
      jpycWatcher: {
        name: "JPYC Watcher",
        summary: "A dashboard for JPYC pool TVL, trading volume and estimated APY.",
        note: "APY figures are estimates, not guaranteed returns.",
      },
    },
  },
  about: {
    title: "About",
    paragraphs: [
      "I'm a blockchain engineer based in Tokyo. I have worked on smart contract development and security auditing for Web3 projects, including JPYC v2 and SPARKN.",
      "I take a long-term view of Web3, try to keep learning outside my comfort zone, and keep up with new technology such as AI.",
    ],
  },
  experience: {
    title: "Project experience",
    intro: "Earlier project work. The products above are what I am building now.",
    view: "View",
    items: {
      jpyc: {
        title: "JPYC v2",
        desc: "Development and smart contract auditing for JPYC v2, a JPY stablecoin protocol.",
      },
      sparknContracts: {
        title: "SPARKN Contracts",
        desc: "Smart contract development and security auditing for SPARKN, a decentralized contest platform.",
      },
      dao: {
        title: "DAO Community Contracts",
        desc: "Governance contracts for community DAOs, covering proposals, voting and treasury management, with an audit.",
      },
      sparknApp: {
        title: "SPARKN App",
        desc: "Full-stack work on SPARKN, from smart contracts and backend services to the front end.",
      },
      security: {
        title: "Security research",
        desc: "Independent security researcher on Code4rena, Sherlock and CodeHawks, finding vulnerabilities in several protocols. I have also commissioned audits as a project owner.",
      },
      agentNft: {
        title: "AI Agent NFT project",
        desc: "NFTs linked to AI agents, putting agents on-chain as tradable assets. I was project manager, responsible for planning and coordination.",
      },
      health: {
        title: "Health check app on-chain solution",
        desc: "An on-chain design with a token, identity NFTs and a DAO for a health check app. I handled design, development, testing, audit and documentation on my own.",
      },
    },
  },
  skills: {
    title: "Skills",
    groups: {
      blockchain: "Blockchain and security",
      frontend: "Front end",
      backend: "Back end and infrastructure",
      tools: "Tools",
    },
  },
  contact: {
    title: "Contact",
    desc: "You can find me on GitHub and X.",
    links: { github: "GitHub", x: "X" },
  },
  footer: {
    copy: "© Mark Wu",
  },
};

export type Translation = typeof en;

const ja: Translation = {
  meta: {
    title: "Mark Wu | 東京のブロックチェーンエンジニア",
    description:
      "東京を拠点とするブロックチェーンエンジニア Mark Wu の自己紹介。現在のプロダクトとプロジェクト実績をまとめています。",
  },
  ui: {
    skip: "本文へスキップ",
    menuOpen: "メニューを開く",
    menuClose: "メニューを閉じる",
    mainNav: "メイン",
    language: "言語",
    externalNote: "(新しいタブで開きます)",
  },
  nav: {
    products: "プロダクト",
    about: "自己紹介",
    experience: "実績",
    skills: "スキル",
    contact: "連絡先",
  },
  hero: {
    name: "Mark Wu",
    role: "東京のブロックチェーンエンジニア",
    intro:
      "スマートコントラクトの開発と監査に取り組み、自分でも小さなWebプロダクトを作っています。日本語・中国語・英語で仕事をしています。",
    ctaProducts: "プロダクトを見る",
    ctaContact: "ネット上の連絡先",
  },
  products: {
    title: "プロダクト",
    intro: "今すぐ開ける2つのプロダクトです。",
    open: "開く",
    items: {
      tickspace: {
        name: "Tickspace",
        summary: "家族の価値観、長期目標、毎日のToDoを共有するためのスペース。",
        note: "大切にしたいことと、今日やることを並べて見られるようにします。",
      },
      jpycWatcher: {
        name: "JPYC Watcher",
        summary: "JPYCプールのTVL、取引量、推定APYを確認できるダッシュボード。",
        note: "APYは推定値であり、収益を保証するものではありません。",
      },
    },
  },
  about: {
    title: "自己紹介",
    paragraphs: [
      "東京を拠点とするブロックチェーンエンジニアです。JPYC v2やSPARKNをはじめ、Web3プロジェクトのスマートコントラクト開発とセキュリティ監査に携わってきました。",
      "Web3を長期的な視点で捉え、コンフォートゾーンの外でも学び続けること、そしてAIなど新しい技術を追いかけることを大切にしています。",
    ],
  },
  experience: {
    title: "プロジェクト実績",
    intro: "これまでのプロジェクトです。現在取り組んでいるのは上のプロダクトです。",
    view: "見る",
    items: {
      jpyc: {
        title: "JPYC v2",
        desc: "円建てステーブルコインJPYC v2の開発とスマートコントラクト監査。",
      },
      sparknContracts: {
        title: "SPARKN Contracts",
        desc: "分散型コンテストプラットフォームSPARKNのスマートコントラクト開発とセキュリティ監査。",
      },
      dao: {
        title: "DAO Community Contracts",
        desc: "コミュニティ型DAOのガバナンスコントラクト。提案、投票、財務管理を備え、監査も実施。",
      },
      sparknApp: {
        title: "SPARKN App",
        desc: "SPARKNのフルスタック開発。スマートコントラクト、バックエンド、フロントエンドを担当。",
      },
      security: {
        title: "セキュリティリサーチ",
        desc: "Code4rena、Sherlock、CodeHawksで独立系リサーチャーとして活動し、複数のプロトコルで脆弱性を発見。プロジェクトオーナーとして監査を依頼した経験もあります。",
      },
      agentNft: {
        title: "AI Agent NFTプロジェクト",
        desc: "AI Agentと連携したNFTを発行し、Agentをオンチェーン資産として取引できるようにしました。プロジェクトマネージャーとして計画と調整を担当。",
      },
      health: {
        title: "健康チェックアプリのオンチェーンソリューション",
        desc: "健康チェックアプリ向けに、トークン、IDのNFT、DAOを組み合わせたオンチェーン設計を提供。設計、開発、テスト、監査、ドキュメントまで一人で担当。",
      },
    },
  },
  skills: {
    title: "スキル",
    groups: {
      blockchain: "ブロックチェーンとセキュリティ",
      frontend: "フロントエンド",
      backend: "バックエンドとインフラ",
      tools: "ツール",
    },
  },
  contact: {
    title: "連絡先",
    desc: "GitHubとXにいます。",
    links: { github: "GitHub", x: "X" },
  },
  footer: {
    copy: "© Mark Wu",
  },
};

const zh: Translation = {
  meta: {
    title: "Mark Wu | 东京的区块链工程师",
    description: "Mark Wu 的个人介绍：常驻东京的区块链工程师，这里有他目前的产品和项目经验。",
  },
  ui: {
    skip: "跳到正文",
    menuOpen: "打开菜单",
    menuClose: "关闭菜单",
    mainNav: "主导航",
    language: "语言",
    externalNote: "（在新标签页打开）",
  },
  nav: {
    products: "产品",
    about: "关于我",
    experience: "项目经验",
    skills: "技能",
    contact: "联系",
  },
  hero: {
    name: "Mark Wu",
    role: "东京的区块链工程师",
    intro: "我编写并审计智能合约，也自己开发小型 Web 产品。工作语言是中文、日语和英语。",
    ctaProducts: "查看我的产品",
    ctaContact: "在网上找到我",
  },
  products: {
    title: "产品",
    intro: "两个现在就能打开的产品。",
    open: "打开",
    items: {
      tickspace: {
        name: "Tickspace",
        summary: "与家人共享价值观、长期目标和每日待办的空间。",
        note: "把重要的事和今天要做的事放在一起看。",
      },
      jpycWatcher: {
        name: "JPYC Watcher",
        summary: "查看 JPYC 资金池 TVL、交易量和预估 APY 的仪表盘。",
        note: "APY 为预估值，不代表保证收益。",
      },
    },
  },
  about: {
    title: "关于我",
    paragraphs: [
      "我是常驻东京的区块链工程师，参与过多个 Web3 项目的智能合约开发与安全审计，包括 JPYC v2 和 SPARKN。",
      "我对 Web3 抱着长期视角，愿意走出舒适区持续学习，也关注 AI 等新技术。",
    ],
  },
  experience: {
    title: "项目经验",
    intro: "以往的项目。我目前正在做的是上面的产品。",
    view: "查看",
    items: {
      jpyc: {
        title: "JPYC v2",
        desc: "日元稳定币协议 JPYC v2 的开发与智能合约审计。",
      },
      sparknContracts: {
        title: "SPARKN Contracts",
        desc: "去中心化竞赛平台 SPARKN 的智能合约开发与安全审计。",
      },
      dao: {
        title: "DAO Community Contracts",
        desc: "面向社区 DAO 的治理合约，包含提案、投票和国库管理，并完成审计。",
      },
      sparknApp: {
        title: "SPARKN App",
        desc: "SPARKN 的全栈开发，涵盖智能合约、后端服务和前端。",
      },
      security: {
        title: "安全研究",
        desc: "以独立安全研究员身份活跃于 Code4rena、Sherlock 和 CodeHawks，在多个协议中发现漏洞。也有作为项目方委托审计的经验。",
      },
      agentNft: {
        title: "AI Agent NFT 项目",
        desc: "发行与 AI Agent 关联的 NFT，让 Agent 以链上资产的形式交易。担任项目经理，负责规划与协调。",
      },
      health: {
        title: "健康检查 App 链上方案",
        desc: "为健康检查应用设计包含代币、身份 NFT 和 DAO 的链上方案。设计、开发、测试、审计和文档均由我独立完成。",
      },
    },
  },
  skills: {
    title: "技能",
    groups: {
      blockchain: "区块链与安全",
      frontend: "前端",
      backend: "后端与基础设施",
      tools: "工具",
    },
  },
  contact: {
    title: "联系",
    desc: "可以在 GitHub 和 X 上找到我。",
    links: { github: "GitHub", x: "X" },
  },
  footer: {
    copy: "© Mark Wu",
  },
};

export const translations = { en, ja, zh } as const;

export type Language = keyof typeof translations;

export const languages: readonly { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
  { code: "zh", label: "中文" },
];

export const defaultLanguage: Language = "en";

export function isLanguage(value: unknown): value is Language {
  return typeof value === "string" && value in translations;
}
