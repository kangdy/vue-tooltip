<script setup lang="ts">
import { ref } from 'vue'
import Tooltip from '../src/tooltip/tooltip.vue'

const customText = ref('这是自定义 tooltip 文本内容，即使内容没有溢出也可以强制显示')
</script>

<template>
  <div class="demo-page">
    <div class="demo-content">
      <div class="demo-header">
        <div class="logo">
          <span class="logo-icon">T</span>
        </div>
        <h1 class="demo-title">vue-text-tooltip</h1>
        <p class="demo-desc">简洁优雅的文本省略提示组件</p>
      </div>

      <div class="demo-sections">
        <div class="demo-section">
          <h3 class="section-title">基础用法</h3>
          <div class="demo-grid">
            <div class="demo-item">
              <div class="item-title">文本溢出</div>
              <div class="item-content">
                <Tooltip>
                  这是一段很长的文本内容，超出容器宽度时自动显示省略号
                </Tooltip>
              </div>
            </div>
            <div class="demo-item">
              <div class="item-title">文本未溢出</div>
              <div class="item-content">
                <Tooltip>
                  这是一段短文本
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <h3 class="section-title">显示位置</h3>
          <div class="demo-grid">
            <div class="demo-item">
              <div class="item-title">top</div>
              <div class="item-content">
                <Tooltip placement="top">
                  上方显示
                </Tooltip>
              </div>
            </div>
            <div class="demo-item">
              <div class="item-title">bottom</div>
              <div class="item-content">
                <Tooltip placement="bottom">
                  下方显示
                </Tooltip>
              </div>
            </div>
            <div class="demo-item">
              <div class="item-title">left</div>
              <div class="item-content">
                <Tooltip placement="left">
                  左侧显示
                </Tooltip>
              </div>
            </div>
            <div class="demo-item">
              <div class="item-title">right</div>
              <div class="item-content">
                <Tooltip placement="right">
                  右侧显示
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <h3 class="section-title">主题样式</h3>
          <div class="demo-grid">
            <div class="demo-item">
              <div class="item-title">dark</div>
              <div class="item-content">
                <Tooltip theme="dark">
                  深色主题
                </Tooltip>
              </div>
            </div>
            <div class="demo-item">
              <div class="item-title">light</div>
              <div class="item-content">
                <Tooltip theme="light">
                  浅色主题
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <h3 class="section-title">高级选项</h3>
          <div class="demo-grid">
            <div class="demo-item">
              <div class="item-title">forceShow</div>
              <div class="item-content">
                <Tooltip :force-show="true" :text="customText">
                  强制显示提示
                </Tooltip>
              </div>
            </div>
            <div class="demo-item">
              <div class="item-title">maxWidth</div>
              <div class="item-content large">
                <Tooltip :max-width="180">
                  限制最大宽度的长文本内容
                </Tooltip>
              </div>
            </div>
            <div class="demo-item">
              <div class="item-title">delay</div>
              <div class="item-content">
                <Tooltip :delay="500">
                  延迟 500ms 显示
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="demo-footer">
        <a href="https://github.com/kangdy/vue-tooltip" target="_blank">GitHub</a>
        <a href="https://www.npmjs.com/package/vue-text-tooltip" target="_blank">npm</a>
      </div>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica,
    Arial, sans-serif;
  background: #f5f5f5;
  color: #1f1f1f;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.demo-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}

.demo-content {
  width: 100%;
  max-width: 960px;
}

.demo-header {
  text-align: center;
  margin-bottom: 60px;
}

.logo {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: 0 12px 24px rgba(99, 102, 241, 0.2);
}

.logo-icon {
  color: white;
  font-size: 28px;
  font-weight: 700;
}

.demo-title {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
  color: #1f1f1f;
}

.demo-desc {
  font-size: 16px;
  color: #666;
  font-weight: 400;
}

.demo-sections {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.demo-section {
  background: white;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e5e5;
}

.section-title {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.demo-item {
  background: #fafafa;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #eeeeee;
  transition: all 0.2s ease;
}

.demo-item:hover {
  background: #f5f5f5;
  border-color: #e0e0e0;
}

.item-title {
  font-size: 13px;
  font-weight: 500;
  color: #555;
  margin-bottom: 12px;
  font-family: 'SF Mono', Monaco, 'Courier New', monospace;
}

.item-content {
  width: 200px;
  background: white;
  border-radius: 6px;
  padding: 12px 14px;
  border: 1px solid #e8e8e8;
  font-size: 14px;
}

.item-content.large {
  width: 260px;
}

.demo-footer {
  margin-top: 40px;
  text-align: center;
}

.demo-footer a {
  color: #6366f1;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  margin: 0 16px;
  transition: color 0.2s;
}

.demo-footer a:hover {
  color: #4f46e5;
  text-decoration: underline;
}
</style>
