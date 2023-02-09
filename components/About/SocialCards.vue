<template>
  <div class="row">
    <div v-for="social in socials" :key="social.name" class="col-12 col-sm-4 col-xl-3 social-card">
      <a target="_new" :href="social.link" class="social-holder w-100" :style="`background-color:${social.color}`">
        <div class="m-auto">
          <i class="fa-4x" :class="social.icon" />
          <p>{{ social.name }}</p>
        </div>
      </a>
    </div>
  </div>
  <div class="row mt-6">
    <div class="col-12">
      <a target="_new" href="https://www.soakverse.io" class="mt-4 btn btn-primary">www.soakverse.io</a>
    </div>
  </div>
</template>

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

<script setup>
const socials = [
  {
    name: "Discord",
    color: "#5865F2",
    link: "https://discord.gg/soakverse",
    icon: "fab fa-discord",
  },
  {
    name: "Twitter",
    color: "#29A9E1",
    link: "https://twitter.com/soakverse",
    icon: "fab fa-twitter",
  },
  {
    name: "Medium",
    color: "#000000",
    link: "https://soakverse.medium.com/",
    icon: "fab fa-medium",
  },
  {
    name: "Instagram",
    color: "#C13584",
    link: "https://instagram.com/soakverse/",
    icon: "fab fa-instagram",
  },
];
</script>
