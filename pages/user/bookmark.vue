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
              <section class="favorite">
                <h2 class="favorite__title">Bookmark</h2>
                <div class="row favorite__list">
                  <div class="col-4 mt-4">
                    <StoryItem />
                  </div>
                  <div class="col-4 mt-4">
                    <StoryItem />
                  </div>
                  <div class="col-4 mt-4">
                    <StoryItem />
                  </div>
                  <div class="col-4 mt-4">
                    <StoryItem />
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

<script setup>
useHead({
  title: "Bookmark | Storytime",
});
</script>

<style scoped>
.container {
  margin-top: 6rem;
}
</style>
