<template>
  <div id="reservations">
    <NavbarFinal></NavbarFinal>
    <b-tabs content-class="mt-3" fill class="bg-light">
      <b-tab title="Reservations" active>
        <data-table
            endpointGet="/reservations/"
            endpointEdit="/edit_reservations/"
            endpointDel="/reservations/"
            type="reservations"
            :fields="fieldsReservations"
            sortBy="name"
            :parse="parseReservations"
            tableId="tableReservations"
        >
        </data-table>
      </b-tab>
    </b-tabs>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import DataTable from "@/components/title_list/dataTable";
import MyFooter from "@/components/main_page/MyFooter";
import NavbarFinal from "@/components/main_page/NavbarFinal";

export default {
  name: "ReservationList",
  components: {
    DataTable,
    MyFooter,
    NavbarFinal
  },
  data() {
    return{
      fieldsReservations: [
        {key: 'dateFrom', sortable: true},
        {key: 'dateUntil', sortable: true},
        {key: 'state', sortable: true},
        {key: 'title', sortable: true},
        {key: 'reader', sortable: true},
        {key: 'edit', sortable: false},
        {key: 'delete', sortable: false},

      ],
    }
  },
  methods: {
    parseReservations(data){
      data.forEach(reservation => {
        reservation.title = reservation.exemplar.titleName;
        reservation.reader = reservation.reader.fullname})
      return data
    },
  },
}
</script>

<style scoped>

</style>