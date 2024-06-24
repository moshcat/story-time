// stores/story.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useUserStore } from "~/stores/user";
import { decodeToken } from "~/helpers/decodeToken";
import axios from "axios";

const urlBase = "https://storytime-api.strapi.timedoor-js.web.id/";

export const useStoryStore = defineStore("story", () => {
  const stories = ref([]);
  const userStories = ref([]);
  const defaultPage = ref(1);
  const searchQuery = ref("");
  const sortOrder = ref("Newest");
  const userProfile = useUserStore();
  const config = useRuntimeConfig();

  async function getUserStory() {
    try {
      await userProfile.fetchProfile();
      const userId = userProfile.userData.data;
      console.log(userId);

      if (userId) {
        const { data, error } = await useFetch(
          `${config.public.apiUrl}/stories?author=${userId.id}`
        );
        userStories.value = data.value.data;
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  async function createStory(storyData: any) {
    console.log(storyData.value);

    // try {
    //   const data = await $fetch(`${config.public.apiUrl}/stories`,{
    //     methods: 'POST',
    //     headers:  {'Content-Type': 'multipart/form-data'},
    //     body: storyData
    //   })
    //   console.log(data);

    // } catch (error) {
    //   console.error(error);
    // }
  }

  const fetchStories = async (
    query: string,
    page: string,
    sort: string,
    category: string
  ) => {
    try {
      const response = await axios.get(`${config.public.apiUrl}/stories`, {
        params: {
          keyword: query,
          page: page,
          // sort: sort,
          // category: category,
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
          .includes(searchQuery.value.toLowerCase())
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

  return {
    stories,
    createStory,
    userStories,
    defaultPage,
    getUserStory,
    searchQuery,
    sortOrder,
    fetchStories,
    sortedStories,
    filteredStories,
    loadMore,
    formatDate,
  };
});
