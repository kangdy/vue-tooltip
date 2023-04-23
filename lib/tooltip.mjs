import { defineComponent as v, ref as y, onMounted as g, openBlock as h, createElementBlock as w, renderSlot as S } from "vue";
import { createPopper as k } from "@popperjs/core";
const x = /* @__PURE__ */ v({
  __name: "tooltip",
  props: {
    text: null,
    placement: { default: "auto" },
    tooltipStyle: null,
    theme: { default: "dark" },
    prompt: { type: Boolean, default: !1 }
  },
  setup(l) {
    const o = l;
    let e = null;
    const r = y(null);
    g(() => {
      if (e = document.querySelector("#v-tooltip"), !e) {
        e = document.createElement("div"), e.setAttribute("id", "v-tooltip"), e.addEventListener("mouseenter", p), e.addEventListener("mouseleave", c);
        const t = document.querySelector("body");
        t == null || t.appendChild(e);
      }
    });
    function s(t) {
      const n = t.target, i = new Range();
      i.selectNodeContents(n);
      const f = i.getBoundingClientRect(), m = n.getBoundingClientRect();
      (f.width > m.width || o.prompt) && u(n);
    }
    function d() {
      c();
      const t = window.getSelection();
      t == null || t.removeAllRanges();
    }
    function u(t) {
      p(), e.classList.remove("light", "dark"), e.classList.add(o.theme), e.innerHTML = `${o.text ?? t.innerText}<div id="v-arrow" data-popper-arrow></div>`, o.tooltipStyle && Object.entries(o.tooltipStyle).forEach((n) => {
        _(e, ...n);
      }), k(t, e, {
        placement: o.placement
      });
    }
    function c() {
      e.style.display = "none";
    }
    function p() {
      e.style.display = "block";
    }
    function _(t, n, i) {
      t.style[n] = i;
    }
    return (t, n) => (h(), w("span", {
      ref_key: "tooltipRef",
      ref: r,
      class: "v-tooltip-ref",
      onMouseenter: s,
      onMouseleave: d
    }, [
      S(t.$slots, "default", {}, void 0, !0)
    ], 544));
  }
});
const R = (l, o) => {
  const e = l.__vccOpts || l;
  for (const [r, s] of o)
    e[r] = s;
  return e;
}, a = /* @__PURE__ */ R(x, [["__scopeId", "data-v-61d325a7"]]);
a.install = (l) => {
  l.component(a.__name, a);
};
export {
  a as default
};
(function(){"use strict";try{if(typeof document<"u"){var o=document.createElement("style");o.appendChild(document.createTextNode('#v-tooltip{max-width:300px;background:#212121;box-shadow:0 -2px 4px #00000005,0 2px 6px 6px #00000005,0 2px 6px #0000000a;color:#fff;padding:4px 8px;font-size:14px;border-radius:4px;word-wrap:break-word;z-index:999999;display:none}#v-tooltip.light{background:#fff;color:#000000d6}#v-arrow,#v-arrow:before{position:absolute;width:8px;height:8px;background:inherit}#v-arrow{visibility:hidden}#v-arrow:before{visibility:visible;content:"";transform:rotate(45deg)}#v-tooltip[data-popper-placement^=top]>#v-arrow{bottom:-4px}#v-tooltip[data-popper-placement^=bottom]>#v-arrow{top:-4px}#v-tooltip[data-popper-placement^=left]>#v-arrow{right:-4px}#v-tooltip[data-popper-placement^=right]>#v-arrow{left:-4px}.v-tooltip-ref[data-v-61d325a7]{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}')),document.head.appendChild(o)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
