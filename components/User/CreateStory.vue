<script setup lang="ts">
import { ErrorMessage, Form, Field } from "vee-validate";
import * as yup from "yup";

const title = ref("");
const category = ref("");
const content = ref("");
const coverImage = ref(null);
const coverImageUrl = ref(null);

async function goBack() {
  this.$router.back();
}
</script>
<template>
  <div>
    <form>
      <div class="mb-3">
        <BaseInput
          type="text"
          label="Title"
          placeholder="Enter your email/username"
          v-model="title"
          name="title"
        />
        <ErrorMessage class="text-danger fs-6" name="title" />

        <div class="mb-3">
          <BaseSelect />
        </div>

        <div class="mb-3">
          <label for="content" class="form-label fw-semibold w-100 fs-6"
            >Content</label
          >

          <BaseQuill v-model="content" />
        </div>
        <div class="mb-3 w-100">
          <label for="image" class="form-label fw-semibold w-100 fs-6"
            >Cover Image</label
          >
          <div v-if="!imageUrl" name="inputImage">
            <div class="w-100">
              <BaseInput
                class="d-none"
                v-model="image"
                type="file"
                label=""
                identity="inputImage"
              />
              <label
                for="inputImage"
                class="d-flex justify-content-center align-content-center align-items-center border-2 border-secondary flex-column m-0"
                style="
                  border-style: dashed;
                  width: 300px;
                  height: 300px;
                  cursor: pointer;
                "
              >
                <i class="fa-solid fa-circle-plus fs-5"></i>
                <p class="m-0 p-0">Add image</p>
              </label>
            </div>
          </div>
          <div v-if="imageUrl" name="outputImage">
            <div class="w-100 d-flex">
              <div class="ms-4" style="width: 30%">
                <img :src="imageUrl" class="w-100 h-100" alt="" />
              </div>
              <button
                type="button"
                class="btn rounded-circle fs-4 d-flex justify-content-center align-items-center"
                style="width: 25px; height: 25px"
              >
                <i class="text-danger fa-solid fa-circle-xmark"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="mb-3 d-flex justify-content-end gap-2">
          <NuxtLink :to="null" @click.native="goBack">
            <BaseButton variant="outline-dark ">Batal</BaseButton>
          </NuxtLink>
          <BaseButton variant="dark ">Simpan</BaseButton>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
