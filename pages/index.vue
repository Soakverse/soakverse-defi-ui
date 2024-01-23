<template>
  <div class="container-fluid d-flex">
    <div class="row m-auto full" style="max-width: 800px">
      <div class="col">
        <div class="card text-center mb-4">
          <h4>Welcome to Soakverse</h4>
          <p>Soakverse's rich ecosystem is ready for you!</p>
          <div class="row">
            <div
              v-for="social in socials"
              :key="social.name"
              class="col-12 col-md-4 social-card"
            >
              <nuxt-link
                :to="social.link"
                class="social-holder w-100"
                :style="`background-color:${social.color}`"
              >
                <div class="m-auto">
                  <i class="fa-4x" :class="social.icon" />
                  <p>{{ social.name }}</p>
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const socials = [
  {
    name: "DAO Dashboard",
    color: "#f24578",
    link: "/dao",
    icon: "fas fa-scale-balanced",
  },
  {
    name: "SKMT Staking",
    color: "#00b8ff",
    link: "/skmt/staking",
    icon: "fas fa-coins",
  },
  {
    name: "Soak Links",
    color: "#071d28",
    link: "/soak-links",
    icon: "fas fa-info-circle",
  },
];
useHead({
  title: "Home - Soakverse DeFI Platform",
});
</script>
<style lang="scss">
.social-card {
  padding: 8px;
  a.social-holder {
    display: flex;
    padding: 20px;
    border-radius: 8px;
    opacity: 0.7;
    i {
      color: white;
    }
    p {
      margin: 0;
      padding: 0;
      margin-top: 10px;
      color: white;
    }
    &:hover {
      opacity: 1;
    }
  }
}
</style>
