<template>
  <div id="register">
    <form action="">
      <label>Name</label>
      <input type="text" v-model="name">
      <label>Email</label>
      <input type="text" v-model="email">
      <label>Username</label>
      <input type="text" v-model="username">
      <label>Password</label>
      <input type="password">
      <label>Confirm Password</label>
      <input type="password">
      <button @click="createUser()">Login to Account</button>
    </form>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'register',
  data(){
    return {
      name: '',
      username: '',
      email: ''
    }
  },
  methods: {
    createUser() {
      axios.post('http://localhost:3333/api/users', {
        username: this.username,
        name: this.name,
        email: this.email
      });
    }
  }
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
