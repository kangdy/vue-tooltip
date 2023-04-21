import { ComponentOptions } from 'vue'
import type { Placement } from '@popperjs/core'

declare const Tooltip: ComponentOptions<{
  text?: string
  placement?: Placement
  tooltipStyle?: Partial<CSSStyleDeclaration>
  theme?: 'dark' | 'light'
  prompt?: boolean
}>

export default Tooltip