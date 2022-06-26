<template>
  <div id="header">
    <div class="container-fluid">
      <div class="row h-100">
        <div class="col-6 my-auto">
          <h5 class="my-auto py-0">WELCOME</h5>
        </div>
        <div class="col-6 my-auto d-flex">
          <div id="wallet-holder">
            <Web3Wallet />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { isSidebarOpen } = useUiState();
</script>

<style>
#wallet-holder {
  margin-left: auto;
}
</style>
