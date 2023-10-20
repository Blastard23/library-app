<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <HomePage msg="Welcome to Your Vue.js App"/>
  <router-view></router-view>
</template>

<script>
import HomePage from './components/HomePage.vue'

export default {
  name: 'App',
  components: {
    HomePage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: white;
  /* margin-top: 60px; */
  padding: 0;
  margin: 0;
}

body {
  background: #ffff;
  padding: 0;
  margin: 0;
}
</style>