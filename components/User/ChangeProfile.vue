<script setup>
import { useUserStore } from "~/stores/user.ts";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

const userStore = useUserStore();
</script>
<template>
  <div>
    <Form>
      <div class="mb-3">
        <BaseInput
          type="text"
          label="Name"
          placeholder="Enter your email/username"
          v-model="identifier"
          name="identifier"
        />
        <ErrorMessage class="text-danger fs-6" name="identifier" />
      </div>
      <div class="mb-3">
        <BaseInput
          type="email"
          label="Email"
          placeholder="Enter your email"
          v-model="email"
          name="email"
        />
        <ErrorMessage class="text-danger fs-6" name="email" />
      </div>
    </Form>
  </div>
</template>

<style lang="scss" scoped></style>
