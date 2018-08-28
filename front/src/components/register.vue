<template>
  <div id="register">
    <nav>
      <img src="../../build/eep_horizontal.svg" alt="" @click="redirectToHome()">
      <form action="">
        <span>
          <label>Name</label>
          <input type="text" placeholder="Name..." v-model="name">
          <label>Email</label>
          <input type="text" placeholder="Email..." v-model="email">
          <label>Username</label>
          <input type="text" placeholder="Username..." v-model="username">
        </span>
        <span>
          <label>Password</label>
          <input type="password" placeholder="Password..." v-model="password">
          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm Password..." v-model="passwordConfirmed" @keyup="createUser()">
          <a @click="createUser()">Register</a>
        </span>
      </form>
      <label class="msg" v-if="state">{{ msg }}</label>
      <label class="msg-s" v-if="good">{{ msg }}</label>
    </nav>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Register',
  data(){
    return {
      name: '',
      username: '',
      email: '',
      password: '',
      passwordConfirmed: '',
      msg: '',
      state: false,
      good: false,
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
            this.state = false;
            this.good = true;
            this.msg = "Created Successfully"
            localStorage.setItem("token", response.data);
            axios.get(`http://localhost:5000/api/resources/newProject`, {headers: { Authorization: localStorage.token}})
            .then(()=>{
                this.state = false;
                this.good = true;
                this.msg = "redirecting... :)"
                axios.get(`http://localhost:5000/api/resources/startAPI`, {headers: { Authorization: localStorage.token}}).then(res => {
                  this.$router.push({ name: 'Login'});
                }).catch(res => {
                  this.good = false;
                  this.state = true
                  this.msg = "Network Error"
                  setTimeout( () => {
                    this.state = false;
                  }, 3000)
                })
            })
          }).catch(response => {
            this.state = true
            this.msg = response.response.data[0]
            setTimeout( () => {
              this.state = false;
            }, 3000)
          })
        }else{
          this.state = true;
          this.msg = "Email or Username already exists"
          setTimeout( () => {
            this.state = false;
          }, 3000)
        }
      }else {
        this.state = true;
        this.msg = "Any camp Empty or Invalid"
        setTimeout( () => {
          this.state = false;
        }, 3000)
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
    },
    redirectToHome() {
      this.$router.push({ name: 'Home' });
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
html,body {
  height: 100%;
  background-color:  #327952;
  margin: 0px;
}
label.msg-s {
  width: 100%;
  color: rgb(2, 122, 2);
  border: 1px solid green;
  display: flex;
  padding: 5px;
  background-color:  #62ff9e;
  justify-content: center;
}
h3 {
  width: 100%;
  padding-bottom: 10px;
  margin: 0px;
  padding: 0px;
  color: white;
}
label {
  width: 210px;
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
  background-color:  #327952;
}
nav img{
  width: 200px;
  height: 150px;
  cursor: pointer;
}
nav form {
  width: 600px;
  height: 220px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
nav form span{
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 220px;
}
nav form input{
  width: 200px;
  height: 30px;
  padding-left: 10px;
  border-radius: 10px;
  border: 0.3px solid #b5b5b5;
  margin-top: 10px;
}
nav form a {
  height: 20px;
  margin-top: 30px;
  border-radius: 10px;
  background-color:    #F7A500;
  width: 200px;
  border: 0px;
  color: white;
  padding: 10px;
  font-size: 15px;
  font-weight: 700;
}
label.msg {
  color: red;
  border: 1px solid red;
  width: 500px;
  display: flex;
  padding: 5px;
  background-color:  #fdedec;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 5px;
  font-size: 12px;
  margin-top: 10px;
}

label.msg-s {
  width: 500px;
  margin-top: 10px;
  background-color: rgb(200, 255, 200);
  border: 1px solid rgb(1, 185, 1);
  color: rgb(1, 194, 1);
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 5px;
  font-size: 12px;
}

</style>
