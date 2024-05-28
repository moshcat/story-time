<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
useHead({
  bodyAttrs: {
    class: "app_bg",
  },
});
</script>

<style>
.app_bg {
  background-color: #f4f2e6;
}
</style>
