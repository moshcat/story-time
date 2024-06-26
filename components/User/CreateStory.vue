<script setup lang="ts">
import { ErrorMessage, Form, Field } from "vee-validate";
import { useStoryStore } from "~/stores/story";
import * as yup from "yup";
import { useRouter } from "vue-router";
import { QuillEditor } from "@vueup/vue-quill";

definePageMeta({
  middleware: "auth",
});
const story = useStoryStore();
const storyContent = ref();
const file = ref();
const fileInput = ref();
const router = useRouter();
const imagePrev = ref(
  "https://img.freepik.com/free-vector/landing-page-image-upload-concept_23-2148304432.jpg?t=st=1714706545~exp=1714710145~hmac=29ca06a88ac91f442eb5928ee467c9ce7a8ec12e605b23f3927d2a52864e9093&w=1380"
);

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
const storyData = reactive({
  title: "",
  category: "",
  content: storyContent,
});

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
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <BaseInput
          type="text"
          label="Title"
          placeholder="Enter your email/username"
          v-model="storyData.title"
          name="title"
        />
        <ErrorMessage class="text-danger fs-6" name="title" />

        <div class="mb-3">
          <BaseSelect v-model="storyData.category" />
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
