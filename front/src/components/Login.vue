<template>
  <div>
    <div>
      <input type="email" placeholder="Email..." id="email_field" v-model="email"/>
      <input type="password" placeholder="Password..." id="password_field" v-model="password"/>
      <button @click="login()">Login to Account</button>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios'

export default {
  name: 'login',
  data () {
    return {
      users: [],
      user: '',
      email: '',
      username: '',
      password: '',
      state: true,
    }
  },
  methods: {
    login() {
      axios.get('http://localhost:3333/api/users').then(res => this.users = res.data);
        this.user = this.users.find(user => (user.email === this.email && user.password === this.password));
      if (this.user != undefined) {
        this.$router.replace({ name: 'Resource', params: { username : this.user.username }});
      } else {
        console.log("no esta");
      }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
