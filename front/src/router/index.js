import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Home from '@/components/Home'
import Resource from '@/components/Resource'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/resource/:username',
      name: 'Resource',
      component: Resource,
    }
  ]
})
