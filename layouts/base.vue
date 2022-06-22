<template>
  <div class="d-flex h-100">
    <Siderbar />
    <div id="main">
      <Header />
      <div id="main-content">
        <slot />
      </div>
    </div>
  </div>
</template>
