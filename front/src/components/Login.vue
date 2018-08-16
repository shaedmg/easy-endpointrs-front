<template>
  <div>
    <nav>
      <form action="">
        <h3>EasyEndPoints</h3>
        <label>Username</label>
        <input type="email" placeholder="Email..." id="email_field" v-model="email"/>
        <label>Password</label>
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
      user: '',
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
      axios.get('http://localhost:3333/api/users').then(res => this.users = res.data);
        this.user = this.users.find(user => (user.email === this.email && user.password === this.password));
      if (this.user != undefined) {
        this.$router.replace({ name: 'Resource', params: { username : this.user.username }});
      } else {
        this.msg = 'Username or Password Incorrect'
        this.state = true;
        console.log("no esta");
      }

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
  height: 1000px;
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
  width: 250px;
  height: 30px;
  padding-left: 10px;
  border-radius: 2px;
  border: 0.3px solid #b5b5b5;
}
nav form a {
  height: 20px;
  margin-top: 10px;
  border-radius: 3px;
  background-color:   #1e8449;
  width: 250px;
  border: 0px;
  color: white;
  padding: 5px;
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
