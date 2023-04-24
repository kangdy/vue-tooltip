import { defineComponent, ref, onMounted, openBlock, createElementBlock, renderSlot } from "vue";
import { createPopper } from "@popperjs/core";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tooltip",
  props: {
    text: null,
    placement: { default: "auto" },
    tooltipStyle: null,
    theme: { default: "dark" },
    prompt: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    let tooltipDom = null;
    const tooltipRef = ref(null);
    onMounted(() => {
      tooltipDom = document.querySelector("#v-tooltip");
      if (!tooltipDom) {
        tooltipDom = document.createElement("div");
        tooltipDom.setAttribute("id", "v-tooltip");
        tooltipDom.addEventListener("mouseenter", showTooltip);
        tooltipDom.addEventListener("mouseleave", hideTooltip);
        const body = document.querySelector("body");
        body == null ? void 0 : body.appendChild(tooltipDom);
      }
    });
    function onmouseenter(e) {
      const target = e.target;
      const range = new Range();
      range.selectNodeContents(target);
      const rect = range.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      if (rect.width > targetRect.width || props.prompt) {
        createTooltip(target);
      }
    }
    function onmouseleave() {
      hideTooltip();
      const selection = window.getSelection();
      selection == null ? void 0 : selection.removeAllRanges();
    }
    function createTooltip(el) {
      showTooltip();
      tooltipDom.classList.remove("light", "dark");
      tooltipDom.classList.add(props.theme);
      tooltipDom.innerHTML = `${props.text ?? el.innerText}<div id="v-arrow" data-popper-arrow></div>`;
      if (props.tooltipStyle) {
        Object.entries(props.tooltipStyle).forEach((item) => {
          setStyle(tooltipDom, ...item);
        });
      }
      createPopper(el, tooltipDom, {
        placement: props.placement
      });
    }
    function hideTooltip() {
      tooltipDom.style.display = "none";
    }
    function showTooltip() {
      tooltipDom.style.display = "block";
    }
    function setStyle(dom, key, value) {
      dom.style[key] = value;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "tooltipRef",
        ref: tooltipRef,
        class: "v-tooltip-ref",
        onMouseenter: onmouseenter,
        onMouseleave: onmouseleave
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 544);
    };
  }
});
const tooltip_vue_vue_type_style_index_0_lang = "";
const tooltip_vue_vue_type_style_index_1_scoped_952a7929_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const tooltip = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-952a7929"]]);
tooltip.install = (App) => {
  App.component(tooltip.__name, tooltip);
};
export {
  tooltip as default
};
(function() {
  "use strict";
  try {
    if (typeof document != "undefined") {
      var elementStyle = document.createElement("style");
      elementStyle.appendChild(document.createTextNode('#v-tooltip {\n  max-width: 300px;\n  background: #212121;\n  box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, 0.02), 0 2px 6px 6px rgba(0, 0, 0, 0.02), 0 2px 6px 0 rgba(0, 0, 0, 0.04);\n  color: white;\n  padding: 4px 8px;\n  font-size: 14px;\n  border-radius: 4px;\n  word-wrap: break-word;\n  z-index: 999999;\n  display: none;\n}\n#v-tooltip.light {\n  background: #fff;\n  color: rgba(0, 0, 0, 0.8392156863);\n}\n#v-arrow,\n#v-arrow::before {\n  position: absolute;\n  width: 8px;\n  height: 8px;\n  background: inherit;\n}\n#v-arrow {\n  visibility: hidden;\n}\n#v-arrow::before {\n  visibility: visible;\n  content: "";\n  transform: rotate(45deg);\n}\n#v-tooltip[data-popper-placement^=top] > #v-arrow {\n  bottom: -4px;\n}\n#v-tooltip[data-popper-placement^=bottom] > #v-arrow {\n  top: -4px;\n}\n#v-tooltip[data-popper-placement^=left] > #v-arrow {\n  right: -4px;\n}\n#v-tooltip[data-popper-placement^=right] > #v-arrow {\n  left: -4px;\n}.v-tooltip-ref[data-v-952a7929] {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}'));
      document.head.appendChild(elementStyle);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
