# vue-text-tooltip

[简体中文](./README_zh.md) | English

A Vue 3 component that automatically shows ellipsis when text overflows and displays the full content on hover.

## Features

- 📝 Automatic ellipsis detection for text overflow
- 💫 Display full content on hover
- 🎨 Dark and light themes
- 📍 Multiple placement options (top/bottom/left/right)
- ⚡ Lightweight, built with @popperjs/core
- 🔧 Configurable max width and delay

## Installation

```bash
npm install vue-text-tooltip
```

or

```bash
yarn add vue-text-tooltip
```

## Quick Start

### Global Usage

```typescript
import { createApp } from 'vue'
import Tooltip from 'vue-text-tooltip'
import App from './App.vue'

const app = createApp(App)
app.use(Tooltip)
app.mount('#app')
```

### Local Usage

```vue
<script setup lang="ts">
import Tooltip from 'vue-text-tooltip'
</script>

<template>
  <Tooltip>
    This is a very long text that will show ellipsis when it overflows
  </Tooltip>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| text | string | - | Custom tooltip text (if not provided, uses the slot content) |
| placement | string | 'top' | Tooltip placement: 'top', 'bottom', 'left', 'right', 'auto' |
| theme | string | 'dark' | Theme color: 'dark' or 'light' |
| forceShow | boolean | false | Force tooltip to show even if text doesn't overflow |
| maxWidth | number | 300 | Maximum width of tooltip (pixels) |
| delay | number | 0 | Delay before showing tooltip (milliseconds) |

## Examples

### Basic Usage

```vue
<Tooltip>
  This is a very long text that will show ellipsis when it overflows
</Tooltip>
```

### Different Placements

```vue
<Tooltip placement="top">Top placement</Tooltip>
<Tooltip placement="bottom">Bottom placement</Tooltip>
<Tooltip placement="left">Left placement</Tooltip>
<Tooltip placement="right">Right placement</Tooltip>
```

### Theme Options

```vue
<Tooltip theme="dark">Dark theme</Tooltip>
<Tooltip theme="light">Light theme</Tooltip>
```

### Advanced Options

```vue
<!-- Force show even if not overflowing -->
<Tooltip :force-show="true" text="Custom tooltip text">
  Short text
</Tooltip>

<!-- Custom max width -->
<Tooltip :max-width="200">
  Long text with custom max width
</Tooltip>

<!-- Delay showing tooltip -->
<Tooltip :delay="500">
  Shows tooltip after 500ms delay
</Tooltip>
```

## License

MIT
