<template>
    <div class="container-fluid">
        <div class="card-game-plat">
            <div class="row text-center text-lg-start mx-auto mt-4">
                <div class="col-12 col-md-10 offset-md-1">
                    <h2 class="text-white">
                        MAIN <span class="fw-bold">AUCTION</span> <span class="text-grey fs-6">Powered by
                            <strong>SOAK</strong>PORT</span>
                    </h2>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-12 col-xl-10 col-xxl-8 offset-xl-1 offset-xxl-2">
                    <div class="card">
                        <div class="row">
                            <div class="col-lg-4 text-center">
                                <img src="/images/game-platform/auctino.png" class="img-fluid mx-auto rounded-start"
                                    alt="nft auctino" />
                            </div>
                            <div class="col-lg-8 text-center text-lg-start">
                                <div class="d-flex justify-content-center justify-content-lg-start">
                                    <button class="btn"><img class="logo-bg-green-light p-2 rounded"
                                            src="/images/game-platform/arrow.png" alt="">
                                    </button>
                                    <p class="mt-4 p-gold">March 12, 2024</p>
                                    <button class="btn"><img class="logo-bg-green-light p-2 rounded"
                                            src="/images/game-platform/arrow-1.png" alt="">
                                    </button>
                                </div>
                                <h2 class="text-white fw-bold">Soakverse1234</h2>
                                <div class="row">
                                    <div class="col-12 col-xl-6">
                                        <p class="text-grey small-text mb-1">Current Bid</p>
                                        <div class="d-flex div-bg-light-green py-1 align-items-center br-12">
                                            <img class="p-2 ms-1 img-bg-light-green br-8"
                                                src="/images/game-platform/hand.png" alt="" />
                                            <p class="ms-4 my-0 text-white h2 fw-bold">0.01</p>
                                        </div>
                                    </div>
                                    <div class="col-12 col-xl-6">
                                        <p class="text-grey small-text mb-1">Auction ends in</p>
                                        <div class="d-flex div-bg-light-green py-1 align-items-center br-12">
                                            <img class="p-2 ms-1 img-bg-light-green br-8"
                                                src="/images/game-platform/timelapse.png" alt="" />
                                            <p class="ms-4 my-0 text-white h2 fw-bold">21h 50m 3s</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="d-flex justify-content-between flex-column flex-xl-row">
                                        <div class="col-xl-8 col-12 d-flex mb-2 mb-xl-0 align-items-center">
                                            <div class="flex-nowrap w-100">
                                                <div>
                                                    <label class="search-label">
                                                        <img src="/images/game-platform/ethereum-logo.svg" alt="">
                                                        <input type="text" placeholder="Bid 0.02 or more" />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <button class="btn btn-gold br-8">
                                            <img class="me-2" src="/images/game-platform/rewards-white.svg"
                                                alt="check" />
                                            Reward Drop
                                        </button>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-6">
                                        <p class="text-grey small-text my-0">Latest bid</p>
                                        <div class="d-flex">
                                            <img src="/images/game-platform/soakverse-logo.png"
                                                class="logo-bg-green-light p-2 rounded me-2" alt="">
                                            <p class="text-white my-0">UserName1234</p>
                                        </div>
                                    </div>
                                    <div class="col-6 d-flex align-items-center justify-content-end">
                                        <img src="/images/game-platform/ethereum-logo.svg" class="me-2" height="20px"
                                            width="12px" alt="">
                                        <p class="text-white my-0 me-2">0.01</p>
                                        <a>
                                            <img src="/images/game-platform/new-tab.png" alt="">
                                        </a>
                                    </div>
                                </div>
                                <hr class="hr-game-plat">
                                <div class="row">
                                    <div class="col-6">
                                        <a class="p-gold">Help mint the next SoakVerse</a>
                                    </div>
                                    <div class="col-6 d-flex justify-content-end">
                                        <a class="p-gold" @click="openModal()">View all bids</a>
                                    </div>
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
                            OTHER <span class="fw-bold">AUCTIONS</span>
                        </h2>
                    </div>
                    <div class="col-8 d-none d-md-block">
                        <hr class="w-100 hr-game-plat" />
                    </div>
                </div>
            </div>
        </div>
        <div class="sub-card">
            <div class="row mt-3">
                <div class="col-xl-10 offset-xl-1">
                    <div class="row">
                        <div class="col-12 col-sm-6 col-lg-4 col-xl-4 col-xxl-2 mb-4"
                            v-for="(cards, index) in cardAuction" :key="cards.title">
                            <div class="card px-0 py-0">
                                <img :src="cards.img" class="card-img-top" alt="" />
                                <div class="card-body">
                                    <h5 class="card-title fw-bold text-white">
                                        {{ cards.title }}
                                    </h5>
                                    <p class="card-text small-text text-grey">
                                        Current bid:
                                        <span class="text-white"> {{ cards.bid }}</span>
                                    </p>
                                    <p class="card-text small-text text-grey">
                                        Auction ends in:
                                        <span class="text-white"> {{ cards.auction }}</span>
                                    </p>
                                    <NuxtLink to="/game-platform/marketplace/auctions/auction" class="btn">{{ cards.btn }}</NuxtLink>
                                </div>
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
                                    src="/images/game-platform/auctino.png" alt="" />
                            </div>
                            <div class="col-lg-8 p-0 d-flex flex-column justify-content-center">
                                <p class="text-grey my-0">All bids for</p>
                                <h1 class="text-white fw-bold">Soakverse1234</h1>
                            </div>
                            <div class="row mt-2">
                                <div class="col-12">
                                    <ul class="px-0">
                                        <li>
                                            <div class="row">
                                                <div class="col-12 align-items-center d-sm-flex  justify-content-between">
                                                    <div class="d-flex align-items-center justify-content-center justify-content-sm-start">
                                                        <img class="my-2" src="/images/game-platform/game-icon-4.png"
                                                            style="width: 48px; height: 48px" />
                                                        <div class="ms-3">
                                                            <p class="my-0 text-white">UserName1234</p>
                                                        </div>
                                                    </div>
                                                    <div class="">
                                                        <div class="d-flex my-2 mb-sm-0 justify-content-center justify-content-sm-start">
                                                            <p class="small-text my-0 text-grey">Mar 13, 2024, 6:19 AM
                                                            </p>
                                                            <img src="/images/game-platform/ethereum-logo.svg"
                                                                class="me-2 ms-3" height="20px" width="12px" alt="">
                                                            <p class="text-white my-0 me-2">0.01</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <hr class="hr-game-plat my-0">
                                        <li class="">
                                            <div class="row">
                                                <div
                                                    class="col-12 d-sm-flex align-items-center justify-content-between">
                                                    <div
                                                        class="d-flex align-items-center justify-content-center justify-content-sm-start">
                                                        <img class="my-2" src="/images/game-platform/game-icon-6.png"
                                                            style="width: 48px; height: 48px" />
                                                        <div class="ms-3">
                                                            <p class="my-0 text-white">UserName1234</p>
                                                        </div>
                                                    </div>
                                                    <div class="">
                                                        <div
                                                            class="d-flex my-2 mb-sm-0 justify-content-center justify-content-sm-start">
                                                            <p class="small-text my-0 text-grey">Mar 13, 2024, 6:19 AM
                                                            </p>
                                                            <img src="/images/game-platform/ethereum-logo.svg"
                                                                class="me-2 ms-3" height="20px" width="12px" alt="">
                                                            <p class="text-white my-0 me-2">0.01</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <hr class="hr-game-plat my-0">
                                        <li class="">
                                            <div class="row">
                                                <div
                                                    class="col-12 d-sm-flex align-items-center justify-content-between">
                                                    <div
                                                        class="d-flex align-items-center justify-content-center justify-content-sm-start">
                                                        <img class="my-2" src="/images/game-platform/game-icon-2.png"
                                                            style="width: 48px; height: 48px" />
                                                        <div class="ms-3">
                                                            <p class="my-0 text-white">UserName1234</p>
                                                        </div>
                                                    </div>
                                                    <div class="">
                                                        <div
                                                            class="d-flex my-2 mb-sm-0 justify-content-center justify-content-sm-start">
                                                            <p class="small-text my-0 text-grey">Mar 13, 2024, 6:19 AM
                                                            </p>
                                                            <img src="/images/game-platform/ethereum-logo.svg"
                                                                class="me-2 ms-3" height="20px" width="12px" alt="">
                                                            <p class="text-white my-0 me-2">0.01</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <hr class="hr-game-plat my-0">
                                        <li class="">
                                            <div class="row">
                                                <div
                                                    class="col-12 d-sm-flex align-items-center justify-content-between">
                                                    <div
                                                        class="d-flex align-items-center justify-content-center justify-content-sm-start">
                                                        <img class="my-2" src="/images/game-platform/game-icon-3.png"
                                                            style="width: 48px; height: 48px" />
                                                        <div class="ms-3">
                                                            <p class="my-0 text-white">UserName1234</p>
                                                        </div>
                                                    </div>
                                                    <div class="">
                                                        <div
                                                            class="d-flex my-2 mb-sm-0 justify-content-center justify-content-sm-start">
                                                            <p class="small-text my-0 text-grey">Mar 13, 2024, 6:19 AM
                                                            </p>
                                                            <img src="/images/game-platform/ethereum-logo.svg"
                                                                class="me-2 ms-3" height="20px" width="12px" alt="">
                                                            <p class="text-white my-0 me-2">0.01</p>
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
    title: "Marketplace - Soakverse",
});
definePageMeta({
    layout: "game-platform",
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
const cardAuction = [
    {
        img: "/images/game-platform/auction-01.png",
        title: "Soakverse1233",
        bid: "0,01",
        auction: "21h 50m 3s",
        btn: "Place bid"
    },
    {
        img: "/images/game-platform/auction-02.png",
        title: "Soakverse1233",
        bid: "0,01",
        auction: "21h 50m 3s",
        btn: "Place bid"
    },
    {
        img: "/images/game-platform/auction-03.png",
        title: "Soakverse1233",
        bid: "0,01",
        auction: "21h 50m 3s",
        btn: "Place bid"
    },
    {
        img: "/images/game-platform/auction-04.png",
        title: "Soakverse1233",
        bid: "0,01",
        auction: "21h 50m 3s",
        btn: "Place bid"
    },
    {
        img: "/images/game-platform/auction-05.png",
        title: "Soakverse1233",
        bid: "0,01",
        auction: "21h 50m 3s",
        btn: "Place bid"
    },
    {
        img: "/images/game-platform/auction-06.png",
        title: "Soakverse1233",
        bid: "0,01",
        auction: "21h 50m 3s",
        btn: "Place bid"
    },
]

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