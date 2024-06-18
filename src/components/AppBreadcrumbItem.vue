<script setup>
defineProps({
  to: {
    type: [String, Object],
    default: ''
  }
})
</script>

<template>
  <div class="app-breadcrumb-item">
    <RouterLink v-if="to" :to="to"><slot /></RouterLink>
    <span v-else><slot /></span>
  </div>
</template>