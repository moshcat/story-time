import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCategoryStore = defineStore("category", () => {
  const category = ref({});
  const config = useRuntimeConfig();

  async function getCategories() {
    try {
      const { data } = await useFetch(`${config.public.apiUrl}/categories`);
      console.log(data.value);
      category.value = data.value.data;
    } catch (error) {
      console.error("Gagal fetch data", error);
    }
  }

  return {
    getCategories,
    category,
  };
});
