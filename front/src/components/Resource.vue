<template>
  <div>
    <nav>
      <ul>
        <li class="left">
          <img src="../../build/logo.png" alt="">
          <input type="text" v-model="search" placeholder="Search Resources..." name="" id="" @keyup.enter="searchByName()">
        </li>
        <li class="rigth">
          <p>{{ this.username }}</p>
          <img src="" alt="">
        </li>
      </ul>
    </nav>
    <div class="content">
      <div class="options">
      <p>Add new Resource</p><a href="prueba.com">+</a>
      </div>
      <div class="resource-list">
        <ul>
          <li v-for="resource in resources" :key="resource.id">
            <h3>{{resource.name}}</h3><a class="a-right">Edit</a>
          </li>
        </ul>
      </div>
    </div>
  <div>
    <form action="">
        <h3>Create new Resource</h3>
        <label>Name:</label>
        <input type="text" placeholder="Name..." v-model="resourceName">
        <label>Which fields the model will have?</label>
        <input type="text" placeholder="Name..." v-model="nameOfParam">
        <select v-model="type">
          <option value="Integer">int</option>
          <option value="Float">float</option>
          <option value="String">string</option>
          <option value="Number">number</option>
        </select>
        <ul>
          <li v-for="param in params" :key="param.name">
            {{ param }}
          </li>
        </ul>
        <a @click="addParam()">Add Param</a>
        <a @click="createResource()">Create Resource</a>
        {{ resourceUrl }}
      </form>
  </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Resource',
  data () {
    return {
      url: '',
      username: '',
      search: '',
      nameOfParam: '',
      type: '',
      resources: [
        {
          id: 0,
          name: 'libros'
        },
        {
          id: 1,
          name: 'mesas'
        }
      ],
      params: [{
        name:'', 
        type:''
      }],
      resourceUrl:'',
      resourceName:'',
    }
  },
  created(){
    this.username = this.$route.params.username;
    getResourcesByUserName()
  },
  methods: {
    getResourcesByUserName(){
      axios.get(url + this.username).then(res => this.resources = res.data);
    },
    searchByName(){
      const resource = this.resources.find(resource => resource.name === this.search)
      this.resources = [ 
        resource
      ]
    },
    getResourceUrl() {
      axios.get(url).then(res => this.resourceUrl = res.data);
    },
    addParam() {
      this.params.push({name:this.nameOfParam,type: this.type});
      this.type = '';
      this.nameOfParam = '';
    },
    createResource(){
      const resource = {
        username: this.username,
        resource: {
          name: this.resourceName,
          params: this.params
        }
      };
      axios.post(this.url, resource)
    }
  }
}
</script>

<style scoped>
nav ul{
  width: 830px;
  margin: 0 auto;
}
nav {
  width: 100%;
  height: 60px;
  background-color: #e74c3c;
}
.rigth{
  float: right;
  width: 250px;
  height: 60px;
  margin-right: 20px;
  display: flex;
  justify-content: right;
  align-items: center;
}
.rigth img{
  width: 30px;
  height: 30px;
  background-color:  #f6ddcc ;
  margin-left: 15px;
  border-radius: 50px;
}
.rigth p{
  text-align: right;
  font-size: 12px;
}
.left {
  float: left;
  margin-left: 20px;
  width: 500px;
  height: 60px;
  display: flex;
  justify-content: left;
  align-items: center;
}
.left img{
  width: 130px;
  height: 30px;
}
.left input {
  width: 300px;
  height: 30px;
  padding: 0px;
  border-radius: 3px;
  border: 0.3px solid #b5b5b5;
  margin-left: 20px;
  padding-left: 20px;
}
.content {
  width: 100%;
}
.content div{
  width: 830px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
}
.options{
  padding-top: 10px;
}
.options a{
  width: 50px;
  height: 50px;
  background-color: #2e86c1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  font-size: 30px;
  margin-left: 10px;
}
.options p{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  text-justify: none;
  height: 50px;
  margin: 0px;
  padding: 0px;
  color: black;
  font-size: 11px;
  margin-left: 20px;
}
.resource-list{
  padding-top: 10px;
}
.resource-list ul{
  width: 100%;
}
.resource-list li{
  background-color: #e74c3c;
  width: 100%;
  height: 40px;
  border-radius: 3px;
  margin-top: 10px;
}

.resource-list li h3{
  width: 200px;
  height: 40px;
  margin: 0px;
  padding: 0px;
  margin-left: 20px;
  font-size: 13px;
  font-style: normal;
  color: white;
  float: left;
  display: flex;
  align-items: center;
}

.resource-list li a{
  width: 100px;
  height: 30px;
  margin-right: 20px;
  margin-left: 20px;
  margin-top: 5px;
  font-size: 13px;
  font-style: normal;
  color: white;
  background-color: #1e8449;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  float: right;
}
</style>
