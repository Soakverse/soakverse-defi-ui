<template>
  <div id="main-sidebar" class="sidebar" :class="{ toggled: isSidebarOpen }">
    <div class="sidebar-header">
      <img
        class="brand-logo"
        :src="isSidebarOpen ? logo : icon"
        alt="Logo Soakmont"
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
          ><i class="fa-solid fa-dashboard"></i
          ><span v-if="isSidebarOpen"> Home</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/staking"
          class="sidebar-link"
          :class="{ 'text-center': !isSidebarOpen }"
          ><i class="fa-solid fa-coins"></i
          ><span v-if="isSidebarOpen"> Staking</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/about"
          class="sidebar-link"
          :class="{ 'text-center': !isSidebarOpen }"
          ><i class="fa-solid fa-info-circle"></i
          ><span v-if="isSidebarOpen"> About</span>
        </nuxt-link>
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
import icon from "@/assets/img/icon-gold.png";
import logo from "@/assets/img/logo-hor-white.png";
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
