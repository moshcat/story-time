<script setup lang="ts">
import { useStoryStore } from "~/stores/story";
const props = defineProps({
  id: { require: true, type: Number },
});
const story = useStoryStore();
</script>

<template>
  <div
    class="modal fade"
    id="deleteStoryModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content rounded-0">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Delete Story</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">Are you sure want to delete this story?</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary rounded-0"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            @click="story.deleteStory(props.id)"
            type="button"
            data-bs-dismiss="modal"
            class="btn btn-danger rounded-0"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
