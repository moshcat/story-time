import { defineStore } from "pinia";

export const useBookmarkStore = defineStore("bookmark", () => {
  const stories = ref({});
  const bookmarkState = ref({});
  const userBookmark = ref([]);

  // async function addBookmark(userId: any, id: any) {
  //   const bookmark = useStorage("bookmark", {} as Record<string, string[]>);
  // }
});
