<script setup>
defineProps({
  variant: {
    type: String,
    default: "primary",
  },
});
</script>

<template>
  <div>
    <button class="btn rounded-0" :class="`btn-${variant}`">
      <slot></slot>
    </button>
  </div>
</template>

<style scoped></style>
