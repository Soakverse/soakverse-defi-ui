<template>
  <div class="d-flex h-100">
    <Siderbar />
    <div id="main">
      <Header />
      <div class="container-fluid mx-0 breadcrumb-holder">
        <div class="row mx-0">
          <div class="col-12 mx-0">
            <Breadcrumb />
          </div>
        </div>
      </div>
      <div id="main-content">
        <slot />
      </div>
      <PlaySound />
    </div>
  </div>
</template>

<script setup>
import PlaySound from "~~/components/UI/PlaySound.vue";
import Siderbar from "~~/components/UI/Siderbar.vue";
import Header from "~~/components/UI/Header.vue";
import Breadcrumb from "~~/components/UI/Breadcrumb.vue";
</script>
