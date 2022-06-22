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
        <a href="#" :class="{ 'text-center': !isSidebarOpen }"
          ><i class="fa-solid fa-user"></i
          ><span v-if="isSidebarOpen"> Account</span></a
        >
      </li>
      <li>
        <a href="#" :class="{ 'text-center': !isSidebarOpen }"
          ><i class="fa-solid fa-wallet"></i
          ><span v-if="isSidebarOpen"> Assets</span></a
        >
      </li>
      <li>
        <a href="#" :class="{ 'text-center': !isSidebarOpen }"
          ><i class="fa-solid fa-file"></i
          ><span v-if="isSidebarOpen"> Active Listings</span></a
        >
      </li>
      <li>
        <a href="#" :class="{ 'text-center': !isSidebarOpen }"
          ><i class="fa-solid fa-piggy-bank"></i
          ><span v-if="isSidebarOpen"> Banking</span></a
        >
      </li>
    </ul>
  </div>
</template>

<script setup>
import icon from "@/assets/img/icon-gold.png";
import logo from "@/assets/img/logo-hor-white.png";
const { isSidebarOpen, toggleSidebar } = useUiState();
</script>
