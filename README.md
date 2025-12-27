# Mark.dev - Personal Portfolio

一个现代化的个人作品集网站，使用 Next.js 14 构建，支持多语言（中文/英文/日文）。

## 预览

🌐 [在线访问](https://markwu.github.io/self-intro/)

## 技术栈

- **框架**: Next.js 14
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **图标**: Lucide React
- **代码质量**: Biome (格式化 + Lint)

## 快速开始

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建

```bash
npm run build
```

## 可用脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run start` | 启动生产服务器 |
| `npm run lint` | 运行 ESLint |
| `npm run format` | 使用 Biome 格式化代码 |
| `npm run check` | 运行 Biome 检查 |
| `npm run check:fix` | 运行 Biome 检查并自动修复 |

## 项目结构

```
├── app/
│   ├── components/     # React 组件
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── globals.css     # 全局样式
│   ├── layout.tsx      # 根布局
│   └── page.tsx        # 首页
├── lib/
│   ├── LanguageContext.tsx  # 多语言上下文
│   ├── translations.ts      # 翻译文件
│   └── utils.ts             # 工具函数
├── public/             # 静态资源
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Pages 部署配置
```

## 部署

本项目配置为部署到 GitHub Pages。详细部署步骤请参考 [DEPLOY.md](./DEPLOY.md)。

### 快速部署

1. Fork 或克隆此仓库
2. 修改 `next.config.mjs` 中的 `basePath`（如需要）
3. 推送到 GitHub
4. 在仓库 Settings > Pages 中选择 "GitHub Actions" 作为源
5. 代码推送到 `main` 分支时会自动部署

## 自定义

### 修改个人信息

编辑 `lib/translations.ts` 文件，更新你的个人信息、项目经历等。

### 修改样式

- 全局样式：`app/globals.css`
- Tailwind 配置：`tailwind.config.ts`
- 组件样式：各组件文件中的 Tailwind 类名

## License

MIT

