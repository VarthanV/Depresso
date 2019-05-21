<template>
  <v-app>
    <v-content>
      <v-toolbar color="purple" dark>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>Depresso</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat @click="signin" v-if="!isLoggedIn">SignIn</v-btn>
          <v-btn flat @click="register" v-if="!isLoggedIn">Register</v-btn>
          <v-btn flat v-if="isLoggedIn" @click="motivation">CREATE MOTIVATION</v-btn>
          <v-btn flat v-if="isLoggedIn" @click="logout()">Logout</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import router from "@/router";
export default {
  name: "App",
  components: {},
  data() {
    return {
      //
    };
  },
  computed: {
    ...mapGetters("auth/", ["isLoggedIn"])
  },

  methods: {
    register() {
      this.$router.push("/register");
    },
    signin() {
      this.$router.push("/signin");
    },
    motivation() {
      
        router.push("/create");
    
    },
    ...mapActions("auth/", ["logout"])
  }
};
</script>
