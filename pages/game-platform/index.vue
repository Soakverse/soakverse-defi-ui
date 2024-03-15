<template>
    <div class="container-fluid">
        <div class="container-fluid mt-5 d-flex">
            <div class="main-div px-0 row m-auto full">
                <div class="left-div col-xl-8 col-md- col-12">
                    <div class="left-content">
                        <h5>Featured games</h5>
                        <h2 class="mt-5">Play Soakverse Chronicles</h2>
                        <p>Experience a retro-inspired world of wonders, filled with creatures, traps, perils, and
                            treasures!</p>
                        <div class="mt-4">
                            <NuxtLink type="button" to="/game-platform/games/soakverse-chronicles" id="btn-l"
                                class="btn me-2">
                                <img class="pe-2" src="/images/game-platform/games-1.svg">
                                Play now !
                            </NuxtLink>
                            <button type="button" id="btn-r" class="btn">
                                <img class="pe-2" src="/images/game-platform/star.svg">
                                Follow
                            </button>
                        </div>
                    </div>
                </div>
                <div class="right-div col-xl-4 col-12">
                    <h5 class="pb-2 ps-2">Trending games</h5>
                    <ul class="p-0">
                        <li class="d-flex my-1">
                            <img src="/images/game-platform/latest-news-1.png" alt="">
                            <div class="ms-3">
                                <h4>Play Soakverse Chronicles</h4>
                                <p>Play the flagship game!</p>
                            </div>
                        </li>
                        <li class="d-flex my-1">
                            <img src="/images/game-platform/latest-news-2.png" alt="">
                            <div class="ms-3">
                                <h4>African Llama </h4>
                                <p>Episode 1 available </p>
                            </div>
                        </li>
                        <li class="d-flex my-1">
                            <img src="/images/game-platform/latest-news-3.png" alt="">
                            <div class="ms-3">
                                <h4>Special Order </h4>
                                <p>From the makes of African </p>
                            </div>
                        </li>
                        <li class="d-flex">
                            <img src="/images/game-platform/latest-news-4.png" alt="">
                            <div class="ms-3">
                                <h4>More Blastercraze News</h4>
                                <p>Coming soon in 2024</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="container-fluid  mx-auto mt-5 middle-text">
            <div class="row full mx-auto">
                <div class="col-4">
                    <h2 class="text-white"><span class="font-weight-bold">GAMES</span> OF THE MOMENT</h2>
                </div>
                <div class="col-8">
                    <hr class="w-100">
                </div>
            </div>
        </div>
        <div class="container-fluid mt-5 m-auto">
            <div class="row full mx-auto">
                <div class="col-12 col-sm-6 col-lg-4 col-xl-4 col-xxl-2 mb-4" v-for="(cards, index) in card"
                    :key="cards.title" :class="{ 'not-first-card': index !== 0 }">
                    <div class="card card-game-platform px-0 py-0">
                        <img class="card-img-top" :src=(cards.img) alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title text-white">{{ cards.title }}</h5>
                            <p class="card-text">{{ cards.text }}</p>
                            <p class="cat">{{ cards.cat }}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>


<script setup>
useHead({
    title: "Dashboard - Soakverse DeFI Platform",
});
definePageMeta({
    layout: "game-platform",
});
</script>

<script>
const card = [
    {
        img: "/images/game-platform/games-moment-1.png",
        title: "Soakverse Chronicles",
        text: "Venture into a retro-inspired pixelated land.",
        cat: "Role Playing Game"
    },
    {
        img: "/images/game-platform/games-moment-2.png",
        title: "Dreadside",
        text: "Fight the Dreadside on a cyberspace chase.",
        cat: "Platformer"
    },
    {
        img: "/images/game-platform/games-moment-3.png",
        title: "Ghosts and Whispers",
        text: "Run a spooky mansion and frighten uninvited guests.",
        cat: "Tower Defense"
    },
    {
        img: "/images/game-platform/games-moment-4.png",
        title: "Angel Cry",
        text: "Take part in puzzle battles between angels and demons.",
        cat: "Puzzle"
    },
    {
        img: "/images/game-platform/games-moment-5.png",
        title: "Final Assault",
        text: "Load up and duel with tanks and was machines.",
        cat: "Top-Down Shooter"
    },
    {
        img: "/images/game-platform/games-moment-6.png",
        title: "Bio Alias",
        text: "Fend off zombies and creatures of the night.",
        cat: "Survival Horror"
    },
]

</script>

<style scoped lang="scss">
.card {
    position: relative;

    p {
        font-size: 12px;
        color: #AAB5B7;
    }
}

ul li {
    position: relative;
    width: 100%;
}

ul li:not(:first-child)::before {
    content: 'Coming soon';
    position: absolute;
    font-size: 18px;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(20px);
    color: #fff;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
}


.not-first-card .card::before {
    content: 'Coming soon';
    position: absolute;
    font-size: 22px;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(80px);
    color: #fff;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>