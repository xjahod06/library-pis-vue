<template>
  <div>
    <NavbarFinal></NavbarFinal>
    <b-container>
      <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
          align="center"
          class="mt-3"
      ></b-pagination>

      <b-table
          id="my-table"
          :items="items"
          :per-page="perPage"
          :current-page="currentPage"
          :fields="fields"
          responsive
          hover
          head-variant="light"
          medium>
        <template v-slot:cell(update)="{ item }">
          <span><b-btn @click="editAuthor(item)">Edit</b-btn></span>
        </template>
        <template v-slot:cell(delete)="{ item }">
          <span><b-btn @click="deleteAuthor(item)" variant="danger">Delete</b-btn></span>
        </template>
      </b-table>
    </b-container>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import MyFooter from "@/components/main_page/MyFooter";
import ApiConnect from "@/services/ApiConnect";
import NavbarFinal from "@/components/main_page/NavbarFinal";

export default {
  name: "AuthorsList",
  components: {
    MyFooter,
    NavbarFinal
  },

  methods : {
    getAuthors() {
      ApiConnect.get('authors/').then((response) => {
            this.items = response.data;
          }
      )},

    editAuthor(author) {
      console.log(author.id);
      this.$router.push({path: '/edit_author/' + author.id});
    },

    deleteAuthor(author) {
      console.log(author.id);
      ApiConnect.delete('/authors/'+author.id).then(response => {
        this.successMessage = "Author successfully deleted."
        alert("Author succesfully deleted.");
        parent.location.reload();
      }).catch(error=>{
        this.errorMessage = "There was a problem while deleting an Author.";
      })
    }
  },

  data() {
    return {
      perPage: 10,
      currentPage: 1,
      items: [],
      fields: ["name", "surname", "update", "delete"]
    }
  },

  computed: {
    rows() {
      return this.items.length
    }
  },

  created() {
    this.getAuthors();
  }
}
</script>

<style scoped>

</style>