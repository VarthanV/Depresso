import * as firebase from "firebase";
import router from "@/router";
import swal from "sweetalert";
const state = {
  user: null,
  isLoggedIn: false,
 
};
const mutations = {
  setUser(state, loggedInUser) {
    state.user = loggedInUser;
    state.isLoggedIn = true;

  },
  removeUser() {
    state.user = null;
    state.isLoggedIn = false;
  }
};

const actions = {
  signUp({ commit }, payload) {
    //Payload receiving  From v-model
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        if (user.user.emailVerified == false) {
          user.user
            .sendEmailVerification()
            .then(swal("Success", "Please confirm Your email address to login"))
            
            var setuser={
                email:payload.email,
                name:payload.name,
                id:user.user.uid

            }
            var db=firebase.firestore();
        db.collection('profile').add(setuser).then(doc =>{
            console.log(doc.id);
        })

          router.push("/");
        }
      });
  },
signIn({commit},payload){
    
    firebase.auth().signInWithEmailAndPassword(payload.email,payload.password).then(user =>{
        var user={
            email:user.user.email,
            id:user.user.uid,


        }
        commit('setUser',user)
    }).then(user =>{
        swal("Welcome ")
        
        router.push('/')
    }).catch(err => alert(err))
},
logout({commit}){
    firebase.auth().signOut().then(() =>{
        commit('setUser',null)
        swal("Thank you for spending time and releasing your Depressed thoughts and motivating others")
        router.push('/')
    })
}

 
};
const getters={
    user(state){
        return state.user
    },
    isLoggedIn(state){
        return state.isLoggedIn
    }
    
}
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
