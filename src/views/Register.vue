<template>
  <v-app>
      <v-container>
           <form>
                <v-text-field
        type="text"
      v-model="name"
      
      label="Name"
      required
      
    ></v-text-field>
  
    <v-text-field
        type="email"
      v-model="email"
      
      label="E-mail"
      required
      
    ></v-text-field>
      <v-text-field
      v-model="password"
        type="password"
    
      label="Password"
     require
    ></v-text-field>
   <div style="text-align:center">
        <v-btn @click="register" class="info">SUBMIT </v-btn>
   </div>

   
   
  </form>

      </v-container>

  
  </v-app>
</template>

<script>
import store from "@/store/index";
export default {
  name: "Register",
  data() {
    return {
        name:"",
      email: "",
      password: "",
      nameRules: [
          v => !!v || "Name is Required"],
      passwordRules: [
        v => !!v || "Enter a Valid Password",
        v =>
          v.length < 8 ||
          "Enter a Strong Password, It must greater than 8 Characters"
      ]
    };
  },
  methods: {
    register() {
      const user = {
        email: this.email,
        password: this.password,
        name:this.name
      };
      this.$store.dispatch("auth/signUp", user);
    }
  }
};
</script>

<style>
</style>
