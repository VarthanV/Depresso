<template>
  <v-app>
    <div id="title" style="text-align:left; margin-left:150px; padding:30px;">
      <h1>{{title}}</h1>
    </div>
    <hr style="border:none;">
    <div id="content" style="padding:20px; font-size:15px;  margin-left:160px;" v-html="content"></div>
    <div id="likesection" style="text-align:left; margin-left:150px;">
      <v-btn flat icon color="blue lighten-2" v-if="isliked">
        <v-icon>thumb_up</v-icon>
      </v-btn>
      <v-btn flat icon color="grey" v-else>
        <v-icon>thumb_up</v-icon>
      </v-btn>
      <span style="margin-left:0px;">{{likeCount}}</span>
    </div>
    <div id="comments" style="padding:30px;  margin-left:140px">
      <h3>Comments({{commentCount}})</h3>
      <br>
      <ckeditor :editor="editor" v-model="commentcontent" required></ckeditor>
      <div style="text-align:right">
        <v-btn class="info" raised @click="postComment">Post</v-btn>
      </div>

      <div id="comment-section" style="padding:30px;" v-for="comment in comments" :key="comment.id">
        <span>
          <v-avatar :size="50" color="grey lighten-4">
            <img
              src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
              alt="avatar"
            >
          </v-avatar>
          <span class="comment">{{comment.author}}</span>
        </span>
        <br>
        <p style="margin-left:50px; padding:20px;" v-html="comment.content"></p>
      </div>
    </div>
  </v-app>
</template>

<script>
import firebase, { firestore } from "firebase";
import { watch } from "fs";
import "moment-timezone";
import router from "@/router";
import moment from "moment";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import swal from "sweetalert";
export default {
  name: "MotivationDetail",
  data() {
    return {
      id: "",
      name: "",
      title: "",
      author: "",
      isliked:false,
      editor: ClassicEditor,
      content: "",

      commentcontent: "",
      comments: [],

      likes: []
    };
  },
  computed: {
    commentCount() {
      return this.comments.length;
    },
    likeCount(){
      return this.likes.length;
    }
  },
  beforeCreate(from, to, next) {
    var db = firebase.firestore();
    db.collection("motivations")
      .where("id", "==", this.$route.params.id)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          (this.title = doc.data().title), (this.content = doc.data().content)
         var temp=doc.data().likes
         temp.forEach(member =>{
           this.likes.push(member);
           console.log(this.likes);
           if (this.likes.includes(firebase.auth().currentUser.email)){
             this.isliked=true;
           }
         })

          
           
          db.collection("profile")
            .where("email", "==", doc.data().author)
            .get()
            .then(snapshot => {
              snapshot.forEach(data => {
                this.author = data.data().name;
                
              });
            });

          //Comments section
          db.collection("motivations")
            .doc(doc.id)
            .collection("comments").orderBy('created')
            .get()
            .then(snapshots => {
              
                snapshots.docs.forEach(data => {
                  db.collection("profile")
                    .where("email", "==", data.data().author)
                    .get()
                    .then(snapshot => {
                      snapshot.forEach(docs => {
                        var comm = {
                          id: data.data().id,
                          content: data.data().content,
                          author: docs.data().name
                          //: moment( new Date(docs.data().created *1000)).tz('Asia/Kolkata').format('MMMM Do YYYY, h:mm:ss a')
                        };
                        this.comments.push(comm);
                      });
                      
                    });
                })
            
            });
        });
      });
  },
  created() {
    this.id = this.$route.params.id;
    console.log(this.id);
  },
  methods: {

like(){
  if(firebase.auth().currentUser.email == undefined){
    swal("Please login to like")
    router.push('login/')
  }
  else{
    var user =firebase.auth().currentUser.email;
    if(user in likes){

    }
  }

},

    postComment() {
      if (!firebase.auth().currentUser) {
        swal("Please login to continue commenting");
        router.push("/login");
      } else {
        var name;
        var db = firebase.firestore();
        db.collection("profile")
          .where("email", "==", firebase.auth().currentUser.email)
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              var db = firebase.firestore();
              var commentsec = db
                .collection("motivations")
                .doc(this.id)
                .collection("comments");
              var comment = {
                id: "",
                content: this.commentcontent,
                author: firebase.auth().currentUser.email,
                created: firebase.firestore.FieldValue.serverTimestamp()
              };
              this.comments.push({
                content: this.commentcontent,
                author: doc.data().name
              });
              this.commentcontent = "";

              commentsec.add(comment).then(doc => {
                doc.update({ id: doc.id }).then(alert("Cool"));
              });
            });
          });
      }
    }
  },
  watch: {
    route: "fetchData"
  },

  fetchData() {
    var db = firebase.firestore();
    db.collection("motivations")
      .where("id", "==", this.$route.param.id)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          (this.title = doc.data().title), (this.content = doc.data().content);
          db.collection("profile")
            .where("email", "==", doc.data().email)
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                this.author = doc.data().name;
              });
            });
        });
      });
  }
};
</script>

<style>
#title {
  font-size: 20px;
}
hr {
  color: grey;
}
.ck-editor__editable {
  min-height: 100px;
}
.comment {
  font-weight: bold;
  margin-left: 20px;
}
</style>
