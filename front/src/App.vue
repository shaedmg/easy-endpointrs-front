<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
ul {
  list-style: none;
  margin: 0px;
  padding: 0px;
}
a {
  color: white;
  cursor: pointer;
  text-decoration: none;
}
p {
  text-align: justify;
  color: white
}
h1 {
  color: white
}
button{
  color: white;
  cursor: pointer;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
body {
  margin: 0px;
}
</style>
