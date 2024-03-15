<template>
    <div class="container-fluid">
        <div class="main-title full row mx-auto mt-4">
            <h2 class="d-inline-block">FEATURED <span>REWARDS DROPS</span></h2>
        </div>
        <div class="container-fluid main-container px-0 w-75 mt-3 mx-auto">
            <div class="row">
                <div class="col-xl-4 col-12 m-xl-4">
                    <img class="rounded img-fluid p-3 p-xl-0" src="/images/game-platform/campaign-drop-1.png" alt="">
                </div>
                <div class="col-xl-6 col-12 ms-xl-5 mx-auto mt-xl-5 right-side">
                    <div class="px-2 px-xl-0">
                        <p class="">Soakverse Reward Campaign</p>
                        <h1 class="">Reward Drop 1</h1>
                        <p class="small-text w-75">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
                            risus.
                            Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.</p>
                    </div>
                    <div class="d-flex text-center px-2 px-xl-0">
                        <p class="cat-p">NFT Project</p>
                        <p class="cat-p ms-1">Token Project</p>
                        <p class="cat-p ms-1">Web3 Community</p>
                        <p class="cat-p ms-1">Gaming Project</p>
                        <p class="cat-p ms-1">...</p>
                    </div>
                    <div class="col-xl-6 col-12 px-2 px-xl-0">
                        <p class="small-text mb-1">Drops ends in</p>
                        <div class="small-div d-flex py-1 align-items-center">
                            <img class="p-2 ms-1" src="/images/game-platform/timelapse.png" alt="">
                            <p class="ms-4 my-0">21h 50m 3s</p>
                        </div>
                    </div>
                    <div class="bid-right-side row mt-3 px-2 px-xl-0">
                        <div class="col-xl-5 col-12 mb-2 mb-xl-0">
                            <button type="button" class="btn" @click="openModal">
                                <img class="me-2" src="/images/game-platform/rewards-white.svg">
                                View Reward Drop
                            </button>
                        </div>
                        <div class="col-xl-5 col-12 d-flex align-items-center mb-2 mb-xl-0">
                            <button class="btn btn-boost text-white rounded-pill">
                                <div class="d-flex align-items-center justify-content-start text-center">
                                    <img class="me-4 p-2 rounded-circle" src="/images/game-platform/rocket.png">
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
        <div class="row container-fluid full  mx-auto mt-4 middle-text">
            <div class="col-4">
                <h2 class="text-white"><span class="font-weight-bold">CURRENT </span> REWARDS DROPS</h2>
            </div>
            <div class="col-8">
                <hr class="w-100">
            </div>
        </div>
        <div class="row mt-4 full container-fluid m-auto">
            <div class="col-12 col-sm-6 col-lg-4 col-xl-4 col-xxl-2 mb-4" v-for="(cards, index) in cardRewardDrop"
                :key="cards.title">
                <div class="card card-game-platform px-0 py-0">
                    <img class="card-img-top" :src=(cards.img) alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title text-white">{{ cards.title }}</h5>
                        <p class="card-text text-white"><span>Soakverse Reward Campaign Ends in :</span> {{ cards.text
                            }}</p>
                        <button class="btn w-100 rounded-lg">{{ cards.btn }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal-mask d-flex" v-if="isModalVisible">
        <div class="modal-wrapper mx-auto">
            <div class="modal-container">
                <div class="row px-0">
                    <div class="col-3">
                        <img class="rounded img-fluid p-3 p-xl-0" style="width: 160px; height: 160px;"
                            src="/images/game-platform/campaign-drop-1.png" alt="">
                    </div>
                    <div class="col-8 p-0">
                        <p>#UserName123</p>
                        <div class="d-flex flex-column col-12">
                            <div class="d-flex justify-content-between">
                                <h1 class="text-white">Reward Drop 1</h1>
                                <button type="button" class="btn rounded-lg">Claim drop</button>
                            </div>
                            <div class="d-flex col-12 flex-end mt-3 justify-content-between">
                                <p class=""><span class="fwb">50%</span> <span>2/4 quests completed</span></p>
                                <p class=""><span>Drop ends in</span> <span class="fwb">21h 50m 3s</span></p>
                            </div>
                            <div class="row">

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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus
                            tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.
                        </p>
                    </div>
                    <div class="col-10 d-flex justify-content-around">
                        <p class="cat-p">NFT Project</p>
                        <p class="cat-p">Token Project</p>
                        <p class="cat-p">Web3 Community</p>
                        <p class="cat-p">Gaming Project</p>
                        <p class="cat-p">Web2 Brand</p>
                        <p class="cat-p">Web2 Company</p>
                    </div>

                </div>
                <div class="">
                    <button @click="closeModal">Close</button>
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
            isModalVisible: false
        };
    },
    methods: {
        openModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        }
    }
};

const cardRewardDrop = [
    {
        img: "/images/game-platform/campaign-drop-2.png",
        title: "Reward Drop 2",
        text: "21h 50m 3s",
        btn: "View Reward Drop"
    },
    {
        img: "/images/game-platform/campaign-drop-3.png",
        title: "Reward Drop 3",
        text: "21h 50m 3s",
        btn: "View Reward Drop"
    },
    {
        img: "/images/game-platform/campaign-drop-4.png",
        title: "Reward Drop 4",
        text: "21h 50m 3s",
        btn: "View Reward Drop"
    },
    {
        img: "/images/game-platform/campaign-drop-5.png",
        title: "Reward Drop 5",
        text: "21h 50m 3s",
        btn: "View Reward Drop"
    },
    {
        img: "/images/game-platform/campaign-drop-6.png",
        title: "Reward Drop 6",
        text: "21h 50m 3s",
        btn: "View Reward Drop"
    },
    {
        img: "/images/game-platform/campaign-drop-7.png",
        title: "Reward Drop 7",
        text: "21h 50m 3s",
        btn: "View Reward Drop"
    },
]
</script>
<style lang="scss" scoped>
button {
    height: 46px !important;
}

.btn-boost {
    background-color: #143138 !important;

    img {
        background: transparent linear-gradient(180deg, #A872FE 0%, #6ED0FF 100%) 0% 0% no-repeat padding-box;
        height: 35px;
        width: 35px;
    }
}

.modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(15px);
    display: flex;
    align-items: center;
    justify-content: center;

    .modal-wrapper {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-container {
        background: #143138;
        width: 880px;
        height: 640px;
        padding: 20px;
        border-radius: 40px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);

        h1 {
            font-size: 40px;
            font-weight: bold;
        }

        p {
            color: #E1B67E;
            font-size: 14px;
            font-weight: normal;

            span {
                color: #AAB5B7;
                font-size: 12px;
            }

            .fwb {
                color: #fff;
                font-size: 16px;
                font-weight: bold;
            }

        }


        button {
            opacity: 0.25;
            background-color: #E1B67E;
            color: #06262D;
            font-size: 14px;
            font-weight: 600;
        }

        .progress {
            background-color: #06262D;
            height: 6px;
            padding: 0;

            .progress-bar {
                background-color: #E1B67E;
            }
        }

        .cat-p {
            background-color: #1C3D45 !important;
            font-size: 12px !important;
        }
    }

    .modal-footer {
        text-align: right;
    }
}
</style>