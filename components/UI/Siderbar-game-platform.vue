<template>
  <div id="second-sidebar" class="sidebar" :class="{ toggled: isSidebarOpen }">
    <div class="sidebar-header">
      <img class="brand-logo" :src="isSidebarOpen ? logo : icon" alt="Logo Soakverse" />
      <a href="javascript:void(0)" class="toggle-menu" @click="toggleSidebar()">
        <i class="fa-solid" :class="{ 'fa-chevron-right': !isSidebarOpen, 'fa-chevron-left': isSidebarOpen, }"></i>
      </a>
    </div>
    <hr>
    <ul class="nav nav-tabs">
  <li class="nav-item">
    <a class="nav-link active" href="#">Active</a>
  </li>
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
    <div class="dropdown-menu">
      <a class="dropdown-item" href="#">Action</a>
      <a class="dropdown-item" href="#">Another action</a>
      <a class="dropdown-item" href="#">Something else here</a>
      <div class="dropdown-divider"></div>
      <a class="dropdown-item" href="#">Separated link</a>
    </div>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled" href="#">Disabled</a>
  </li>
</ul>
    <ul class="sidebar-menu">
      <li>
        <nuxt-link to="/game-platform" class="sidebar-link" :class="{ 'text-center w-auto': !isSidebarOpen }">
          <img src="/images/game-platform/games.svg" class="p-2"><span class="label ms-3">Games</span>
        </nuxt-link>
      </li>
      <!-- <li>
        <nuxt-link to="/game-platform/marketplace/auctions" class="sidebar-link" :class="{ 'text-center w-auto': !isSidebarOpen }">
          <img src="/images/game-platform/marketplace.svg" class="p-2"><span class="label ms-3">Marketplace</span>
        </nuxt-link>
      </li>-->
      <li>
        <nuxt-link to="/game-platform/rewards/rewards-drop" class="sidebar-link"
          :class="{ 'text-center w-auto': !isSidebarOpen }">
          <img src="/images/game-platform/rewards.svg" class="p-2"><span class="label ms-3">Rewards</span>
        </nuxt-link>
      </li>
      <hr class="my-3">
      <h4 :class="{ 'd-none': !isSidebarOpen }">Featured games</h4>
      <li>
        <nuxt-link to="/game-platform/games/soakverse-chronicles" class="sidebar-link"
          :class="{ 'text-center w-auto': !isSidebarOpen }">
          <img src="/images/game-platform/game-icon-1.png"><span class="label ms-2">Soakverse Chronicles</span>
        </nuxt-link>
      </li>
      <!-- <li>
        <nuxt-link to="/crypto/swap" class="sidebar-link" :class="{ 'text-center w-auto': !isSidebarOpen }">
          <img src="/images/game-platform/game-icon-2.png"><span class="label ms-2">Dreadside</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/skmt/staking" class="sidebar-link" :class="{ 'text-center w-auto': !isSidebarOpen }">
          <img src="/images/game-platform/game-icon-3.png"><span class="label ms-2">Ghosts and Whispers</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/spoc/staking" class="sidebar-link" :class="{ 'text-center w-auto': !isSidebarOpen }">
          <img src="/images/game-platform/game-icon-4.png"><span class="label ms-2">Angel Cry</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/soakverse/eggz/staking" class="sidebar-link" :class="{ 'text-center w-auto': !isSidebarOpen }">
          <img src="/images/game-platform/game-icon-5.png"><span class="label ms-2">Final Assault</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/soakverse/giveaways" class="sidebar-link" :class="{ 'text-center w-auto': !isSidebarOpen }">
          <img src="/images/game-platform/game-icon-6.png"><span class="label ms-2">Bio Alias</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/soakverse/backpack" class="sidebar-link" :class="{ 'text-center w-auto': !isSidebarOpen }">
          <img src="/images/game-platform/game-icon-7.png"><span class="label ms-2">Dragoncore</span>
        </nuxt-link>
      </li> -->
      <hr class="my-3">
      <li>
        <nuxt-link to="/" class="sidebar-link" :class="{ 'text-center w-auto': !isSidebarOpen }">
          <img src="/images/game-platform/x.svg" class="p-2"><span class="label ms-3">Follow us</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/" class="sidebar-link" :class="{ 'text-center w-auto': !isSidebarOpen }">
          <img src="/images/game-platform/discord.svg" class="p-2"><span class="label ms-3">Join the Discord</span>
        </nuxt-link>
      </li>
      <!-- <li>
        <a href="javascript:void(0)" class="sidebar-link" :class="{ 'text-center w-auto': !isSidebarOpen }"
          @click="disconnectWallet"><i class="fa-solid fa-unlink"></i><span class="label"> Disconnect</span>
        </a>
      </li> -->
      <!--
        <li>
          <nuxt-link to="/account" class="sidebar-link" :class="{ 'text-center w-auto': !isSidebarOpen }"
            ><i class="fa-solid fa-user"></i
            ><span v-if="isSidebarOpen"> Account</span>
          </nuxt-link>
        </li>
        <li>
        <a href="#" class="sidebar-link" :class="{ 'text-center w-auto': !isSidebarOpen }"
          ><i class="fa-solid fa-wallet"></i
          ><span v-if="isSidebarOpen"> Assets</span></a
        >
      </li>
      <li>
        <a href="#" class="sidebar-link" :class="{ 'text-center w-auto': !isSidebarOpen }"
          ><i class="fa-solid fa-file"></i
          ><span v-if="isSidebarOpen"> Active Listings</span></a
        >
      </li>
      <li>
        <a href="#" class="sidebar-link" :class="{ 'text-center w-auto': !isSidebarOpen }"
          ><i class="fa-solid fa-piggy-bank"></i
          ><span v-if="isSidebarOpen"> Banking</span></a
        >
      </li>-->
    </ul>
  </div>
</template>

<script setup>
import icon from "@/assets/img/soakverse-icon-square.png";
import logo from "/images/game-platform/soakverse-logo.svg";
const { isSidebarOpen, toggleSidebar, closeSidebar } = useUiState();
</script>

<script>
const { closeSidebar } = useUiState();

export default {
  mounted() {
    var mainPanelDiv = document.querySelector("#main");
    var sidebarLinks = document.querySelectorAll(".sidebar-link");
    mainPanelDiv.addEventListener("click", function (event) {
      closeSidebar();
    });
    sidebarLinks.forEach((element) => {
      element.addEventListener("click", (e) => {
        closeSidebar();
      });
    });
  },
};
</script>

<style lang="scss" scoped></style>
