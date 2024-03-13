<template>
    <div class="container-fluid">
        <div class="full mx-auto row">
            <div class="main-title mt-5">
                <h2 class="d-inline-block">MAIN <span>AUCTION</span></h2>
                <p class="d-inline-block ms-3">Powered by <span>SOAKPORT</span></p>
            </div>
            <div class="row full mx-auto mt-5 main-container">
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
                    <div class="row img-text">
                        <div class="col d-flex">
                            <img class="p-1" src="/images/game-platform/soakverse-logo.png" alt="">
                            <p>soakmont.eth</p>
                        </div>
                        <div class="col d-flex">
                            <img class="p-1" src="/images/game-platform/ethereum-logo.png" alt="">
                            <p>0.01</p>
                            <a><img class="p-1" src="/images/game-platform/new-tab.png" alt=""></a>
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

<style lang="scss" scoped>
.main-title {
    h2 {
        color: #fff;
        font-size: 32px;
    }

    p {
        color: #AAB5B7;
    }

    span {
        font-weight: bold;
    }
}

.main-container {
    background-color: #06262D;
    border-radius: 24px;

    .right-side {
        p {
            color: #E1B67E;
        }

        .top-right-side {
            button {
                background-color: #143138;
                width: 24px;
                height: 24px;
                position: relative;

                i {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: #AAB5B7;
                    font-size: 8px;
                    line-height: 12px;
                }
            }
        }

        h1 {
            color: #fff;
            font-size: 64px;
            font-weight: bold;
        }

        .small-text {
            font-size: 12px;
            color: #AAB5B7;
        }

        .small-div {
            background-color: #143138;
            border-radius: 12px;

            p {
                font-size: 28px;
                font-weight: bold;
                color: #fff;
            }

            img {
                width: 48px;
                height: 48px;
                border-radius: 8px;
                background-color: #1C3D45;
            }
        }

        .bid-right-side {

            .ethereum-label {
                position: relative;
                display: flex;
                align-items: center;
                background-color: #143138;
                border-radius: 8px;

                input {
                    background-color: #143138;
                    color: #586E72;
                    border: none;
                    height: 40px;
                    font-size: 14px;
                    padding-left: 30px;
                    border-radius: 8px;
                }

                img {
                    position: absolute;
                    left: 8px;
                }
            }


            button {
                height: 40px;
                width: 100%;
                background-color: #E1B67E;
                border-radius: 8px;
                border: none;
                font-size: 16px;
                font-weight: 600;
            }

        }

        .img-text {
            img {
                width: 24px;
                height: 24px;
            }
        }
    }
}
</style>