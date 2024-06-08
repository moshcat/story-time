import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);

  async function fetchProfile() {
    try {
      const accessToken = useCookie("accessToken").value;
      const response = await fetch(
        "https://storytime-api.strapi.timedoor-js.web.id/api/users/me",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      user.value = response.data;
    } catch (error) {
      console.error("Gagal fetch data: ", error);
    }
  }

  return {
    user,
    fetchProfile,
  };
});
