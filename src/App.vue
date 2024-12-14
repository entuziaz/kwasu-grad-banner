
<script>
import HelloWorld from './components/HelloWorld.vue'
import { Analytics } from '@vercel/analytics/vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    Analytics
  }
}
</script>

<template>
  <Analytics /> <!-- Vercel Analytics -->
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Get your graduation banner photo here!"/>
</template>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

img {
  height: 14%;
  width: 14%;
}
</style>
