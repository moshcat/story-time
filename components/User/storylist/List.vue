<script setup lang="ts">
import { useStoryStore } from "~/stores/story.ts";
import { useAuthStore } from "~/stores/auth.ts";

const storyStore = useStoryStore();
const id = ref();

const storyId = (idTable: string) => {
  id.value = idTable;
};
onMounted(() => {
  storyStore.getUserStory();
});
</script>
<template>
  <div>
    <table class="table">
      <thead>
        <tr class="border-top fs-5 fw-semibold">
          <th width="50%">Title</th>
          <th width="25%">Last Update</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody class="">
        <tr v-for="story in storyStore.userStories" :key="story.id">
          <td class="fw-semibold">{{ story.title }}</td>
          <td>13:45, 25 Nov 2022</td>
          <td class="d-flex gap-1">
            <NuxtLink to="edit">
              <BaseButton variant="outline-dark"
                ><i class="fa-solid fa-pen me-1"></i>Edit
              </BaseButton>
            </NuxtLink>
            <BaseButton
              variant="outline-danger"
              @click="storyId(story.id)"
              data-bs-toggle="modal"
              data-bs-target="#deleteStoryModal"
              ><i class="fa-solid fa-trash me-1"></i>Delete
            </BaseButton>
          </td>
        </tr>
      </tbody>
    </table>
    <DeleteModal :id="id" />
  </div>
</template>

<style lang="scss" scoped></style>
