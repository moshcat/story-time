<template>
  <div>
    <HeadersNavbar />
    <!-- output page lainnya -->
    <div>
      <slot />
    </div>
    <FootersFooter />
  </div>
</template>

<script setup></script>

<style scoped>
.router-link-exact-active {
  color: pink;
}
</style>
