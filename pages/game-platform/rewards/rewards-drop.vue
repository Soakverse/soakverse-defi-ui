<template>
  <div class="container-fluid">
    <div class="card-game-plat">
      <div class="row text-center text-lg-start mx-auto mt-4">
        <div class="col-12 col-md-10 offset-md-1">
          <h2 class="text-white">
            FEATURED <span class="fw-bold">REWARDS DROPS</span>
          </h2>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12 col-xl-10 col-xxl-8 offset-xl-1 offset-xxl-2">
          <div class="card">
            <div class="row">
              <div class="col-lg-4 text-center">
                <img src="/images/game-platform/campaign-drop-1.png" class="img-fluid mx-auto rounded-start"
                  alt="nft auctino" />
              </div>
              <div class="col-lg-8 text-center text-lg-start">
                <p class="mt-4 p-gold">Soakverse Reward Campaign</p>
                <h2 class="text-white fw-bold">Reward Drop 1</h2>
                <p class="main-text text-grey">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  non risus. Suspendisse lectus tortor, dignissim sit amet,
                  adipiscing nec, ultricies sed, dolor.
                </p>
                <div class="d-flex text-center text-grey">
                  <p class="cat-p">NFT Project</p>
                  <p class="cat-p ms-1">Token Project</p>
                  <p class="cat-p ms-1">Web3 Community</p>
                  <p class="cat-p ms-1">Gaming Project</p>
                  <p class="cat-p ms-1">...</p>
                </div>
                <div class="row">
                  <div class="col-12 col-xl-6">
                    <p class="text-grey small-text mb-1">Drops ends in</p>
                    <div class="d-flex div-bg-light-green py-1 align-items-center br-12">
                      <img class="p-2 ms-1 img-bg-light-green br-8" src="/images/game-platform/timelapse.png" alt="" />
                      <p class="ms-4 my-0 text-white h2 fw-bold">21h 50m 3s</p>
                    </div>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="d-flex justify-content-between flex-column flex-xl-row">
                    <button class="btn btn-gold br-8" @click="openModal">
                      <img class="me-2" src="/images/game-platform/rewards-white.svg" alt="check" />
                      View Reward Drop
                    </button>
                    <button class="btn mt-2 mt-xl-0 rounded-pill btn-green text-white">
                      <div class="d-flex align-items-center justify-content-start text-center">
                        <img class="me-4 p-2 bg-gradient rounded-circle" src="/images/game-platform/rocket.svg" />
                        <p class="text-white d-inline-block mx-auto my-0">
                          Token Gated Boost
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mx-auto mt-5">
        <div class="col-10 offset-md-1">
          <div class="row">
            <div class="col-12 col-md-4">
              <h2 class="text-white">
                CURRENT <span class="fw-bold">REWARDS DROPS</span>
              </h2>
            </div>
            <div class="col-8 d-none d-md-block">
              <hr class="w-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sub-card">
      <div class="row mt-3">
        <div class="col-xl-10 offset-xl-1">
          <div class="row">
            <div class="col-12 col-sm-6 col-lg-4 col-xl-4 col-xxl-2 mb-4" v-for="(cards, index) in cardRewardDrop"
              :key="cards.title">
              <div class="card px-0 py-0">
                <img :src="cards.img" class="card-img-top" alt="" />
                <div class="card-body">
                  <h5 class="card-title fw-bold text-white">
                    {{ cards.title }}
                  </h5>
                  <p class="card-text small-text text-grey">
                    Soakverse Reward Campaign Ends:
                    <span class="text-white"> {{ cards.text }}</span>
                  </p>
                  <NuxtLink class="btn btn-green">{{ cards.btn }}</NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-mask d-flex" v-if="isModalVisible">
      <div class="row">
        <div class="col-12 col-lg-9 mx-auto">
          <div class="modal-wrapper mx-auto">
            <div class="modal-container">
              <div class="row">
                <div class="col-lg-3 text-center">
                  <img class="rounded img-fluid mx-auto p-3 p-xl-0" style="width: 160px; height: 160px"
                    src="/images/game-platform/campaign-drop-1.png" alt="" />
                </div>
                <div class="col-lg-8 p-0">
                  <p class="p-gold fw-bold">#UserName123</p>
                  <div class="d-flex flex-column col-12">
                    <div class="d-flex justify-content-between">
                      <h1 class="text-white fw-bold">Reward Drop 1</h1>
                      <button type="button" class="btn rounded-lg" style="opacity: 0.25">
                        Claim drop
                      </button>
                    </div>
                    <div class="d-flex col-12 flex-end mt-3 justify-content-between">
                      <p class="">
                        <span class="text-white fw-bold fs-6">50% </span>
                        <span>2/4 quests completed</span>
                      </p>
                      <p class="">
                        <span>Drop ends in </span>
                        <span class="text-white fw-bold fs-6">21h 50m 3s</span>
                      </p>
                    </div>
                    <div class="row w-100">
                      <div class="progress col-12 ms-2 my-0" role="progressbar" aria-label="Basic example"
                        aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar" style="width: 50%"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 mt-3">
                  <p class="text-white">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
                    risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
                    nec, ultricies sed, dolor.
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col-10 d-flex">
                  <p class="cat-p me-2">NFT Project</p>
                  <p class="cat-p me-2">Token Project</p>
                  <p class="cat-p">Web3 Community</p>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <p class="text-white my-0">
                    <span class="me-2 p-gold">Token Gated Boost 20%</span> Soakverse
                    OG #1, Wizh Soul #10
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col-10 offset-1">
                  <hr />
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <ul class="px-0">
                    <li>
                      <div class="row">
                        <div class="col-12 d-sm-flex ul-div-friend align-items-center justify-content-between">
                          <div class="d-flex align-items-center justify-content-center justify-content-sm-start">
                            <img class="my-2" src="/images/game-platform/badge-1.png"
                              style="width: 48px; height: 48px" />
                            <div class="ms-3">
                              <p class="my-0 text-white">Invite 1 friends</p>
                              <p class="my-0 sub-text text-green">Completed!</p>
                            </div>
                          </div>
                          <div class="d-flex my-2 mb-sm-0 justify-content-center justify-content-sm-start">
                            <button class="me-2 p-2 btn btn-complete" style="opacity: 0.25">
                              Complete quest
                            </button>
                            <button class="p-2 btn">Claim reward</button>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="mt-2">
                      <div class="row">
                        <div class="col-12 d-sm-flex ul-div-friend align-items-center justify-content-between">
                          <div class="d-flex align-items-center justify-content-center justify-content-sm-start">
                            <img class="my-2" src="/images/game-platform/question-mark.png"
                              style="width: 48px; height: 48px" />
                            <div class="ms-3">
                              <p class="my-0 text-white">Invite 3 friends</p>
                              <p class="my-0 sub-text text-red">To be completed</p>
                            </div>
                          </div>
                          <div class="">
                            <div class="d-flex my-2 mb-sm-0 justify-content-center justify-content-sm-start">
                              <button class="me-2 p-2 btn btn-complete">
                                Complete quest
                              </button>
                              <button class="p-2 btn" style="opacity: 0.25">
                                Claim reward
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="mt-2">
                      <div class="row">
                        <div class="col-12 d-sm-flex ul-div-friend align-items-center justify-content-between">
                          <div class="d-flex align-items-center justify-content-center justify-content-sm-start">
                            <img class="my-2" src="/images/game-platform/question-mark.png"
                              style="width: 48px; height: 48px" />
                            <div class="ms-3">
                              <p class="my-0 text-white">Invite 5 friends</p>
                              <p class="my-0 sub-text text-red">To be completed</p>
                            </div>
                          </div>
                          <div class="">
                            <div class="d-flex my-2 mb-sm-0 justify-content-center justify-content-sm-start">
                              <button class="btn me-2 p-2 btn-complete">
                                Complete quest
                              </button>
                              <button class="btn p-2" style="opacity: 0.25">
                                Claim reward
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
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
                  <!-- <img src="/images/game-platform/close-btn.svg" alt="close button"> -->
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Marketplace - Soakverse',
});
definePageMeta({
  layout: 'game-platform',
});
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

