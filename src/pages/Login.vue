<template>
  <div id="login">
    <NavBar></NavBar>
    <b-container>
      <div>
        <form @submit.prevent="submit">
          <div>
            <label for="email">Email:</label>
            <input type="text" name="email" v-model="form.email">
          </div>
          <div>
            <label for="password">Password:</label>
            <input type="text" name="password" v-model="form.password">
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <p v-if="showError" id="error">Uknown email.</p>
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
      email: "",
      pasword: "",
    },
    showError: false
  };
  },
  methods: {
    ...mapActions(["Login"]),
    async submit() {
      const User = new FormData();
      User.append("email", this.form.email);
      User.append("password", this.form.password);
      try{
        let res = await this.LogIn(User);
        this.$router.push('/');
        console.log(res);
        this.showError = false;
      } 
      catch(err){
        this.showError = true;
      }
    }
  },
  created() {
    this.submit();
  }
}
</script>
