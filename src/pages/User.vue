<template>
  <div id="app">
    <NavBar></NavBar>
    <b-container>
      <UserForm  :user="user"></UserForm>
      <div v-if="user.reservations != undefined">
        <div v-if="user.reservations.length != 0">
          <BookList type="Reservations"
                    :data="user.reservations"
                    :borrowing="false"
          ></BookList>
        </div>
      </div>

      <div v-if="user.hardCopyBorrowings != undefined">
        <div v-if="user.hardCopyBorrowings.length != 0">
          <BookList type="Borrowings"
                    :data="user.hardCopyBorrowings"
                    :borrowing="true"
          ></BookList>
        </div>
      </div>

      <div v-if="user.electronicCopyBorrowings != undefined ">
        <div v-if="user.electronicCopyBorrowings.length != 0">
          <BookList type="Electronic Borrowings"
                    :data="user.electronicCopyBorrowings"
                    :borrowing="true"
          ></BookList>
        </div>
      </div>

      <!--      <BookList type="Borrowings"  name="Harry Potter" date="2022-05-31" state="OK"></BookList>-->
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
      user: {},
      reservations: []
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
        this.reservations = this.user.reservations;
      })
    }
  },
  created() {
    this.getReader();
    console.log(this.user);
  }
}
</script>

<style>
  @import "../assets/styles/main.css";
  @import "../assets/styles/user.css";
</style>