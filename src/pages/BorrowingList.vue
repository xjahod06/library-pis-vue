<template>
  <div id="borrowings">
    <NavbarFinal></NavbarFinal>
    <b-tabs content-class="mt-3" fill class="bg-light">
      <b-tab title="Hard-Copy-Borrowings" active>
        <b-container>
          <b-table
              :items="myProvider"
              :busy.sync="isBusy"
              :fields="fieldsBorrowings"
              :sort-by.sync="sortByBooks"
              :sort-desc.sync="sortDescBooks"
              responsive="sm"
          >
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
        <b-table
            :items="myProvider2"
            :fields="fieldsBorrowings2"
            :sort-by.sync="sortByMagazines"
            :sort-desc.sync="sortDescMagazines"
            responsive="sm"
        >
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
      ],
      fieldsBorrowings2: [
        {key: 'dateOfBorrowStart', sortable: true},
        {key: 'dateOfBorrowEnd', sortable: true},
        {key: 'borrowCounter', sortable: true},
        {key: 'reader_name', sortable: true},
        {key: 'title', sortable: true},
      ],
      sortByBooks: '',
      sortDescBooks: false,
      itemsMagazines: [],
      fieldsMagazines: [

      ],
      sortByMagazines: '',
      sortDescMagazines: false,
      isBusy: false,
    }
  },
  methods: {
    myProvider() {
      this.isBusy = true
      let promise = ApiConnect.get('/hard-copy-borrowings/');
      return promise.then((data) =>{
        const items = data.data
        this.isBusy = false
        return (this.parseBorrowings(items))
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
        return (this.parseBorrowings2(items))
      }).catch(error => {
        this.isBusy = false
        console.log('err',error)
        return []
      })
    },
    parseBorrowings(data){
      data.forEach(function (borrowing){
        borrowing.reader_name = borrowing.reader.fullname
        borrowing.title = borrowing.exemplar.titleName;

      })
      return data;
    },
    parseBorrowings2(data){
      data.forEach(function (borrowing){
        borrowing.reader_name = borrowing.reader.fullname
        borrowing.title = borrowing.electronicCopy.titleName;

      })
      return data;
    }
  },
}
</script>

<style scoped>

</style>