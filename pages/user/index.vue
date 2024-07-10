<script setup>
import { useUserStore } from "~/stores/user.ts";

const userStore = useUserStore();
const toggleEdit = ref(false);

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
    // console.log(editData);
    await userStore.editProfile(editData);
    await userStore.fetchProfile();
    toggleEdit.value = false;
  } catch (e) {
    console.error(e);
  }
}

useHead({
  title: "User | Storytime",
});
definePageMeta({ middleware: "auth" });
</script>

<template>
  <div>
    <div>
      <main class="main-wrapper">
        <section class="section_space">
          <div class="container">
            <div class="row min-vh-100 justify-content-start align-items-start">
              <div class="col-3">
                <UserSidebarUser />
              </div>
              <div class="col-9">
                <section class="profile card rounded-1">
                  <div
                    class="profile__head d-flex align-items-center justify-content-between mb-3"
                  >
                    <h4>My Profile</h4>
                    <button
                      @click="editBtn(true)"
                      class="btn btn-dark rounded-1"
                    >
                      <i class="fa-solid fa-edit me-2"></i>
                      <span>Edit Profile</span>
                    </button>
                  </div>
                  <div class="profile__body row" v-if="userStore.user">
                    <div class="col-lg-4">
                      <div
                        class="profile__image__wrapper d-flex flex-column justify-content-center align-items-center gap-3 me-5"
                      >
                        <div class="profile__image">
                          <img
                            src="https://via.placeholder.com/150"
                            alt=""
                            class="rounded-circle"
                            width="200px"
                          />
                        </div>
                        <fieldset
                          class="form-group btn btn-outline-dark rounded-1 btn-block w-100 fw-medium"
                        >
                          Change Avatar
                        </fieldset>
                      </div>
                    </div>
                    <div class="col-lg-8">
                      <template v-if="toggleEdit === false">
                        <table class="table table-borderless pb-0 w-100">
                          <tr>
                            <th
                              class="fw-medium"
                              scope="row"
                              style="width: 20%"
                            >
                              Name
                            </th>
                            <td>{{ userStore.user.data.name }}</td>
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              class="scroll-to-password fw-medium"
                            >
                              Email
                            </th>
                            <td>{{ userStore.user.data.email }}</td>
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              class="scroll-to-password fw-medium"
                            >
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
                              >Title</label
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

                <section class="password card rounded-1 mt-3">
                  <div class="password__title d-flex justify-content-between">
                    <h4>Password</h4>
                    <BaseButton is-outline="true">Change Password</BaseButton>
                  </div>
                  <div class="password__info">
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
                        <BaseButton isOutline="true">Cancel</BaseButton>
                        <BaseButton>Save</BaseButton>
                      </div>
                    </form>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 6rem;
}
</style>
