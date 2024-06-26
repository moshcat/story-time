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
                  <h4>Storylist</h4>
                  <NuxtLink @click="createLink">
                    <button class="btn btn-dark rounded-1">
                      <i class="fa-solid fa-plus me-2"></i>
                      <span>Create Story</span>
                    </button>
                  </NuxtLink>
                </div>
                <div class="story-list__body row">
                  <div class="col-lg-12">
                    <!--                    <BaseEmpty />-->
                    <UserStorylistList />
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

<script setup>
const createLink = () => {
  navigateTo("/user/story/create");
};
useHead({
  title: "Storylist | Storytime",
});
</script>

<style scoped>
.container {
  margin-top: 6rem;
}
</style>
