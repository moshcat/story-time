<template>
  <div>
    <select
      class="form-select"
      aria-label="Default select example"
      @change="handleSortChange"
    >
      <option selected disabled>Sort</option>
      <option value="Newest">Newest</option>
      <option value="A-Z">A-Z</option>
      <option value="Z-A">Z-A</option>
    </select>
  </div>
</template>

<script setup>
const emit = defineEmits(["updateSort"]);

const handleSortChange = (event) => {
  emit("updateSort", event.target.value);
};
</script>

<style lang="scss" scoped></style>
