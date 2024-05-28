<template>
  <div>
    <Navbar />
    <!-- output page lainnya -->
    <div>
      <slot />
    </div>

    <Footer />
  </div>
</template>

<script setup></script>

<style scoped>
.router-link-exact-active {
  color: aqua;
}
</style>
