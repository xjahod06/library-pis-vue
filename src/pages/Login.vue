<template>
  <div id="login">
    <NavBar></NavBar>
    <b-container>
      <div>
        <form @submit.prevent="submit">
          <div>
            <label for="username">Username:</label>
            <input type="text" name="username" v-model="form.username">
          </div>
          <div>
            <label for="password">Password:</label>
            <input type="text" name="password" v-model="form.password">
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <p v-if="showError" id="error">Username already exists</p>
    </b-container>
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
  data() {
    return {
    form: {
      username: "",
      pasword: "",
    },
    showError: false
  };
  },
  methods: {
    ...mapActions(["Login"]),
    async submit() {
      const User = new FormData();
      User.append("username", this.form.username);
      User.append("password", this.form.password);
      try{
        let res = await this.LoIn(User);
        this.$router.push('/readers/:'+ res.data);
        console.log(res);
        this.showError = false;
      } 
      catch(err){
        this.showError = true;
      }
    }
  }
}
</script>
