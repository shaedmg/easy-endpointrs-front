<template>
  <div>
    <nav>
      <ul>
        <li class="left">
          <img src="../../build/logo.png" alt="">
          <input type="text" v-model="search" placeholder="Search Resources..." name="" id="" >
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
          <p><a class="add-resource" @click="addResource ()"> Add New Resource </a></p>
          <li v-for="resource in filterResource" :key="resource.id">
            <h3>{{resource.name}}</h3><a @click="editResource (resource)">Edit</a><a class="" @click="deleteResource(resource)">Delete</a>
          </li>
        </ul>
        <div class="edit-add-content">
        <form action="">
          <h3>{{mode}}</h3>
          <p>
            <label>Resource Name:</label>
            <input type="text" placeholder="Name..." v-model="resourceName">
          </p>
          <p>
            <input type="text" placeholder="Name..." v-model="nameOfParam">
            <select v-model="type">
                <option value="Integer">int</option>
                <option value="Float">float</option>
                <option value="String">string</option>
                <option value="Number">number</option>
            </select>
            <a @click="addParam()">Add Param</a>
          </p>
        </form>
        <p>
          <ul>
            <li v-for="param in params" :key="param.name">
              <p>name:{{ param.name }} type: {{ param.type }}</p><a @click="deleteParam(param)">x</a>
            </li>
          </ul>
        </p>
        <p>
        <a @click="createResource()">{{mode}}</a>
        <span>{{ resourceUrl }}</span>
        </p>
        <label class="msg" v-if="error">{{ msg }}</label>
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
      msg: '',
      error: false,
      search: '',
      nameOfParam: '',
      type: '',
      tempResource: {},
      mode: 'Create Resource',
      autenticated : false,
      resources: [{
        name: 'culo',
        url: 'ffifesifgiuegfyegifug',
        params: [
          {
            name: 'tu',
            type: 'culo'
          }
        ]
      }],
      params: [],
      resourceUrl:'',
      resourceName:'',
    }
  },
  created(){
    this.username = this.$route.params.username;
    this.getResources()
  },
  methods: {
    getResources(){
      axios.get(this.url).then(res => this.resources = res.data);
    },
    getResourceUrl() {
      const resourceName = this.resourceName
      this.resourceUrl = 'http://localhost:5000/'+'api/' + resourceName
    },
    addParam() {
      this.params.push({name:this.nameOfParam,type: this.type});
      this.type = '';
      this.nameOfParam = '';
    },
    createResource(){
      if(this.mode === "Edit Resource"){
        console.log(this.tempResource.params)
        if(this.tempResource.name != this.resourceName || this.tempResource != this.params){
          const index = this.resources.indexOf(this.tempResource)
          console.log(`haciendo put`)
          axios.put(this.url, this.resources[index]).then(res => {
          this.resources[index] = res.data;
        }).catch(error => {
          this.msg = error.toString()
          this.error = true;
        })
        }
      }else{
        if(this.name != '' || !this.params.isEmpty()){
          this.getResourceUrl()
          const resource = {
            url: this.resourceUrl,
            name: this.resourceName,
            params: this.params
          }
          axios.post(this.url, resource).then(
            res => {
              this.resources.push(resource)
            })
          .catch(error => {
            this.msg = error.toString()
            this.error = true;
          })
        }
      }
    },
    deleteResource(resource){
      const index = this.resources.indexOf(resource)
      this.resources.splice(index, 1)
      axios.delete(this.url + '/' + resource.name)
    },
    deleteParam(param){
        const index = this.params.indexOf(param)
        this.params.splice(index, 1)
    },
    editResource (resource){
      this.tempResource = Object.assign({}, resource)
      this.tempResource.params = resource.params.slice()
      this.resourceUrl = resource.url.toString();
      this.resourceName = resource.name.toString();
      this.params = resource.params.slice();
      this.mode = 'Edit Resource' 
    },
    addResource (){
      this.tempResource = {};
      this.resourceUrl = '';
      this.resourceName = '';
      this.params = [];
      this.mode = 'Create Resource' 
    }
  },
  computed: {
    filterResource: function() {
      return this.resources.filter(resource => {
          return resource.name.match(this.search)
        })
    }
  }
}
</script>

<style scoped>
label.msg {
  width: 100%;
  color: red;
  border: 1px solid red;
  display: flex;
  padding: 5px;
  background-color:  #fdedec;
  justify-content: center;
}
.add-resource{
  padding: 10px;
  background-color:   #3276b1;
  border-radius: 3px;
  text-align: center;
}
label{
  width: 130px;
  text-align: left;
  color: #3276b1;
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
  width: 280px;
  height: 50px;
  border: 1px solid #b5b5b5;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  float: left;
  color: #3276b1;
}
.edit-add-content p a{
  width: 130px;
  height: 20px;
  padding: 10px;
  background-color:   #3276b1;
  border-radius: 3px;
  text-align: center;
  margin: 10px;
}
.edit-add-content ul li a{
  width: 20px;
  height: 20px;
  padding: 5px;
  background-color:   red;
  border-radius: 3px;
  text-align: center;
  float: right;
  margin: 0px;
  margin-right: 5px;
}
.edit-add-content p {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  color: #3276b1;
}
.edit-add-content form a{
  padding: 10px;
  background-color:   #3276b1;
  border-radius: 3px;
}
.edit-add-content form{
  width: 100%;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: left;
  padding-left: 20px;
}
.edit-add-content ul{
  width: 100%;
  margin: 0px;
}
.edit-add-content li{
  width: 100px;
  height: 30px;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  margin-left: 10px;
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
