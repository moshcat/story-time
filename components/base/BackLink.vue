<script setup>
import { RouterLink } from "vue-router";

const props = defineProps({
  ...RouterLink.props,
});

const router = useRouter();
const lastPath = computed(() => router.options.history.state.back ?? "");
</script>

<template>
  <NuxtLink v-if="to !== lastPath" v-bind="$props">
    <slot></slot>
  </NuxtLink>
  <button v-else @click="$router.back()">
    <slot></slot>
  </button>
</template>
<style scoped></style>
