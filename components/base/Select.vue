<script setup lang="ts">
import { useCategoryStore } from "~/stores/category";

const categoryList = useCategoryStore();
const props = defineProps<{ modelValue: string }>();
const emit = defineEmits(["update:modelValue"]);
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
  <select
    class="form-select"
    aria-label="Default select example"
    :v-model="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <option selected>Select category</option>
    <option
      v-for="(item, index) in categoryList.category"
      :key="index"
      :value="item.id"
    >
      {{ item.name }}
    </option>
  </select>
</template>

<style scoped></style>
