<script setup>
const stories = ref([]);
const { data, pending, error, refresh } = await useFetch(
  "https://storytime-api.strapi.timedoor-js.web.id/api/stories",
);

if (data.value) {
  stories.value = data.value.data; // Sesuaikan dengan struktur data yang dikembalikan dari API
}

const urlBase = "https://storytime-api.strapi.timedoor-js.web.id/";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = { day: "numeric", month: "short", year: "numeric" };
  return new Intl.DateTimeFormat("id-ID", options).format(date);
}
</script>

<template>
  <div>
    <section class="story__list container" style="margin-top: 6rem">
      <div class="row story__filter d-flex justify-content-between mt-4">
        <div class="col-4"></div>
        <div class="col-3">
          <SelectFilter />
        </div>
      </div>
      <div class="row">
        <div class="col-3 mt-3" v-for="(item, index) in stories" :key="index">
          <NuxtLink :to="'/story/' + item.id">
            <div class="card border-secondary-subtle" style="height: 450px">
              <NuxtLink :to="'/story/' + item.id">
                <img
                  :src="urlBase + item.cover_image.url"
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
                      item.category.name
                    }}</span>
                  </span>
                  <h5 class="mt-3 line-clamp">{{ item.title }}</h5>
                  <hr />
                </div>
                <p class="card-text p-1 line-clamp" style="font-size: 14px">
                  {{ item.content }}
                </p>
                <div
                  class="d-flex justify-content-between p-1 mt-auto"
                  style="font-size: 14px"
                >
                  <span v-if="item.author" class="fw-medium"
                    >By {{ item.author.username }}</span
                  >
                  <span class="fw-medium">{{
                    formatDate(item.createdAt)
                  }}</span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
