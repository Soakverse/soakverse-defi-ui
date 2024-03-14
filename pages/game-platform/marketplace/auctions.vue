<template>
    <div class="container-fluid">
        <div class="full mx-auto row">
            <div class="main-title mt-0">
                <h2 class="d-inline-block">MAIN <span>AUCTION</span></h2>
                <p class="d-inline-block ms-3">Powered by <span>SOAKPORT</span></p>
            </div>
            <div class="row full mx-auto mt-0 main-container">
                <div class="col-4 my-4">
                    <img class="rounded" src="/images/game-platform/auctino.png">
                </div>
                <div class="ms-4 col-7 right-side">
                    <div class="d-flex mt-5 top-right-side">
                        <button class="btn"><i class="fa fa-chevron-left"></i></button>
                        <p class="mx-3">March 12, 2024</p>
                        <button class="btn"><i class="fa fa-chevron-right"></i></button>
                    </div>
                    <div>
                        <h1>Soakverse1234</h1>
                    </div>
                    <div class="row">
                        <div class="col">
                            <p class="small-text mb-1">Current Bid</p>
                            <div class="small-div d-flex py-1 align-items-center">
                                <img class="p-2 ms-1" src="/images/game-platform/hand.png" alt="">
                                <p class="ms-4 my-0">0.01</p>
                            </div>
                        </div>
                        <div class="col">
                            <p class="small-text mb-1">Auction ends in</p>
                            <div class="small-div d-flex py-1 align-items-center">
                                <img class="p-2 ms-1" src="/images/game-platform/timelapse.png" alt="">
                                <p class="ms-4 my-0">21h 50m 3s</p>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-4 bid-right-side">
                        <div class="col-8">
                            <label class="ethereum-label">
                                <img src="/images/game-platform/ethereum-logo.png" alt="">
                                <input type="text" placeholder="Bid 0.02 or more">
                            </label>
                        </div>
                        <div class="col-4">
                            <button>
                                <img class="me-2" src="/images/game-platform/check.png">
                                Place bid
                            </button>
                        </div>
                    </div>
                    <div class="row mt-4 img-text">
                        <div class="col">
                            <p class="small-text mb-1">Latest bid</p>
                            <div class="d-flex">
                                <img class="sk-logo" src="/images/game-platform/soakverse-logo.png" alt="">
                                <p class="ms-2 img-text-p">UserName1234</p>
                            </div>
                        </div>
                        <div class="col mt-4 ">
                            <div class="d-flex justify-content-end">
                                <img class="p-1" style="width: 20px; height: 26px;"
                                    src="/images/game-platform/ethereum-logo.png" alt="">
                                <p class="mx-2 img-text-p">0.01</p>
                                <a><img class="p-1" src="/images/game-platform/new-tab.png" alt=""></a>
                            </div>
                        </div>
                    </div>
                    <hr class="w-100">
                    <div class="row mt-1 end-right-side">
                        <div class="col">
                            <NuxtLink>Help mint the next SoakVerse</NuxtLink>
                        </div>
                        <div class="col d-flex justify-content-end">
                            <NuxtLink>View all bids</NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row container-fluid m-auto mt-0 middle-text">
                <div class="col-3">
                    <h2 class="text-white"><span class="font-weight-bold">OTHER</span> AUCTIONS</h2>
                </div>
                <div class="col-9">
                    <hr class="w-100">
                </div>
            </div>
            <div class="row mt-0 container-fluid m-auto">
                <div class="col-2" v-for="(cards, index) in cardAuction" :key="cards.title">
                    <div class="card px-0 py-0">
                        <img class="card-img-top" :src=(cards.img) alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title text-white">{{ cards.title }}</h5>
                            <p class="card-text text-white"><span>Current bid : </span>{{ cards.bid }}</p>
                            <p class="card-text text-white"><span>Auction ends in : </span>{{ cards.auction }}</p>
                            <button class="btn w-100 rounded-lg">{{ cards.btn }}</button>
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

    methods: {

    }
}
const cardAuction = [
    {
        img: "/images/game-platform/games-moment-1.png",
        title: "Soakverse1233",
        bid: "0,01",
        auction: "21h 50m 3s",
        btn: "Place bid"
    },
    {
        img: "/images/game-platform/games-moment-1.png",
        title: "Soakverse1233",
        bid: "0,01",
        auction: "21h 50m 3s",
        btn: "Place bid"
    },
    {
        img: "/images/game-platform/games-moment-1.png",
        title: "Soakverse1233",
        bid: "0,01",
        auction: "21h 50m 3s",
        btn: "Place bid"
    },
    {
        img: "/images/game-platform/games-moment-1.png",
        title: "Soakverse1233",
        bid: "0,01",
        auction: "21h 50m 3s",
        btn: "Place bid"
    },
    {
        img: "/images/game-platform/games-moment-1.png",
        title: "Soakverse1233",
        bid: "0,01",
        auction: "21h 50m 3s",
        btn: "Place bid"
    },
    {
        img: "/images/game-platform/games-moment-1.png",
        title: "Soakverse1233",
        bid: "0,01",
        auction: "21h 50m 3s",
        btn: "Place bid"
    },
]

</script>

<style lang="scss" scoped></style>