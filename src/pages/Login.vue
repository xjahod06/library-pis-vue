<template>
  <div id="login">
    <NavBar></NavBar>
    
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import NavBar from "@/components/main_page/NavBar";
import MyFooter from "@/components/main_page/MyFooter" ;
import { mapActions } from "vuex";

export default {
  name: "Login",
  components: {
    NavBar,
    MyFooter
  },
  
}
</script>
