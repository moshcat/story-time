<template>
  <div>
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Search story..."
        aria-label="Search story..."
        aria-describedby="basic-addon2"
        v-model="searchQuery"
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
import { useStoryStore } from "~/stores/story.ts";

const storyStore = useStoryStore();

const searchQuery = ref(storyStore.searchQuery);

const updateSearch = () => {
  storyStore.searchQuery = searchQuery.value;
};

// Synchronize store's searchQuery with local state
watch(
  () => storyStore.searchQuery,
  (newValue) => {
    searchQuery.value = newValue;
  },
);
</script>
