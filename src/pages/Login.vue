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
          <p v-if="this.errShow">{{this.errMessage}}</p>
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
