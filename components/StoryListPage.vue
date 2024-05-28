<template>
  <div>
    <section class="story__list container" style="margin-top: 6rem">
      <div class="row">
        <div class="col-12 story__title text-center mb-3">
          <h2 class="fw-semibold">Booktime Story</h2>
          <p class="fs-5">
            Explore a world of captivating stories for all ages.
          </p>
        </div>
      </div>
      <div class="row story__filter d-flex justify-content-between mt-4">
        <div class="col-4">
          <SearchInput v-model="searchQuery" />
        </div>
        <div class="col-3">
          <SelectFilter @updateSort="updateSort" />
        </div>
      </div>
      <div class="row">
        <StoryCard :searchQuery="searchQuery" :sortOrder="sortOrder" />
      </div>
    </section>
  </div>
</template>

<script setup>
const searchQuery = ref("");
const sortOrder = ref("Newest");

const updateSort = (order) => {
  sortOrder.value = order;
};
</script>
