"use strict";const i=require("vue"),y=require("@popperjs/core"),g=i.defineComponent({__name:"tooltip",props:{text:null,placement:{default:"auto"},tooltipStyle:null,theme:{default:"dark"},prompt:{type:Boolean,default:!1}},setup(l){const o=l;let e=null;const c=i.ref(null);i.onMounted(()=>{if(e=document.querySelector("#v-tooltip"),!e){e=document.createElement("div"),e.setAttribute("id","v-tooltip"),e.addEventListener("mouseenter",u),e.addEventListener("mouseleave",p);const t=document.querySelector("body");t==null||t.appendChild(e)}});function a(t){const n=t.target,r=new Range;r.selectNodeContents(n);const m=r.getBoundingClientRect(),v=n.getBoundingClientRect();(m.width>v.width||o.prompt)&&_(n)}function d(){p();const t=window.getSelection();t==null||t.removeAllRanges()}function _(t){u(),e.classList.remove("light","dark"),e.classList.add(o.theme),e.innerHTML=`${o.text??t.innerText}<div id="v-arrow" data-popper-arrow></div>`,o.tooltipStyle&&Object.entries(o.tooltipStyle).forEach(n=>{f(e,...n)}),y.createPopper(t,e,{placement:o.placement})}function p(){e.style.display="none"}function u(){e.style.display="block"}function f(t,n,r){t.style[n]=r}return(t,n)=>(i.openBlock(),i.createElementBlock("div",{ref_key:"tooltipRef",ref:c,class:"v-tooltip-ref",onMouseenter:a,onMouseleave:d},[i.renderSlot(t.$slots,"default",{},void 0,!0)],544))}});const h=(l,o)=>{const e=l.__vccOpts||l;for(const[c,a]of o)e[c]=a;return e},s=h(g,[["__scopeId","data-v-952a7929"]]);s.install=l=>{l.component(s.__name,s)};module.exports=s;
(function(){"use strict";try{if(typeof document<"u"){var o=document.createElement("style");o.appendChild(document.createTextNode('#v-tooltip{max-width:300px;background:#212121;box-shadow:0 -2px 4px #00000005,0 2px 6px 6px #00000005,0 2px 6px #0000000a;color:#fff;padding:4px 8px;font-size:14px;border-radius:4px;word-wrap:break-word;z-index:999999;display:none}#v-tooltip.light{background:#fff;color:#000000d6}#v-arrow,#v-arrow:before{position:absolute;width:8px;height:8px;background:inherit}#v-arrow{visibility:hidden}#v-arrow:before{visibility:visible;content:"";transform:rotate(45deg)}#v-tooltip[data-popper-placement^=top]>#v-arrow{bottom:-4px}#v-tooltip[data-popper-placement^=bottom]>#v-arrow{top:-4px}#v-tooltip[data-popper-placement^=left]>#v-arrow{right:-4px}#v-tooltip[data-popper-placement^=right]>#v-arrow{left:-4px}.v-tooltip-ref[data-v-952a7929]{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}')),document.head.appendChild(o)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();