const cardRewardDrop = [
  {
    img: '/images/game-platform/campaign-drop-2.png',
    title: 'Reward Drop 2',
    text: '21h 50m 3s',
    btn: 'View Reward Drop',
  },
  {
    img: '/images/game-platform/campaign-drop-3.png',
    title: 'Reward Drop 3',
    text: '21h 50m 3s',
    btn: 'View Reward Drop',
  },
  {
    img: '/images/game-platform/campaign-drop-4.png',
    title: 'Reward Drop 4',
    text: '21h 50m 3s',
    btn: 'View Reward Drop',
  },
  {
    img: '/images/game-platform/campaign-drop-5.png',
    title: 'Reward Drop 5',
    text: '21h 50m 3s',
    btn: 'View Reward Drop',
  },
  {
    img: '/images/game-platform/campaign-drop-6.png',
    title: 'Reward Drop 6',
    text: '21h 50m 3s',
    btn: 'View Reward Drop',
  },
  {
    img: '/images/game-platform/campaign-drop-7.png',
    title: 'Reward Drop 7',
    text: '21h 50m 3s',
    btn: 'View Reward Drop',
  },
];
</script>
<style lang="scss" scoped>
@media screen and (max-width: 900px) {
  .card-game-plat {
    h2 {
      font-size: 35px;
    }
  }
}
</style>
