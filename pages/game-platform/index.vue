<template>
    <div class="container-fluid">
        <div class="container-fluid mt-5 d-flex">
            <div class="main-div px-0 row m-auto full">
                <div class="left-div col-8">
                    <div class="left-content">
                        <h5>Featured games</h5>
                        <h2 class="mt-5">Play Soakverse Chronicles</h2>
                        <p>Experience a retro-inspired world of wonders, filled with creatures, traps, perils, and
                            treasures!</p>
                        <div class="mt-4">
                            <button type="button" id="btn-l" class="btn me-2">
                                <img class="pe-2" src="/images/game-platform/games-1.svg">
                                Play now!
                            </button>
                            <button type="button" id="btn-r" class="btn">
                                <img class="pe-2" src="/images/game-platform/star.svg">
                                Follow
                            </button>
                        </div>
                    </div>
                </div>
                <div class="right-div col-4">
                    <h5 class="pb-2">Latest News</h5>
                    <ul>
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
                                <h4>African Llama Adventures</h4>
                                <p>Episode 1 available right now!</p>
                            </div>
                        </li>
                        <li class="d-flex my-1">
                            <img src="/images/game-platform/latest-news-3.png" alt="">
                            <div class="ms-3">
                                <h4>Special Order & Revenge Quest</h4>
                                <p>From the makes of African Llama Adventures</p>
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
        <div class="row container-fluid full m-auto mt-5 middle-text">
            <div class="col-4">
                <h2><span class="font-weight-bold">GAMES</span> OF THE MOMENT</h2>
            </div>
            <div class="col-8">
                <hr>
            </div>
        </div>
        <div class="row container-fluid mt-5 full m-auto">
            <div class="col-2" v-for="(cards, index) in card" :key="cards.title">
                <div class="card px-0 py-0">
                    <img class="card-img-top" :src=(cards.img) alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">{{ cards.title }}</h5>
                        <p class="card-text">{{ cards.text }}</p>
                        <p class="cat">{{ cards.cat }}</p>
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
.main-div {
    border-radius: 24px;
    border: 1px solid #06262D;
    overflow: hidden;
    box-shadow: 0px 12px 24px #0000003D;

    p {
        font-size: 14px;
        color: #AAB5B7;
    }

    h4 {
        font-size: 20px;
        font-weight: bold;
        color: #fff;
        padding-bottom: 0 !important;
    }

    button {
        cursor: pointer !important;
        border-radius: 8px;
        font-size: 14px;

        &#btn-l {
            background-color: #E1B67E;
            color: #06262D;
        }

        &#btn-r {
            background-color: #143138;
            color: #fff;
        }
    }

    h5 {
        color: #E1B67E;
        font-size: 14px;
    }

    .left-content {
        width: 320px;
    }

    .left-div {
        background-image: url('/images/game-platform/feature-games.webp');
        background-repeat: no-repeat;
        background-size: cover;
        padding: 40px;


        h2 {
            color: #FFFFFF;
            font-weight: bold;
        }

    }

    .right-div {
        background-color: #06262D;

        h5 {
            padding-top: 40px;
            padding-left: 30px;
        }

        img {
            width: 56px;
            height: 56px;
            justify-content: center;
        }

        ul li {
            border-radius: 8px;
            align-items: center;
            padding: 5px;
        }

        ul li div {
            p {
                margin-bottom: 0;
            }
        }

        ul li:nth-child(1) {
            background-color: #143138;
        }
    }
}

.middle-text {
    h2 {
        color: #fff;

        span {
            font-weight: bold;
        }
    }

    hr {
        background-color: #48828f;
        height: 2px;
        width: 100%;
    }
}

.card {
    background-color: #06262D;
    height: 300px;
    
    h5 {
        font-weight: bold;
        color: #fff;
        font-size: 16px;
    }

    p {
        font-size: 12px;
        color: #AAB5B7;
    }

    .cat {
        background-color: #143138;
        display: inline-block;
        padding: 6px 8px 6px 8px;
        border-radius: 14px;
    }
}
</style>