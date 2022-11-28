<template>
  <div class="container-fluid d-flex">
    <div class="row m-auto">
      <div class="col">
        <div class="card text-center">
          <h4>WELCOME TO <b>SOAKVERSE</b></h4>
          <p>Let's get started</p>
          <nuxt-link to="/about" class="btn btn-primary mb-2"> About SOAKVERSE </nuxt-link>
          <p>or</p>
          <nuxt-link to="/skmt/staking" class="btn btn-primary">SKMT Staking </nuxt-link>
          <p>or</p>
          <nuxt-link to="/soakverse/eggz/staking" class="btn btn-primary">Eggz Staking </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Home - Soakverse DeFI Platform",
});
</script>
