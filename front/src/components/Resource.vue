<template>
  <div class="resource">
    <nav>
      <ul>
        <li class="left">
          <img src="../../build/eep_horizontal.svg" @click="redirectToHome()">
          <input type="text" v-model="search" placeholder="Search Resources..." name="" id="" >
        </li>
        <li class="left menu">
          <a v-bind:href="urlDoc">View API doc</a>
          <a @click="downloadAPI()" :disabled="downloading" >Download API</a>
          <span class="msg-s" v-if="downloadgood">
            {{ downloadMsg }}
          </span>
          <span class="msg" v-if="downloadError">
            {{ downloadMsg }}
          </span>
        </li>
        <li class="rigth">
          <p>{{ this.username }}</p>
          <span class="menu-profile"> <a class="logout" @click="logOut()">Logout</a> </span>
        </li>
      </ul>
    </nav>
    <div class="content">
      <div class="resources-list">
        <h1>Your Resources</h1>
        <a @click="addResource ()" >Create Resource</a>
        <ul>
          <li v-for="resource in filterResource" :key="resource.id">
            <div>
              <span class="justify-left">
                <h2>/{{resource.name}}</h2>
              </span>
              <span>
                <ul v-if="resource.petitions !== undefined">
                  <li class="get" v-if="resource.petitions[0] !== undefined">{{resource.petitions[0]}}</li>
                  <li class="put" v-if="resource.petitions[1] !== undefined">{{resource.petitions[1]}}</li>
                  <li class="post" v-if="resource.petitions[2] !== undefined">{{resource.petitions[2]}}</li>
                  <li class="delete" v-if="resource.petitions[3] !== undefined">{{resource.petitions[3]}}</li>
                </ul>
              </span>
              <span class="justify-right">
                <a class="param" @click="editResource(resource)">Edit</a>
                <a class="red param" @click="deleteResource(resource)">Delete</a>
              </span>
            </div>
            <span class="url">{{resource.url}}</span>
          </li>
        </ul>
      </div>
      <div class="control-panel" v-if="open">
        <span>
          <h2>{{mode}}<span class="cerrar"><a @click="close()">x</a></span></h2>
        </span>
        <span class="name-box">
          <label>Resource Name:<input type="text" placeholder="Name..." v-model="resourceName" :disabled="this.mode === 'Edit Resource'"></label>
          <span class="url-c"><div class="email">{{ resourceUrl }}</div><div class="copy" @click="copy(resourceUrl)">{{copyText}}</div></span>
        </span>
        <span class="petitions-box">
          <label class="get">GET </label><input type="checkbox" v-model="get">
          <label class="put">PUT </label><input type="checkbox" v-model="put">
          <label class="post">POST</label><input type="checkbox" v-model="post">
          <label class="delete">DELETE</label><input type="checkbox" v-model="delte">
        </span>
        <fieldset>
        <legend>Add Param</legend>
        <span class="param-box">
          <label>Name: </label><input type="text" placeholder="Name..." v-model="nameOfParam">
          <label>Type: </label>
          <select v-model="type">
                <option value="String">String</option>
                <option value="Number">Number</option>
                <option value="Boolean">Boolean</option>
          </select>
          <span class="checkbox-box">
            <label>Required<input type="checkbox" v-model="required"></label>
            <label>Unique<input type="checkbox" v-model="unique"></label>
          </span>
          <a @click="addParam()">Add Param</a>
        </span>
        </fieldset>
        <span class="param-list-box">
          <span v-if="display">
            <h3>Resource Params</h3>
            <span class="titles">
              <label>Name</label><label>&nbsp;&nbsp;Type</label><label>&nbsp;&nbsp;Required</label><label>Unique</label>
            </span>
          </span>
          <ul>
            <li v-for="param in params" :key="param.name">
              <span>{{param.name}}</span>
              <span>{{param.type}}</span>
              <span>{{param.required}}</span>
              <span>{{param.unique}}</span>
              <a @click="deleteParam(param)" class="justify-right">Delete</a>
            </li>
          </ul>
        </span>
        <span class="finish-all-box">
          <a @click="createResource()">{{mode}}</a>
        </span>
        <span class="msgs" v-if="error || good">
          <label class="msg" v-if="error"> {{ msg }}</label>
          <label class="msg-s" v-if="good">{{ msg }}</label>
        </span>
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
      url: `http://${localStorage.ip}:5000/api/resources`,
      urlDoc: `http://${localStorage.ip}:9000/${this.username}/docs`,
      open: false,
      copyText : "Copy",
      display: false,
      get: true,
      put: true,
      post: true,
      delte:true,
      username: '',
      msg: '',
      downloadMsg: '',
      error: false,
      good: false,
      search: '',
      nameOfParam: '',
      type: 'String',
      downloadgood: false,
      downloadError: false,
      required: false,
      unique: false,
      tempResource: {},
      mode: 'Create Resource',
      autenticated : false,
      resources: [{name: "mesas", url: `http://${localStorage.ip}:9000/mesas`,petitions: []},{name: "mesas", url: `http://${localStorage.ip}:9000/mesas`,petitions: []}],
      params: [],
      tempResourceUrl: `http://${localStorage.ip}:9000`,
      resourceName:'',
      downloading: false
    }
  },
  created(){
    /*
    if(localStorage.token != undefined && localStorage.username === this.$route.params.username){
      **/
      this.username = this.$route.params.username;
      /*
      this.getResources()
    } else {
      this.$router.push({ name: 'Login'});
    }
    */
  },
  methods: {
    getResources(){
      axios.get(this.url, {headers: { Authorization: localStorage.token}}).then(res => this.resources = res.data);
    },
    getResourceUrl() {
      const resourceName = this.resourceName
      this.resourceUrl = `http://${localStorage.ip}:9000/` + resourceName
    },
    addParam() {
      if(this.nameOfParam != ''){
          if(this.params.length === 0){
            this.display = true;
          }
          this.params.push({
          name: this.nameOfParam,
          model: `{ ${[this.nameOfParam]}:{ type: ${this.type}, required: ${this.required}, unique: ${this.unique} } }`,
          type: this.type, 
          required: this.required,
          unique: this.unique
        });
        this.type = 'String';
        this.nameOfParam = '';
        this.unique = false;
        this.required = false;
      }else {
        this.error = true;
        this.msg = 'Params must have name';
        setTimeout( () => {
          this.error = false;
          this.msg = ''
        }, 5000)
      }
    },
    createResource(){
      if(this.mode === "Edit Resource"){
        if(this.tempResource.params.length !== this.params.length || this.tempResource.params.length === this.params.length){
          let petitions = []
          if(this.get === true){
            petitions.push("GET")
          }
          if(this.put === true){
            petitions.push("PUT")
          }
          if(this.post === true){
            petitions.push("POST")
          }
          if(this.delte === true){
            petitions.push("DELETE")
          }
          const resource = {
            url: this.resourceUrl,
            name: this.resourceName,
            params: this.params,
            petitions: petitions
          }
          axios.put(this.url+ '/' + this.resourceName, resource, {headers: { Authorization: localStorage.token}}).then(res => {
            this.good = true;
            this.msg = 'correctly edited Resource';
            setTimeout( () => {
              this.good = false;
              this.msg = ''
            }, 5000)
          }).catch(error => {
            this.msg = error.toString()
            this.error = true;
            setTimeout( () => {
              this.error = false;
              this.msg = ''
            }, 5000)
          })
        }
      }else{
        if(this.resourceName != '' && this.params.length != 0 ){
          this.getResourceUrl()
          let petitions = []
          if(this.get === true){
            petitions.push("GET")
          }
          if(this.put === true){
            petitions.push("PUT")
          }
          if(this.post === true){
            petitions.push("POST")
          }
          if(this.delte === true){
            petitions.push("DELETE")
          }
          const resource = {
            url: this.resourceUrl.toString(),
            name: this.resourceName.toString(),
            params: this.params.slice(),
            petitions: petitions
          }
          axios.post(this.url, resource, {headers: { Authorization: localStorage.token}}).then(
            res => {
              this.resources.push(resource)
              this.good = true;
              this.msg = 'correctly created Resource';
              setTimeout( () => {
                this.good = false;
                this.msg = ''
              }, 5000)
          })
          .catch(error => {
            this.resourceUrl = '';
            this.msg = error.toString()
            this.error = true;
            setTimeout( () => {
              this.error = false;
              this.msg = ''
            }, 5000)
          })
        }else{
          this.error = true;
          this.msg = 'Resource must have params and name can not be empty'
          setTimeout( () => {
              this.error = false;
              this.msg = ''
          }, 5000)
        }
      }
    },
    deleteResource(resource){
      if(confirm("Delete Resource [" + resource.name + "] ?")){
        const index = this.resources.indexOf(resource)
        axios.delete(this.url + '/' + resource.name, {headers: { Authorization: localStorage.token}})
        this.resources.splice(index, 1)
      }
    },
    deleteParam(param){
      if(confirm("Delete Param [ " + param.name + " ] ?")){
        const index = this.params.indexOf(param)
        this.params.splice(index, 1)
      }
      if(this.params.length === 0){
        this.display = false;
      }
    },
    editResource (resource){
      axios.get(this.url, {headers: { Authorization: localStorage.token}}).then(res => {
        this.open = true
        if(resource.params.length === 0){
          this.display = false;
        }
        if(resource.petitions.includes( 'GET' )){
          this.get = true;
        }else{
          this.get = false;
        }
        if(resource.petitions.includes( 'PUT' )){
          this.put = true;
        }else{
          this.put = false;
        }
        if(resource.petitions.includes( 'POST' )){
          this.post = true;
        }else{
          this.post = false;
        }
        if(resource.petitions.includes( 'DELETE' )){
          this.delte = true;
        }else{
          this.delte = false;
        }
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
      this.open = true;
      this.display = false;
      this.get = true;
      this.put = true;
      this.post = true;
      this.delte = true;
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
      if(this.downloading === false) {
        this.downloading = true;
        this.downloadgood = true;
        this.downloadMsg = "Downloading..."
        axios({
          url: `http://${localStorage.ip}:5000/api/resources/downloadAPI`,
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
            setTimeout( () => {
              this.downloadError = false;
              this.downloadgood = true;
              this.downloadMsg = "Downloaded Successfully"
              setTimeout( () => {
                this.downloadgood = false;
                this.downloading = false;
              }, 3000)
            }, 10000)
        }).catch( error => {
              this.downloadgood = false;
              this.downloadError = true;
              this.downloadMsg = "Network Error"
              setTimeout( () => {
                this.downloadError = false;
                this.downloading = false;
              }, 3000)
        });
      }
    },
    redirectToHome() {
      this.$router.push({ name: 'Home' });
    },
    close() {
      this.open = false
    },
    logOut(){
      window.localStorage.removeItem("token")
      window.localStorage.removeItem("ip")
      this.$router.push({ name: 'Login'});
    },
    copy(text) {
      var texto = document.querySelector('.email');
      var range = document.createRange();
      range.selectNode(texto);
      window.getSelection().addRange(range);
      document.execCommand(`copy`);
      window.getSelection().removeAllRanges();
      this.copyText = "Copied"
      setTimeout( () => {
        this.copyText = "Copy"
      }, 5000)
    }
  },
  computed: {
    filterResource: function() {
      return this.resources.filter(resource => {
          return resource.name.match(this.search)
        })
    },
    resourceUrl: function() {
      return this.tempResourceUrl + "/" + this.resourceName
    }
  }
}
</script>

<style scoped>
.content {
  width: 870px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: top;
}

/*   RESOURCE LIST   */
.resources-list{
  padding-top: 20px;
  width: 450px;
  display: flex;
  justify-content: left;
  align-items: left;
  flex-direction: column;
}

.resources-list h2 {
  font-size: 17px;
  color: #327952;
}

.resources-list h1 {
  color: black;
  font-size: 25px;
  margin-bottom: 5px;
}

.resources-list a {
  margin-top: 15px;
  width: 130px;
  padding: 10px;
  background-color:  #327952;
  border-radius: 3px;
}

.resources-list ul {
  width: 100%;
}

.resources-list ul li {
  width: 100%;
  height: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
  background-color: white;
  border: 0.5px solid #b5b5b5;
  position: relative;
}

.resources-list ul li div{
  width: 100%;
  height: 35px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.resources-list ul li span.url {
  width: 94%;
  height: 50px;
  display: flex;
  justify-content: left;
  align-items: center;
  color:#327952;
  font-size: 11px;
}
.resources-list a.param.red {
  background-color:  #e74c3c;
}

.resources-list a.param {
  margin-top: 0px;
  width: 50px;
  height: 30px;
  padding: 0px;
  background-color:  #34495e;
  border-radius: 3px;
  margin-left: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
}

.resources-list ul li span {
  width: 150px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.resources-list ul li span ul{
  display: flex;
  flex-direction: row;
}
.resources-list ul li span li{
  width: 51px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px;
  margin-left: 3px;
  background-color:   #27ae60;
  color: white;
  border: 0px;
  font-size: 13px;
}

.resources-list span.justify-left {
  width: 150px;
  justify-content: left;
  padding-left: 13px;
}

.resources-list span.justify-right {
  justify-content: right;
  padding-right: 5px;
}

/*   CONTROL PANEL  */
.control-panel {
  width: 400px;
  margin-top: 20px;
  margin-left: 10px;
  display: flex;
  justify-content: left;
  align-items: left;
  flex-direction: column;
  border: 1px solid #27ae60;
}
.control-panel span.cerrar{
  width: 175px;
  height: 29px;
  text-align: right;
}

.control-panel span.cerrar a{
  color: #27ae60;
}

.control-panel h2{
  width: 100%;
  margin-top: 10px;
  margin-bottom: 20px;
  color: black;
  font-size: 25px;
  display: flex;
  justify-content: left;
  align-items: center;
  padding-left: 13px;
}
.control-panel h3{
  margin-top: 10px;
  margin-bottom: 5px;
  display: flex;
  justify-content: left;
  align-items: center;
  padding-left: 17px;
  color:  #327952;
  font-weight: 600;
  font-size: 17px;
}
.control-panel label{
  font-weight: 600;
}
.name-box {
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  padding-left: 5px;
  color: #327952;
  font-size: 17px;
}
.name-box span.url-c{
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #327952;
  font-size: 17px;
}

.name-box div{
  width: 70%;
  height: 40px;
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color:  #327952;
  border-radius: 3px;
  background-color: #d5ffd7;
}
.name-box div.copy{
  width: 20%;
  height: 40px;
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color:  #327952;
  border-radius: 3px;
  background-color: white;
  margin-left: 5px;
  border: 1px solid #327952;
  cursor: pointer;
}
.name-box input{
  height: 30px;
  padding-left: 10px;
  margin-left: 10px;
  font-size: 15px;
  border: 0.5px solid #b5b5b5;
}
.petitions-box {
  display: flex;
  justify-content: left;
  align-items: center;
  padding-left: 0px;
  margin-top: 5px;
}
.petitions-box label{
  font-weight: 400;
  width: 70px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px;
  margin-left: 4px;
  color: #327952;
  border: 0px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 3px;
}

.petitions-box .post{
  color: #4070ec;
}

.petitions-box .put{
  color: #e5c500;
}

.petitions-box .get{
  color: green;
}

.petitions-box .delete{
  color: #ed0039;
}

.petitions-box label input{
  margin-left: 7px;
}

fieldset {
  padding: 0px;
  padding-top: 5px;
  width: 370px;
  margin-left: 15px;
  margin-top: 15px;
  border: 1px solid#27ae60;
}

fieldset legend{
  color:#327952;
  font-size: 17px;
  font-weight: 600;
  margin: 0px 5px 0px 5px;
}

.param-box {
  color: #327952;
  font-size: 15px;
  position: relative;
}
.param-box label{
  font-weight: 400;
}
.param-box input[type="text"]{
  height: 30px;
  padding-left: 10px;
  margin-left: 0px;
  font-size: 15px;
  border: 0.5px solid #b5b5b5;
}

.param-box select{
  height: 38px;
  margin-left: 0px;
  font-size: 15px;
  border: 0.5px solid #b5b5b5;
}

.param-box .checkbox-box{
  width: 180px;
  height: 50px;
  display: flex;
  flex-direction: row;
}

.param-box .checkbox-box label{
  display: flex;
  align-items: center;
  justify-content: left;
  padding-left: 17px;
  font-weight: 400;
}

.param-box a{
  width: 80px;
  padding: 5px;
  font-size: 12px;
  background-color:  #007c1b;
  position: absolute;
  top: 43px;
  left: 255px;
}

.param-list-box {
  margin-top: 10px;
  color:  #327952;
}
.param-list-box span{
  display: flex;
  flex-direction: column;
  justify-content: left;
}
.param-list-box span h3{
  font-size: 20px;
}
.param-list-box span.titles{
  display: flex;
  flex-direction: row;
  justify-content: left;
  margin-top: 5px
}
.param-list-box label{
  margin-left: 19px;
  font-weight: 600;
}

.param-list-box ul{
  width: 100%;
}

.param-list-box ul li{
  width: 96%;
  margin-left: 7px;
  height: 40px;
  margin-top: 5px;
  display: flex;
  justify-content: left;
  align-items: center;
  background-color: white;
  border-radius: 3px;
  border: 0.5px solid #b5b5b5;
  font-size: 15px;
}

.param-list-box ul li span{
  width: 65px;
  padding-left: 7px;
}

.param-list-box ul a{
  margin-top: 0px;
  width: 50px;
  height: 30px;
  padding: 0px;
  background-color:  #e74c3c ;
  border-radius: 3px;
  margin-left: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
}

.param-list-box ul li a.justify-right{
  float: right;
}

.finish-all-box {
  margin-top: 10px;
  padding-left: 0px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.finish-all-box a{
  width: 130px;
  padding: 10px;
  background-color:  #327952;
  border-radius: 3px;
  margin-left: 10px;
}

.msgs {
  width: 102%;
  margin-left: -3px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.msg {
  margin-top: 10px;
  width: 100%;
  background-color: #ffc6bf;
  border: 1px solid red;
  color: red;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 12px;
}

.msg-s {
  margin-top: 10px;
  background-color: rgb(200, 255, 200);
  border: 1px solid rgb(1, 185, 1);
  color: rgb(1, 194, 1);
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 5px;
  font-size: 12px;
}

/*  RESPONSIVE  */

@media (max-width: 500px) {
    .content{
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    .left input {
      display: none;
    }
    li.left {
      margin-left: 10px;
      width: 130px;
    }
    li.left.menu{
      display: none;
    }
    li.rigth{
      margin-right: 10px;
    }
}
@media (max-width: 900px) {
    .content{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .left input {
      display: none
    }
    li.left {
      margin-left: 10px;
      width: 130px;
    }
    li.left.menu{
      display: none;
    }
    li.rigth{
      margin-right: 10px;
    }
}

/*  BARRA SUPERIOR  */
nav ul{
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

nav {
  width: 100%;
  height: 60px;
  background-color:  #327952;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.rigth{
  width: 120px;
  height: 60px;
  display: flex;
  justify-content: right;
  align-items: center;
  position: relative;
}
.menu-profile{
  position: absolute;
  top: 20px;
  left: 110px;
  width: 100px;
  height: 30px;
  background-color: #327952;
}

.menu-profile .logout {
  background-color: #ed0039;
  padding: 5px 15px 5px 15px;
  border-radius: 20px;
}

.rigth img{
  width: 30px;
  height: 30px;
  background-color:  white ;
  margin-left: 15px;
  border-radius: 50px;
}
.rigth p{
  text-align: right;
  font-size: 12px;
}
.left {
  width: 400px;
  height: 60px;
  display: flex;
  justify-content: left;
  align-items: center;
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
.left img{
  width: 120px;
  height: 40px;
  cursor: pointer;
}
li.left.menu{
  margin-left: 10px;
  width: 450px;
}
li.left.menu a{
  margin-left: 10px;
}
.left.menu a:hover {
  -webkit-box-shadow: inset 0px 0px 94px -61px rgba(255,255,255,1);
  -moz-box-shadow: inset 0px 0px 94px -61px rgba(255,255,255,1);
  box-shadow: inset 0px 0px 94px -61px rgba(255,255,255,1);
}
.left a{
  width: 150px;
  height: 40px;
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
}
li.left.menu span.msg-s{
  margin-left: 10px;
  margin-top: 0px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(200, 255, 200);
  border: 1px solid rgb(1, 185, 1);
  color: rgb(1, 194, 1);
  border-radius: 3px;
  padding: 11px;
}

li.left.menu span.msg{
  margin-left: 10px;
  margin-top: 0px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffc6bf;
  border: 1px solid red;
  color: red;
  border-radius: 3px;
  padding: 11px;
}
</style>
