<template>
  <div>
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Search story..."
        aria-label="Search story..."
        aria-describedby="basic-addon2"
        v-model="searchText"
        @keyup.enter="updateSearch"
      />
      <button
        type="button"
        class="input-group-text bg-dark"
        id="basic-addon2"
        @click="updateSearch"
      >
        <i class="fa-solid fa-magnifying-glass text-white"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: { type: String, required: true },
});

const emit = defineEmits(["update:modelValue"]);

const searchText = ref(props.modelValue);

const updateSearch = () => {
  emit("update:modelValue", searchText.value);
};

// Synchronize prop change with local state
watch(
  () => props.modelValue,
  (newValue) => {
    searchText.value = newValue;
  },
);
</script>
