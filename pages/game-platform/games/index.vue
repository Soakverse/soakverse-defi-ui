<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="row text-center text-lg-start mx-auto mt-4">
                    <div class="col-12 col-md-10 offset-md-1">
                        <h2 class="text-white">ALL <span class="fw-bold">GAMES</span></h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <Card />
                    </div>
                </div>
            </div>
            <!-- <div class="col-2 card-game-plat">
                <div class="card h-100">
                    <div class="row">
                        <div class="col">
                            <div class="d-flex justify-content-between">
                                <p class="p-gold">Filters</p>
                                <p class="p-gold">Reset</p>
                            </div>
                        </div>
                        <label class="search-label">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#586E72"
                                class="bi bi-search" viewBox="0 0 16 16">
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>
                            <input type="text" placeholder="Search games">
                        </label>
                    </div>
                </div>
            </div> -->
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
import Card from "@/components/game/card-game.vue"
</script>

<style>
input {
    background-color: #143138;
    color: #586E72;
    width: 100%;
    border-radius: 6px;
    border: none;
    height: 40px;
    font-size: 14px;
}

.search-label {
    position: relative;
    display: flex;
    align-items: center;
}

.search-label svg {
    position: absolute;
    left: 20px;
}

.search-label input {
    padding-left: 35px;
}
</style>