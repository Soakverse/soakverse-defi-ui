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
    name: "Twitter",
    color: "#29A9E1",
    link: "https://twitter.com/SoakmontGroup",
    icon: "fab fa-twitter",
  },
  {
    name: "Discord",
    color: "#5865F2",
    link: "https://discord.gg/Soakmont",
    icon: "fab fa-discord",
  },
  {
    name: "Telegram",
    color: "#42BDE9",
    link: "https://t.me/soakmont",
    icon: "fab fa-telegram",
  },
  {
    name: "Medium",
    color: "#000000",
    link: "https://soakmont-token.medium.com/",
    icon: "fab fa-medium",
  },
  {
    name: "LinkedIn",
    color: "#006192",
    link: "https://www.linkedin.com/company/soakmont",
    icon: "fab fa-linkedin-in",
  },
  {
    name: "Instagram",
    color: "#C13584",
    link: "https://instagram.com/soakmontgroup/",
    icon: "fab fa-instagram",
  },
];
</script>
