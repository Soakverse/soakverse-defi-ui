<template>
  <div class="container-fluid d-flex p-0 game-layout" id="athenaeum-layout">
    <div class="container-fluid d-flex p-2 game-sublayout">
      <div class="row w-100 mt-auto g-0">
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>
              The Athenaeum
              <a
                href="https://docs.soakverse.io/soakverse/soakverse-world/the-soakverse-game-world/the-village/the-athenaeum"
                target="_blank"
                class="btn btn-sm btn-primary"
                ><i class="fa fa-question-circle"></i
              ></a>
              <nuxt-link class="btn btn-sm btn-primary float-end" to="/play/village"
                ><i class="fa-solid fa-circle-arrow-left"></i> Village</nuxt-link
              >
            </h4>
            <p><b>The Athenaeum</b> is where knowledge is stored, acquired & contemplated.</p>
            <p><b>Get Tutoring</b> in Specific Fields</p>
            <p><b>Study up</b> on all things Soakverse in the <b>Library.</b></p>
            <p><b>Listen to Speakers</b> & attend Classes and Events in the <b>Auditorium.</b></p>
            <p><b>Sign up for, or manage, your Mentoring Relationships</b> as a Mentor, Mentee, or both!</p>
          </div>
        </div>
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>Locations</h4>
            <div class="row">
              <nuxt-link
                v-for="location in locations"
                :key="location.name"
                class="col-6 col-sm-4 col-md-3 col-lg-2 col-xl-2 px-1 mb-2"
                :to="location.link"
              >
                <div class="card location-card h-100">
                  <img class="w-100" :src="location.image" />
                  <p>{{ location.title }}</p>
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
definePageMeta({
  layout: "p2e-layout",
});

useHead({
  title: "The Village - Soakverse P2E",
});

const locations = [
  {
    title: "Tutoring Class",
    link: "/play/village/athenaeum/tutoring-class",
    image: "/images/p2e/thumbnails/tutoring-class.webp",
  },
  {
    title: "The Library",
    link: "/play/village/athenaeum/library",
    image: "/images/p2e/thumbnails/library.webp",
  },
  {
    title: "The Auditorium",
    link: "/play/village/athenaeum/auditorium",
    image: "/images/p2e/thumbnails/auditorium.webp",
  },
  {
    title: "Mentor Class",
    link: "/play/village/athenaeum/mentor-class",
    image: "/images/p2e/thumbnails/mentor-class.webp",
  },
];
</script>

<style lang="scss">
#athenaeum-layout {
  background-image: url("/images/p2e/athenaeum.webp");
  background-size: cover;
  background-position: center center;
}
</style>
