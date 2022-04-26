<template>
  <div id="fines">
    <NavbarFinal></NavbarFinal>
    <b-tabs content-class="mt-3" fill class="bg-light">
      <b-tab title="Fines" active>
        <fine-table
            endpointGet="/fines/"
            endpointEdit="/edit_fines/"
            endpointDel="/fines/"
            type="fines"
            :fields="fieldsFines"
            sortBy="state"
            :parse="parseFines"
            tableId="tableFines"
        >
        </fine-table>
      </b-tab>
    </b-tabs>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import MyFooter from "@/components/main_page/MyFooter";
import ApiConnect from "@/services/ApiConnect";
import NavbarFinal from "@/components/main_page/NavbarFinal";
import fineTable from "@/components/title_list/fineTable";

export default {
  name: "FineList",
  components: {
    fineTable,
    MyFooter,
    NavbarFinal
  },
  data() {
    return{
      fieldsFines: [
        {key: 'amount', sortable: true},
        {key: 'state', sortable: true},
        {key: 'borrowing_name', sortable: true},
        {key: 'reader', sortable: true},
        {key: 'pay', sortable: false},
        {key: 'delete', sortable: false},
      ],

    }
  },
  methods: {
    parseFines(data){
      data.forEach(fine => {
        fine.borrowing_name = '';
        fine.reader = ''})
      data.forEach(function (fine){
        ApiConnect.get('/hard-copy-borrowings/'+fine.borrowingId).then((response) => {
          fine.borrowing_name = response.data.exemplar.titleName;
          fine.reader = response.data.reader.fullname;
            }
        )
      })
      return data
    },

    deleteFine(id, name){
      ApiConnect.delete('/fines/'+id).then(response =>
          console.log(response)
      );
      this.makeToast('Fine',name);
      this.$root.$emit('bv::refresh::table', 'fineTable')
    },
    payFine(item){
      let params = {id: item.id, state: "PAID", amount: item.amount, borrowingId: item.borrowingId}
      ApiConnect.put('/fines/', JSON.stringify(params), ApiConnect.headers).then(response =>
          console.log(response)
      );
      this.makePaidToast('Fine',name);
      this.$root.$emit('bv::refresh::table', 'fineTable')
    },
    makeToast(type) {
      this.$bvToast.toast(type+' has been deleted successfully.', {
        title: 'Library',
        variant: 'success',
        autoHideDelay: 5000,
      })
    },
    makePaidToast(type) {
      this.$bvToast.toast(type+' has been paid successfully.', {
        title: 'Library',
        variant: 'success',
        autoHideDelay: 5000,
      })
    }
  },
}
</script>

<style scoped>

</style>