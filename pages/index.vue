<template>
  <h1>Main</h1>
</template>

<script lang="ts">
import Vue from 'vue'
import Layout from '~/layouts/Layout.vue';

export default Vue.extend({
  name: 'index',
  layout: "Layout"
})
</script>

<style scoped lang="scss">
.layout {
  width: 100%;
  min-height: 100vh;
  background: #e49255;
}
</style>
