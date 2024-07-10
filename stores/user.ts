import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);
  const userData = ref({});
  const config = useRuntimeConfig();
  const accessToken = useCookie("access_token").value;

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
      userData.value = data;
    } catch (error) {
      console.error("Gagal fetch data: ", error);
    }
  }

  async function editProfile(payload: any) {
    try {
      // console.log(payload);
      await $fetch(config.public.apiUrl + "/users/me", {
        method: "PATCH",
        body: payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log("berhasil");
    } catch (e) {
      console.error("Error changing data", e);
    }
  }

  return {
    user,
    userData,
    editProfile,
    fetchProfile,
  };
});
