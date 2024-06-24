<script setup lang="ts">
import { ref } from "vue";
const previewUrl = ref("");

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
const handleFileChange = (event) => {
  const input = event.target as HTMLInputElement;
  const files = input.files;
  console.log("files test:", files);

  if (files && files.length > 0) {
    const selectedFile = files[0];
    console.log(selectedFile);

    previewUrl.value = URL.createObjectURL(selectedFile);
    emit("update:modelValue", previewUrl.value);
    console.log(previewUrl.value);
  } else {
    previewUrl.value = "";
    emit("update:modelValue", "");
    console.log(previewUrl);
  }
};

watch(
  () => props.modelValue,
  (newValue) => {
    previewUrl.value = newValue;
  }
);
</script>

<template>
  <div class="img-upload-container">
    <label for="file-input" class="image-upload-label">
      <div v-if="previewUrl" class="image-preview mt-4">
        <img :src="previewUrl" alt="image preview" class="image-preview" />
      </div>
      <div v-else class="image-placeholder">
        <span class="plus-icon">+</span>
        <span>Add Image</span>
      </div>
    </label>
    <input
      type="file"
      id="file-input"
      accept="image/*"
      @change="handleFileChange"
    />
  </div>
</template>

<style scoped>
.image-upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-upload-label {
  display: block;
  width: 250px;
  height: 250px;
  margin-top: 2rem;
  border: 1px dashed #ccc;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  text-align: center;
}

.image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.plus-icon {
  font-size: 24px;
  color: #666;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

input[type="file"] {
  display: none;
}
</style>
