<template>
  <div class="home">
      <nav>
        <ul>
          <spam>
            <img class="logo" src="../../build/logo.png" alt="">
          </spam>
          <li>
            <a @click="login()">Sign In /</a>
            <a @click="register()">Register</a>
          </li>
        </ul>
      </nav>
      <div class="header">
        <ul>
          <li class="left">        
            <h1>EasyEndPoint</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Quos reiciendis eius totam 
            </p>
            <a @click="register()">Try now for free</a>
          </li>
        </ul>
      </div>
      <div class="info">
        <ul>
          <li>
            <img src="https://www.freeiconspng.com/uploads/login-key-icon-lock-locked-login-15.png" alt="">
            <p>Easy login and access
            </p>
          </li>
          <li>
            <img src="https://www.health-opportunities.org.uk/wp-content/uploads/2016/03/resources-icon.png" alt="">
            <p>Create Resources in Seconds
            </p>
          </li>
          <li>
            <img src="http://cdn.onlinewebfonts.com/svg/img_178343.png" alt="">
            <p>instant owned API
            </p>
          </li>
        </ul>
      </div>
      <div class="footer">

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
  background-image: url('../../build/fondo.png');
  width: 100%;
  height: 900px;
}
.info {
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
}
.info ul {
  width: 1000px;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.info li {
  width: 240px;
  height: 100%;
  margin: 40px;
  margin-top:10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.info li img{
  width: 100px;
  height: 100px;
}
.info li p{
  color: white;
  text-align: inherit;
  height: 50px;
}
nav {
  height: 50px;
  width: 100%;
  padding-top: 30px;
}
nav ul{
  width: 100%;
  margin: 0 auto;
}
nav spam{
  float: left;
  margin-left: 10px;
}
img.logo {
  width: 150px;
  height: 40px;
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
  background-color:   #3276b1;
  width: 140px;
  padding: 20px;
  border-radius: 5px;
  font-size: 20px;
  -webkit-box-shadow: 0px 4px 6px 0px rgba(0,0,0,0.41);
-moz-box-shadow: 0px 4px 6px 0px rgba(0,0,0,0.41);
box-shadow: 0px 4px 6px 0px rgba(0,0,0,0.41);
}
.header a:hover {
  background-color:#084B8A;
}
.header p {
  width: 500px;
  font-size: 20px;
}
.header h1 {
  width: 300px;
  margin: 0px;
  text-align: left;
  font-size: 100px;
}
.header img {
  width: 500px;
  height: 250px;
  margin: 0px;
  border-radius: 5px;
  background-color: red;
  display: none;
}
.left {
  width: 720px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
}
@media only screen and (max-width: 820px) {
  nav ul{
    width: 100%;
  }
}
</style>
