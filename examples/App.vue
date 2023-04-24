<script setup lang="ts">
import { ref } from 'vue';
import tooltip from '../src/tooltip/tooltip.vue'
// import tooltip from 'vue-text-tooltip'

// console.log(a);

const count = ref(0)


// import '../lib/style.css'
</script>

<template>
  <div style="width: 200px;">
    <tooltip>在库项目内查看效果在库项目内查看效果在库项目内查看效果<span>ssss</span></tooltip>
    <span>{{ count }}</span>
  </div>
  <div>测试</div>
  <input type="text">
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
