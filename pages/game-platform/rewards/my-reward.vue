<template>
    <div class="container-fluid ">
        <div class="card-game-plat">
            <div class="row text-center text-md-start mx-auto mt-4">
                <div class="col-12 col-md-10 offset-md-1">
                    <h2 class="text-white">MY <span class="fw-bold">REWARDS</span></h2>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-xl-8 offset-xl-2">
                    <div class="card">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="/images/game-platform/auctino.png" class="img-fluid rounded-start"
                                    alt="nft auctino">
                            </div>
                            <div class="col-md-8 text-center text-md-start">
                                <p class="mt-4 p-gold">Object Reward</p>
                                <h2 class="text-white fw-bold">Wizh Stone</h2>
                                <p class="main-text text-grey">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Sed non
                                    risus.
                                    Suspendisse
                                    lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras
                                    elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod
                                    non, mi.</p>
                                <button class="btn btn-gold">
                                    <img class="me-2" src="/images/game-platform/check.png" alt="check">
                                    Claim reward
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mx-auto mt-5">
                <div class="col-10 offset-1">
                    <div class="row">
                        <div class="col-3">
                            <h2 class="text-white">OTHER <span class="fw-bold">REWARDS</span></h2>
                        </div>
                        <div class="col-9">
                            <hr class="w-100">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="sub-card">
            <div class="row mt-3">
                <div class="col-xl-10 offset-xl-1">
                    <div class="row">
                        <div class="col-12 col-sm-6 col-lg-4 col-xl-4 col-xxl-2 mb-4"
                            v-for="(cards, index) in cardReward" :key="cards.title">
                            <div class="card px-0 py-0">
                                <img :src="(cards.img)" class="card-img-top" alt="">
                                <div class="card-body">
                                    <h5 class="card-title fw-bold text-white">{{ cards.title }}</h5>
                                    <p class="card-text small-text text-grey">{{ cards.text }}</p>
                                    <NuxtLink class="btn">{{ cards.btn }}</NuxtLink>
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
</style>