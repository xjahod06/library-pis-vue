<template>
  <div id="borrowings">
    <NavbarFinal></NavbarFinal>
    <b-tabs content-class="mt-3" fill class="bg-light">
      <b-tab title="Hard-Copy-Borrowings" active>
        <b-container>
          <b-pagination
              v-model="currentPageHardCopy"
              :total-rows="rowsHardCopy"
              :per-page="perPageHardCopy"
              aria-controls="hardTable"
              align="center"
          ></b-pagination>
          <b-table
              :items="myProvider"
              :busy.sync="isBusy"
              :fields="fieldsBorrowings"
              :sort-by.sync="sortByBooks"
              :sort-desc.sync="sortDescBooks"
              :per-page="perPageHardCopy"
              :current-page="currentPageHardCopy"
              responsive="sm"
          >
            <template v-slot:cell(edit)="{ item }">
              <router-link :to="{path: '/hard_borrowings/'+item.id}">
                <b-button variant="info">EDIT</b-button>
              </router-link>
            </template>
            <template v-slot:cell(delete)="{ item }">
              <b-button  @click="deleteHardCopy(item.id,item.name)" variant="danger">delete</b-button>
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
      <b-tab title="Electronic-Copy-Borrowings">
        <b-container>
          <b-pagination
              v-model="currentPageElectronicCopy"
              :total-rows="rowsElectronicCopy"
              :per-page="perPageElectronicCopy"
              aria-controls="electricTable"
              align="center"
          ></b-pagination>
        <b-table
            :items="myProvider2"
            :fields="fieldsBorrowings2"
            :sort-by.sync="sortByMagazines"
            :sort-desc.sync="sortDescMagazines"
            :per-page="perPageElectronicCopy"
            :current-page="currentPageElectronicCopy"
            responsive="sm"
        >
          <template v-slot:cell(edit)="{ item }">
            <router-link :to="{path: '/electronic_borrowings/'+item.id}">
              <b-button variant="info">EDIT</b-button>
            </router-link>
          </template>
          <template v-slot:cell(delete)="{ item }">
            <b-button @click="deleteElectronicCopy(item.id,item.name)" variant="danger">delete</b-button>
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
  name: "BorrowingList",
  components: {
    MyFooter,
    NavbarFinal
  },
  data() {
    return{
      fieldsBorrowings: [
        {key: 'dateOfBorrowStart', sortable: true},
        {key: 'dateOfBorrowEnd', sortable: true},
        {key: 'borrowCounter', sortable: true},
        {key: 'state', sortable: true},
        {key: 'returnDate', sortable: true},
        {key: 'reader_name', sortable: true},
        {key: 'title', sortable: true},
        {key: 'edit', sortable: false},
        {key: 'delete', sortable: false},
      ],
      fieldsBorrowings2: [
        {key: 'dateOfBorrowStart', sortable: true},
        {key: 'dateOfBorrowEnd', sortable: true},
        {key: 'borrowCounter', sortable: true},
        {key: 'reader_name', sortable: true},
        {key: 'title', sortable: true},
        {key: 'edit', sortable: false},
        {key: 'delete', sortable: false},
      ],
      sortByBooks: '',
      sortDescBooks: false,
      itemsMagazines: [],
      fieldsMagazines: [

      ],
      sortByMagazines: '',
      sortDescMagazines: false,
      isBusy: false,
      perPageHardCopy: 10,
      currentPageHardCopy: 1,
      perPageElectronicCopy: 10,
      currentPageElectronicCopy: 1,
      hardCopyCount: 0,
      electronicCopyCount: 0,
    }
  },
  methods: {
    myProvider() {
      this.isBusy = true
      let promise = ApiConnect.get('/hard-copy-borrowings/');
      return promise.then((data) =>{
        const items = data.data
        this.isBusy = false
        this.hardCopyCount = items.length
        return (this.parseHardCopyBorrowings(items).slice((this.currentPageHardCopy-1)*this.perPageHardCopy,this.perPageHardCopy*this.currentPageHardCopy))
      }).catch(error => {
        this.isBusy = false
        console.log('err',error)
        return []
      })
    },
    myProvider2() {
      this.isBusy = true
      let promise = ApiConnect.get('/electronic-copy-borrowings/');
      return promise.then((data) =>{
        const items = data.data
        this.isBusy = false
        this.electronicCopyCount = items.length
        return (this.parseElectronicCopyBorrowings(items).slice((this.currentPageElectronicCopy-1)*this.perPageElectronicCopy,this.perPageElectronicCopy*this.currentPageElectronicCopy))
      }).catch(error => {
        this.isBusy = false
        console.log('err',error)
        return []
      })
    },
    parseHardCopyBorrowings(data){
      data.forEach(function (borrowing){
        borrowing.reader_name = borrowing.reader.fullname
        borrowing.title = borrowing.exemplar.titleName;

      })
      return data;
    },
    parseElectronicCopyBorrowings(data){
      data.forEach(function (borrowing){
        borrowing.reader_name = borrowing.reader.fullname
        borrowing.title = borrowing.electronicCopy.titleName;

      })
      return data;
    },
    deleteHardCopy(id,name){
      ApiConnect.delete('/hard-copy-borrowings/'+id).then(response =>
          console.log(response)
      );
      this.makeToast('Hard Copy Borrowing',name);
      this.$root.$emit('bv::refresh::table', 'hardTable')
    },
    deleteElectronicCopy(id, name){
      ApiConnect.delete('/electronic-copy-borrowings/'+id).then(response =>
          console.log(response)
      );
      this.makeToast('ElectronicCopyBorrowing',name);
      this.$root.$emit('bv::refresh::table', 'electronicTable')
    },
    makeToast(type,name) {
      this.$bvToast.toast(type+' '+name+' has been deleted successfully.', {
        title: 'Library',
        variant: 'success',
        autoHideDelay: 5000,
      })
    }
  },
  computed: {
    rowsHardCopy() {
      return this.hardCopyCount;
    },
    rowsElectronicCopy() {
      return this.electronicCopyCount;
    }
  }
}
</script>

<style scoped>

</style>