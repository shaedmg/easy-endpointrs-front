<template>
  <div id="register">
    <nav>
      <form action="">
        <h3>EasyEndPoints</h3>
        <label>Name</label>
        <input type="text" placeholder="Name..." v-model="name">
        <label>Email</label>
        <input type="text" placeholder="Email..." v-model="email">
        <label>Username</label>
        <input type="text" placeholder="Username..." v-model="username">
        <label>Password</label>
        <input type="password" placeholder="Password..." v-model="password">
        <label>Confirm Password</label>
        <input type="password" placeholder="Confirm Password..." v-model="passwordConfirmed">
        <label class="msg" v-if="this.state">{{ msg }}</label>
        <a @click="createUser()">Register</a>
      </form>
    </nav>
    <div class="footer">

    </div>
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
      email: '',
      password: '',
      passwordConfirmed: '',
      msg: '',
      state: false,
      users: []
    }
  },
  methods: {
    createUser() {
      if(checkPasswordConfirmed(this.password, this.passwordConfirmed) && checkInputNotEmpty(this.password, this.username, this.name, this.passwordConfirmed, this.email)){
        if(!this.exists()){
          axios.post('http://localhost:4000/api/users', {
            name: this.name,
            username: this.username,
            email: this.email,
            password: this.password
          })
          .then((response) => {
            localStorage.setItem("token", response.data);
            axios.get(`http://localhost:5000/api/resources/newProject`, {headers: { Authorization: localStorage.token}})
            .then(()=>{
              if(response.data[0] != undefined){
                axios.get(`http://localhost:5000/api/resources/startAPI`, {headers: { Authorization: localStorage.token}}).then(res => {
                  this.$router.push({ name: 'Login'});
                })
              }else{
                for(let i = 0 ; i < response.data.length; i++){
                  this.msg = this.msg + data[i] + " "
                }
              }
            })
          });
        }else{
          this.msg = "Email or Username already exists"
        }
      }else {
        this.msg = "Any camp Empty or Invalid"
        this.state = true;
      }
    },
    exists(){
      axios.get('http://localhost:4000/api/users').then(res => this.users = res.data);
      const user = this.users.find(user => (user.email === this.email || user.username === this.username));
       if (user != undefined) {
        return true;
      } else {
        return false;
      }
    }
  }
}
function checkInputNotEmpty(password, username, name, passwordConfirmed, email) {
   if(name != '' && username != '' && email != '' && password != '' && passwordConfirmed != ''){
     return true;
   }else{
     return false;
   }
}
function checkPasswordConfirmed(password, passwordConfirmed) {
   if(password === passwordConfirmed){
     return true;
   }else{
     return false;
   }
}
</script>

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
  color: white;
}
label {
  width: 260px;
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
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  margin-top: 30px;
  border-radius: 3px;
  background-color:   #3276b1;
  width: 250px;
  border: 0px;
  color: white;
  padding: 10px;
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
