// stores/story.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

const urlBase = "https://storytime-api.strapi.timedoor-js.web.id/";

export const useStoryStore = defineStore("story", () => {
  const stories = ref([]);
  const defaultPage = ref(1);
  const searchQuery = ref("");
  const sortOrder = ref("Newest");

  const fetchStories = async (query, page) => {
    try {
      const response = await axios.get(`${urlBase}api/stories`, {
        params: {
          keyword: query,
          page: page,
        },
      });

      const data = response.data;
      if (page === 1) {
        stories.value = data.data;
      } else {
        stories.value = [...stories.value, ...data.data];
      }
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };

  const sortedStories = computed(() => {
    let sorted = [...stories.value];
    switch (sortOrder.value) {
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
    if (!searchQuery.value) return sortedStories.value;
    return sortedStories.value.filter(
      (stories) =>
        stories.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        stories.content
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        stories.category.name
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()),
    );
  });

  const loadMore = () => {
    defaultPage.value++;
    fetchStories(searchQuery.value, defaultPage.value);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Intl.DateTimeFormat("id-ID", options).format(date);
  };

  fetchStories(searchQuery.value, defaultPage.value);

  return {
    stories,
    defaultPage,
    searchQuery,
    sortOrder,
    fetchStories,
    sortedStories,
    filteredStories,
    loadMore,
    formatDate,
  };
});
