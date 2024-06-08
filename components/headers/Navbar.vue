<script setup>
import { useAuthStore } from "~/stores/auth.ts";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};

onMounted(async () => {
  if (authStore.accessToken && !authStore.user) {
    try {
      await authStore.fetchProfile();
    } catch (error) {
      console.error("gagal fetch di mount:", error);
    }
  }
});
</script>

<template>
  <div>
    <header class="container-fluid">
      <nav class="navbar navbar-expand-lg p-3 fixed-top shadow-sm">
        <div class="container container-lg container-sm">
          <nuxt-link to="/"
            ><img src="../../public/assets/images/logo.svg" alt=""
          /></nuxt-link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 ms-3 mb-lg-0">
              <li class="nav-item">
                <nuxt-link class="nav-link fw-medium" to="/">Home</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link fw-medium" to="/story"
                  >Stories
                </nuxt-link>
              </li>
            </ul>
            <div class="auth-wrapper gap-2" v-if="authStore.user">
              <nuxt-link to="/user" class="btn btn-dark rounded-1" type="button"
                ><span v-if="authStore.user"
                  ><i class="fa-solid fa-circle-user me-2 fs-5"></i
                  >{{ authStore.user?.data?.username }}</span
                >
              </nuxt-link>
              <!--              <BaseButton @click="handleLogout">logot</BaseButton>-->
            </div>
            <div class="auth-wrapper d-flex gap-2" v-else>
              <nuxt-link
                to="/register"
                class="btn btn-outline-dark rounded-1"
                type="button"
              >
                Register
              </nuxt-link>
              <nuxt-link
                to="/login"
                class="btn btn-dark rounded-1"
                type="button"
              >
                Login
              </nuxt-link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<style scoped></style>
