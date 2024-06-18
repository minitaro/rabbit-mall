<script setup>
import MemberMenu from './components/MemberMenu.vue'
</script>


<template>
  <div class="container">
    <MemberMenu />
    <article class="article">
      <RouterView />
    </article>
  </div>
</template>


<style scoped lang="scss">
.container {
  display: flex;
  padding-top: 20px;
  .article {
    width: 1000px;
  }
}
</style>
