<template>
  <div>
    <main class="main-wrapper">
      <section class="register">
        <div class="container">
          <div
            class="row min-vh-100 justify-content-center align-items-center d-flex"
          >
            <div class="col-5">
              <div
                class="login bg-white p-4 border border-secondary-subtle rounded-3"
              >
                <div class="register__header">
                  <h1 class="register__title fs-3 py-2">Register</h1>
                </div>
                <div class="register__body">
                  <form action="">
                    <span>
                      <BaseInput
                        type="text"
                        identity="name"
                        placeholder="Enter your name"
                        label="Name "
                        isGroup="true"
                      />
                      <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label"
                          >Name</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label"
                          >Username</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Enter your username"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label"
                          >Email</label
                        >
                        <input
                          type="Email"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Enter your email address"
                        />
                      </div>
                      <div class="mb-4">
                        <label for="exampleFormControlInput1" class="form-label"
                          >Password</label
                        >
                        <input
                          type="password"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Enter your password"
                        />
                      </div>
                      <div class="mb-4">
                        <label for="exampleFormControlInput1" class="form-label"
                          >Password Confirmation</label
                        >
                        <input
                          type="password"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Enter password confirmation"
                        />
                      </div>
                      <BaseButton type="submit">Register</BaseButton>

                      <p class="mt-3">
                        Already have account?
                        <nuxt-link
                          class="text-decoration-none text-dark fw-semibold"
                          to="/login"
                          >Login</nuxt-link
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
