<template>
  <div>
    <main class="main-wrapper">
      <section class="section_space">
        <div class="container">
          <div class="row min-vh-100 justify-content-start align-items-start">
            <div class="col-3">
              <SidebarUser />
            </div>
            <div class="col-9">
              <section class="story-list card rounded-1">
                <div
                  class="story-list__header d-flex align-items-center justify-content-between mb-5"
                >
                  <h4>Storylist</h4>
                  <button class="btn btn-dark rounded-1">
                    <i class="fa-solid fa-plus me-2"></i>
                    <span>Create Story</span>
                  </button>
                </div>
                <div class="story-list__body row">
                  <div class="col-lg-12">
                    <div
                      class="empty__state d-flex align-items-center gap-3 flex-column"
                    >
                      <div class="empty-state__img mt-0 mb-3">
                        <img
                          src="https://storytime.strapi.timedoor-js.web.id/empty-data.svg"
                          alt=""
                          width="200px"
                        />
                      </div>
                      <div class="empty-state__desc fs-4 fw-semibold mb-5">
                        <p>No Data Found</p>
                      </div>
                    </div>
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
useHead({
  title: "Storylist | Storytime",
});
</script>

<style scoped>
.container {
  margin-top: 6rem;
}
</style>
