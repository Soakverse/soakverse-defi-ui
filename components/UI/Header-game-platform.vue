<template>
  <div id="header">
    <div class="container-fluid">
      <div class="row h-100">
        <div class="col-12 d-flex">
          <div class="flex-nowrap">
            <div :class="{ 'label-open': isSidebarOpen }">
              <label class="search-label">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#586E72" class="bi bi-search"
                  viewBox="0 0 16 16">
                  <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
                <input type="text" placeholder="Search games or collections">
              </label>
            </div>
          </div>
          <div id="wallet-holder">
            <button class="btn me-2">Login</button>
            <button class="btn">Register</button>
            <!-- <Web3Wallet /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Breadcrumb from "./Breadcrumb.vue";
const { isSidebarOpen } = useUiState();
</script>

<style scoped lang="scss">
#wallet-holder {
  margin-left: auto;
}

.label-open {
  margin-left: 170px;
}

input {
  background-color: #143138;
  color: #586E72;
  width: 250px;
  border-radius: 6px;
  border: none;
  height: 40px;
  font-size: 14px;
}

#header {
  background-color: #041C21;
}

button {
  color: #AAB5B7;
  background-color: #143138;
  transition: all 0.4s;
  &:hover {
    color: #E1B67E;
    border: 1px solid #E1B67E;
    background-color: #0d2125;
  }
}

.search-label {
  position: relative;
  display: flex;
  align-items: center;
}

.search-label svg {
  position: absolute;
  left: 8px;
}

.search-label input {
  padding-left: 35px;
}
</style>
