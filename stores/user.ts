import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);
  const userData = ref({});
  const userId = ref("");
  const imgId = ref("");
  const avatar = ref("");
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
      userId.value = data.data.id;
      imgId.value = data.data.profile_picture.id;
      avatar.value = data.data.profile_picture.formats.thumbnail.url;
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

  async function addImage(payload: any) {
    try {
      if (userId) {
        const imageData = new FormData();
        imageData.append("files", payload);
        imageData.append("refId", userId.value);
        imageData.append("ref", "plugin::users-permissions.user");
        imageData.append("field", "profile_picture");

        const res = await $fetch(`${config.public.apiUrl}/upload`, {
          method: "POST",
          body: imageData,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("berhasil");
      } else {
        console.error("User ID tidak ditemukan");
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function removeImage() {
    try {
      console.log(imgId);
      if (imgId) {
        await $fetch(`${config.public.apiUrl}/upload/files/${imgId.value}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        imgId.value = "";
        console.log("berhasil delete image");
      } else {
        console.error("Image ID tidak ditemukan");
      }
    } catch (e) {
      console.log(imgId);
      console.error(e);
    }
  }

  return {
    user,
    userData,
    editProfile,
    fetchProfile,
    addImage,
    removeImage,
  };
});
