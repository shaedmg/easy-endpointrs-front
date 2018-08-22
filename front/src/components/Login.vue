<template>
  <div>
    <nav>
      <form action="">
        <h3>EasyEndPoints</h3>
        <input type="text" placeholder="Email..." id="email_field" v-model="email"/>
        <input type="password" placeholder="Password..." id="password_field" v-model="password"/>
        <label class="msg" v-if="this.state">{{ msg }}</label>
        <a @click="login()">Sign In</a>
      </form>  
    </nav>
  </div>
  
</template>

<script>
import axios from 'axios'

export default {
  name: 'login',
  data () {
    return {
      users: [],
      email: '',
      username: '',
      password: '',
      msg: '',
      state: false,
    }
  },
  methods: {
    login() {
      this.state = false;
      axios.get('http://localhost:4000/api/users').then(res =>{
      this.users = res.data
      const user = this.users.find(user => (user.email === this.email && user.password === this.password));
      if (user != undefined) {
        this.$router.push({ name: 'Resource', params: { username : user.username }});
      } else {
        this.msg = 'Email or Password Incorrect'
        this.state = true;
      }});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h3 {
  width: 100%;
  padding-bottom: 10px;
  margin: 0px;
  padding: 0px;
  margin-bottom: 20px;
}
label {
  width: 260px;
  display: flex;
  text-align: left;
  margin-top: 10px;
  font-size: 15px;
}
nav {
  width: 100%;
  height: 800px;
  /*IMPORTANTE*/
  display: flex;
  justify-content: center;
  align-items: center;
}
nav form {
  width: 300px;
  height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 0.3px solid #b5b5b5;
}
nav form input{
  height: 20px;
  width: 250px;
  padding: 10px;
  padding-left: 10px;
  border-radius: 2px;
  border: 0.3px solid #b5b5b5;
  font-size: 16px;
  color:#555;
}
nav form a {
  height: 20px;
  margin-top: 10px;
  border-radius: 3px;
  background-color:   #3276b1;
  width: 250px;
  border: 0px;
  color: white;
  padding: 10px;
  font-size: 18px;
}
label.msg {
  color: red;
  border: 1px solid red;
  display: flex;
  padding: 5px;
  background-color:  #fdedec;
  justify-content: center;
}
</style>
