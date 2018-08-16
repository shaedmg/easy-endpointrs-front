<template>
  <div id="register">
    <form action="">
      <label>Name</label>
      <input type="text">
      <label>Email</label>
      <input type="text">
      <label>Username</label>
      <input type="text">
      <label>Password</label>
      <input type="password">
      <label>Confirm Password</label>
      <input type="password">
    </form>

  </div>
</template>

<script>
export default {
  name: 'register'
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
form {
  display:flex;
  flex-direction: column;
}
</style>
