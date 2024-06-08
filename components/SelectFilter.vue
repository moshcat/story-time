<template>
  <div>
    <select
      class="form-select"
      aria-label="Default select example"
      v-model="selectedSort"
      @change="handleSortChange"
    >
      <option disabled value="">Sort</option>
      <option value="Newest">Newest</option>
      <option value="A-Z">A-Z</option>
      <option value="Z-A">Z-A</option>
    </select>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStoryStore } from "~/stores/story.ts";

const storyStore = useStoryStore();

const selectedSort = ref("");

const handleSortChange = () => {
  storyStore.sortOrder = selectedSort.value;
};
</script>

<style lang="scss" scoped></style>
