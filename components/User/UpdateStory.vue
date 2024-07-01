<script setup lang="ts">
import { ErrorMessage, Form, Field } from "vee-validate";
import { useStoryStore } from "~/stores/story";
import { useCategoryStore } from "~/stores/category";
import * as yup from "yup";
import { useRouter, useRoute } from "vue-router";
import { ref, reactive, onMounted, watch } from "vue";

definePageMeta({
  middleware: "auth",
});

const { id } = useRoute().params;
const storyStore = useStoryStore();
const categoryStore = useCategoryStore();
const router = useRouter();
const config = useRuntimeConfig();
const urlBase = "https://storytime-api.strapi.timedoor-js.web.id";

const storyContent = ref("");
const file = ref<File | null>(null);
const imagePrev = ref(
  "https://archive.org/download/placeholder-image/placeholder-image.jpg",
);

const storyData = reactive({
  title: "",
  category: "",
  content: storyContent,
});

onMounted(async () => {
  await storyStore.getStoryId(id);
  const storyDetail = storyStore.story;
  if (storyDetail) {
    storyData.title = storyDetail.title;
    storyData.category = storyDetail.category.id;
    storyContent.value = storyDetail.content;
    if (storyDetail.cover_image) {
      imagePrev.value = config.public.baseUrl + storyDetail.cover_image.url;
      console.log(imagePrev.value);
    }
  }
  await categoryStore.getCategories();
});

const previewPhoto = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const files = target.files;
  if (files && files[0]) {
    file.value = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        imagePrev.value = reader.result;
      }
    };
    reader.readAsDataURL(file.value);
  }
};

const handleSubmit = async () => {
  try {
    console.log(storyData);
    await storyStore.updateStory(storyData, id);
    // if (storyStore.story.cover_image.id) {
    //   await storyStore.removeImage(storyStore.story.cover_image.id);
    // }
    // if (storyStore.status_code === 200) {
    //   const newStoryId = storyStore.stories[0]?.id;
    //   if (!newStoryId) {
    //     throw new Error("No story ID returned");
    //   }
    //   if (file.value) {
    //     const data = new FormData();
    //     data.append("files", file.value);
    //     data.append("refId", newStoryId);
    //     data.append("ref", "api::story.story");
    //     data.append("field", "cover_image");
    //     await storyStore.uploadImage(data);
    //   }
    //   router.push("/user/story");
    // }
  } catch (e) {
    console.error(e);
    console.log(storyData);
  }
};

const resetImage = () => {
  imagePrev.value = "https://placehold.co/600x400?text=Image+Not+Found";
};

const goBack = () => {
  router.back();
};
</script>

<template>
  <div>
    {{ storyData.title }}
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <BaseInput
          type="text"
          label="Title"
          placeholder="Enter story title"
          v-model="storyData.title"
          name="title"
        />
        <ErrorMessage class="text-danger fs-6" name="title" />

        <div class="mb-3">
          <label for="category" class="form-label fw-semibold">Category</label>
          <select
            id="category"
            class="form-select rounded-0"
            v-model="storyData.category"
          >
            <option disabled value="">Select category</option>
            <option
              v-for="(item, index) in categoryStore.category"
              :key="index"
              :value="item.id"
            >
              {{ item.name }}
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label for="content" class="form-label fw-semibold w-100 fs-6"
            >Content</label
          >
          <BaseQuill
            toolbar="full"
            contentType="html"
            v-model:content="storyData.content"
            theme="snow"
          />
        </div>

        <div class="mb-3 w-100">
          <label for="image" class="form-label fw-semibold w-100 fs-6"
            >Cover Image</label
          >
          <div class="img-upload-wrapper postion-relative">
            <div
              class="danger bg-danger fs-5 rounded-circle position-absolute text-white d-flex justify-content-center align-items-center"
              id="button"
              style="width: 30px; height: 30px"
              @click="resetImage()"
            >
              <i class="fa-solid fa-x fs-6"></i>
            </div>

            <img
              :src="imagePrev"
              id="file-preview"
              class="img-prev"
              alt="Cover Image Preview"
            />
          </div>
          <div class="position-absolute w-25 mt-3 btn btn-dark">
            Change Image
          </div>
          <input
            type="file"
            class="w-100 h-100 opacity-0 mt-3"
            id="file-input"
            title="test"
            accept="image/*"
            @change="previewPhoto"
          />
        </div>

        <div class="mb-3 d-flex justify-content-end gap-2">
          <NuxtLink :to="null" @click.native="goBack">
            <BaseButton variant="outline-dark">Batal</BaseButton>
          </NuxtLink>
          <BaseButton variant="dark" type="submit">Simpan</BaseButton>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.img-upload-wrapper,
.img-prev {
  width: 200px;
  height: 200px;
  object-fit: cover;
  position: relative;
  border-radius: 4px;
}

#button {
  z-index: 1;
  left: 180px;
  bottom: 180px;
}
</style>
