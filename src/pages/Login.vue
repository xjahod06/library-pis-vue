<template>
  <div id="login">
    <NavBar></NavBar>
    <b-container>
      <div id="login-box" class="mt-4 border border-primary p-5">
        <b-row>
          <b-col>
            <h1 class="text-center">Log in</h1>
          </b-col>
        </b-row>
        <b-form @submit.prevent="submit">
          <b-form-group
              id="email-label"
              label="Email address:"
              label-for="email"
          >
            <b-form-input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="Enter email"
                autocomplete="email"
                required
            ></b-form-input>
          </b-form-group>

          <b-form-group
              id="password-label"
              label="Your Name:"
              label-for="password"
          >
            <b-form-input
                id="password"
                type="password"
                v-model="form.password"
                placeholder="Enter password"
                autocomplete="current-password"
                required
            ></b-form-input>
          </b-form-group>
          <b-row>
            <b-col class="text-center">
              <b-button @click="submit" variant="primary">Login</b-button>
            </b-col>
          </b-row>
          <p v-if="this.errShow">{{this.errMessage}}</p>
          <b-row class="mt-3">
            <b-col class="text-center">
              Don't have account? <router-link to="/register/">Register</router-link>
            </b-col>
          </b-row>
        </b-form>
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
    },
    errShow: false,
    errMessage: ""
  };
  },
  methods: {
    submit(){
      if (localStorage.getItem('reader') != null)
      {
        this.errShow = true;
        this.errMessage = "Another user is already logged in.";
        return;
      }
      const data = {email: this.form.email, password: this.form.password};
      ApiConnect.post('/readers/authenticate', JSON.stringify(data), ApiConnect.headers).then((response) =>
        {
          if (response.status == 200) 
          {
            localStorage.setItem('reader', JSON.stringify(response.data.id));
            console.log(response);
            this.$router.push('/');
            return;
          }
          else
          {
            this.errShow = true;
            this.errMessage = "Incorect credentials. Try again.";
            this.$forceUpdate();
          }
        }
      ).catch(error => {
        console.log(error)
      })
      }
  }
}
</script>

<style scoped>
#login-box{
  text-align: left;
  color: black;
  max-width: 500px;
  margin: auto;
  border-radius: 15px;
}
</style>
