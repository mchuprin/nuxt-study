<template>
    <div class="layout">
      <Header/>
      <main class="content">
        <Nuxt />
      </main>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Layout',
})
</script>

<style scoped lang="scss">
.layout {
  width: 100%;
  min-height: 100vh;
  background: #e49255;
}
</style>
