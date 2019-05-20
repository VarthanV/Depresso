<template>
    
    <v-app>
        <v-container>
        <form>
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
        <v-btn @click="signIn" class="info">LOGIN </v-btn>
   </div>

   
   

        </form>  
        </v-container>
    </v-app>
</template>

<script>

import store from '@/store/index'
export default {
name:"SignIn",
data(){
    return{
        email:null,
        password:null
    }
},
methods:{

    signIn(){
        var user={
            email:this.email,
            password:this.password
        }
        this.$store.dispatch('auth/signIn',user)
    }

}


}
</script>

<style>

</style>
