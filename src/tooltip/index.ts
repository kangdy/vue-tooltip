import Tooltip from './tooltip.vue'
import './tooltip.css'

Tooltip.install = (app: any) => {
  app.component(Tooltip.name || 'Tooltip', Tooltip)
}

export default Tooltip
