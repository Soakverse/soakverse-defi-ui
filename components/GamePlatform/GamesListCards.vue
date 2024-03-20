<template>
  <div class="row mt-5 sub-card">
    <div class="col-xxl-8 order-2 order-xxl-1 offset-xxl-1">
      <div class="row">
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4" v-for="(game, index) in games" :key="game.title">
          <GameCard :gameDefinition="game" />
        </div>
      </div>
    </div>
    <div class="col-6 col-xl-4 col-xxl-2 order-xxl-2 order-1 mb-5 mb-xxl-0 mx-auto card-game-plat">
      <div class="card">
        <div class="d-flex justify-content-between">
          <p class="p-gold">Filters</p>
          <p class="p-gold">Reset</p>
        </div>
        <label class="search-label">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#586E72" class="bi bi-search"
            viewBox="0 0 16 16">
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
          <input type="text" placeholder="Search games">
        </label>
        <select v-for="(gameOption, index) in optionGameSearch" :key="gameOption.title" class="form-select mt-3"
          aria-label="Default select example">
          <option selected>{{ gameOption.title }}</option>
          <option value="1">{{ gameOption.option1 }}</option>
          <option value="2">{{ gameOption.option2 }}</option>
          <option value="3">{{ gameOption.option3 }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GameCard from './GameCard.vue';
import { gameSummaryDefinitions } from '@/utils/mocks/GamePlatform';

const games = gameSummaryDefinitions;
</script>
<script lang="ts">

const optionGameSearch = [
  {
    title: 'Platform',
    option1: 'Option 1',
    option2: 'Option 2',
    option3: 'Option 3'
  },
  {
    title: 'Chain',
    option1: 'Arbitrum One',
    option2: 'Ethereum'
  },
  {
    title: 'Game Status',
    option1: 'Option 1',
    option2: 'Option 2',
    option3: 'Option 3'
  },
  {
    title: 'Genre',
    option1: 'Option 1',
    option2: 'Option 2',
    option3: 'Option 3'
  },
  {
    title: 'Player Support',
    option1: 'Option 1',
    option2: 'Option 2',
    option3: 'Option 3'
  },
  {
    title: 'Game mode',
    option1: 'Option 1',
    option2: 'Option 2',
    option3: 'Option 3'
  }
]


</script>

<style scoped lang="scss">
input {
  background-color: #143138;
  color: #586e72;
  width: 100%;
  border-radius: 6px;
  border: none;
  height: 40px;
  font-size: 14px;
}

.search-label {
  position: relative;
  display: flex;
  align-items: center;
}

.search-label svg {
  position: absolute;
  left: 20px;
}

.search-label input {
  padding-left: 50px;
}

.form-select {
  background-color: #143138;
  color: #AAB5B7;
  border: none;
  font-size: 14px;
}
</style>
