<template>
  <div id="register">
    <NavBar></NavBar>
    <b-container>
      <div>
        <form @submit.prevent="submit">
          <div>
            <label for="name">Name:</label>
            <input type="text" name="name" v-model="form.name">
          </div>
          <div>
            <label for="surname">Surname:</label>
            <input type="text" name="surname" v-model="form.surname">
          </div>
          <div>
            <label for="fullname">Full Name:</label>
            <input type="text" name="fullname" v-model="form.fullname">
          </div>
          <div>
            <label for="email">Email:</label>
            <input type="text" name="email" v-model="form.email">
          </div>
          <div>
            <label for="city">City:</label>
            <input type="text" name="city" v-model="form.city">
          </div>
          <div>
            <label for="street">Street:</label>
            <input type="text" name="street" v-model="form.street">
          </div>
          <div>
            <label for="houseNumber">House Number:</label>
            <input type="text" name="houseNumber" v-model="form.houseNumber">
          </div>
          <div>
            <label for="postcode">Post Code:</label>
            <input type="text" name="postcode" v-model="form.postcode">
          </div>
          <div>
            <label for="password">Password:</label>
            <input type="text" name="password" v-model="form.password">
          </div>
          <button @click="submit">Submit</button>
        </form>
      </div>
      <p v-if="showError" id="error">{{ errData }}</p>
    </b-container>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import NavBar from "@/components/main_page/NavBar";
import MyFooter from "@/components/main_page/MyFooter" ;
import { mapActions } from "vuex";
import ApiConnect from "@/services/ApiConnect";

export default {
  name: "Register",
  components: {
    NavBar,
    MyFooter
  },
  data() {
    return {
      form: {
        id: 0,
        name: "",
        surname: "",
        email: "",
        city: "",
        street: "",
        houseNumber: "",
        postcode: "",
        role: "reader",
        password: "",
        fullname: ""
      },
      showError: false,
      errData: null
    };
  },
  methods: {
    ...mapActions(["Register"]),
    async submit() {
      try {
        await this.Register(this.form);
        this.$router.push('/');
        this.showError = false;
      }
      catch(err) {
        this.showError = true;
        errData = err.data;
      }
    },
  },
  created() {
    this.submit();
  }
}
</script>