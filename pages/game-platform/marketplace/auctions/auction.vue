<template>
    <div class="container-fluid">
        <div class="card-game-plat mt-xl-5">
            <div class="row text-center text-lg-start mx-auto mt-4">
                <div class="col-12 col-md-10 offset-md-1">
                    <h2 class="text-white">
                        <span class="fw-bold">SOAKVERSE1233</span> <span class="text-grey fs-6">Powered by
                            <strong>SOAK</strong>PORT</span>
                    </h2>
                </div>
            </div>
            <div class="row mt-3 mt-xl-5">
                <div class="col-12 col-xl-10 col-xxl-8 offset-xl-1 offset-xxl-2">
                    <div class="card">
                        <div class="row">
                            <div class="col-lg-4 text-center">
                                <img src="/images/game-platform/auction-main-02.png"
                                    class="img-fluid mx-auto rounded-start" alt="nft auctino" />
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
                                        <a class="p-gold" @click="">View all bids</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col mb-5 mx-auto d-flex aligne-items-center">
                <NuxtLink class="text-grey rounded p-2 mx-auto text-center" to="/game-platform/marketplace"
                    style="background-color: #06262D;">
                    <img src="/images/game-platform/arrow-back.png" class="rounded p-2 logo-bg-green-light" alt="">
                    Back to all auctions
                </NuxtLink>
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

<style scoped lang="scss">
@media screen and (max-width: 900px) {
    .card-game-plat {
        h2 {
            font-size: 35px;
        }
    }
}
</style>