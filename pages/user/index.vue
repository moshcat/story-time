<script setup>
import { ref, reactive, onMounted } from "vue";
import { useUserStore } from "~/stores/user.ts";
import "cropperjs/dist/cropper.css";
import VueCropper from "vue-cropperjs/VueCropper.js";

const userStore = useUserStore();
const toggleEdit = ref(false);
const togglePw = ref(false);
const config = useRuntimeConfig();
await userStore.fetchProfile();
const userImage = computed(
  () => userStore.user?.data?.profile_picture?.formats?.thumbnail?.url,
);

// Cropper related variables and functions
const imageProfile = ref("");
const imageUrlProfile = ref("");
const cropper = ref("");

function onImageChange(event) {
  const file = event.target.files[0];
  imageProfile.value = file;
  imageUrlProfile.value = URL.createObjectURL(file);
}

function removeImage() {
  imageProfile.value = "";
  imageUrlProfile.value = "";
}

async function cropImage() {
  if (cropper.value) {
    const croppedCanvas = cropper.value.getCroppedCanvas();
    croppedCanvas.toBlob(async (blob) => {
      if (blob) {
        try {
          await userStore.removeImage();
          await userStore.addImage(blob);
        } catch (err) {
          console.error(err);
        }
        await userStore.fetchProfile();
      }
    });
  }
}

// Profile editing functions
function editBtn(status) {
  toggleEdit.value = status;
}

const editData = reactive({
  name: "",
  biodata: "",
});

onMounted(async () => {
  await userStore.fetchProfile();
  if (userStore.user?.data) {
    editData.name = userStore.user.data.name;
    editData.biodata = userStore.user.data.biodata;
  }
});

async function handleEdit() {
  try {
    await userStore.editProfile(editData);
    await userStore.fetchProfile();
    toggleEdit.value = false;
  } catch (e) {
    console.error(e);
  }
}

function passwordBtn(status) {
  togglePw.value = status;
}

useHead({
  title: "User | Storytime",
});

definePageMeta({ middleware: "auth" });
</script>

