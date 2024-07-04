<script setup lang="ts">
import { getBookmark } from "~/helpers/bookmark";
import { useStoryStore } from "~/stores/story";

const storyStore = useStoryStore();
const config = useRuntimeConfig();
let bookmark: any = [];
onMounted(() => {
  bookmark = getBookmark();
});
useHead({
  title: "Bookmark | Storytime",
});
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
              <section class="favorite">
                <h2 class="favorite__title">Bookmark</h2>
                <div class="row favorite__list">
                  <div
                    class="col-sm-6 col-md-4 col-lg-4 col-xl-3 mt-4"
                    v-for="(story, index) in bookmark"
                    :key="index"
                  >
                    <NuxtLink :to="'/story/' + story.id">
                      <div
                        class="card border-secondary-subtle"
                        style="height: 450px"
                      >
                        <NuxtLink :to="'/story/' + story.id">
                          <img
                            :src="
                              config.public.baseUrl + story.cover_image?.url
                            "
                            class="card-img-top object-fit-cover"
                            alt="..."
                            width="auto"
                            height="200px"
                          />
                        </NuxtLink>
                        <div
                          class="card-body d-flex flex-column position-relative"
                        >
                          <div class="card-title p-1 pb-0">
                            <span class="d-flex gap-2">
                              <!-- Pastikan properti category, title, content, dll. ada di objek story -->
                              <span class="badge text-bg-dark">{{
                                story.category.name
                              }}</span>
                            </span>
                            <h5 class="mt-3 line-clamp">{{ story.title }}</h5>
                            <hr />
                          </div>
                          <p
                            class="card-text p-1 line-clamp"
                            style="font-size: 14px"
                          >
                            {{ story.content }}
                          </p>
                          <div
                            class="d-flex justify-content-between p-1 mt-auto"
                            style="font-size: 14px"
                          >
                            <span class="fw-medium"
                              >By {{ story.author.username }}</span
                            >
                            <span class="fw-medium">{{
                              storyStore.formatDate(story.createdAt)
                            }}</span>
                          </div>
                        </div>
                      </div>
                    </NuxtLink>
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

<style scoped>
.container {
  margin-top: 6rem;
}
</style>
