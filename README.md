# ZolaMenu - 园区点餐APP

基于 Vue 3 + Vite + Pinia 开发的现代化园区点餐应用，提供完整的点餐、购物车、订单管理功能。

## ✨ 功能特性

### 🍽️ 菜品展示
- 精美的菜品卡片展示，包含高清图片、名称、描述、价格
- 实时显示销量和评分信息
- 智能标签系统（热销、新品、推荐）
- 分类筛选功能（全部、热菜、海鲜、素菜、汤品、主食）
- 点击查看菜品详情弹窗

### 🛒 购物车管理
- 侧边抽屉式购物车，操作便捷
- 支持添加/减少商品数量
- 一键删除商品
- 实时计算商品数量和总价
- 空购物车状态友好提示

### 📝 订单结算
- 完整的收货信息表单（姓名、手机、地址）
- 订单商品清单展示
- 订单备注功能
- 自动计算配送费和总价
- 表单验证确保信息完整

### ✅ 订单确认
- 订单提交成功弹窗
- 显示订单编号、金额、收货信息
- 订单商品明细展示
- 优雅的成功动画效果

### 📱 响应式设计
- 完美适配桌面端和移动端
- 流畅的动画过渡效果
- 自定义滚动条样式
- 优化的触摸交互体验

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:3000 即可使用

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 📖 使用流程

1. **浏览菜品** - 在首页浏览所有菜品，可按分类筛选
2. **添加菜品** - 点击"加入购物车"按钮，或点击卡片查看详情后添加
3. **管理购物车** - 点击右上角购物车图标，调整数量或删除商品
4. **结算订单** - 点击"去结算"，填写收货信息
5. **提交订单** - 确认信息无误后提交订单
6. **订单确认** - 查看订单成功确认信息

## 🛠️ 技术栈

### 核心框架
- **Vue 3** (v3.4.0) - 渐进式 JavaScript 框架，使用 Composition API
- **Vite** (v5.0.0) - 下一代前端构建工具，提供极速的开发体验
- **Pinia** (v2.1.7) - Vue 3 官方推荐的状态管理库
- **Vue Router** (v4.2.5) - Vue.js 官方路由管理器

### 开发工具
- **@vitejs/plugin-vue** (v5.0.0) - Vite 的 Vue 3 插件
- **Node.js** (推荐 v18.x 或更高版本) - JavaScript 运行环境
- **npm** (推荐 v9.x 或更高版本) - 包管理器

### 浏览器支持
- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)
- 移动端浏览器 (iOS Safari, Chrome Mobile)

## 📁 项目结构

```
zolamenu/
├── src/
│   ├── assets/
│   │   └── styles.css          # 全局样式
│   ├── components/
│   │   ├── DishCard.vue        # 菜品卡片组件
│   │   ├── DishDetailModal.vue # 菜品详情弹窗
│   │   ├── CartDrawer.vue      # 购物车抽屉
│   │   └── SuccessModal.vue    # 订单成功弹窗
│   ├── data/
│   │   └── menu.js             # 菜品数据
│   ├── router/
│   │   └── index.js            # 路由配置
│   ├── stores/
│   │   ├── cart.js             # 购物车状态管理
│   │   └── order.js            # 订单状态管理
│   ├── views/
│   │   ├── MenuPage.vue        # 菜单页面
│   │   └── CheckoutPage.vue    # 结算页面
│   ├── App.vue                 # 根组件
│   └── main.js                 # 入口文件
├── index.html                  # HTML 模板
├── package.json                # 项目配置
└── vite.config.js              # Vite 配置
```

## 🎨 核心组件说明

### DishCard
菜品卡片组件，展示菜品基本信息，支持点击查看详情和加入购物车。

### DishDetailModal
菜品详情弹窗，展示菜品完整信息，包含大图、标签、描述、价格等。

### CartDrawer
购物车抽屉组件，支持商品数量调整、删除、总价计算等功能。

### SuccessModal
订单成功弹窗，展示订单确认信息，包含订单详情和商品列表。

## 💡 特色功能

- **状态管理**：使用 Pinia 进行集中式状态管理，购物车和订单数据持久化
- **路由管理**：使用 Vue Router 实现单页应用路由切换
- **组件化开发**：高度模块化的组件设计，便于维护和扩展
- **响应式布局**：使用 CSS Grid 和 Flexbox 实现自适应布局
- **动画效果**：流畅的过渡动画，提升用户体验

## 📝 开发说明

### 添加新菜品
在 `src/data/menu.js` 中添加新的菜品对象：

```javascript
{
  id: 13,
  name: '菜品名称',
  category: '分类',
  price: 99,
  image: '图片URL',
  description: '菜品描述',
  tags: ['hot', 'new', 'recommend'],
  sales: 100,
  rating: 4.8
}
```

### 修改分类
在 `src/data/menu.js` 中修改 `categories` 数组即可。

## 📄 许可证

MIT License

## 👨‍💻 作者

ZolaMenu Team
