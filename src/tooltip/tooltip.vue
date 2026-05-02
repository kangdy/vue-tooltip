<template>
  <div
    ref="containerRef"
    class="v-tooltip-container"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { createPopper, type Instance } from '@popperjs/core'
import type { Placement } from '@popperjs/core'
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

interface TooltipProps {
  text?: string
  placement?: Placement
  theme?: 'dark' | 'light'
  forceShow?: boolean
  maxWidth?: number
  delay?: number
}

const props = withDefaults(defineProps<TooltipProps>(), {
  theme: 'dark',
  placement: 'top',
  forceShow: false,
  maxWidth: 300,
  delay: 0,
})

let tooltipDom: HTMLElement | null = null
let popperInstance: Instance | null = null
let showTimer: ReturnType<typeof setTimeout> | null = null

const containerRef = ref<HTMLElement | null>(null)

onMounted(() => {
  initTooltip()
})

onBeforeUnmount(() => {
  destroyTooltip()
})

function initTooltip() {
  if (!containerRef.value) return

  tooltipDom = document.createElement('div')
  tooltipDom.className = `v-tooltip ${props.theme}`
  tooltipDom.setAttribute('role', 'tooltip')
  tooltipDom.style.maxWidth = `${props.maxWidth}px`
  tooltipDom.style.display = 'none'

  const body = document.querySelector('body')
  if (body) {
    body.appendChild(tooltipDom)
  }
}

function destroyTooltip() {
  if (showTimer) {
    clearTimeout(showTimer)
    showTimer = null
  }

  if (popperInstance) {
    popperInstance.destroy()
    popperInstance = null
  }

  if (tooltipDom && tooltipDom.parentNode) {
    tooltipDom.parentNode.removeChild(tooltipDom)
    tooltipDom = null
  }
}

function isTextOverflow(el: HTMLElement): boolean {
  if (props.forceShow) return true

  const text = props.text || el.textContent || ''
  if (!text.trim()) return false

  const clone = document.createElement('div')
  const style = getComputedStyle(el)
  clone.style.cssText = `
    position: absolute;
    visibility: hidden;
    white-space: nowrap;
    word-break: break-all;
    width: auto;
    font-size: ${style.fontSize};
    font-family: ${style.fontFamily};
  `
  clone.textContent = text
  document.body.appendChild(clone)

  const cloneWidth = clone.offsetWidth
  const elWidth = el.clientWidth
  document.body.removeChild(clone)

  return cloneWidth > elWidth
}

function getTextContent(el: HTMLElement): string {
  if (props.text) return props.text
  return el.textContent?.trim() || ''
}

function handleMouseEnter() {
  if (!containerRef.value) return

  const shouldShow = isTextOverflow(containerRef.value)
  if (!shouldShow) return

  if (props.delay > 0) {
    showTimer = setTimeout(() => {
      showTooltip()
    }, props.delay)
  } else {
    showTooltip()
  }
}

function handleMouseLeave() {
  if (showTimer) {
    clearTimeout(showTimer)
    showTimer = null
  }
  hideTooltip()
}

function showTooltip() {
  if (!tooltipDom || !containerRef.value) return

  const text = getTextContent(containerRef.value)
  if (!text) return

  tooltipDom.innerHTML = `${text}<div class="v-tooltip-arrow" data-popper-arrow></div>`
  tooltipDom.style.display = 'block'

  if (popperInstance) {
    popperInstance.destroy()
  }

  popperInstance = createPopper(containerRef.value, tooltipDom, {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  })

  popperInstance.update()
}

function hideTooltip() {
  if (tooltipDom) {
    tooltipDom.style.display = 'none'
  }
  if (popperInstance) {
    popperInstance.destroy()
    popperInstance = null
  }
}

watch(() => props.theme, (newTheme) => {
  if (tooltipDom) {
    tooltipDom.classList.remove('dark', 'light')
    tooltipDom.classList.add(newTheme)
  }
})
</script>

<style scoped>
.v-tooltip-container {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

<style>
.v-tooltip {
  max-width: 300px;
  background: #212121;
  box-shadow: 0 -2px 4px 0 rgb(0 0 0 / 2%), 0 2px 6px 6px rgb(0 0 0 / 2%), 0 2px 6px 0 rgb(0 0 0 / 4%);
  color: white;
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 6px;
  word-wrap: break-word;
  z-index: 999999;
  display: none;
}

.v-tooltip.light {
  background: #ffffff;
  color: rgba(0, 0, 0, 0.85);
  border: 1px solid #e8e8e8;
}

.v-tooltip-arrow,
.v-tooltip-arrow::before {
  position: absolute;
  width: 8px;
  height: 8px;
  background: inherit;
}

.v-tooltip-arrow {
  visibility: hidden;
}

.v-tooltip-arrow::before {
  visibility: visible;
  content: '';
  transform: rotate(45deg);
}

.v-tooltip[data-popper-placement^='top'] > .v-tooltip-arrow {
  bottom: -4px;
}

.v-tooltip[data-popper-placement^='bottom'] > .v-tooltip-arrow {
  top: -4px;
}

.v-tooltip[data-popper-placement^='left'] > .v-tooltip-arrow {
  right: -4px;
}

.v-tooltip[data-popper-placement^='right'] > .v-tooltip-arrow {
  left: -4px;
}
</style>
