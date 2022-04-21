<template>
  <div id="titles">
    <NavbarFinal></NavbarFinal>
        <b-tabs content-class="mt-3" fill class="bg-light">
          <b-tab title="Books" active>
            <b-container>
              <b-table
                  ref="bookTable"
                  :busy.sync="isBusy"
                  :items="myProvider"
                  :fields="fieldsBooks"
                  :sort-by.sync="sortByBooks"
                  :sort-desc.sync="sortDescBooks"
                  striped hover
              >
                <template v-slot:cell(edit)="{ item }">
                  <router-link :to="{path: '/books/'+item.id}">
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
      itemsBooks: [],
      fieldsBooks: [
        {key: 'isbn', sortable: true},
        {key: 'name', sortable: true},
        {key: 'publisher', sortable: true},
        {key: 'authors', sortable: true},
        {key: 'genres', sortable: true},
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
    }
  },
  methods: {
    myProvider() {
      this.isBusy = true
      let promise = ApiConnect.get('/books/');
      return promise.then((data) =>{
        const items = data.data
        this.isBusy = false
        return (this.parseBooks(items))
      }).catch(error => {
        this.isBusy = false
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
    deleteBook(id,name){
      ApiConnect.delete('/books/'+id).then(response =>
        console.log(response)
      );
      this.makeToast(name);
      this.$refs.bookTable.refresh();
    },
    makeToast(name) {
      this.$bvToast.toast(`Book `+name+' has been deleted successfully', {
        title: 'Library',
        variant: 'success',
        autoHideDelay: 5000,
      })
    }
  },
  created() {
    this.getBooks();
  }
}
</script>

<style scoped>

</style>