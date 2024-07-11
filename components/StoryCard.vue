<script setup>
import { useStoryStore } from "~/stores/story.ts";
import {
  getBookmark,
  toggleBookmark,
  removeBookmark,
} from "~/helpers/bookmark.ts";
import { onMounted } from "vue";
import { navigateTo } from "#app";
import { useAuthStore } from "~/stores/auth";

const { $locally } = useNuxtApp();
const router = useRouter();
const urlBase = "https://storytime-api.strapi.timedoor-js.web.id/";
const storyStore = useStoryStore();
const lastClickTime = ref(0);
const auth = useAuthStore();

// bookmark
const bookmark = ref(getBookmark());
const handleToggleBookmark = (story) => {
  if (!auth.accessToken && !auth.user) {
    console.log(auth.accessToken);
    router.push("/login");
  } else {
    const time = new Date().getTime();
    if (time - lastClickTime.value < 300) {
      bookmark.value = removeBookmark(story);
    } else {
      bookmark.value = toggleBookmark(story);
    }
    lastClickTime.value = time;
  }
};
watch(
  () => bookmark.value,
  (newBookmark) => {
    $locally.setItem("bookmark", JSON.stringify(newBookmark));
  },
);

const props = defineProps({
  searchQuery: String,
  sortOrder: String,
});

watch(
  () => [props.searchQuery, props.sortOrder],
  ([newQuery, newOrder]) => {
    storyStore.fetchStories(newQuery, 1, newOrder);
  },
  { immediate: true },
);

onMounted(() => {
  storyStore.fetchStories(props.searchQuery, 1, props.sortOrder);
});
// storyStore.fetchStories(
//   storyStore.searchQuery,
//   "",
//   storyStore.defaultPage,
//   storyStore.sortOrder,
//   storyStore.category,
// );
// watch(
//   () => storyStore.searchQuery,
//   (newQuery) => {
//     storyStore.defaultPage = 1;
//     storyStore.fetchStories(newQuery, storyStore.defaultPage);
//   },
// );
//
// watch(
//   () => storyStore.sortOrder,
//   () => {
//     storyStore.defaultPage = 1;
//     storyStore.fetchStories(storyStore.searchQuery, storyStore.defaultPage);
//   },
// );
</script>

<template>
  <div>
    <section class="story__list container" style="margin-top: 1rem">
      <div class="row">
        <div
          class="col-sm-6 col-md-4 col-lg-4 col-xl-3 mt-3 position-relative"
          v-for="(item, index) in storyStore.stories"
          :key="index"
          id="card"
        >
          <div
            class="card border-secondary-subtle"
            :item="item"
            style="height: 450px; position: relative"
          >
            <div @click="handleToggleBookmark(item)">
              <BaseButton
                :variant="
                  (bookmark.value?.some((b) => b.id === item.id)
                    ? 'success'
                    : 'dark') + ' rounded-circle p-3'
                "
                class="position-absolute rounded-circle bookmark"
              >
                <i
                  :class="
                    bookmark.value?.some((b) => b.id === item.id)
                      ? 'fa-solid fa-bookmark fs-5'
                      : 'fa-regular fa-bookmark fs-5'
                  "
                ></i>
              </BaseButton>
            </div>

            <NuxtLink :to="'/story/' + item.id">
              <img
                v-if="item.cover_image"
                :src="urlBase + item.cover_image.url"
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

            <div class="card-body d-flex flex-column position-relative">
              <div class="card-title p-1 pb-0">
                <span class="d-flex gap-2">
                  <span class="badge text-bg-dark">{{
                    item.category?.name
                  }}</span>
                </span>
                <h5 class="mt-2 line-clamp">{{ item.title }}</h5>
                <hr />
              </div>
              <p class="card-text p-1 line-clamp" style="font-size: 14px">
                {{ item.content }}
              </p>
              <div
                class="d-flex justify-content-between p-1 mt-auto"
                style="font-size: 14px"
              >
                <span v-if="item.author" class="fw-medium">
                  By {{ item.author?.username }}
                </span>
                <span class="fw-medium">{{
                  storyStore.formatDate(item.createdAt)
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row d-flex justify-content-center my-5">
        <div class="col-2">
          <BaseButton variant="outline-dark w-100" @click="storyStore.loadMore">
            Show more
          </BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
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
</style>
