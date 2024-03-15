<template>
    <div class="container-fluid">
        <div class="main-title full row mx-auto mt-4">
            <h2 class="d-inline-block">MY <span>REWARDS</span></h2>
        </div>
        <div class="container-fluid main-container px-0 w-75 mt-3 mx-auto">
            <div class="row">
                <div class="col-4 m-4">
                    <img class="rounded" style="width: 350px; height: 350px;" src="/images/game-platform/auctino.png"
                        alt="">
                </div>
                <div class="col-6 ms-5 mt-5 right-side">
                    <p>Object Reward</p>
                    <h1>Wizh Stone</h1>
                    <p class="small-text w-75">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
                        Suspendisse lectus
                        tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices
                        diam.
                        Maecenas ligula massa, varius a, semper congue, euismod non, mi.</p>
                    <div class="bid-right-side mt-5 w-25">
                        <button>
                            <img class="me-2" src="/images/game-platform/check.png">
                            Claim reward
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row container-fluid full  mx-auto mt-4 middle-text">
            <div class="col-3">
                <h2 class="text-white"><span class="font-weight-bold">OTHER</span> AUCTIONS</h2>
            </div>
            <div class="col-9">
                <hr class="w-100">
            </div>
        </div>
        <div class="row mt-4 full container-fluid m-auto">
            <div class="col-2" v-for="(cards, index) in cardReward" :key="cards.title">
                <div class="card card-game-platform px-0 py-0">
                    <img class="card-img-top" :src=(cards.img) alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title text-white">{{ cards.title }}</h5>
                        <p class="card-text">{{ cards.text }}</p>
                        <button class="btn w-100 rounded-lg">{{ cards.btn }}</button>
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
const cardReward = [
    {
        img: "/images/game-platform/games-moment-1.png",
        title: "Wizh Stone",
        text: "Object Reward",
        btn: "Claim reward"
    },
    {
        img: "/images/game-platform/games-moment-1.png",
        title: "Wizh Stone",
        text: "Object Reward",
        btn: "Claim reward"
    },
    {
        img: "/images/game-platform/games-moment-1.png",
        title: "Wizh Stone",
        text: "Object Reward",
        btn: "Claim reward"
    },
    {
        img: "/images/game-platform/games-moment-1.png",
        title: "Wizh Stone",
        text: "Object Reward",
        btn: "Claim reward"
    },
    {
        img: "/images/game-platform/games-moment-1.png",
        title: "Wizh Stone",
        text: "Object Reward",
        btn: "Claim reward"
    },
    {
        img: "/images/game-platform/games-moment-1.png",
        title: "Wizh Stone",
        text: "Object Reward",
        btn: "Claim reward"
    },
]

</script>

<style lang="scss" scoped>
.card {
    height: 280px;
    p {
        color: #AAB5B7;
        font-size: 12px;
    }
}
</style>