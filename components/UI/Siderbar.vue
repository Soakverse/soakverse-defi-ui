<template>
  <div id="main-sidebar" class="sidebar" :class="{ toggled: isSidebarOpen }">
    <div class="sidebar-header">
      <img
        class="brand-logo"
        :src="isSidebarOpen ? logo : icon"
        alt="Logo Soakverse"
      />
      <a href="javascript:void(0)" class="toggle-menu" @click="toggleSidebar()"
        ><i
          class="fa-solid"
          :class="{
            'fa-chevron-right': !isSidebarOpen,
            'fa-chevron-left': isSidebarOpen,
          }"
        ></i
      ></a>
    </div>
    <ul class="sidebar-menu">
      <li>
        <nuxt-link
          to="/"
          class="sidebar-link"
          :class="{ 'text-center': !isSidebarOpen }"
          ><i class="fa-solid fa-dashboard"></i><span class="label"> Home</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/play"
          class="sidebar-link"
          :class="{ 'text-center': !isSidebarOpen }"
          ><i class="fa-solid fa-gamepad"></i><span class="label">Play</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/crypto/swap"
          class="sidebar-link"
          :class="{ 'text-center': !isSidebarOpen }"
          ><i class="fa-solid fa-shuffle"></i
          ><span class="label">Crypto Swap</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/skmt/staking"
          class="sidebar-link"
          :class="{ 'text-center': !isSidebarOpen }"
          ><i class="fa-solid fa-coins"></i
          ><span class="label">SKMT Staking</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/soakverse/eggz/staking"
          class="sidebar-link"
          :class="{ 'text-center': !isSidebarOpen }"
          ><i class="fa-solid fa-egg"></i
          ><span class="label">Eggz Staking</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/soakverse/giveaways"
          class="sidebar-link"
          :class="{ 'text-center': !isSidebarOpen }"
          ><i class="fa-solid fa-trophy"></i
          ><span class="label">Giveaways</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/soakverse/backpack"
          class="sidebar-link"
          :class="{ 'text-center': !isSidebarOpen }"
          ><i class="fa-solid fa-bag-shopping"></i
          ><span class="label">Backpack</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/loyalty"
          class="sidebar-link"
          :class="{ 'text-center': !isSidebarOpen }"
          ><i class="fa-solid fa-award"></i><span class="label"> Loyalty</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/soak-links"
          class="sidebar-link"
          :class="{ 'text-center': !isSidebarOpen }"
          ><i class="fa-solid fa-info-circle"></i
          ><span class="label"> Soak Links</span>
        </nuxt-link>
      </li>
      <li>
        <a
          href="javascript:void(0)"
          class="sidebar-link"
          :class="{ 'text-center': !isSidebarOpen }"
          @click="disconnectWallet"
          ><i class="fa-solid fa-unlink"></i
          ><span class="label"> Disconnect</span>
        </a>
      </li>
      <!--
        <li>
          <nuxt-link to="/account" class="sidebar-link" :class="{ 'text-center': !isSidebarOpen }"
            ><i class="fa-solid fa-user"></i
            ><span v-if="isSidebarOpen"> Account</span>
          </nuxt-link>
        </li>
        <li>
        <a href="#" class="sidebar-link" :class="{ 'text-center': !isSidebarOpen }"
          ><i class="fa-solid fa-wallet"></i
          ><span v-if="isSidebarOpen"> Assets</span></a
        >
      </li>
      <li>
        <a href="#" class="sidebar-link" :class="{ 'text-center': !isSidebarOpen }"
          ><i class="fa-solid fa-file"></i
          ><span v-if="isSidebarOpen"> Active Listings</span></a
        >
      </li>
      <li>
        <a href="#" class="sidebar-link" :class="{ 'text-center': !isSidebarOpen }"
          ><i class="fa-solid fa-piggy-bank"></i
          ><span v-if="isSidebarOpen"> Banking</span></a
        >
      </li>-->
    </ul>
  </div>
</template>

<script setup>
import icon from "@/assets/img/soakverse-icon-square.png";
import logo from "@/assets/img/soakverse-logo.png";
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
