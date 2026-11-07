# GitHub Pages 部署指南

## 📋 前置条件

1. ✅ 项目已配置为静态导出（`output: 'export'`）
2. ✅ GitHub Actions workflow 已创建（`.github/workflows/deploy.yml`）

## 🚀 部署步骤

### 步骤 1: 确认 basePath

默认 `basePath` 为 `/self-intro`，对应 `https://<用户名>.github.io/self-intro/`，workflow 无需任何环境变量。

`basePath` 由环境变量 `SITE_BASE_PATH` 控制（见 `lib/site.mjs`），不要再手动修改 `next.config.mjs`。切换到根路径属于需要协调的迁移，步骤见 `README.md` 的 “Future root migration”，在迁移完成前不要改动 workflow 或默认值。

### 步骤 2: 推送代码到 GitHub

```bash
# 如果还没有初始化 git 仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 添加远程仓库（替换 <你的用户名> 和 <仓库名>）
git remote add origin https://github.com/<你的用户名>/<仓库名>.git

# 推送到 main 分支（如果 GitHub 默认分支是 master，改为 master）
git branch -M main
git push -u origin main
```

### 步骤 3: 在 GitHub 上启用 Pages

1. 打开你的 GitHub 仓库页面
2. 点击 **Settings**（设置）
3. 在左侧菜单中找到 **Pages**（页面）
4. 在 **Source**（源）部分：
   - 选择 **GitHub Actions**（不是 "Deploy from a branch"）
5. 保存设置

### 步骤 4: 触发部署

有两种方式触发部署：

#### 方式 A：自动部署（推荐）
- 当你推送代码到 `main` 分支时，GitHub Actions 会自动构建和部署

#### 方式 B：手动触发
1. 在仓库页面点击 **Actions** 标签
2. 选择 **Deploy to GitHub Pages** workflow
3. 点击 **Run workflow** 按钮

### 步骤 5: 等待部署完成

1. 在 **Actions** 标签页查看部署进度
2. 等待所有步骤显示 ✅（通常需要 2-5 分钟）
3. 部署完成后，在 **Settings > Pages** 中可以看到你的网站 URL

## 🔍 验证部署

访问你的网站：
- 如果仓库名是 `<username>.github.io`：`https://<username>.github.io/`
- 如果仓库名是其他名字：`https://<username>.github.io/<仓库名>/`

## ⚠️ 常见问题

### 1. 404 错误
- **原因**：`basePath` 配置不正确
- **解决**：检查构建时的 `SITE_BASE_PATH`（默认 `/self-intro`）是否与实际访问路径匹配

### 2. 样式或资源加载失败
- **原因**：路径问题
- **解决**：确保 `basePath` 配置正确，重新构建和部署

### 3. GitHub Actions 失败
- 检查 Actions 日志中的错误信息
- 确保 `package.json` 中的构建脚本正确
- 确保所有依赖都已正确安装

### 4. 图片不显示
- 已配置 `images: { unoptimized: true }`，确保图片路径正确

## 📝 更新网站

每次更新代码后：
1. 提交并推送到 `main` 分支
2. GitHub Actions 会自动重新部署
3. 等待几分钟后刷新网站即可看到更新

## 🎉 完成！

部署成功后，你的个人介绍网站就可以通过 GitHub Pages 访问了！


