<template>
  <div>
    <section class="hero">
      <div
        class="container d-flex justify-content-center align-items-center min-vh-100"
      >
        <div class="row">
          <div class="col-12 text-center">
            <div class="title__wrapper mb-3">
              <div class="hero__title p-4 d-flex gap-2 flex-column">
                <h1 class="fs-1 fw-semibold">
                  Welcome to
                  <span
                    ><img
                      src="../public/assets/images/logo.svg"
                      alt=""
                      width="220px"
                  /></span>
                </h1>
                <p class="fs-5">
                  The world's most-loved social storytelling platform. Story
                  time connects a global community <br />
                  of 90 million readers and writers through the power of story.
                </p>
              </div>
              <nuxt-link to="/story" class="btn btn-dark rounded-1"
                >Explore
              </nuxt-link>
            </div>
          </div>
          <img
            class="mt-5"
            src="../public/assets/images/hero-image.png"
            alt=""
          />
        </div>
      </div>
    </section>
    <StoryListPage />
  </div>
</template>

<script setup>
useHead({
  title: "Storytime",
});
</script>

<style scoped>
.title__wrapper {
  margin-top: 10rem;
}
</style>
