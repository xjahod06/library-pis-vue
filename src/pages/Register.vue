<template>
  <div id="register">
    <NavBar></NavBar>
    <b-container>
      <div>
        <form @submit.prevent="submit" id="form-1">
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
          <p v-if="this.showError" style="font-color:red">This email address is already used. Please, select another email.</p>
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
      showError: false
    };
  },
  methods: {
    submit(){
        ApiConnect.post('/readers', JSON.stringify(this.form), ApiConnect.headers).then((response) => 
          {
            if (response.status == 200)
            {
              this.$router.push('/login');
              this.showError = false;
            }
            else
            {
              this.showError = true;
            }
          }
        ).catch(error => {
        console.log(error)
        this.showError = true;
      })
      }
  }
}
</script>

