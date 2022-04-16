<template>
  <div id="register">
    <NavBar></NavBar>
    <b-container>
      <div>
        <form @submit.prevent="submit">
          <div>
            <label for="username">Username:</label>
            <input type="text" name="username" v-model="form.username">
          </div>
          <div>
            <label for="full_name">Full Name:</label>
            <input type="text" name="full_name" v-model="form.full_name">
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
  name: "Register",
  components: {
    NavBar,
    MyFooter
  },
  data() {
    return {
      form: {
        username: "",
        full_name: "",
        password: "",
      },
      showError: false
    };
  },
  methods: {
    ...mapActions(["Register"]),
    async submit() {
      try {
        let res = await this.Register(this.form);
        this.$router.push('/readers/:'+ res.data);
        console.log(res);
        this.showError = false;
      }
      catch(err) {
        this.showError = true;
      }
    }
  }
}
</script>