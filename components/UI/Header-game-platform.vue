<template>
  <div id="header" class="d-flex align-items-center">
    <div class="container-fluid">
      <div class="row h-100">
        <div class="col-12">
          <div class="row">
            <div class="col-4 d-none d-lg-flex align-items-center">
              <div class="flex-nowrap">
                <div :class="{ 'label-open': isSidebarOpen }">
                  <label class="search-label">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#586E72" class="bi bi-search"
                      viewBox="0 0 16 16">
                      <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                    <input type="text" placeholder="Search games or collections" />
                  </label>
                </div>
              </div>
            </div>
            <div class="col-lg-8 d-flex justify-content-end align-items-center">
              <div v-if="!isloggedIn" id="wallet-holder">
                <button class="btn me-2" @click="authStore.login()">Login</button>
                <button class="btn">Register</button>
                <!-- <Web3Wallet /> -->
              </div>
              <div v-else id="wallet-holder" class="d-flex justify-content-end">
                <button class="btn me-4 d-md-block d-none">
                  <img class="pe-md-2" src="/images/game-platform/wallet.png" alt="">
                  Connect Wallet
                </button>
                <div class="d-flex align-items-center me-3">
                  <img class="p-2 br-8 me-2 logo-bg-green-light" src="/images/game-platform/diamond.png" alt="">
                  <p class="text-grey my-0">245,441</p>
                </div>
                <div class="d-flex align-items-center me-4">
                  <img class="p-2 br-8 me-2 logo-bg-green-light" src="/images/game-platform/soul.png" alt="">
                  <p class="text-grey my-0">76,183</p>
                </div>
                <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle h-100" @click="openModal()" style="border: none"
                    type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="/images/game-platform/profile-pic.png" class="me-2" alt="">
                    UserName123
                  </button>
                  <ul class="dropdown-menu" style="background-color: #06262D;">
                    <li class="d-flex mb-2">
                      <img class="p-2 mx-2 br-8 logo-bg-green-light" src="/images/game-platform/profile.svg" alt="">
                      <NuxtLink class="dropdown-item text-grey" href="#">Profil</NuxtLink>
                    </li>
                    <li class="d-flex mb-2">
                      <img class="p-2 mx-2 br-8 logo-bg-green-light" src="/images/game-platform/friends.svg" alt="">
                      <NuxtLink class="dropdown-item text-grey" href="#">Friends</NuxtLink>
                    </li>
                    <li class="d-flex d-md-none mb-2">
                      <img class="p-2 mx-2 br-8 logo-bg-green-light" src="/images/game-platform/wallet.svg" alt="">
                      <NuxtLink class="dropdown-item  text-grey" href="#">Connect Wallet</NuxtLink>
                    </li>
                    <li class="d-flex">
                      <img class="p-2 mx-2 br-8 logo-bg-green-light" src="/images/game-platform/logout.svg" alt="">
                      <NuxtLink class="dropdown-item text-grey" @click="authStore.logout()">Logout</NuxtLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <div class="modal-mask d-flex" v-if="isModalVisible">
      <div class="row">
        <div class="col-12 col-lg-9 mx-auto">
          <div class="modal-wrapper mx-auto">
            <div class="modal-container">
              <div class="row">
                <div class="col-3 py-0 d-flex flex-column" style="background-color: #06262D;">
                  <NuxtLink class="text-grey mt-2">
                    <img class="p-2 mx-2 br-8 logo-bg-green-light" src="/images/game-platform/profile.svg" alt="">
                    Profil
                  </NuxtLink>
                  <NuxtLink class="text-grey mt-2">
                    <img class="p-2 mx-2 br-8 logo-bg-green-light" src="/images/game-platform/friends.svg" alt="">
                    Friends
                  </NuxtLink>
                  <NuxtLink class="text-grey mt-2">
                    <img class="p-2 mx-2 br-8 logo-bg-green-light" src="/images/game-platform/logout.svg" alt="">
                    Logout
                  </NuxtLink>
                </div>
                <div class="col-9">
                  <div class="row">
                    <div class="col-lg-4 text-center">
                      <img class="rounded img-fluid p-3 p-xl-0" style="width: 120px; height: 120px"
                        src="/images/game-platform/profil-pic-big.png" alt="" />
                    </div>
                    <div class="col-lg-7 p-0">
                      <h1 class="text-white fw-bold">UserName1234</h1>
                      <p class="small-text my-0 text-grey">#UserName123</p>
                      <p class="text-white">Level 4 <span class="small-text"> 320 XP / 415 XP</span></p>
                      <div class="progress col-12 ms-2 my-0" role="progressbar" aria-label="Basic example"
                        aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar" style="width: 70%"></div>
                      </div>
                    </div>
                    <hr class="hr-game-plat my-3 w-75 mx-auto">
                    <div class="row mt-2">
                      <div class="col-12">
                        <p class="p-gold">
                          Wallet
                        </p>
                        <div class="row d-flex justify-content-between mx-auto">
                          <div class="col-5 d-flex br-8 p-2 shadow" style="background-color: #1C3D45;">
                            <img class="p-2 br-8 me-2 logo-bg-green-light" src="/images/game-platform/diamond.png"
                              alt="">
                            <div class="">
                              <p class="text-white my-0 fw-bold fs-6">245,441</p>
                              <p class="text-grey my-0 small-text">Diamonds</p>
                            </div>
                          </div>
                          <div class="col-5 d-flex br-8 p-2 shadow" style="background-color: #1C3D45;">
                            <img class="p-2 br-8 me-2 logo-bg-green-light" src="/images/game-platform/soul.png" alt="">
                            <div class="">
                              <p class="text-white my-0 fw-bold fs-6">76,183</p>
                              <p class="text-grey my-0 small-text">Soulz</p>
                            </div>
                          </div>
                        </div>
                        <button class="btn mt-3 text-white shadow" style=" background-color: #1C3D45;">
                          <img class="p-2 me-2 logo-bg-green-light rounded" src="/images/game-platform/wallet.png"
                            alt="">
                          Connect Wallet
                        </button>
                      </div>
                    </div>
                    <hr class="hr-game-plat my-3 w-75 mx-auto">
                    <div class="row mt-2">
                      <div class="col-12">
                        <p class="p-gold">
                          Badges
                        </p>
                        <div class="row d-grid gap-2 d-flex justify-content-between mx-auto">
                          <div class="col-5 d-flex br-8 p-2 shadow" style="background-color: #1C3D45;">
                            <img class="br-8 me-2" src="/images/game-platform/badge-01.png" alt="">
                            <div class="">
                              <p class="text-white my-0 fw-bold fs-6">Golden Trophy</p>
                              <p class="text-grey my-0 small-text">2024/03/11</p>
                            </div>
                          </div>
                          <div class="col-5 d-flex br-8 p-2 shadow" style="background-color: #1C3D45;">
                            <img class="br-8 me-2" src="/images/game-platform/badge-02.png" alt="">
                            <div class="">
                              <p class="text-white my-0 fw-bold fs-6">Thunder Badge</p>
                              <p class="text-grey my-0 small-text">2024/03/11</p>
                            </div>
                          </div>
                        </div>
                        <div class="row gx-2 mt-2 d-flex justify-content-between mx-auto">
                          <div class="col-6 d-flex br-8 p-2 shadow" style="background-color: #1C3D45;">
                            <img class="br-8 me-2" src="/images/game-platform/badge-03.png" alt="">
                            <div class="">
                              <p class="text-white my-0 fw-bold fs-6">Sacred Ring</p>
                              <p class="text-grey my-0 small-text">2024/03/11</p>
                            </div>
                          </div>
                          <div class="col-6 d-flex br-8 p-2 shadow" style="background-color: #1C3D45;">
                            <img class="br-8 me-2" src="/images/game-platform/badge-04.png" alt="">
                            <div class="">
                              <p class="text-white my-0 fw-bold fs-6">Rock Medal</p>
                              <p class="text-grey my-0 small-text">2024/03/11</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button @click="closeModal" class="btn btn-close-modal">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                        class="bi bi-x-square" viewBox="0 0 16 16">
                        <path
                          d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                        <path
                          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { useAuthStore } from '@/stores/auth/useAuthStore';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();

const { isloggedIn } = storeToRefs(authStore);

const { isSidebarOpen } = useUiState();
</script>

<script>
export default {
  data() {
    return {
      isModalVisible: false,
    };
  },
  methods: {
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style scoped lang="scss">
#wallet-holder {
  margin-left: auto;
}

.label-open {
  margin-left: 170px;
}

input {
  background-color: #143138;
  color: #586e72;
  width: 250px;
  border-radius: 6px;
  border: none;
  height: 40px;
  font-size: 14px;
}

#header {
  background-color: #041c21;
}

button {
  color: #aab5b7;
  background-color: #143138;
  transition: all 0.4s;

  &:hover {
    color: #e1b67e;
    border: 1px solid #e1b67e;
    background-color: #0d2125;
  }
}

.search-label {
  position: relative;
  display: flex;
  align-items: center;
}

.search-label svg {
  position: absolute;
  left: 8px;
}

.search-label input {
  padding-left: 35px;
}
</style>