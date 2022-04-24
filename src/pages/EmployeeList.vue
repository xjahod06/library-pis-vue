<template>
  <div id="employees">
    <NavbarFinal></NavbarFinal>
    <b-tabs content-class="mt-3" fill class="bg-light">
      <b-tab title="Employees" active>
        <data-table
            endpointGet="/employees/"
            endpointEdit="/register_employee/"
            endpointDel="/employees/"
            type="employees"
            :fields="fieldsEmployees"
            sortBy="name"
            :parse="parseEmployees"
            tableId="tableEmployees"
        >
        </data-table>
      </b-tab>
    </b-tabs>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import MyFooter from "@/components/main_page/MyFooter";
import NavbarFinal from "@/components/main_page/NavbarFinal";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDisplay, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import dataTable from "@/components/title_list/dataTable";
library.add(faDisplay, faUserPlus)

export default {
  name: "EmployeeList",
  
  components: {
    MyFooter,
    NavbarFinal,
    dataTable
  },

  data() {
    return{
      fieldsEmployees: [
        {key: 'fullname', sortable: true},
        {key: 'email', sortable: true},
        {key: 'role', sortable: true},
        {key: 'address', sortable: true},
        {key: 'edit', sortable: false},
        {key: 'delete', sortable: false},

      ],
    }
  },

  methods: {
    parseEmployees(data){
      data.forEach(reader => {
        reader.address = reader.city + ', ' +
            reader.street + ' ' +
            reader.houseNumber + ', ' +
            reader.postcode
      })
      return data
    },
  },

}
</script>

<style scoped>

</style>