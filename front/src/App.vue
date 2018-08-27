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
 @font-face {
    font-family: Lato;
    src: url('https://fonts.googleapis.com/css?family=Lato:400,700,900'),
}
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
h3,h2,h1,h6 {
  margin: 0px;
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
* {
  font-weight: 400;
  font-family: 'Lato', sans-serif;
}
</style>
