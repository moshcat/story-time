<script setup lang="ts">
import { onMounted } from "vue";
import { getBookmark } from "~/helpers/bookmark";

let bookmark: any = [];

onMounted(() => {
  bookmark = getBookmark();
});
</script>

<template>
  <div>
    <div class="row"></div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  position: relative;
  overflow: hidden;
}

.bookmark {
  top: 10px;
  right: 10px;
  display: none;
  z-index: 1;
}

.card:hover .bookmark {
  display: block;
}
</style>
