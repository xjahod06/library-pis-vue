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
          <span><b-btn @click="editEmployee(item)">Edit</b-btn></span>
        </template>
        <template v-slot:cell(delete)="{ item }">
          <span><b-btn @click="deleteEmployee(item)" variant="danger">Delete</b-btn></span>
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
  name: "EmployeeList",

  components: {
    MyFooter,
    NavbarFinal
  },

  methods: {
    getEmployees() {
      ApiConnect.get('employees/').then((response) => {
            this.items = response.data;
          }
      )
    },

    editEmployee(employee) {
      console.log(employee.id);
      this.$router.push({path: '/employee/' + employee.id});
    },

    deleteEmployee(employee) {
      console.log(employee.id);
      ApiConnect.delete('/readers/' + employee.id).then(response => {
        this.successMessage = "Employee successfully deleted."
        alert("Employee successfully deleted.");
        parent.location.reload();
      }).catch(error => {
        this.errorMessage = "There was a problem while deleting an Employee.";
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
    this.getEmployees();
  }
}
</script>

<style scoped>

</style>