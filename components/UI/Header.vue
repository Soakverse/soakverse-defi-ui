<template>
  <div id="header">
    <div class="container-fluid">
      <div class="row h-100">
        <div class="col-12 my-auto d-flex">
          <div id="wallet-holder">
            <Web3Wallet />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Breadcrumb from "./Breadcrumb.vue";
const { isSidebarOpen } = useUiState();
</script>

<style>
#wallet-holder {
  margin-left: auto;
}
</style>
