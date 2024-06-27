<script setup lang="ts">
import { ErrorMessage, Form, Field } from "vee-validate";
import { useStoryStore } from "~/stores/story";
import { useCategoryStore } from "~/stores/category";
import * as yup from "yup";
import { useRouter } from "vue-router";
import { QuillEditor } from "@vueup/vue-quill";

definePageMeta({
  middleware: "auth",
});
const { id } = useRoute().params;
const story = useStoryStore();
const storyContent = ref();
const cat = useCategoryStore();
const file = ref();
const fileInput = ref();
const router = useRouter();
const imagePrev = ref(
  "https://img.freepik.com/free-vector/landing-page-image-upload-concept_23-2148304432.jpg?t=st=1714706545~exp=1714710145~hmac=29ca06a88ac91f442eb5928ee467c9ce7a8ec12e605b23f3927d2a52864e9093&w=1380"
);
const storyData = reactive({
  title: "",
  category: "",
  content: storyContent,
});
// stiill error di part munculin data di BaseInput title
onMounted(async () => {
  await story.getStoryId(id);
  const storyDetail = story.story;
  if (storyDetail) {
    console.log(storyDetail);
    storyData.title = storyDetail.title;
    storyData.category = storyDetail.category.id;
    storyContent.value = storyDetail.content;
    if (storyDetail.cover_image) {
      imagePrev.value = `http://localhost:3001${storyDetail.cover_image.url}`;
      console.log(imagePrev);
    }
  }
});

await cat.getCategories();

const previewPhoto = (e: any) => {
  fileInput.value = e.target.files[0];
  file.value = e.target.files[0];
  if (!file.value) return; // Handle no file selected case
  const reader = new FileReader();
  reader.onload = () => {
    if (typeof reader.result === "string") {
      imagePrev.value = reader.result;
    }
    e.target.value = "";
  };
  reader.readAsDataURL(file.value);
};

const coverImage = reactive({
  files: fileInput.value,
  refId: story.stories[0]?.id,
  ref: "api::story.story",
  field: "cover_image",
});

const handleSubmit = async () => {
  try {
    await story.createStory(storyData);
    console.log(story.status_code);
    console.log(story.stories);

    if (story.status_code == 200) {
      const newStoryId = story.stories[0]?.id;
      if (!newStoryId) {
        throw new Error("tidak ada id");
      }
      const data = new FormData();
      data.append("files", file.value);
      data.append("refId", story.stories[0]?.id);
      data.append("ref", "api::story.story");
      data.append("field", "cover_image");
      console.log("data:", data);
      data.forEach((value, key) => {
        console.log(`${key}:`, value);
      });
      try {
        await story.uploadImage(data);
        navigateTo("/user/story");
      } catch (e) {
        console.log(e);
      }
    }
  } catch (e) {
    console.error(e);
  }
};

async function goBack() {
  router.back();
}
</script>
<template>
  <div>
    {{ id }}
    {{ storyData.title }}
    {{ imagePrev }}
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
          <label for="" class="form-label fw-semibold">Category</label>
          <select
            class="form-select rounded-0"
            aria-label="Default select example"
            v-model="storyData.category"
          >
            <option selected>Select category</option>
            <option
              v-for="(item, index) in cat.category"
              :key="index"
              :value="item.id"
            >
              {{ item.name }}
            </option>
          </select>
          <h2>{{ storyData.category }}</h2>
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
          <div class="img-upload-wrapper">
            <div class="position-absolute">
              <img :src="imagePrev" id="file-preview" class="img-prev" alt="" />
            </div>
            <input
              type="file"
              class="w-100 position-relative h-100 opacity-0"
              id="file-input"
              accept="image/*"
              @change="previewPhoto"
            />
          </div>
        </div>
        <div class="mb-3 d-flex justify-content-end gap-2">
          <NuxtLink :to="null" @click.native="goBack">
            <BaseButton variant="outline-dark ">Batal</BaseButton>
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
  aspect-ratio: 1/1;
  object-fit: cover;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
}
</style>
