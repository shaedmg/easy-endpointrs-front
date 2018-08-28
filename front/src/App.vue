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
    font-family: LatoMontserrat;
    src: url('https://fonts.googleapis.com/css?family=Montserrat:400,600,700,900'),
}
body,html {
  margin: 0px;
  padding: 0px;
  max-height: 959px;
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
* {
  font-weight: 400;
  font-family: 'Montserrat', sans-serif;
}
</style>
