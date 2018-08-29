<template>
  <div class="Login">
    <nav>
      <img src="../../build/eep_horizontal.svg" alt="" @click="redirectToHome()">
      <form action="">
        <label >Username</label>
        <input type="text" placeholder="Username..." id="email_field" v-model="username"/>
        <label >Password</label>
        <input type="password" placeholder="Password..." id="password_field" v-model="password"/>
        <label class="msg" v-if="this.state">{{ msg }}</label>
        <a @click="login()"  @keypress.enter="login()">Sign In</a>
      </form>  
    </nav>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
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
  created() {
    axios.get('http://localhost:4000/api/users').then(res =>{
     this.users = res.data
    });
  },
  methods: {
    async login() {
      await this.getToken();
      this.sendData();
    },
    getToken(){
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:4000/signin', {
            username: this.username,
            password: this.password
        }).then(function(res){
          localStorage.setItem("token", res.data);
          resolve();
        }).catch(res =>{
          this.state = true;
          this.msg = res.response.data
        });
      })
      
    },
    sendData() {
      localStorage.setItem("username", this.username);
      if(localStorage.token != undefined){
        this.$router.push({ name: 'Resource', params: { username : this.username }});
      }
    },
    redirectToHome() {
      this.$router.push({ name: 'Home' });
    }
  }
}
  function checkInputNotEmpty(password, username) {
    if(username != '' && password != '' ){
      return true;
    }else{
      return false;
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Login {
  background-color:  #327952;
}
body{
  background-color:  #327952 !important;
}
h3 {
  width: 100%;
  padding-bottom: 10px;
  margin: 0px;
  padding: 0px;
  margin-bottom: 20px;
  color: white;
}
label {
  width: 220px;
  display: flex;
  text-align: left;
  margin-top: 10px;
  font-size: 15px;
  color: white;
  font-weight: 700;
}
nav {
  width: 100%;
  height: 959px;
  /*IMPORTANTE*/
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
nav img{
  width: 200px;
  height: 150px;
  cursor: pointer;
}
nav form {
  width: 300px;
  height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
nav form input{
  height: 20px;
  width: 200px;
  padding: 10px;
  padding-left: 10px;
  border-radius: 2px;
  border: 0.3px solid #b5b5b5;
  font-size: 16px;
  color:#555;
  border-radius: 10px;
  margin-top: 10px;
}
nav form a {
  height: 20px;
  margin-top: 20px;
  border-radius: 3px;
  background-color:    #F7A500;
  font-weight: 700;
  width: 200px;
  border: 0px;
  color: white;
  padding: 10px;
  font-size: 15px;
  border-radius: 10px;
}
label.msg {
  color: red;
  border: 1px solid red;
  margin-top: 20px;
  display: flex;
  padding: 5px;
  background-color:  #fdedec;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
