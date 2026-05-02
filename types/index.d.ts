import { Component } from 'vue'
import type { Placement } from '@popperjs/core'

export interface TooltipProps {
  text?: string
  placement?: Placement
  theme?: 'dark' | 'light'
  forceShow?: boolean
  maxWidth?: number
  delay?: number
}

export interface TooltipComponent extends Component {
  install: (app: any) => void
}

declare const Tooltip: TooltipComponent

export default Tooltip
