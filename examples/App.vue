<script setup lang="ts">
import tooltip from '../src/index'
// console.log(a);

// import '../lib/style.css'
</script>

<template>
  <div style="width: 100px;">
    <tooltip :tooltipStyle="{background: '#f66', color: 'yellow'}">在库项目内查看效果在库项目内查看效果在库项目内查看效果</tooltip>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
