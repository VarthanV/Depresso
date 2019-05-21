<template>
  <div style="padding:60px;" id="editor">
    <div id="title">
    <v-text-field
  
      v-model="title"
        type="text"
        style="font-size:30px;"
      label="Title"
     require
    ></v-text-field>
    </div>

    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" required :upload-adapter="uploadAdapter"></ckeditor>
    <div style="text-align:center; padding:20px;">
 
      <v-btn raised class="info" @click="create">Submit</v-btn>
    </div>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import firebase from "firebase";
import router from '@/router';
import { mapGetters } from "vuex";
import swal from 'sweetalert'
import store from "@/store/index";
export default {
  name: "MotivationCreate",
  created() {
  
  },

  data() {
    return {
      editor: ClassicEditor,
      editorData: "",
      title:"",
      
      editorConfig: {
        
        height: 100000,
       
      },
      uploadAdapter:function(loader){
        this.loader=loader;
        this.upload = () =>{
          const body=new FormData();
          body.append('file',this.loader.file)
          var storage=firebase.storage();
          storage.ref('images/' + body.name).put(body).then(img =>{
            img.ref.getDownloadURL().then(url =>{
              return{
                default:url
              }
            })
          })

        }
        this.abort = ()=>{
          console.log("Aborted")
        }


      }
    };
  },
  methods:{
    create(){
      if(this.title  == '' || this.editorData == ""){
        swal("Please enter data to proceed")
      }
    else{
      var db=firebase.firestore();
      db.collection('motivations').add({
        title:this.title,
        content:this.editorData,
        author:firebase.auth().currentUser.email,
        likes:[],
        comments:[],

        created:firebase.firestore.FieldValue.serverTimestamp()


      }).then(doc =>{
       doc.update({id:doc.id}).then(console.log("Mother Fucking Success "))
       router.push({name:'detail',params:{id:doc.id}})
       
        
      })
    }
    }
  }
};
</script>

<style scoped>
.ck-editor__editable {
  min-height: 1000px;
  
}
.ck-content { height:500px; }


</style>
