<template>
  <div id="author">
    <NavBar></NavBar>

    <b-container>

      <AuthorBigTile
        :name="author.name"
        :surname="author.surname"
        :birth="author.dateOfBirth"
        :description="author.description"
      ></AuthorBigTile>

      <b-row>
        <b-col><h1>Books</h1></b-col>
      </b-row>
      <b-row>
        <MainTile v-for="load in books"
                  img="@/assets/logo.png"
                  :genres = load.genres
                  :type = load.language
                  :name = load.name
                  :authors = load.authors
                  :id = load.id
                  root = '/books/'
        >
        </MainTile>
      </b-row>
      <b-row>
        <b-col><h1>Magazines</h1></b-col>
      </b-row>
      <b-row>
        <MainTile v-for="load in magazines"
                  img="@/assets/logo.png"
                  :fields = load.fields
                  :type = load.language
                  :name = load.name
                  :authors = load.authors
                  :id = load.id
                  root = '/magazines/'
        >
        </MainTile>
      </b-row>
    </b-container>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import NavBar from "@/components/main_page/NavBar";
import MyFooter from "@/components/main_page/MyFooter";
import ApiConnect from "@/services/ApiConnect";
import MainTile from "@/components/main_page/MainTile";
import AuthorBigTile from "@/components/author/AuthorBigTile";

export default {
  name: "Author",
  components: {
    NavBar,
    MyFooter,
    MainTile,
    AuthorBigTile
  },
  data(){
    return {
      author: {},
      books: [],
      magazines: [],
    }
  },
  methods: {
    async getAuthorsBooks() {
      const resp = await ApiConnect.get('authors/' + this.$route.params.id);
      this.author = resp.data;
      ApiConnect.get('books/', {params: {author: this.author.name}}).then((response) =>
          this.books = response.data
      )
      ApiConnect.get('magazines/', {params: {author: this.author.name}}).then((response) =>
          this.magazines = response.data
      )
    },
  },
  created() {
    this.getAuthorsBooks(this.author.name);
  }
}
</script>

<style scoped>

</style>