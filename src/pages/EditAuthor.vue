<template>
  <div>
    <NavBar></NavBar>
    <AuthorTile img="@/assets/logo.png"
                :name = this.author.name
                :surname = this.author.surname></AuthorTile>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import NavBar from "@/components/main_page/NavBar";
import MyFooter from "@/components/main_page/MyFooter";
import ApiConnect from "@/services/ApiConnect";
import AuthorTile from "@/components/genre_page/AuthorTile";
export default {
  name: "EditAuthor.vue",
  components: {AuthorTile, MyFooter, NavBar},

  data() {
    return {
      author : {}
    }
  },

  methods : {
    getAuthor() {
      ApiConnect.get('authors/' + this.$route.params.id).then((response) =>
          {
            this.author = response.data;
          }
      )},
  },

  created() {
    this.getAuthor();
  }
}
</script>

<style scoped>

</style>