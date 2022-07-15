<template>
  <ol class="my-auto py-0" vocab="http://schema.org/" typeof="BreadcrumbList">
    <li property="itemListElement" typeof="ListItem">
      <nuxt-link property="item" typeof="WebPage" to="/">
        <span property="name">Home</span>
      </nuxt-link>
      <meta property="position" content="1" />
    </li>
    <li
      v-for="(crumb, index) in crumbs"
      :key="index"
      property="itemListElement"
      typeof="ListItem"
    >
      <nuxt-link property="item" typeof="WebPage" :to="crumb.path">
        <span property="name">{{
          $route.fullPath === crumb.path && title !== null ? title : crumb.title
        }}</span>
      </nuxt-link>
      <meta property="position" :content="index + 2" />
    </li>
  </ol>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null,
    },
  },
  computed: {
    crumbs() {
      const route = useRoute();
      let fullPath = route.fullPath;
      if (fullPath.indexOf("?") !== -1) {
        fullPath = fullPath.slice(0, route.fullPath.indexOf("?"));
      }
      const params = fullPath.startsWith("/")
        ? fullPath.substring(1).split("/")
        : fullPath.split("/");
      const crumbs = [];
      let path = "";
      params.forEach((param, index) => {
        path = `${path}/${param}`;
        crumbs.push({
          title: param.replace(/-/g, " "),
          path,
        });
      });
      return crumbs;
    },
  },
};
</script>

<style scoped>
ol {
  list-style: none;
  padding: 0;
}
li {
  display: inline;
}
li:after {
  content: " » ";
  display: inline;
  font-size: 0.9em;
  color: #000000;
  padding: 0 0.0725em 0 0.15em;
}
li:last-child:after {
  content: "";
}
li a {
  color: black;
  text-transform: uppercase;
}
li a.router-link-exact-active {
  font-weight: bold;
}
</style>
