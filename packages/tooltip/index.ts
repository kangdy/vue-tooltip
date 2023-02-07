import tooltip from './tooltip.vue'

tooltip.install = (App: { component: (arg0: any, arg1: any) => void; }) => {
	App.component(tooltip.__name, tooltip);
};

export default tooltip