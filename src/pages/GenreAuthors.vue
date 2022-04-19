<template>
  <div>
    <NavbarFinal></NavbarFinal>
    <b-container>
      <h1>Authors:</h1>
      <b-row>
        <AuthorTile v-for="author in authors"
                    img="@/assets/logo.png"
                    :name = author.name
                    :surname = author.surname
                    :id = author.id
                    :date-of-birth = author.dateOfBirth
        >

        </AuthorTile>
      </b-row>
    </b-container>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import MyFooter from "@/components/main_page/MyFooter";
import AuthorTile from "@/components/genre_page/AuthorTile";
import ApiConnect from "@/services/ApiConnect";
import NavbarFinal from "@/components/main_page/NavbarFinal";

export default {
  name: "GenreAuthors",
  components: {AuthorTile, MyFooter, NavbarFinal},
  data(){
    return {
      books: [],
      genre_name: [],
      authors: [],
    }
  },

  methods: {
    getBooks(name){
      let params = {params:{"genres": name}};
      ApiConnect.get('books/',params).then((response) =>
          {
            this.books = response.data;
            this.books.forEach(book => this.authors.push(book.authors[0]))
          }
      )},

    getName(){
      let id = this.$route.params.id
      if (typeof(this.$route.params.id) == 'undefined'){
        id = ''
      }
      ApiConnect.get('genres/'+id).then((response) =>
          {
            this.genre_name = response.data;
            this.getBooks(this.genre_name.name);
          }
      )},


  },
  created() {
    this.getName();
  },


}
</script>

<style scoped>

</style>