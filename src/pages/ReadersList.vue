<template>
  <div id="readers">
    <NavbarFinal></NavbarFinal>
    <b-tabs content-class="mt-3" fill class="bg-light">
      <b-tab title="Readers" active>
        <data-table
            endpointGet="/readers/"
            endpointEdit="/edit_readers/"
            endpointDel="/readers/"
            type="readers"
            :fields="fieldsReaders"
            sortBy="name"
            :parse="parseReaders"
            tableId="tableReaders"
        >
        </data-table>
      </b-tab>
    </b-tabs>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import MyFooter from "@/components/main_page/MyFooter";
import ApiConnect from "@/services/ApiConnect";
import NavbarFinal from "@/components/main_page/NavbarFinal";
import dataTable from "@/components/title_list/dataTable";
import Vue from "vue";

export default {
  name: "ReadersList",

  components: {
    MyFooter,
    NavbarFinal,
    dataTable
  },

  data() {
    return{
      fieldsReaders: [
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
    parseReaders(data){
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