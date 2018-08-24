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
            <h1>EasyEndPoints</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Quos reiciendis eius totam voluptatum ad hic dolorem magnam, 
              eligendi debitis ipsum neque ipsa dicta explicabo similique animi? 
              Minima eum asperiores deserunt.
            </p>
            <a @click="login()">Try now for free</a>
          </li>
          <li class="rigth">
            <img src="../../build/logo.jpg" alt="">
          </li>
        </ul>
      </div>
      <div class="info">
        <ul>
          <li>
            <img src="https://png.icons8.com/color/1600/forgot-password.png" alt="">
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
            <p>instan owned API
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
.info {
  width: 100%;
  height: 300px;
  background-color: white;
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
  width: 200px;
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
  color: gray;
  text-align: inherit;
  height: 50px;
}
nav {
  background-color: #3276b1;
  height: 50px;
  width: 100%;
}
nav ul{
  width: 830px;
  margin: 0 auto;
}
nav spam{
  float: left;
  margin-left: 10px;
}
img.logo {
  width: 130px;
  height: 30px;
  margin-top: 10px;
}
nav li {
  width: 150px;
  height: 50px;
  display: flex;
  align-items: center;
  float: right;
}
nav li a {
    color: white;
    margin-left: 5px;
}
.header {
  width: 100%;
  height: 400px;
  background-color: white;
  display: flex;
  align-items: center;
  background-image: url('https://i.pinimg.com/originals/ab/18/36/ab1836654051b0500f4d708d83bcd35c.jpg')
}
.header ul {
  width: 830px;
  margin: 0 auto;
}
.header a {
  background-color:   #3276b1;
  width: 130px;
  padding: 10px;
  border-radius: 5px;
}
.header a:hover {
  background-color:#145a32;
}
.header p {
  width: 300px;
}
.header h1 {
  width: 300px;
  margin: 0px;
  text-align: left;
}
.header img {
  width: 500px;
  height: 250px;
  margin: 0px;
  border-radius: 5px;
  background-color: red;
}
.left {
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  float: left;
}
.rigth {
  width: 500px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  float: right;
  margin-left: 30px;
}
@media only screen and (max-width: 820px) {
  .left {
    display: none;
  }
  .rigth {
    margin: 5px;
    float: center;
  }
  .header ul {
  display: flex;
  justify-content: center;
  }
  nav ul{
  width: 100%;
  }
}
</style>
