<template>
  <div id="fines">
    <NavbarFinal></NavbarFinal>
    <b-tabs content-class="mt-3" fill class="bg-light">
      <b-tab title="Fines" active>
        <b-container>
          <b-pagination
              v-model="currentPageFines"
              :total-rows="rowsFines"
              :per-page="perPageFines"
              aria-controls="fineTable"
              align="center"
          ></b-pagination>
          <b-table
              id="fineTable"
              ref="fineTable"
              :per-page="perPageFines"
              :current-page="currentPageFines"
              :busy.sync="isBusyFines"
              :items="myProviderFines"
              :fields="fields"
              :sort-by.sync="sortByFines"
              :sort-desc.sync="sortDescFines"
              striped hover
          >
            <template v-slot:cell(pay)="{ item }">
                <b-button @click="payFine(item)" variant="success">PAY</b-button>
            </template>
            <template v-slot:cell(delete)="{ item }">
              <b-button @click="deleteFine(item.id,item.name)" variant="danger">delete</b-button>
            </template>
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
          </b-table>
        </b-container>
      </b-tab>
    </b-tabs>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import MyFooter from "@/components/main_page/MyFooter";
import ApiConnect from "@/services/ApiConnect";
import NavbarFinal from "@/components/main_page/NavbarFinal";

export default {
  name: "FineList",
  components: {
    MyFooter,
    NavbarFinal
  },
  data() {
    return{
      fields: [
        {key: 'amount', sortable: true},
        {key: 'state', sortable: true},
        {key: 'borrowing_name', sortable: true},
        {key: 'pay', sortable: false},
        {key: 'delete', sortable: false},

      ],
      sortByFines: 'isbn',
      sortDescFines: false,
      finesCount: 0,
      isBusyFines: false,
      perPageFines: 10,
      currentPageFines: 1,

    }
  },
  methods: {
    myProviderFines() {
      console.log('provider')
      this.isBusyFines = true
      let promise = ApiConnect.get('/fines/');
      return promise.then((data) =>{
        const items = data.data
        this.isBusyFines = false
        this.finesCount = items.length
        return (this.parseFines(items).slice((this.currentPageFines-1)*this.perPageFines,this.perPageFines*this.currentPageFines))
      }).catch(error => {
        this.isBusyFines = false
        console.log('err',error)
        return []
      })
    },

    parseFines(data){
      data.forEach(function (fine){
        ApiConnect.get('/hard-copy-borrowings/'+fine.borrowingId).then((response) =>
            fine.borrowing_name = response.data.exemplar.titleName,
        )
      })
      console.log(data)
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
  computed: {
    rowsFines() {
      return this.finesCount;
    },
  }
}
</script>

<style scoped>

</style>