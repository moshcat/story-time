<template>
  <div>
    <button
      :class="[
        'btn shadow-sm w-100 text-nowrap fw-medium rounded-1',
        isOutline ? 'btn-outline-dark text-dark' : 'btn-dark text-white',
      ]"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script setup>
defineProps({
  isOutline: {
    type: Boolean,
    default: false,
  },
  isStatus: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped></style>
