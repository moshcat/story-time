<template>
  <div>
    <section class="story__list mt-5">
      <StoryList />
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "story",
});
useHead({
  title: "Stories | Storytime",
});
</script>

<style lang="scss" scoped></style>