<template>
  <div>
    <main class="main-wrapper">
      <section class="section_space">
        <div class="container">
          <div class="row min-vh-100">
            <div class="col-xl-3 col-lg-3 col-sm-12 mb-sm-2">
              <UserSidebarUser />
            </div>
            <div class="col-xl-9 col-lg-9 col-sm-12">
              <section class="profile card rounded-0">
                <div
                  class="profile__head d-flex align-items-center justify-content-between mb-3"
                >
                  <h4>My Profile</h4>
                  <button @click="editBtn(true)" class="btn btn-dark rounded-0">
                    <i class="fa-solid fa-edit me-2"></i>
                    <span>Edit Profile</span>
                  </button>
                </div>
                <div class="profile__body row" v-if="userStore.user">
                  <div class="col-lg-4">
                    <div
                      class="profile__image__wrapper d-flex flex-column justify-content-center align-items-center gap-"
                    >
                      <div class="profile__image">
                        <img
                          :src="
                            userImage
                              ? config.public.baseUrl + userImage
                              : 'https://via.placeholder.com/150'
                          "
                          alt=""
                          class="rounded-circle mb-3"
                          width="200px"
                        />
                      </div>
                      <input
                        type="file"
                        class="d-none"
                        id="inputImage"
                        @change="onImageChange"
                      />
                      <label
                        for="inputImage"
                        class="py-1 px-3 btn btn-outline-dark rounded-0 w-100"
                        data-bs-toggle="modal"
                        data-bs-target="#cropper"
                        style="font-size: 16px"
                      >
                        <p class="m-0 p-0">Change Avatar</p>
                      </label>
                    </div>
                  </div>
                  <div class="col-lg-8">
                    <template v-if="toggleEdit === false">
                      <table class="table table-borderless pb-0 w-100 mt-sm-4">
                        <tr>
                          <th class="fw-medium" scope="row" style="width: 20%">
                            Name
                          </th>
                          <td>{{ userStore.user.data.name }}</td>
                        </tr>
                        <tr>
                          <th scope="row" class="scroll-to-password fw-medium">
                            Email
                          </th>
                          <td>{{ userStore.user.data.email }}</td>
                        </tr>
                        <tr>
                          <th scope="row" class="scroll-to-password fw-medium">
                            Biodata
                          </th>
                          <td v-if="userStore.user.data.biodata">
                            {{ userStore.user.data?.biodata }}
                          </td>
                          <td v-else>-</td>
                        </tr>
                      </table>
                    </template>
                    <template v-else>
                      <form @submit.prevent="handleEdit">
                        <div class="mb-3">
                          <label
                            for="title"
                            class="form-label fw-semibold w-100 fs-6"
                            >Name</label
                          >
                          <input
                            class="form-control rounded-0"
                            type="text"
                            placeholder="Enter your name"
                            v-model="editData.name"
                            name="title"
                          />
                        </div>
                        <div class="mb-3">
                          <label
                            for="title"
                            class="form-label fw-semibold w-100 fs-6"
                            >Email</label
                          >
                          <input
                            class="form-control rounded-0"
                            type="text"
                            placeholder="Enter your email"
                            v-model="userStore.user.data.email"
                            name="email"
                            readonly
                          />
                        </div>
                        <div class="form-group">
                          <label
                            for="exampleFormControlTextarea1"
                            class="form-label fw-semibold w-100 fs-6"
                            >About me</label
                          >
                          <textarea
                            class="form-control rounded-0"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            v-model="editData.biodata"
                          ></textarea>
                        </div>
                        <div
                          class="button d-flex justify-content-end gap-2 mt-4"
                        >
                          <BaseButton
                            variant="outline-dark"
                            @click="editBtn(false)"
                            >Cancel
                          </BaseButton>
                          <BaseButton variant="dark" type="submit"
                            >Save
                          </BaseButton>
                        </div>
                      </form>
                    </template>
                  </div>
                </div>
              </section>

              <section class="password card rounded-0 mt-3">
                <div class="password__title d-flex justify-content-between">
                  <h4>Password</h4>
                  <BaseButton variant="dark" @click="passwordBtn(true)"
                    >Change Password
                  </BaseButton>
                </div>
                <div class="password__info" v-if="togglePw === true">
                  <form action="" class="mt-4">
                    <div class="mb-3">
                      <BaseInput
                        label="Old Password"
                        identity="old-password"
                        type="password"
                        placeholder="Enter old password"
                      />
                    </div>
                    <div class="mb-3">
                      <BaseInput
                        label="New Password"
                        identity="new-password"
                        type="password"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div class="mb-3">
                      <BaseInput
                        label="New Password Confirmation"
                        identity="new-password-confirmation"
                        type="password"
                        placeholder="Enter new password Confirmation"
                      />
                    </div>
                    <div
                      class="password__footer d-flex justify-content-end gap-2 mt-4"
                    >
                      <BaseButton
                        variant="outline-dark"
                        @click="passwordBtn(false)"
                        >Cancel
                      </BaseButton>
                      <BaseButton variant="dark">Save</BaseButton>
                    </div>
                  </form>
                </div>
                <div class="" v-else></div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Cropper Modal -->
    <div
      class="modal mt-5"
      id="cropper"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Adjust Image</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="removeImage"
            ></button>
          </div>
          <div class="modal-body">
            <vue-cropper
              v-if="imageUrlProfile"
              ref="cropper"
              :aspect-ratio="1"
              :src="imageUrlProfile"
              preview=".preview"
            />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-dark rounded-0"
              data-bs-dismiss="modal"
              @click="removeImage"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-dark rounded-0"
              data-bs-dismiss="modal"
              @click="cropImage"
            >
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 6rem;
}
</style>
