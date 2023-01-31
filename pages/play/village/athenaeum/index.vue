<template>
  <div class="container-fluid d-flex p-2 game-layout" id="athenaeum-layout">
    <div class="row w-100 mt-auto g-0">
      <div class="col-12 mb-2">
        <div class="card text-left h-100">
          <h4>The Athenaeum</h4>
          <p><b>The Athenaeum</b> is where knowledge is stored, acquired & contemplated.</p>
          <p><b>Get Tutoring</b> in Specific Fields</p>
          <p><b>Study up</b> on all things Soakverse in the <b>Library.</b></p>
          <p><b>Listen to Speakers</b> & attend Classes and Events in the <b>Auditorium.</b></p>
          <p><b>Sign up for, or manage, your Mentoring Relationships</b> as a Mentor, Mentee, or both!</p>
        </div>
      </div>
      <div class="col-12 mb-2">
        <div class="card text-left h-100">
          <h4>Actions</h4>
          <div class="row">
            <div class="col-12">
              <p>The Athenaeum is not accessible yet. Come back later!</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <nuxt-link class="btn btn-primary" to="/play/village">Back to village</nuxt-link>
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

const locations = [];
</script>

<style lang="scss">
#athenaeum-layout {
  background-image: url("/images/p2e/athenaeum.webp");
  background-size: cover;
  background-position: center center;
}
</style>
