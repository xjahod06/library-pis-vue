<template>
  <div>
    <NavbarFinal></NavbarFinal>
    <b-btn @click=backToList() class="mt-3">Back to List</b-btn>
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
import AuthorForm from "@/components/authors_edit_page/AuthorForm";
import NavbarFinal from "@/components/main_page/NavbarFinal";

export default {
  name: "EditAuthor.vue",
  components: {
    MyFooter,
    NavbarFinal,
    AuthorForm,
  },

  data() {
    return {
      author : {},
      form: {
        id: 0,
        name: '',
        surname: '',
        photograph: null,
        dateOfBirth: '',
        dateOfDeath: '',
        books: [],
        magazines: []
      },
    }
  },

  methods : {
    getAuthor() {
      if (this.$route.params.id !== 0){
        ApiConnect.get('authors/' + this.$route.params.id).then((response) =>
            {
              this.author = response.data;
              this.form.id = this.author.id;
              this.form.name = this.author.name;
              this.form.surname = this.author.surname;
              this.form.photograph = this.author.photograph;
              this.form.dateOfBirth = new Date(this.author.dateOfBirth);
              if (this.author.dateOfDeath) this.form.dateOfDeath = new Date(this.author.dateOfDeath);
              this.form.description = this.author.description;
              this.author.books.forEach(book => this.form.books.push(book));
              this.author.magazines.forEach(magazine => this.form.magazines.push(magazine));
            }
        )
      }

      },

    backToList() {
      this.$router.push({path: '/edit_authors'})
    }
  },

  created() {
    this.getAuthor();
  }
}
</script>
