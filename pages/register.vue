<script setup>
import { useAuthStore } from "~/stores/auth.ts";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

const authStore = useAuthStore();
const router = useRouter();

const name = ref("");
const username = ref("");
const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");

const passwordType = ref("password");
const confirmPasswordType = ref("password");

const toggleShowPassword = () => {
  passwordType.value = passwordType.value === "password" ? "text" : "password";
};
const toggleShowConfirmation = () => {
  confirmPasswordType.value =
    confirmPasswordType.value === "password" ? "text" : "password";
};
const schema = yup.object({
  name: yup.string().required("Name is required"),
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Password confirmation is required"),
});

const handleRegister = async () => {
  try {
    await authStore.register(
      name.value,
      username.value,
      email.value,
      password.value,
    );
    router.push("/success");
  } catch (error) {
    console.error("Register failed: ", error);
  }
};
</script>

<template>
  <div>
    <main class="main-wrapper">
      <section class="register">
        <div class="container">
          <div
            class="row min-vh-100 justify-content-center align-items-center d-flex"
          >
            <div class="col-5 mt-5">
              <div
                class="login bg-white p-4 border border-secondary-subtle rounded-3"
              >
                <div class="register__header">
                  <h1 class="register__title fs-3 py-2">Register</h1>
                </div>
                <div class="register__body">
                  <Form :validation-schema="schema" @submit="handleRegister">
                    <div class="mb-3">
                      <BaseInput
                        type="text"
                        label="Name"
                        placeholder="Enter your name"
                        v-model="name"
                        name="name"
                      />
                      <ErrorMessage class="text-danger fs-6" name="name" />
                    </div>
                    <div class="mb-3">
                      <BaseInput
                        type="text"
                        label="Username"
                        placeholder="Enter your username"
                        v-model="username"
                        name="username"
                      />
                      <ErrorMessage class="text-danger fs-6" name="username" />
                    </div>
                    <div class="mb-3">
                      <BaseInput
                        type="text"
                        label="Email"
                        placeholder="Enter your email"
                        v-model="email"
                        name="email"
                      />
                      <ErrorMessage class="text-danger fs-6" name="email" />
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
                      <ErrorMessage class="text-danger fs-6" name="password" />
                    </div>
                    <div class="mb-3 position-relative">
                      <div class="position-relative">
                        <BaseInput
                          :type="confirmPasswordType"
                          label="Password Confirmation"
                          placeholder="Enter your confirmation password"
                          v-model="passwordConfirmation"
                          name="passwordConfirmation"
                        />
                        <button
                          type="button"
                          class="eyes border-0 bg-transparent position-absolute bottom-50 mt-1 me-1 end-0"
                          @click="toggleShowConfirmation"
                        >
                          <i
                            :class="
                              confirmPasswordType === 'password'
                                ? 'fa fa-eye'
                                : 'fa fa-eye-slash'
                            "
                          ></i>
                        </button>
                      </div>
                      <ErrorMessage
                        class="text-danger fs-6"
                        name="passwordConfirmation"
                      />
                    </div>
                    <BaseButton type="submit" variant="dark w-100"
                      >Register
                    </BaseButton>
                    <p class="mt-3">
                      Already have account?
                      <nuxt-link
                        class="text-decoration-none text-dark fw-semibold"
                        to="/login"
                        >Login
                      </nuxt-link>
                    </p>
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
