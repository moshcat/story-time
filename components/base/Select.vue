<script setup lang="ts">
import { useCategoryStore } from "~/stores/category";

const categoryList = useCategoryStore();

onMounted(async () => {
  try {
    await categoryList.getCategories();
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <label for="" class="form-label fw-semibold">Category</label>
  <select class="form-select" aria-label="Default select example">
    <option selected>Select category</option>
    <option
      v-for="item in categoryList.category"
      :key="item.id"
      :value="item.id"
    >
      {{ item.name }}
    </option>
  </select>
</template>

<style scoped></style>
