<template>
  <div>
    <NavbarFinal></NavbarFinal>
    <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
        align="center"
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
        <span><b-btn @click="editUser(item)">Edit</b-btn></span>
      </template>
      <template v-slot:cell(delete)="{ item }">
        <span><b-btn @click="deleteUser(item)" variant="danger">Delete</b-btn></span>
      </template>
    </b-table>

    <MyFooter></MyFooter>
  </div>
</template>

<script>
import MyFooter from "@/components/main_page/MyFooter";
import ApiConnect from "@/services/ApiConnect";
import NavbarFinal from "@/components/main_page/NavbarFinal";

export default {
  name: "ReadersList",

  components: {
    MyFooter,
    NavbarFinal
  },

  methods: {
    getUsers() {
      ApiConnect.get('readers/').then((response) => {
            this.items = response.data;
          }
      )
    },

    editUser(user) {
      console.log(user.id);
      this.$router.push({path: '/readers/' + user.id});
    },

    deleteUser(user) {
      console.log(user.id);
      ApiConnect.delete('/readers/' + user.id).then(response => {
        this.successMessage = "Reader successfully deleted."
        alert("Reader succesfully deleted.");
        parent.location.reload();
      }).catch(error => {
        this.errorMessage = "There was a problem while deleting a Reader.";
      })
    }
  },

  data() {
    return {
      perPage: 15,
      currentPage: 1,
      items: [],
      fields: ["name", "surname", "email", "city", "role", "update", "delete"]
    }
  },

  computed: {
    rows() {
      return this.items.length
    }
  },

  created() {
    this.getUsers();
  }
}
</script>

<style scoped>

</style>