<template>
  <div id="borrowings">
    <NavbarFinal></NavbarFinal>
    <b-tabs content-class="mt-3" fill class="bg-light">
      <b-tab title="Hard-Copy-Borrowings" active>
        <b-container>
          <b-table
              :items="itemsBorrowings"
              :fields="fieldsBorrowings"
              :sort-by.sync="sortByBooks"
              :sort-desc.sync="sortDescBooks"
              responsive="sm"
          >
            <template v-slot:cell(edit)="{ item }">
              <router-link :to="{path: '/books/'+item.id}">

              </router-link>
            </template>

          </b-table>
        </b-container>
      </b-tab>
      <b-tab title="Electronic-Copy-Borrowings">
        <b-table
            :items="itemsMagazines"
            :fields="fieldsMagazines"
            :sort-by.sync="sortByMagazines"
            :sort-desc.sync="sortDescMagazines"
            responsive="sm"
        ></b-table>
      </b-tab>
    </b-tabs>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import MyFooter from "@/components/main_page/MyFooter";
import ApiConnect from "@/services/ApiConnect";
import NavbarFinal from "@/components/main_page/NavbarFinal";

function getNames(data) {
  //let string = "";
  //data.forEach((dato) => string += "&" + dato.name);
  //string = string.replace('&','')
  //string = string.replaceAll("&",", ")
  //return string;
  return data.fullname
}

function getAuthors(data) {
  let string = "";
  data.forEach((dato) => string += "&" + dato.surname + " " + dato.name);
  string = string.replace('&','')
  string = string.replaceAll("&",", ")
  return string;
}

export default {
  name: "BorrowingList",
  components: {
    MyFooter,
    NavbarFinal
  },
  data() {
    return{
      itemsBorrowings: [],
      fieldsBorrowings: [
        {key: 'dateOfBorrowStart', sortable: true},
        {key: 'dateOfBorrowEnd', sortable: true},
        {key: 'borrowCounter', sortable: true},
        {key: 'state', sortable: true},
        {key: 'returnDate', sortable: true},
        {key: 'reader_name', sortable: true},
      ],
      sortByBooks: '',
      sortDescBooks: false,
      itemsMagazines: [],
      fieldsMagazines: [

      ],
      sortByMagazines: '',
      sortDescMagazines: false,
    }
  },
  methods: {
    getBorrowings(){
      ApiConnect.get('/hard-copy-borrowings/').then(response =>
          this.parseBorrowings(response.data)
      )
    },
    parseBorrowings(data){
      data.forEach(function (borrowing){
        borrowing.reader_name = borrowing.reader.fullname;
        //borrowing.reader_name = getNames(borrowing.reader);
        //borrowing.authors = getAuthors(borrowing.authors);
        borrowing.edit = " <b>edit</b>  "
      })
      this.itemsBorrowings = data;
    }
  },
  created() {
    this.getBorrowings();
  }
}
</script>

<style scoped>

</style>