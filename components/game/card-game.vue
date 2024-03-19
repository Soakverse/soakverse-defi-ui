<template>
    <div class="row mt-5 sub-card">
            <div class="col-xl-10 offset-xl-1">
                <div class="row">
                    <div class="col-12 col-sm-6 col-lg-4 col-xl-4 col-xxl-2 mb-4" v-for="(cards, index) in card"
                        :key="cards.title" :class="{ 'not-first-card': index !== 0 }">
                        <div class="card h-100 card-game-platform px-0 py-0">
                            <img class="card-img-top" :src=(cards.img) alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title fw-bold text-white">{{ cards.title }}</h5>
                                <p class="card-text text-grey small-text">{{ cards.text }}</p>
                                <p class="cat-p">{{ cards.cat }}</p>
                                <div class="row">
                                    <div class="col-6">
                                        <NuxtLink class="btn" to="/game-platform/games/soakverse-chronicles">{{ cards.playLink }}</NuxtLink>
                                    </div>
                                    <div class="col-6">
                                        <NuxtLink class="btn" to="/game-platform/games/game-details/soakverse-detail">{{ cards.gameDetailLink }}</NuxtLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>

export default {
  data() {
    return {
      card: [
        {
          img: "/images/game-platform/games-moment-1.png",
          title: "Soakverse Chronicles",
          text: "Venture into a retro-inspired pixelated land.",
          cat: "Role Playing Game",
          playLink: "Play",
          gameDetailLink: "Details"
        },
        {
          img: "/images/game-platform/games-moment-2.png",
          title: "Dreadside",
          text: "Fight the Dreadside on a cyberspace chase.",
          cat: "Platformer",
          playLink: "Play",
          gameDetailLink: "Details"
        },
        {
          img: "/images/game-platform/games-moment-3.png",
          title: "Ghosts and Whispers",
          text: "Run a spooky mansion and frighten uninvited guests.",
          cat: "Tower Defense",
          playLink: "Play",
          gameDetailLink: "Details"
        },
        {
          img: "/images/game-platform/games-moment-4.png",
          title: "Angel Cry",
          text: "Take part in puzzle battles between angels and demons.",
          cat: "Puzzle",
          playLink: "Play",
          gameDetailLink: "Details"
        },
        {
          img: "/images/game-platform/games-moment-5.png",
          title: "Final Assault",
          text: "Load up and duel with tanks and was machines.",
          cat: "Top-Down Shooter",
          playLink: "Play",
          gameDetailLink: "Details"
        },
        {
          img: "/images/game-platform/games-moment-6.png",
          title: "Bio Alias",
          text: "Fend off zombies and creatures of the night.",
          cat: "Survival Horror",
          playLink: "Play",
          gameDetailLink: "Details"
        }
      ]
    };
  }
};
</script>
