<template>
  <div id="titles">
    <NavbarFinal></NavbarFinal>
        <b-tabs content-class="mt-3" fill class="bg-light">
          <b-tab title="Books" active>
            <b-container>
              <b-row>
                <b-col cols="11">
                  <b-pagination
                      v-model="currentPageBook"
                      :total-rows="rowsBooks"
                      :per-page="perPageBook"
                      aria-controls="bookTable"
                      align="center"
                  ></b-pagination>
                </b-col>
                <b-col class="text-right" cols="1">
                  <router-link :to="{path: '/edit_books/0'}">
                    <b-button variant="success">create</b-button>
                  </router-link>
                </b-col>
              </b-row>
              <b-table
                  id="bookTable"
                  ref="bookTable"
                  :per-page="perPageBook"
                  :current-page="currentPageBook"
                  :busy.sync="isBusyBooks"
                  :items="myProviderBooks"
                  :fields="fieldsBooks"
                  :sort-by.sync="sortByBooks"
                  :sort-desc.sync="sortDescBooks"
                  striped hover
              >
                <template v-slot:cell(edit)="{ item }">
                  <router-link :to="{path: '/edit_books/'+item.id}">
                    <b-button variant="info">EDIT</b-button>
                  </router-link>
                </template>
                <template v-slot:cell(delete)="{ item }">
                  <b-button  @click="deleteBook(item.id,item.name)" variant="danger">delete</b-button>
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
          <b-tab title="Magazines">
            <b-container>
              <b-row>
                <b-col cols="11">
                  <b-pagination
                      v-model="currentPageMagazine"
                      :total-rows="rowsMagazines"
                      :per-page="perPageMagazine"
                      aria-controls="magazineTable"
                      align="center"
                  ></b-pagination>
                </b-col>
                <b-col class="text-right" cols="1">
                  <router-link :to="{path: '/edit_magazines/0'}">
                    <b-button variant="success">create</b-button>
                  </router-link>
                </b-col>
              </b-row>
              <b-table
                  id="magazineTable"
                  ref="magazineTable"
                  :per-page="perPageMagazine"
                  :current-page="currentPageMagazine"
                  :busy.sync="isBusyMagazines"
                  :items="myProviderMagazines"
                  :fields="fieldsMagazines"
                  :sort-by.sync="sortByMagazines"
                  :sort-desc.sync="sortDescMagazines"
                  striped hover
              >
                <template v-slot:cell(edit)="{ item }">
                  <router-link :to="{path: '/edit_magazines/'+item.id}">
                    <b-button variant="info">EDIT</b-button>
                  </router-link>
                </template>
                <template v-slot:cell(delete)="{ item }">
                  <b-button  @click="deleteMagazine(item.id,item.name)" variant="danger">delete</b-button>
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

function getNames(data) {
  let string = "";
  data.forEach((dato) => string += "&" + dato.name);
  string = string.replace('&','')
  string = string.replaceAll("&",", ")
  return string;
}

function getAuthors(data) {
  let string = "";
  data.forEach((dato) => string += "&" + dato.surname + " " + dato.name);
  string = string.replace('&','')
  string = string.replaceAll("&",", ")
  return string;
}

export default {
  name: "TitleList",
  components: {
    MyFooter,
    NavbarFinal
  },
  data() {
    return{
      fieldsBooks: [
        {key: 'isbn', sortable: true},
        {key: 'name', sortable: true},
        {key: 'publisher', sortable: true},
        {key: 'authors', sortable: true},
        {key: 'genres', sortable: true},
        {key: 'edit', sortable: false},
        {key: 'delete', sortable: false},

      ],
      sortByBooks: 'isbn',
      sortDescBooks: false,
      booksCount: 0,
      fieldsMagazines: [
        {key: 'issn', sortable: true},
        {key: 'name', sortable: true},
        {key: 'publisher', sortable: true},
        {key: 'authors', sortable: true},
        {key: 'fields', sortable: true},
        {key: 'edit', sortable: false},
        {key: 'delete', sortable: false},
      ],
      sortByMagazines: '',
      sortDescMagazines: false,
      magazinesCount: 0,
      isBusyBooks: false,
      isBusyMagazines: false,
      perPageBook: 10,
      currentPageBook: 1,
      perPageMagazine: 10,
      currentPageMagazine: 1,

    }
  },
  methods: {
    myProviderBooks() {
      console.log('provider')
      this.isBusyBooks = true
      let promise = ApiConnect.get('/books/');
      return promise.then((data) =>{
        const items = data.data
        this.isBusyBooks = false
        this.booksCount = items.length
        return (this.parseBooks(items).slice((this.currentPageBook-1)*this.perPageBook,this.perPageBook*this.currentPageBook))
      }).catch(error => {
        this.isBusyBooks = false
        console.log('err',error)
        return []
      })
    },
    myProviderMagazines() {
      this.isBusyMagazines = true
      let promise = ApiConnect.get('/magazines/');
      return promise.then((data) =>{
        const items = data.data
        this.isBusyMagazines = false
        this.magazinesCount = items.length
        return (this.parseMagazines(items).slice((this.currentPageMagazine-1)*this.perPageMagazine,this.perPageMagazine*this.currentPageMagazine))
      }).catch(error => {
        this.isBusyMagazines = false
        console.log('err',error)
        return []
      })
    },
    parseBooks(data){
      data.forEach(function (book){
        book.genres = getNames(book.genres);
        book.authors = getAuthors(book.authors);
      })
      return data
    },
    parseMagazines(data){
      data.forEach(function (book){
        book.fields = getNames(book.fields);
        book.authors = getAuthors(book.authors);
      })
      return data
    },
    deleteBook(id,name){
      ApiConnect.delete('/books/'+id).then(response =>
        console.log(response)
      );
      this.makeToast('Book',name);
      this.$root.$emit('bv::refresh::table', 'bookTable')
    },
    deleteMagazine(id,name){
      ApiConnect.delete('/magazines/'+id).then(response =>
          console.log(response)
      );
      this.makeToast('Magazine',name);
      this.$root.$emit('bv::refresh::table', 'magazineTable')
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
    rowsBooks() {
      return this.booksCount;
    },
    rowsMagazines() {
      return this.magazinesCount;
    }
  }
}
</script>

<style scoped>

</style>