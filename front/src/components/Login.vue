<template>
  <div>
    <nav>
      <form action="">
        <h3>EasyEndPoints</h3>
        <label >Email</label>
        <input type="text" placeholder="Email..." id="email_field" v-model="username"/>
        <label >Password</label>
        <input type="password" placeholder="Password..." id="password_field" v-model="password"/>
        <label class="msg" v-if="this.state">{{ msg }}</label>
        <a @click="login()">Sign In</a>
      </form>  
    </nav>
    <div class="footer">

    </div>
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
          console.log(res.data);
          localStorage.setItem("token", res.data);
          resolve();
        });
      })
      
    },
    sendData() {
      localStorage.setItem("username", this.username);
      if(localStorage.token != undefined){
        this.$router.push({ name: 'Resource', params: { username : this.username }});
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer {
  background-color: black;
  height: 59px;
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
  width: 270px;
  display: flex;
  text-align: left;
  margin-top: 10px;
  font-size: 15px;
  color: white;
}
nav {
  width: 100%;
  height: 900px;
  /*IMPORTANTE*/
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../../build/fondo.png');
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
  margin-top: 20px;
  border-radius: 3px;
  background-color:   #3276b1;
  width: 250px;
  border: 0px;
  color: white;
  padding: 10px;
  font-size: 18px;
  -webkit-box-shadow: 0px 4px 6px 0px rgba(0,0,0,0.41);
  -moz-box-shadow: 0px 4px 6px 0px rgba(0,0,0,0.41);
  box-shadow: 0px 4px 6px 0px rgba(0,0,0,0.41);
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
