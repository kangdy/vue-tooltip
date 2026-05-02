# vue-text-tooltip

一个 Vue 3 组件，当文本溢出时自动显示省略号，并在鼠标悬停时显示完整内容。

## 特性

- 📝 自动检测文本溢出并显示省略号
- 💫 鼠标悬停显示完整内容
- 🎨 支持深色和浅色主题
- 📍 多种位置选项（上/下/左/右/自动）
- ⚡ 轻量级，基于 @popperjs/core 构建
- 🔧 可配置最大宽度和延迟

## 安装

```bash
npm install vue-text-tooltip
```

或

```bash
yarn add vue-text-tooltip
```

## 快速开始

### 全局使用

```typescript
import { createApp } from 'vue'
import Tooltip from 'vue-text-tooltip'
import App from './App.vue'

const app = createApp(App)
app.use(Tooltip)
app.mount('#app')
```

### 局部使用

```vue
<script setup lang="ts">
import Tooltip from 'vue-text-tooltip'
</script>

<template>
  <Tooltip>
    这是一段很长的文本，当它溢出时会显示省略号
  </Tooltip>
</template>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|---------|-------------|
| text | string | - | 自定义 tooltip 文本（如果不提供，则使用插槽内容） |
| placement | string | 'top' | Tooltip 位置：'top', 'bottom', 'left', 'right', 'auto' |
| theme | string | 'dark' | 主题颜色：'dark' 或 'light' |
| forceShow | boolean | false | 强制显示 tooltip，即使文本没有溢出 |
| maxWidth | number | 300 | Tooltip 最大宽度（像素） |
| delay | number | 0 | 显示 tooltip 前的延迟（毫秒） |

## 示例

### 基础用法

```vue
<Tooltip>
  这是一段很长的文本，当它溢出时会显示省略号
</Tooltip>
```

### 不同位置

```vue
<Tooltip placement="top">上方显示</Tooltip>
<Tooltip placement="bottom">下方显示</Tooltip>
<Tooltip placement="left">左侧显示</Tooltip>
<Tooltip placement="right">右侧显示</Tooltip>
```

### 主题选项

```vue
<Tooltip theme="dark">深色主题</Tooltip>
<Tooltip theme="light">浅色主题</Tooltip>
```

### 高级选项

```vue
<!-- 即使没有溢出也强制显示 -->
<Tooltip :force-show="true" text="自定义 tooltip 文本">
  短文本
</Tooltip>

<!-- 自定义最大宽度 -->
<Tooltip :max-width="200">
  带有自定义最大宽度的长文本
</Tooltip>

<!-- 延迟显示 tooltip -->
<Tooltip :delay="500">
  500ms 延迟后显示 tooltip
</Tooltip>
```

## 许可证

MIT
