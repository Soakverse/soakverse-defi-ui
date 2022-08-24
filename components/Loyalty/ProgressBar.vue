<template>
  <div class="progress">
    <div
      class="progress-bar"
      :style="{ width: (value / maxValue) * 100 + '%' }"
      role="progressbar"
      :aria-valuenow="value"
      aria-valuemin="0"
      :aria-valuemax="maxValue"
    ></div>
    <div class="progress-bar-title">{{ label }} {{ value }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    required: true,
    type: String,
  },
  value: {
    type: Number,
  },
  maxValue: {
    type: Number,
  },
});
</script>

<style>
.progress-bar-title {
  position: absolute;
  text-align: center;
  line-height: 30px; /* line-height should be equal to bar height */
  overflow: hidden;
  color: white;
  right: 0;
  left: 0;
  top: 0;
}

.progress-bar {
  background: #e1b77e;
}

.progress {
  position: relative;
  color: white;
  font-weight: 500;
  font-size: 18px;
  height: 30px;
  padding: 0px;
  background-color: #06262d;
}
</style>
