<template>
  <div
    ref="tooltipRef"
    class="v-tooltip-ref"
    @mouseenter="onmouseenter"
    @mouseleave="onmouseleave"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="tsx" name="tooltip">
import { ref, onMounted, install } from 'vue-demi';
import { createPopper } from '@popperjs/core';
import type { Placement } from '@popperjs/core';

install();

const props = withDefaults(
  defineProps<{
    text?: string;
    placement?: Placement;
    tooltipStyle?: Partial<CSSStyleDeclaration>;
    theme?: 'dark' | 'light';
    line?: number;
  }>(),
  {
    line: 1,
    theme: 'dark',
    placement: 'auto',
  }
);

let tooltipDom = null as unknown as HTMLElement;
const tooltipRef = ref<HTMLElement | null>(null);
onMounted(() => {
  tooltipDom = document.querySelector('#v-tooltip') as HTMLElement;
  if (!tooltipDom) {
    tooltipDom = document.createElement('div');
    tooltipDom.setAttribute('id', 'v-tooltip');
    tooltipDom.addEventListener('mouseenter', showTooltip);
    tooltipDom.addEventListener('mouseleave', hideTooltip);
    const body = document.querySelector('body');
    body?.appendChild(tooltipDom);
  }
  tooltipRef.value?.style.setProperty('-webkit-line-clamp', String(props.line));
});

function onmouseenter(e: MouseEvent) {
  const target = e.target as HTMLElement;
  const range = document.createRange();
  range.setStart(target, 0);
  range.setEnd(target, target.childNodes.length);
  const rect = range.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  // 宽度用来判断单行文本超出，高度用来判断多行文本超出
  if (rect.width > targetRect.width || rect.height > targetRect.height) {
    createTooltip(target);
  }
}

function onmouseleave() {
  hideTooltip();
}

function createTooltip(el: HTMLElement) {
  showTooltip();
  tooltipDom.classList.remove('light', 'dark');
  tooltipDom.classList.add(props.theme);
  tooltipDom.innerHTML = `${
    props.text ?? el.innerText
  }<div id="v-arrow" data-popper-arrow></div>`;

  if (props.tooltipStyle) {
    (
      Object.entries(props.tooltipStyle) as [
        keyof CSSStyleDeclaration,
        CSSStyleDeclaration[keyof CSSStyleDeclaration]
      ][]
    ).forEach((item) => {
      setStyle(tooltipDom, ...item);
    });
  }
  createPopper(el, tooltipDom, {
    placement: props.placement,
  });
}

function hideTooltip() {
  tooltipDom.style.display = 'none';
}

function showTooltip() {
  tooltipDom.style.display = 'block';
}

function setStyle<T extends keyof CSSStyleDeclaration>(
  dom: HTMLElement,
  key: T,
  value: CSSStyleDeclaration[T]
) {
  dom.style[key] = value;
}
</script>

<style>
#v-tooltip {
  max-width: 300px;
  background: #212121;
  box-shadow: 0 -2px 4px 0 rgb(0 0 0 / 2%), 0 2px 6px 6px rgb(0 0 0 / 2%),
    0 2px 6px 0 rgb(0 0 0 / 4%);
  color: white;
  padding: 4px 8px;
  font-size: 14px;
  border-radius: 4px;
  word-wrap: break-word;
  display: none;
}

#v-tooltip.light {
  background: #fff;
  color: #000000d6;
}

#v-arrow,
#v-arrow::before {
  position: absolute;
  width: 8px;
  height: 8px;
  background: inherit;
}

#v-arrow {
  visibility: hidden;
}

#v-arrow::before {
  visibility: visible;
  content: '';
  transform: rotate(45deg);
}

#v-tooltip[data-popper-placement^='top'] > #v-arrow {
  bottom: -4px;
}

#v-tooltip[data-popper-placement^='bottom'] > #v-arrow {
  top: -4px;
}

#v-tooltip[data-popper-placement^='left'] > #v-arrow {
  right: -4px;
}

#v-tooltip[data-popper-placement^='right'] > #v-arrow {
  left: -4px;
}
</style>

<style scoped>
.v-tooltip-ref {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}
</style>
