<script setup>
import { useAuthStore } from "~/stores/auth.ts";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

const identifier = ref("");
const password = ref("");
const passwordType = ref("password");

const authStore = useAuthStore();
const router = useRouter();

const schema = yup.object({
  identifier: yup.string().required("Email/Username is required"),
  password: yup.string().required("Password is required"),
});
const handleLogin = async (values) => {
  console.log(identifier.value, password.value);
  await authStore.login(identifier.value, password.value);
  router.push("/");
};

const toggleShowPassword = () => {
  passwordType.value = passwordType.value === "password" ? "text" : "password";
};
</script>

<template>
  <div>
    <main class="main-wrapper">
      <section class="login">
        <div class="container">
          <div
            class="row min-vh-100 justify-content-center align-items-center d-flex"
          >
            <div class="col-5">
              <div
                class="login bg-white p-4 border border-secondary-subtle rounded-3"
              >
                <div class="login__header">
                  <h1 class="login__title fs-3 py-2">Login</h1>
                </div>
                <div class="login__body">
                  <Form :validation-schema="schema" @submit="handleLogin">
                    <span>
                      <div class="mb-3">
                        <BaseInput
                          type="text"
                          label="Email/Password"
                          placeholder="Enter your email/username"
                          v-model="identifier"
                          name="identifier"
                        />
                        <ErrorMessage
                          class="text-danger fs-6"
                          name="identifier"
                        />
                      </div>

                      <div class="mb-3">
                        <div class="position-relative">
                          <BaseInput
                            :type="passwordType"
                            label="Password"
                            placeholder="Enter your password"
                            v-model="password"
                            name="password"
                          />
                          <button
                            type="button"
                            class="eyes border-0 bg-transparent position-absolute bottom-50 mt-1 me-1 end-0"
                            @click="toggleShowPassword"
                          >
                            <i
                              :class="
                                passwordType === 'password'
                                  ? 'fa fa-eye'
                                  : 'fa fa-eye-slash'
                              "
                            ></i>
                          </button>
                        </div>
                        <ErrorMessage
                          class="text-danger fs-6"
                          name="password"
                        />
                      </div>

                      <BaseButton type="submit" variant="dark w-100"
                        >Login</BaseButton
                      >
                      <p class="mt-3">
                        Don't have an account yet?
                        <nuxt-link
                          class="text-decoration-none text-dark fw-semibold"
                          to="/register"
                          >Register</nuxt-link
                        >
                      </p>
                    </span>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.eyes {
  transform: translateY(-50%);
  top: 50%;
  z-index: 9999;
}
</style>
