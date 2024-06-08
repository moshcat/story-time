import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);

  async function fetchProfile() {
    try {
      const accessToken = useCookie("access_token").value;
      if (!accessToken) {
        throw new Error("Tidak ada token!");
      }

      const response = await fetch(
        "https://storytime-api.strapi.timedoor-js.web.id/api/users/me",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }

      const data = await response.json();
      user.value = data;
    } catch (error) {
      console.error("Gagal fetch data: ", error);
    }
  }

  return {
    user,
    fetchProfile,
  };
});
