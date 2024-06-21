<script setup>
import { useAuthStore } from "~/stores/auth.ts";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};
</script>

<template>
  <div>
    <aside class="sidebar card d-flex gap-3 rounded-1 p-3">
      <nuxt-link
        to="/user"
        class="d-flex gap-2 text-decoration-none text-dark align-items-center"
        ><i class="fa-solid fa-circle-user fs-5"></i>My Profile
      </nuxt-link>
      <hr />
      <nuxt-link
        to="/user/story/"
        class="d-flex gap-2 text-decoration-none text-dark align-items-center"
        ><i class="fa-solid fa-book fs-5"></i>Storylist
      </nuxt-link>
      <hr />
      <nuxt-link
        to="/user/bookmark"
        class="d-flex gap-2 text-decoration-none text-dark align-items-center"
        ><i class="fa-solid fa-bookmark fs-5"></i>Bookmark
      </nuxt-link>
      <BaseButton variant="outline-danger w-100" @click="handleLogout"
        >Logout<i class="fa-solid fa-arrow-right-from-bracket ms-2"></i
      ></BaseButton>
    </aside>
  </div>
</template>

<style lang="scss" scoped></style>
