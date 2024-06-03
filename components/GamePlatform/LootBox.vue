<template>
    <div class="container">
        <div class="row justify-content-center align-items-center">
            <div class="col-12 text-center">
                <div class="box">
                    <h2 class="remove text-white">Loot Box</h2>
                    <p class="my-5 remove p-title">Wizh Stone</p>
                    <i v-for="index in 100" :key="index" class="star fa-solid fa-stairs"></i>
                    <img class="pa-5 mx-auto" id="anim-img" src="/images/game-platform/test-loot-box/chest.svg">
                    <div class="row justify-content-center mt-4 row-prize">
                        <div class="col-6 col-md-4 col-lg-6 mb-3" v-for="(imageLoots, index) in imageLoot" :key="index">
                            <img class="img-fluid prize" :src="imageLoots.img">
                        </div>
                    </div>
                    <button class="my-5 btn text-white remove" @click="openLoot">Open loot</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { gsap } from 'gsap'

const imageLoot = [
    {
        title: "Eggz 1",
        img: "/images/game-platform/test-loot-box/eggz-1.jpg"
    },
    {
        title: "Eggz 2",
        img: "/images/game-platform/test-loot-box/eggz-2.jpg"
    },
    {
        title: "Eggz 3",
        img: "/images/game-platform/test-loot-box/eggz-3.jpg"
    },
    {
        title: "Eggz 4",
        img: "/images/game-platform/test-loot-box/eggz-4.jpg"
    },
    {
        title: "Eggz 5",
        img: "/images/game-platform/test-loot-box/eggz-5.jpg"
    },
    {
        title: "Eggz 6",
        img: "/images/game-platform/test-loot-box/eggz-6.jpg"
    },
    {
        title: "Eggz 7",
        img: "/images/game-platform/test-loot-box/eggz-7.jpg"
    },
    {
        title: "Eggz 8",
        img: "/images/game-platform/test-loot-box/eggz-8.jpg"
    }
]

const openLoot = () => {
    const tl = gsap.timeline()


    tl.to('#anim-img', {
        duration: 0.1,
        x: -10,
        repeat: 5,
        yoyo: true,
        ease: 'power2.inOut'
    })
        .to("#anim-img", {
            duration: 0.2,
            opacity: 0,
            ease: 'power2.inOut'
        }, "+=0.5")
        .to(".remove", {
            duration: 0.5,
            opacity: 0,
            ease: 'power2.inOut'
        }, "-=1.5")
        .to(".change-color", {
            duration: 0.5,
            backgroundColor: '#333'
        }, "-=1.5")
        .to(".star", {
            duration: 0,
            opacity: 1,
            ease: 'power2.inOut'
        }, "-=0.1")
        .to(".star", {
            duration: 2,
            opacity: 0,
            delay: -0.1,
            x: () => Math.random() * window.innerWidth - window.innerWidth / 2,
            y: () => Math.random() * window.innerHeight - window.innerHeight / 2,
            rotation: () => Math.random() * 360,
            color: () => selectRandom(colors)
        })
        .to(".prize", {
            duration: 0.5,
            opacity: 1,
        }, "-=1.5")
}

const colors = ["rgb(148, 0, 0)", "rgb(241, 194, 50)", "rgb(255, 255, 255)"]

function selectRandom(array) {
    return array[Math.floor(Math.random() * array.length)]
}

</script>

<style lang="scss" scoped>
#anim-img {
    width: 200px;
    height: 200px;
}

.prize {
    opacity: 0;
    border-radius: 8%;
}

.star {
    font-size: 35px;
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
}

.p-title {
    color: #e1b77e;
    font-size: 20px !important;
}
.box {
    position: relative;
    .row-prize {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    button {
        position: relative;
        z-index: 10;
    }
}

</style>