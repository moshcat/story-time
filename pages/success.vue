<template>
  <div>
    <div
      class="container d-flex justify-content-center align-items-center min-vh-100"
    >
      <div class="row">
        <div class="col-12 text-center d-flex flex-column gap-3">
          <img src="../public/assets/images/success.svg" alt="" width="300px" />
          <h2 class="text-uppercase fw-bold">Registration Success</h2>
          <NuxtLink to="/login">
            <BaseButton variant="dark w-50">Login</BaseButton>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Storytime",
});
</script>

<style scoped>
.title__wrapper {
  margin-top: 10rem;
}

.container {
  background-color: #f4f2e6;
}
</style>
