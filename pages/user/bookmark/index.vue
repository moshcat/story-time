<script setup lang="ts">
import {
  getBookmark,
  toggleBookmark,
  removeBookmark,
} from "~/helpers/bookmark";
import { useStoryStore } from "~/stores/story";
import { ref, onMounted, watch } from "vue";

const storyStore = useStoryStore();
const { $locally } = useNuxtApp();
const bookmark = ref(getBookmark());
const config = useRuntimeConfig();

const lastClickTime = ref(0);

const handleToggleBookmark = (story) => {
  const now = new Date().getTime();
  if (now - lastClickTime.value < 300) {
    // Jika diklik dua kali dalam 300ms, hapus bookmark
    bookmark.value = removeBookmark(story);
  } else {
    // Jika tidak, toggle bookmark
    bookmark.value = toggleBookmark(story);
  }
  lastClickTime.value = now;
};

watch(
  () => bookmark.value,
  (newBookmark) => {
    $locally.setItem("bookmark", JSON.stringify(newBookmark));
  },
);

onMounted(() => {
  bookmark.value = getBookmark();
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
                <div class="row" v-if="bookmark.length === 0">
                  <BaseEmpty />
                </div>
                <div class="row favorite__list" v-else>
                  <div
                    class="col-sm-6 col-md-4 col-lg-4 col-xl-3 mt-4"
                    v-for="(story, index) in bookmark"
                    :key="index"
                  >
                    <div
                      class="card border-secondary-subtle"
                      :story="story"
                      style="height: 450px; position: relative"
                    >
                      <div @click="handleToggleBookmark(story)">
                        <BaseButton
                          :variant="
                            (bookmark.value?.some((b: any) => b.id === story.id)
                              ? 'success'
                              : 'dark') + ' rounded-circle p-3'
                          "
                          class="position-absolute rounded-circle bookmark"
                        >
                          <i
                            :class="
                              bookmark.value?.some(
                                (b: any) => b.id === story.id,
                              )
                                ? 'fa-solid fa-bookmark fs-5'
                                : 'fa-regular fa-bookmark fs-5'
                            "
                          ></i>
                        </BaseButton>
                      </div>
                      <NuxtLink :to="'/story/' + story.id">
                        <div
                          class="card border-secondary-subtle"
                          style="height: 450px"
                        >
                          <NuxtLink :to="'/story/' + story.id">
                            <img
                              v-if="story.cover_image?.url"
                              :src="
                                config.public.baseUrl + story.cover_image?.url
                              "
                              class="card-img-top object-fit-cover"
                              alt="..."
                              width="auto"
                              height="200px"
                            />
                            <img
                              v-else
                              :src="'https://archive.org/download/placeholder-image/placeholder-image.jpg'"
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

.card {
  position: relative;
  overflow: hidden;
}

.bookmark {
  top: 10px;
  right: 10px;
  display: none;
  z-index: 1;
}

.card:hover .bookmark {
  display: block;
}

.favorite__title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.favorite__list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.line-clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 3;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}

.card-text {
  font-size: 0.875rem;
}

.position-absolute {
  position: absolute;
}
</style>
