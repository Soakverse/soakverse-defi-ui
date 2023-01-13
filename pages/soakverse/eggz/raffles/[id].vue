<template>
  <div class="container-fluid d-flex">
    <div class="row mx-auto full">
      <div class="col-12">
        <nuxt-link to="/soakverse/giveaways" class="btn btn-primary mb-2"> Back </nuxt-link>
        <div class="text-center mb-4">
          <EggzRaffle :raffleId="$route.params.id" :privateRaffle="route.query.privateRaffle" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const route = useRoute();
router.push({ path: `/soakverse/giveaways/${route.params.id}` });
useHead({
  title: "Soakverse Eggz Giveaway - Soakverse DeFI Platform",
});
</script>
