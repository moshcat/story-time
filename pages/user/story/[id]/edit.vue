<script setup>
import { ErrorMessage } from "vee-validate";

useHead({
  title: "Storylist | Storytime",
});

async function goBack() {
  window.history.back();
}
</script>

<template>
  <div>
    <main class="main-wrapper">
      <section class="section_space">
        <div class="container">
          <div class="row min-vh-100 justify-content-start align-items-start">
            <div class="col-3">
              <UserSidebarUser />
            </div>
            <div class="col-9">
              <section class="story-list card rounded-1">
                <div
                  class="story-list__header d-flex align-items-center justify-content-between mb-4"
                >
                  <NuxtLink :to="null" @click.native="goBack">
                    <button class="bg-white border-0">
                      <i class="fa-solid fa-arrow-left me-3 fs-5"></i>
                      <span class="fs-4 fw-semibold">Update Story</span>
                    </button>
                  </NuxtLink>
                </div>
                <div class="story-list__body row">
                  <div class="col-lg-12">
                    <UserUpdateStory />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
`

<style scoped>
.container {
  margin-top: 6rem;
}
</style>
