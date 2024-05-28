<script setup></script>
<template>
  <div>
    <NuxtLink to="'/story/' + item.id">
      <div class="card border-secondary-subtle" style="height: 450px">
        <NuxtLink to="'/story/' + item.id">
          <img
            src="../public/assets/images/card-image.png"
            class="card-img-top object-fit-cover"
            alt="..."
            width="auto"
            height="200px"
          />
        </NuxtLink>
        <div class="card-body d-flex flex-column position-relative">
          <div class="card-title p-1 pb-0">
            <span class="d-flex gap-2">
              <span class="badge text-bg-dark">Comedy </span>
            </span>
            <h5 class="mt-3 line-clamp">ini judul</h5>
            <hr />
          </div>
          <p class="card-text p-1 line-clamp" style="font-size: 14px">
            ini desc
          </p>
          <div
            class="d-flex justify-content-between p-1 mt-auto"
            style="font-size: 14px"
          >
            <span class="fw-medium">By Abi </span>
            <span class="fw-medium">23 Mei 2024</span>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped></style>
