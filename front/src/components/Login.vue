<template>
  <div>
    <div class="main-div">
      <input type="email" placeholder="Email..." id="email_field" />
      <input type="password" placeholder="Password..." id="password_field" />
      <button onclick="login()">Login to Account</button>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'login',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
