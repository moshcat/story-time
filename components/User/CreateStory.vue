<script setup lang="ts">
import { ErrorMessage, Form, Field } from "vee-validate";
import { useStoryStore } from "~/stores/story";

import * as yup from "yup";

const storyStore = useStoryStore();
const storyData = reactive({
  title: "",
  category: "",
  content: "",
  coverImage: "",
});

const handleSubmit = async () => {
  try {
    await storyStore.createStory(storyData);
  } catch (error) {
    console.log(error);
  }
};

async function goBack() {
  this.$router.back();
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

          <BaseQuill v-model:content="storyData.content" />
        </div>
        <div class="mb-3 w-100">
          <label for="image" class="form-label fw-semibold w-100 fs-6"
            >Cover Image</label
          >
          <BaseInputImage v-model="storyData.coverImage" />
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

<style scoped></style>
