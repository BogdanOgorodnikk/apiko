<template>
  <div id="app">
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>

export default {
  name: "App",
  async mounted() {
    if(!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
  },
}
</script>

<style>
  @import 'assets/style/main.scss';
</style>