import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import store from '@/store/index'
import CKEditor from '@ckeditor/ckeditor5-vue';

Vue.config.productionTip = false
var firebaseConfig = {
  apiKey: "AIzaSyA1M3saO_LYmGvBH9rifrQOfogYteakBtA",
  authDomain: "depresso-82055.firebaseapp.com",
  databaseURL: "https://depresso-82055.firebaseio.com",
  projectId: "depresso-82055",
  storageBucket: "depresso-82055.appspot.com",
  messagingSenderId: "639074486682",
  appId: "1:639074486682:web:a7d3a8f20f32ef62"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
Vue.use(CKEditor);
new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          store.commit('auth/setUser',user)
           
            // update data or vuex state
        } else {
            store.commit('auth/removeUser')
        }
    });
},
beforeCreated(){
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      store.commit('auth/setUser',user)
       
        // update data or vuex state
    } else {
        store.commit('auth/removeUser')
    }
});

},
created(){
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      store.commit('auth/setUser',user)
       
        // update data or vuex state
    } else {
        store.commit('auth/removeUser')
    }
});

}
}).$mount('#app')
