<template>
    <di id="register_employee">
      <NavbarFinal></NavbarFinal>
        <b-container>
      <div id="register-box" class="mt-4 border border-primary p-5">
        <b-row>
          <b-col v-if="notRegistered">
            <h1 class="text-center">Register</h1>
          </b-col>
          <b-col v-else>
            <h1 class="text-center">Edit</h1>
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
                  {{ errMessage }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
              <b-col>
                  <b-form-group
                  id="input-group-5"
                  label="Role:"
                  label-for="role">
                      <b-dropdown id="role_dropdown" :text="selectedRole">
                          <b-dropdown-item-button @click="selectedRole = 'Employee'">Employee</b-dropdown-item-button>
                          <b-dropdown-item-button @click="selectedRole = 'Admin'">Admin</b-dropdown-item-button>
                      </b-dropdown>
                  </b-form-group>
              </b-col>
              <b-col>
              </b-col>
          </b-row>
          <hr>
          <b-row>
            <b-col>
              <b-form-group
                  id="input-group-6"
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
                  id="input-group-7"
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
                  id="input-group-8"
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
                  id="input-group-9"
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
                  id="input-group-10"
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
                  id="input-group-10"
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
                  Passwords are not the same.
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="text-center" v-if="notRegistered">
              <b-button @click="register" variant="primary">Register</b-button>
            </b-col>
            <b-col class="text-center" v-else>
              <b-button @click="submit" variant="primary">Submit</b-button>
            </b-col>
          </b-row>
        </b-form>
      </div>
    </b-container>
    </di>
</template>

<script>
import ApiConnect from "@/services/ApiConnect";
import NavbarFinal from "@/components/main_page/NavbarFinal";

export default {
  name: "RegisterEmployee",
  components: {
    NavbarFinal
  },
  computed: {
    notRegistered : function (){return this.$route.params.id == 0}
  },
  data() {
    return {
      employee: {},
      form: {
        id: 0,
        name: "",
        surname: "",
        email: "",
        city: "",
        street: "",
        houseNumber: "",
        postcode: "",
        role: "",
        password: "",
        fullname: ""
      },
      errMessage: "",
      selectedRole: "-"
    };
  },
  methods: {
    register(){
      if (this.form.password != this.form.confirmPassword){
        return;
      }
        ApiConnect.post('/employees', JSON.stringify(this.form), ApiConnect.headers).then((response) => 
          {
            this.$router.push('/login_employee');
          }
        ).catch(error => {
        if (error.response) {
          if (error.response.status == 400)
          {
            this.errMessage = "This email address is already in use. Please, select another email."
            this.$refs['email'].state = false;
            this.$refs['email'].value = "";
          }
          else
          {
            this.errMessage = "This email address is already in use. Please, select another email."  
          }
        }
      })
    },
    submit() {
      ApiConnect.put('/employees', JSON.stringify(this.form), ApiConnect.headers).then((response) =>
      {
        console.log(response);
        if (response.data)
        {
          if (response.data.status != 200)
          {
            this.errMessage = "Update of informations did not save corectly. Try again.";
          }
        }
      }
      ).catch((error) =>
      {
        this.errMessage = "Update of informations did not save. Try again.";
      })
    },
    getEmployee(){
      if (this.$route.params.id !== 0){
        ApiConnect.get('/employees/' + this.$route.params.id).then((response) =>
            {
              console.log(response);
              this.employee = response.data;
              this.form.id = this.employee.id;
              this.form.name = this.employee.name;
              this.form.surname = this.employee.surname;
              this.form.email = this.employee.email;
              this.form.city = this.employee.city;
              this.form.street = this.employee.street;
              this.form.houseNumber = this.employee.houseNumber;
              this.form.postcode = this.employee.postcode;
              this.form.role = this.employee.role;
              this.selectedRole = this.employee.role == "EMPLOYEE" ? "Employee" : "Admin";
              this.form.password = this.employee.password;
              this.form.fullname = this.employee.fullname;
            }
        ).catch((error) =>
        console.log(error))
      }
    },
    Employee(){
        this.form.role = "EMPLOYEE";
    },
    Admin(){
        this.form.role = "ADMIN";
    }
  },
  created(){
    this.getEmployee();
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