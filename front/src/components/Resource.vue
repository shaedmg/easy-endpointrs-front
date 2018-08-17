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
      <div class="resource-list">
        <ul>
          <h2>Your Resources</h2>
          <li v-for="resource in resources" :key="resource.id">
            <h3>{{resource.name}}</h3><a class="">Edit</a><a class="">Delete</a>
          </li>
        </ul>
        <div class="edit-add-content">
        <form action="">
          <h3>Create new Resource</h3>
          <label>Name:</label>
          <input type="text" placeholder="Name..." v-model="resourceName">
          <label>New Param</label>
          <input type="text" placeholder="Name..." v-model="nameOfParam">
          <select v-model="type">
              <option value="Integer">int</option>
              <option value="Float">float</option>
              <option value="String">string</option>
              <option value="Number">number</option>
          </select>
          <a @click="addParam()">Add Param</a>
        </form>
        <ul>
          <li v-for="param in params" :key="param.name">
            <h3>{{ param.name }}</h3>
          </li>
        </ul>
        <a @click="createResource()">Create Resource</a>
        <span>{{ resourceUrl }}</span>
      </div>
      </div>
    </div>
  
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Resource',
  data () {
    return {
      url: 'http://localhost:4000/api/resources',
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
        name:'hola', 
        type:''
      }],
      resourceUrl:'http://localhost:4000/api/resources',
      resourceName:'',
    }
  },
  created(){
    this.username = this.$route.params.username;
    //  this.getResourcesByUserName()
  },
  methods: {
    getResourcesByUserName(){
      // axios.get(this.url + this.username).then(res => this.resources = res.data);
    },
    searchByName(){
      const resource = this.resources.find(resource => resource.name === this.search)
      this.resources = [ 
        resource
      ]
    },
    getResourceUrl() {
      // añadir cuando el back devuelva una url
      // axios.get(this.url).then(res => this.resourceUrl = res.data);
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
label{
  width: 200px;
  text-align: left;
}
nav ul{
  width: 830px;
  margin: 0 auto;
}
nav {
  width: 100%;
  height: 60px;
  background-color: #3276b1;
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
/**************************************/
.content {
  width: 100%;
}
.content div{
  margin: 0 auto;
}
.options{
  padding-top: 10px;
  width: 830px;
}
.edit-add-content {
  float: right;
  width: 430px;
  height: 450px;
}
.edit-add-content span{
  float: right;
  width: 280px;
  height: 50px;
  border: 1px solid #b5b5b5;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
}
.edit-add-content a{
  width: 100px;
  padding: 10px;
  background-color:   #3276b1;
  border-radius: 3px;
}
.edit-add-content form a{
  padding: 10px;
  background-color:   #3276b1;
  border-radius: 3px;
}
.edit-add-content form{
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: left;
  padding-left: 20px;
}
.edit-add-content ul{
  width: 300px;
  margin: 10px;
}
.edit-add-content li{
  width: 100px;
  height: 30px;
  margin: 5px;
}
.edit-add-content li h3{
  widows: 10px;
  height: 30px;
}
.edit-add-content form input{
  height: 19px;
  width: 180px;
  padding: 10px;
  padding-left: 10px;
  border-radius: 2px;
  border: 0.3px solid #b5b5b5;
  font-size: 16px;
  color:#555;
}
.edit-add-content form select{
  height: 40px;
  width: 90px;
  border-radius: 2px;
  border: 0.3px solid #b5b5b5;
  font-size: 16px;
  color:#555;
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
  width: 900px;
}
.resource-list ul{
  width: 440px;
  float: left;
}
.resource-list li{
  background-color: white;
  width: 440px;
  height: 40px;
  border-radius: 3px;
  margin-top: 10px;  
  border: 0.3px solid #b5b5b5;
}

.resource-list li h3{
  width: 200px;
  height: 40px;
  margin: 0px;
  padding: 0px;
  margin-left: 20px;
  font-size: 13px;
  font-style: normal;
  color: #3276b1;
  float: left;
  display: flex;
  align-items: center;
}

.resource-list li a{
  width: 50px;
  height: 30px;
  margin-right: 6px;
  margin-top: 6px;
  font-size: 13px;
  font-style: normal;
  color: white;
  background-color: #3276b1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  float: right;
}
</style>
