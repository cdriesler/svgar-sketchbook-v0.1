<template>
  <div class="home">
    <img width="300px" alt="svgar logo" src="../assets/svgar-logo.png">
    <br>
    site development in progress
    <br>
    logo in progress
    <br>
    everything in progress
    <br>
    <a href="https://github.com/WeWorkSandbox/svgar" target="_blank">svgar repo </a>
  </div>
</template>

<style>
.home {
  line-height: 25px;

  color: black;

  font-family: "Consolas", monospace
}

.home a {
  color: black;
}

.home a:hover {
  background: gainsboro;
}
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'home',
  components: {
    
  },
});
</script>
