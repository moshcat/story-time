<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  searchQuery: { type: String, default: "" },
  sortOrder: { type: String, default: "Newest" },
});

const stories = ref([]);
const defaultPage = ref(1);
const urlBase = "https://storytime-api.strapi.timedoor-js.web.id/";

const fetchStories = async (query, page) => {
  const { data, pending, error, refresh } = await useFetch(
    `${urlBase}api/stories?keyword=${query}&page=${page}`,
  );

  if (data.value) {
    if (page === 1) {
      stories.value = data.value.data;
    } else {
      stories.value = [...stories.value, ...data.value.data];
    }
  }
};
fetchStories(props.searchQuery, defaultPage.value);

// untuk perubahan input search
watch(
  () => props.searchQuery,
  (newQuery) => {
    defaultPage.value = 1;
    fetchStories(newQuery, defaultPage.value);
  },
);

watch(
  () => props.sortOrder,
  () => {
    defaultPage.value = 1;
    fetchStories(props.searchQuery, defaultPage.value);
  },
);

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = { day: "numeric", month: "short", year: "numeric" };
  return new Intl.DateTimeFormat("id-ID", options).format(date);
}

const sortedStories = computed(() => {
  let sorted = [...stories.value];
  switch (props.sortOrder) {
    case "Newest":
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    case "A-Z":
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "Z-A":
      sorted.sort((a, b) => b.title.localeCompare(a.title));
      break;
  }
  return sorted;
});

const filteredStories = computed(() => {
  if (!props.searchQuery) return sortedStories.value;
  return sortedStories.value.filter(
    (story) =>
      story.title.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
      story.content.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
      story.category.name
        .toLowerCase()
        .includes(props.searchQuery.toLowerCase()),
  );
});
const loadMore = () => {
  defaultPage.value++;
  fetchStories(props.searchQuery, defaultPage.value);
};
</script>

<template>
  <div>
    <section class="story__list container" style="margin-top: 1rem">
      <div class="row">
        <div
          class="col-3 mt-3"
          v-for="(item, index) in filteredStories"
          :key="index"
        >
          <NuxtLink :to="'/story/' + item.id">
            <div
              class="card border-secondary-subtle"
              :item="item"
              style="height: 450px"
            >
              <NuxtLink :to="'/story/' + item.id">
                <img
                  :src="urlBase + item.cover_image.url"
                  class="card-img-top object-fit-cover"
                  alt="..."
                  width="auto"
                  height="200px"
                />
              </NuxtLink>
              <div class="card-body d-flex flex-column position-relative">
                <div class="card-title p-1 pb-0">
                  <span class="d-flex gap-2">
                    <span class="badge text-bg-dark">{{
                      item.category.name
                    }}</span>
                  </span>
                  <h5 class="mt-2 line-clamp">{{ item.title }}</h5>
                  <hr />
                </div>
                <p class="card-text p-1 line-clamp" style="font-size: 14px">
                  {{ item.content }}
                </p>
                <div
                  class="d-flex justify-content-between p-1 mt-auto"
                  style="font-size: 14px"
                >
                  <span v-if="item.author" class="fw-medium"
                    >By {{ item.author.username }}</span
                  >
                  <span class="fw-medium">{{
                    formatDate(item.createdAt)
                  }}</span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div class="row d-flex justify-content-center my-5">
        <div class="col-2">
          <BaseButton isOutline="true" @click="loadMore">Show more</BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
