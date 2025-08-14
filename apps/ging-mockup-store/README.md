# 极简T恤商店 (Ging Mockup Store)

一个极简主义的T恤电商网站，采用 Next.js 15、TypeScript、Tailwind CSS 和 Payload CMS 构建。

## 特性

- 🎨 **极简设计**: 纯净的单色美学，垂直中文导航
- 📱 **响应式布局**: 桌面端固定侧边栏，移动端底部导航
- 🛍️ **产品展示**: 带无限滚动的产品网格
- 🌐 **中文界面**: 完全中文化的用户界面
- 📝 **Payload CMS**: 内置内容管理系统
- ⚡ **高性能**: Next.js 15 与优化的图片加载

## 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS v4
- **国际化**: next-intl (简体中文)
- **CMS**: Payload CMS 3.0
- **数据库**: SQLite

## 开始使用

### 环境要求

- Node.js 18+
- pnpm 8+

### 安装步骤

1. **安装依赖**
   ```bash
   pnpm install
   ```

2. **配置环境变量**
   创建 `.env` 文件：
   ```env
   PAYLOAD_SECRET=your-secret-key-here
   DATABASE_URI=file:./payload.db
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. **初始化数据库**
   ```bash
   pnpm payload migrate
   ```

4. **启动开发服务器**
   ```bash
   pnpm dev
   ```

5. **访问应用**
   - 网站: http://localhost:3000
   - CMS后台: http://localhost:3000/admin

## CMS 结构

### 集合 (Collections)

1. **产品 (Products)**
   - 产品名称
   - 价格
   - 产品图片
   - 产品描述
   - 库存状态
   - SEO字段

2. **媒体 (Media)**
   - 图片上传管理
   - 替代文本

3. **导航 (Navigation)**
   - 菜单项管理
   - 链接配置

### 全局设置 (Globals)

- **网站设置**
  - 网站名称
  - 标语
  - 主页内容
  - 默认SEO设置

## 项目结构

```
ging-mockup-store/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx    # 主布局
│   │   └── page.tsx      # 主页
│   └── globals.css       # 全局样式
├── components/
│   ├── layout/
│   │   └── Sidebar.tsx   # 侧边栏/导航
│   ├── products/
│   │   ├── ProductCard.tsx    # 产品卡片
│   │   └── ProductGrid.tsx    # 产品网格
│   └── sections/
│       └── Hero.tsx      # 主标题区域
├── i18n/                 # 国际化配置
├── messages/
│   └── zh.json          # 中文翻译
├── payload.config.ts    # Payload CMS配置
└── next.config.ts       # Next.js配置
```

## 可用命令

```bash
# 开发
pnpm dev          # 启动开发服务器

# 构建
pnpm build        # 构建生产版本
pnpm start        # 启动生产服务器

# 代码质量
pnpm lint         # 运行ESLint
pnpm check-types  # TypeScript类型检查

# CMS
pnpm payload      # Payload CLI命令
```

## 自定义配置

### 修改主题颜色

编辑 `app/globals.css` 中的CSS变量：
```css
:root {
  --background: #ffffff;
  --foreground: #333333;
  --gray-600: #666666;
  --gray-800: #333333;
  --black: #000000;
}
```

### 添加真实产品图片

1. 上传图片到CMS媒体库
2. 在产品管理中创建新产品
3. 更新 `components/products/ProductGrid.tsx` 以从CMS获取产品数据

### 部署

项目可以部署到任何支持 Next.js 的平台：

- **Vercel** (推荐)
- **Netlify**
- **自托管服务器**

确保在生产环境中设置所有必要的环境变量。

## 许可证

私有项目

---

如有问题或需要帮助，请联系开发团队。