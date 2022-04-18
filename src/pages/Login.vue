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
          <button @click="submit">Submit</button>
        </form>
      </div>
    </b-container>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import NavBar from "@/components/main_page/NavBar";
import MyFooter from "@/components/main_page/MyFooter" ;
import ApiConnect from "@/services/ApiConnect";

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
      password: "",
    }
  };
  },
  methods: {
    submit(){
      const data = {email: this.form.email, password: this.form.password};
      console.log(data);
      ApiConnect.post('/readers/authenticate', JSON.stringify(data), ApiConnect.headers).then((response) =>
        console.log(response.data),
      ).catch(error => {
        console.log(error)
      })
      }
  }
}
</script>
