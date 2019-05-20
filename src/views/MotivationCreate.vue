<template>
  <div style="padding:50px;">
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
    <div style="text-align:center; padding:20px;">
      <v-btn flat>Submit</v-btn>
    </div>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import firebase from "firebase";
import { mapGetters } from "vuex";
import store from "@/store/index";
export default {
  name: "MotivationCreate",
  created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push("login/");
    }
  },

  data() {
    return {
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        height: 1000
      }
    };
  }
};
</script>

<style>
.ck-editor__editable {
  min-height: 500px;
}
</style>
