<!-- <template>
  <div
    v-ellipsis="{
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis euismod, vehicula eros ac, blandit arcu.',
    }"
  >
    {{ text }}
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      text: '',
    };
  },
  directives: {
    ellipsis: {
      bind(el: HTMLElement, binding) {
        const content = binding.value.text;
        const div = document.createElement('div');
        div.textContent = content;
        div.style.position = 'absolute';
        div.style.top = '-9999px';
        div.style.left = '-9999px';
        div.style.whiteSpace = 'nowrap';
        div.style.overflow = 'hidden';
        div.style.textOverflow = 'ellipsis';
        document.body.appendChild(div);

        const updateTooltip = () => {
          const elWidth = el.clientWidth;
          const divWidth = div.clientWidth;
          if (divWidth > elWidth) {
            el.setAttribute('data-text', content);
          } else {
            el.removeAttribute('data-text');
          }
        };

        updateTooltip();
        el.addEventListener('mouseenter', updateTooltip);
        el.addEventListener('mouseleave', () => {
          el.removeAttribute('data-text');
        });
      },
      unbind(el: HTMLElement) {
        el.removeEventListener('mouseenter');
        el.removeEventListener('mouseleave');
        const div = document.querySelector('.ellipsis-tooltip');
        if (div) {
          document.body.removeChild(div);
        }
      },
    },
  },
};
</script>

<style>
[data-text]::before {
  content: attr(data-text);
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 5px;
  z-index: 1;
}
</style> -->
