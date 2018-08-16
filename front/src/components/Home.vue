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
      this.$router.replace({ name: 'Login'});
    },
    register(){
      this.$router.replace({ name: 'Register'});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
nav {
  background-color: #e74c3c;
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
  background-color: #e74c3c;
  display: flex;
  align-items: center;
}
.header ul {
  width: 830px;
  margin: 0 auto;
}
.header a {
  background-color:   #1e8449;
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
