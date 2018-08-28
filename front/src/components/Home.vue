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
            <h1>&nbsp;EasyEndPoint<br>export your life</h1>
            <p>
              EasyEndPoint is the world’s largest resources automation platform.<br>
              It’s like a second brainthat helps millions of customers—from small e-<br>
              commerce shops to big online retailers—find their audience, engage <br>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer {
  background-color: black;
  height: 59px;
  margin-top: 120px;
}
.home {
  background-color:#327952;
  width: 100%;
}
.info {
  width: 100%;
  height: 290px;
  display: flex;
  align-items: center;
  background-color: white;
}
.info ul {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.info li {
  width: 200px;
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
}
nav {
  height: 50px;
  width: 100%;
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
}
.header ul {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  width: 500px;
  font-size: 15px;
  margin-top: 30px;
  display: flex;
  justify-content:center;
  align-items: center;
}
.header p span {
  float: none;
  margin: 0px;
  padding: 0px;
  width: 0px;
  height: 0px;
  color:#F7A500;
}
.header h1 {
  width: 600px;
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
