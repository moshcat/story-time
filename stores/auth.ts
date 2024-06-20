import { defineStore } from "pinia";
import { error } from "vscode-jsonrpc/lib/common/is";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: useCookie("access_token").value || null,
    user: null,
  }),

  actions: {
    async register(
      name: string,
      username: string,
      email: string,
      password: string,
    ) {
      try {
        const response = await $fetch(
          "https://storytime-api.strapi.timedoor-js.web.id/api/auth/local/register",
          {
            method: "post",
            body: { name, username, email, password },
          },
        );
        console.log("register berhasil");
      } catch (error) {
        console.error("Registrasi gagal:", error.response);
      }
    },

    async login(identifier: string, password: string) {
      try {
        const response = await $fetch(
          "https://storytime-api.strapi.timedoor-js.web.id/api/auth/local",
          {
            method: "post",
            body: { identifier: identifier, password: password },
          },
        );

        this.accessToken = response.data.jwt;
        this.user = response.data.user;
        useCookie("access_token").value = response.data.jwt;
        await this.fetchProfile();

        console.log("login berhasil");
        alert("login berhasil");
      } catch (error) {
        console.log("login gagal: ", error);
        alert(error);
      }
    },
    async logout() {
      this.accessToken = null;
      this.user = null;
      useCookie("access_token").value = null;
    },

    async fetchProfile() {
      if (!this.accessToken) {
        throw new Error("Tidak ada access token");
      }

      try {
        const profile = await $fetch(
          "https://storytime-api.strapi.timedoor-js.web.id/api/users/me",
          {
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
            },
          },
        );
        this.user = profile;
      } catch (error) {
        console.log("fetch profile", error);
        this.user = null;
      }
    },
  },
});