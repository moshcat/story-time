<script setup>
const { id } = useRoute().params;

const url = "https://storytime-api.strapi.timedoor-js.web.id/api/stories/" + id;
const { data } = await useFetch(url);
const urlBase = "https://storytime-api.strapi.timedoor-js.web.id/";

console.log(data);

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = { day: "numeric", month: "short", year: "numeric" };
  return new Intl.DateTimeFormat("id-ID", options).format(date);
}

definePageMeta({
  layout: "story",
});
useHead({
  title: `${{}} | Storytime`,
});
</script>

<template>
  <div>
    <section class="story__detail mt-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-8">
            <div class="detail">
              <div class="detail__header">
                <h2 class="detail__title fw-bold fs-1 mt-5">
                  {{ data.data.title }}
                </h2>
                <div class="author d-flex gap-3 align-content-center mt-4">
                  <img
                    :src="
                      urlBase +
                      data.data.author.profile_picture.formats.thumbnail.url
                    "
                    alt=""
                    width="auto"
                    height="60px"
                    class="rounded-circle border border-2 border-dark"
                  />
                  <div class="detail__author d-flex flex-column gap-2 mb-4">
                    <p class="mb-0">{{ data.data.author.username }}</p>
                    <p class="mb-0">
                      Dipublish pada {{ formatDate(data.data.createdAt) }}
                    </p>
                  </div>
                </div>
                <hr />
              </div>
              <div class="detail__content">
                <img
                  v-if="data.data"
                  :src="urlBase + data.data.cover_image.url"
                  style="object-fit: cover"
                  alt=""
                  width="100%"
                  height="300px"
                />
                <client-only>
                  <p
                    class="mt-4"
                    v-if="data.data"
                    v-html="data.data.content"
                  ></p>
                </client-only>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.story__detail {
  margin-top: 5rem !important;
}
</style>
