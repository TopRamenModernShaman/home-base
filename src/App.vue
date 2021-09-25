<template>
  <div id="nav" :style="{ backgroundImage: 'url(' + require('@/assets/paintBG.png') + ')' }">
    <router-link to="/"> Home </router-link> |
    <router-link to="/SeanSucks"> SeanSucks </router-link> |
    <router-link to="/mtg"> MTG </router-link>
  </div>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

body, html {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
}
body {
  background-color: gray;
}

.bfont{
  color: rgb(30, 123, 185);
}
</style>