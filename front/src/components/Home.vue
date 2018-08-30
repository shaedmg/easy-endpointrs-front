<template>
  <div class="home">
      <nav>
        <ul>
          <span>
            <img class="logo" src="../../build/eep_horizontal.svg" alt="">
          </span>
          <li>
            <a @click="login()">Sign In /</a>
            <a @click="register()">Register</a>
          </li>
        </ul>
      </nav>
      <div class="header">
        <ul>
          <li class="left">        
            <h1>&nbsp;EasyEndPoint</h1>
            <p>
              EasyEndPoint is the world’s largest <s>resources automation platform.</s><br>
              It’s like a <s>second brain</s> that helps millions of customers —from small e-<br>
              commerce shops to big online retailers— find their audience, engage <br>
              their customers, and build their brand.
            </p>
            <a @click="register()">Try now for free</a>
          </li>
           <li class="left">        
            <img src="../../build/_____20180321091957.png" alt="">
          </li>
        </ul>
      </div>
      <div class="info">
        <ul>
          <li class="none">
            <img src="../../build/noun_User Experience_885484.svg" alt="">
            <p>Easy login and access
            </p>
          </li>
          <li>
            <img src="../../build/noun_interaction_885478.svg" alt="">
            <p>Create Resources in Seconds
            </p>
          </li>
          <li>
            <img src="../../build/noun_Wireframe_885485.svg" alt="">
            <p>instant owned API
            </p>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  created(){
    if(localStorage.token != undefined){
      this.$router.push({ name: 'Resource', params: { username : localStorage.username }})
    }
  },
  methods: {
    login(){
      this.$router.push({ name: 'Login'});
    },
    register(){
      this.$router.push({ name: 'Register'});
    }
  }
}
</script>
<style scoped>
.home {
  height: 100%;
}
.info {
  width: 100%;
  height: 359px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  margin-top: 50px;
}
.info ul {
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.info li {
  width: 220px;
  height: 200px;
  margin-left: 95px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.info li.none {
  margin-left: 0px;
}
.info li img{
  width: 100px;
  height: 100px;
}
.info li p{
  color: #262626;
  text-align: inherit;
  height: 50px;
  margin-bottom: 0px;
}
nav {
  height: 100px;
  width: 100%;
  margin-bottom: 50px;
  background-color: #327952;
}
nav ul{
  width: 100%;
  margin: 0 auto;
}
nav span{
  float: left;
  margin-left: 10px;
}
img.logo {
  width: 150px;
  height: 100px;
  margin-left: 40px;
  cursor: pointer;
}
nav li {
  width: 150px;
  height: 50px;
  display: flex;
  align-items: center;
  float: right;
  margin-right: 40px;
}
nav li a {
    color: white;
    margin-left: 5px;
    margin-top: 30px;
}
.header {
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  background-color: #327952;
}
.header ul {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #327952;
}
.header a {
  background-color:   #F7A500;
  width: 200px;
  padding: 0px;
  padding-top: 7px;
  padding-bottom: 7px;
  border-radius: 7px;
  font-size: 17px;
  font-weight: 700;
  margin-top: 50px;
}
.header a:hover {
  background-color:#F7A500;
}
.header p {
  width: 600px;
  font-size: 17px;
  margin-top: 30px;
}
.header p s{
  margin: 0px;
  padding: 0px;
  width: 0px;
  height: 0px;
  text-decoration:none;
  color:#F7A500;
}
.header h1 {
  width: 603px;
  margin: 0px;
  text-align: left;
  font-size: 40px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header img {
  width: 400px;
  height: 350px;
  margin: 0px;
  border-radius: 5px;
}
.header li {
  display: flex;
  justify-content: center;
  align-items: center;
}
.left {
  width: 600px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
@media only screen and (max-width: 820px) {
  nav ul{
    width: 100%;
  }
}
</style>
