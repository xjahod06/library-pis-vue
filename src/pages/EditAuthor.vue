<template>
  <div>
    <NavbarFinal></NavbarFinal>
    <b-btn @click=backToList()>Back to List</b-btn>
    <b-container>
    <AuthorForm :author="author"
                :form="form"></AuthorForm>
    </b-container>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import MyFooter from "@/components/main_page/MyFooter";
import ApiConnect from "@/services/ApiConnect";
import AuthorTile from "@/components/genre_page/AuthorTile";
import AuthorForm from "@/components/authors_edit_page/AuthorForm";
import NavbarFinal from "@/components/main_page/NavbarFinal";

export default {
  name: "EditAuthor.vue",
  components: {AuthorTile, MyFooter, NavbarFinal, AuthorForm},

  data() {
    return {
      author : {},
      form: {
        id: '',
        name: '',
        surname: '',
        photograph: '',
        dateOfBirth: '',
        books: [],
        magazines: []
      },
    }
  },

  methods : {
    getAuthor() {
      ApiConnect.get('authors/' + this.$route.params.id).then((response) =>
          {
            this.author = response.data;
            this.form.id = this.author.id;
            this.form.name = this.author.name;
            this.form.surname = this.author.surname;
            this.form.photograph = this.author.photograph;
            this.form.dateOfBirth = this.author.dateOfBirth;
            this.author.books.forEach(book => this.form.books.push(book));
            this.author.magazines.forEach(magazine => this.form.magazines.push(magazine));
          }
      )},

    backToList() {
      this.$router.push({path: '/edit_authors'})
    }
  },

  created() {
    this.getAuthor();
  }
}
</script>

<style scoped>

</style>