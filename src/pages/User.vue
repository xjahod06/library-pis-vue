<template>
  <div id="app">
    <NavBar></NavBar>
    <b-container>
      <UserForm  :user="user"></UserForm>
      <BookList type="Reservations" name="Harry Potter" date="2022-05-31" state="OK"></BookList>
      <BookList type="Borrowings"  name="Harry Potter" date="2022-05-31" state="OK"></BookList>
    </b-container>

    <MyFooter></MyFooter>
  </div>
</template>

<script>
import NavBar from "@/components/main_page/NavBar";
import MyFooter from "@/components/main_page/MyFooter";
import BookList from "@/components/user_page/BookList";
import UserForm from "@/components/user_page/UserForm";
import ApiConnect from "@/services/ApiConnect";

export default {
  name: 'UserPage',
  components: {
    NavBar,
    MyFooter,
    BookList,
    UserForm
  },
  computed: {
    id() {
      return this.$route.params.id
    }

  },
  data(){
    return{
      user: {}
    }
  },
  methods: {
    getReader(){
      let id = this.$route.params.id;
      if (typeof(this.$route.params.id) == 'undefined'){
        id = ''
      }
      ApiConnect.get('readers/' + id).then((response)=> {
        this.user = response.data;
      })
      console.log(this.user);

    }
  },
  created() {
    this.getReader();
  }
}
</script>

<style>
  @import "../assets/styles/main.css";
  @import "../assets/styles/user.css";
</style>