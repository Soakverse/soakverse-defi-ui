<template>
  <div class="row">
    <div
      v-for="social in socials"
      :key="social.name"
      class="col-12 col-sm-4 col-xl-3 social-card"
    >
      <a
        target="_new"
        :href="social.link"
        class="social-holder w-100"
        :style="`background-color:${social.color}`"
      >
        <div class="m-auto">
          <i class="fa-4x" :class="social.icon" />
          <p>{{ social.name }}</p>
        </div>
      </a>
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
    name: "Facebook",
    color: "#3E5C9A",
    link: "https://facebook.com",
    icon: "fab fa-facebook",
  },
  {
    name: "Twitter",
    color: "#29A9E1",
    link: "https://facebook.com",
    icon: "fab fa-twitter",
  },
  {
    name: "Discord",
    color: "#5865F2",
    link: "https://facebook.com",
    icon: "fab fa-discord",
  },
  {
    name: "Telegram",
    color: "#42BDE9",
    link: "https://facebook.com",
    icon: "fab fa-telegram",
  },
  {
    name: "Medium",
    color: "#000000",
    link: "https://facebook.com",
    icon: "fab fa-medium",
  },
];
</script>
