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
                  <form action="">
                    <span>
                      <BaseInput
                        type="email"
                        identity="email"
                        placeholder="Enter your email"
                        label="Email"
                        value="modelValue"
                        isGroup="false"
                      />

                      <BaseInput
                        type="password"
                        id="identity"
                        placeholder="Enter your password"
                        label="Password"
                        value="modelValue"
                      />

                      <BaseButton type="submit">Login</BaseButton>

                      <p class="mt-3">
                        Dont have account yet?
                        <nuxt-link
                          class="text-decoration-none text-dark fw-semibold"
                          to="/register"
                          >Register</nuxt-link
                        >
                      </p>
                    </span>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
