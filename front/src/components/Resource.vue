<template>
  <div class="resource">
    <nav>
      <ul>
        <li class="left">
          <img src="../../build/logo1.png" alt="">
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
            <input type="text" placeholder="Name..." v-model="resourceName" :disabled="this.mode === 'Edit Resource'">
          </p>
          <p>
            <input type="text" placeholder="Name..." v-model="nameOfParam">
            <select v-model="type">
                <option value="String">String</option>
                <option value="Number">Number</option>
                <option value="Boolean">Boolean</option>
            </select>
            <a @click="addParam()">Add Param</a>
          </p>
          <p class="separation">
            <input class="checkbox" type="checkbox" v-model="required">
            <label class="checkbox">required</label>
            <input class="checkbox" type="checkbox" v-model="unique">
            <label class="checkbox">unique</label>
          </p>
        </form>
        <p></p>
        <p>
          <ul>
            <li v-for="param in params" :key="param.name">
              <p class="param-options">Name : {{ param.name }} Type : {{param.type}}</p><h6>{{param.required}}</h6> <h6 class="lila">{{param.unique}}</h6> <a @click="deleteParam(param)">x</a>
            </li>
          </ul>
        </p>
        <p>
        <a @click="createResource()">{{mode}}</a>
        <span>{{ resourceUrl }}</span>
        </p>
        <p><span @click="downloadAPI()"> Descargar API </span></p>
        <label class="msg" v-if="error">{{ msg }}</label>
        <label class="msg-s" v-if="good">{{ msg }}</label>
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
      url: 'http://localhost:5000/api/resources',
      username: '',
      msg: '',
      error: false,
      good: false,
      search: '',
      nameOfParam: '',
      type: '',
      required: false,
      unique: false,
      tempResource: {},
      mode: 'Create Resource',
      autenticated : false,
      resources: [],
      params: [],
      resourceUrl:'',
      resourceName:'',
    }
  },
  created(){
    if(localStorage.token != undefined && localStorage.username === this.$route.params.username){
      this.username = this.$route.params.username;
      this.getResources()
    } else {
      this.$router.push({ name: 'Login'});
    }
  },
  methods: {
    getResources(){
      axios.get(this.url, {headers: { Authorization: localStorage.token}}).then(res => this.resources = res.data);
    },
    getResourceUrl() {
      const resourceName = this.resourceName
      this.resourceUrl = 'http://localhost:9000/'+ resourceName
    },
    addParam() {
      if(this.nameOfParam != '' && this.type != ''){
          this.params.push({
          name: this.nameOfParam,
          model: `{ ${[this.nameOfParam]}:{ type: ${this.type}, required: ${this.required}, unique: ${this.unique} } }`,
          type: this.type, 
          required: this.required,
          unique: this.unique
        });
        this.type = '';
        this.nameOfParam = '';
        this.unique = false;
        this.required = false;
      }
    },
    createResource(){
      if(this.mode === "Edit Resource"){
        if(this.tempResource.params.length != this.params.length){
          const resource = {
            url: this.resourceUrl,
            name: this.resourceName,
            params: this.params
          }
          axios.put(this.url+ '/' + this.resourceName, resource, {headers: { Authorization: localStorage.token}}).then(res => {
            this.good = true;
            this.msg = 'Recurso editado correctamente';
            this.error = false;
          }).catch(error => {
            this.good = false;
            this.msg = error.toString()
            this.error = true;
          })
        }
      }else{
        if(this.resourceName != '' && this.params.length != 0 ){
          this.getResourceUrl()
          const resource = {
            url: this.resourceUrl.toString(),
            name: this.resourceName.toString(),
            params: this.params.slice()
          }
          axios.post(this.url, resource, {headers: { Authorization: localStorage.token}}).then(
            res => {
              this.resources.push(resource)
              this.good = true;
              this.msg = 'Recurso creado correctamente';
              this.error = false;
          })
          .catch(error => {
            this.resourceUrl = '';
            this.good = false;
            this.msg = error.toString()
            this.error = true;
          })
        }else{
          this.good = false;
          this.error = true;
          this.msg = 'Resource must have params and name can not be empty'
        }
      }
    },
    deleteResource(resource){
      const index = this.resources.indexOf(resource)
      axios.delete(this.url + '/' + resource.name, {headers: { Authorization: localStorage.token}})
      this.resources.splice(index, 1)
    },
    deleteParam(param){
        const index = this.params.indexOf(param)
        this.params.splice(index, 1)
    },
    editResource (resource){
      axios.get(this.url, {headers: { Authorization: localStorage.token}}).then(res => {
        this.resources = res.data
        this.msg = '';
        this.good = false;
        this.error = false;
        this.tempResource = Object.assign({}, resource)
        this.tempResource.params = resource.params.slice()
        this.resourceUrl = resource.url.toString();
        this.resourceName = resource.name.toString();
        this.params = resource.params;
        this.mode = 'Edit Resource'
      })
    },
    addResource (){
      this.msg = '';
      this.good = false;
      this.error = false;
      this.tempResource = {};
      this.resourceUrl = '';
      this.resourceName = '';
      this.params = [];
      this.mode = 'Create Resource' 
    },
    downloadAPI() {
      axios({
        url: 'http://localhost:5000/api/resources/downloadAPI',
        method: 'GET',
        responseType: 'blob', // important
        headers: { Authorization: localStorage.token}
      }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'API.tar.gz'); //or any other extension
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link)
          this.good = true;
          this.msg = 'downloaded successfully'
      }).catch( error => {
          this.good = false;
          this.error = true;
          this.msg = error
      });
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
h6 {
  background-color: #31B404;
  width: 30px;
  height: 20px;
  padding: 5px 9px 5px 9px;
  border-radius: 3px;
  margin: 0px;
  margin-right: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
h6.lila{
 background-color: #B404AE
}
.content .resource-list p.separation{
  margin-top: 0px;
}
label.msg {
  width: 100%;
  color: red;
  border: 1px solid red;
  display: flex;
  padding: 5px;
  background-color:  #fdedec;
  justify-content: center;
}
label.msg-s {
  width: 100%;
  color: rgb(2, 122, 2);
  border: 1px solid green;
  display: flex;
  padding: 5px;
  background-color:  #62ff9e;
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
  width: 100%;
  margin: 0 auto;
}
nav {
  width: 100%;
  height: 60px;
  background-color: #3276b1;
}
.rigth{
  float: right;
  width: 100px;
  height: 60px;
  margin-right: 80px;
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
  margin-left: 80px;
  width: 500px;
  height: 60px;
  display: flex;
  justify-content: left;
  align-items: center;
}
.left img{
  width: 150px;
  height: 40px;
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
  width: 35px;
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
.edit-add-content p.param-options {
  display: flex;
  justify-content: left;
  align-items: left;
}
.edit-add-content form a{
  padding: 10px;
  background-color:   #3276b1;
  border-radius: 3px;
}
.edit-add-content form{
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: left;
  padding-left: 20px;
}
.edit-add-content form .checkbox{
  width: 60px;
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
