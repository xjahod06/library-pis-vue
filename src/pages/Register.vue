<template>
  <div id="register">
    <NavbarFinal></NavbarFinal>
    <b-container>
      <div id="register-box" class="mt-4 border border-primary p-5">
        <b-row>
          <b-col>
            <h1 class="text-center">Register</h1>
          </b-col>
        </b-row>
        <b-form @submit.prevent="submit" id="form-1" novalidate>
          <b-row>
            <b-col>
              <b-form-group
                  id="input-group-1"
                  label="Name:"
                  label-for="fname"
              >
                <b-form-input
                    id="fname"
                    v-model="form.name"
                    type="text"
                    placeholder="Enter your name"
                    autocomplete="given-name"
                    required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                  id="input-group-2"
                  label="Surname:"
                  label-for="lname"
              >
                <b-form-input
                    id="lname"
                    v-model="form.surname"
                    type="text"
                    placeholder="Enter your surname"
                    autocomplete="family-name"
                    required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group
                  id="input-group-3"
                  label="Full name:"
                  label-for="name"
              >
                <b-form-input
                    id="name"
                    v-model="form.fullname"
                    type="text"
                    placeholder="Enter your full name"
                    autocomplete="name"
                    required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                  id="input-group-4"
                  label="Email:"
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
                <b-form-invalid-feedback>
                  This email address is already used. Please, select another email.
                </b-form-invalid-feedback>
              </b-form-group>

            </b-col>
          </b-row>
          <hr>
          <b-row>
            <b-col>
              <b-form-group
                  id="input-group-5"
                  label="City:"
                  label-for="city"
              >
                <b-form-input
                    id="city"
                    v-model="form.city"
                    type="text"
                    placeholder="Enter your city"
                    autocomplete="address-level2"
                    required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                  id="input-group-6"
                  label="Street:"
                  label-for="street"
              >
                <b-form-input
                    id="street"
                    v-model="form.street"
                    type="text"
                    placeholder="Enter your street"
                    required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group
                  id="input-group-7"
                  label="House number:"
                  label-for="houseNumber"
              >
                <b-form-input
                    id="houseNumber"
                    v-model="form.houseNumber"
                    type="number"
                    placeholder="Enter your house number"
                    required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                  id="input-group-8"
                  label="Post code:"
                  label-for="postcode"
              >
                <b-form-input
                    id="postcode"
                    v-model="form.postcode"
                    type="number"
                    placeholder="Enter your post code"
                    autocomplete="postal-code"
                    required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <hr>
          <b-row>
            <b-col>
              <b-form-group
                  id="input-group-9"
                  label="Password:"
                  label-for="password"
              >
                <b-form-input
                    id="password"
                    v-model="form.password"
                    type="password"
                    placeholder="Enter your password"
                    autocomplete="new-password"
                    required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                  id="input-group-9"
                  label="Confirm password:"
                  label-for="confirm-password"
              >
                <b-form-input
                    ref="confirm-password"
                    id="confirm-password"
                    v-model="form.confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    autocomplete="new-password"
                    required
                ></b-form-input>
                <b-form-invalid-feedback>
                  Passwords are not same.
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="text-center">
              <b-button @click="submit" variant="primary">Register</b-button>
            </b-col>
          </b-row>
          <p v-if="this.showError" style="font-color:red">This email address is already used. Please, select another email.</p>
          <b-row class="mt-3">
            <b-col class="text-center">
              Already have account? <router-link to="/login/">Login</router-link>
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
  name: "Register",
  components: {
    NavbarFinal,
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
      if (this.form.password != this.form.confirmPassword){
        return;
      }
        ApiConnect.post('/readers', JSON.stringify(this.form), ApiConnect.headers).then((response) => 
          {
            if (response.status == 200)
            {
              this.$router.push('/login');
              this.showError = false
            }
            else
            {
              this.showError = true
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
<style scoped>
#register-box{
  text-align: left;
  color: black;
  margin: auto;
  border-radius: 15px;
}
</style>

