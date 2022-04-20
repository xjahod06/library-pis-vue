<template>
  <div id="login">
    <NavbarFinal></NavbarFinal>
    <b-container>
      <div id="login-box" class="mt-4 border border-primary p-5">
        <b-row>
          <b-col>
            <h1 class="text-center">Log in</h1>
          </b-col>
        </b-row>
        <b-form @submit.prevent="submit" novalidate>
          <b-form-group
              id="email-label"
              label="Email address:"
              label-for="email"
          >
            <b-form-input
                ref="email"
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
                ref="password"
                id="password"
                type="password"
                v-model="form.password"
                placeholder="Enter password"
                autocomplete="current-password"
                required
            ></b-form-input>
            <b-form-invalid-feedback>
              {{errMessage}}
            </b-form-invalid-feedback>
          </b-form-group>
          <b-row>
            <b-col class="text-center">
              <b-button @click="submit" variant="primary">Login</b-button>
            </b-col>
          </b-row>
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
import MyFooter from "@/components/main_page/MyFooter" ;
import ApiConnect from "@/services/ApiConnect";
import NavbarFinal from "@/components/main_page/NavbarFinal";

export default {
  name: "Login",
  components: {
    NavbarFinal,
    MyFooter
  },
  data() {
    return {
    form: {
      email: "",
      password: "",
    },
    errMessage: ""
  };
  },
  methods: {
    submit(){
      if (localStorage.getItem('reader') != null)
      {
        this.errMessage = "Another user is already logged in.";
        return;
      }
      const data = {email: this.form.email, password: this.form.password};
      ApiConnect.post('/readers/authenticate', JSON.stringify(data), ApiConnect.headers).then((response) =>
        {
          if (response.status == 200) 
          {
            localStorage.setItem('id', JSON.stringify(response.data.id));
            localStorage.setItem('role', JSON.stringify(response.data.role));
            this.$router.push('/');
            return;
          }
          else
          {
            this.errMessage = "Incorect credentials. Try again.";
          }
        }
      ).catch(error => {
        console.log(error);
        this.errMessage = "Another error occured. We are sorry for complications."
        this.$refs['password'].state = false;
        this.$refs['password'].value = "";
        this.$refs['email'].state = false;
        this.$refs['email'].value = "";
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
