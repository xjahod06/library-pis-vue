<template>
  <div id="app">
    <NavBar></NavBar>
    <b-container>
      <UserForm></UserForm>
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

export default {
  name: 'UserPage',
  components: {
    NavBar,
    MyFooter,
    BookList,
    UserForm
  }
}
</script>

<style>
  @import "../assets/styles/main.css";
  @import "../assets/styles/user.css";
</style>