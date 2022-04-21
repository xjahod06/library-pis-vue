<template>
  <div id="titles">
    <NavbarFinal></NavbarFinal>
        <b-tabs content-class="mt-3" fill class="bg-light">
          <b-tab title="Books" active>
            <b-container>
              <b-table
                  :items="itemsBooks"
                  :fields="fieldsBooks"
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
    }
  },
  methods: {
    getBooks(){
      ApiConnect.get('/books/').then(response =>
        this.parseBooks(response.data)
      )
    },
    parseBooks(data){
      data.forEach(function (book){
        book.genres = getNames(book.genres);
        book.authors = getAuthors(book.authors);
        book.edit = " <b>edit</b>  "
      })
      this.itemsBooks = data;
    }
  },
  created() {
    this.getBooks();
  }
}
</script>

<style scoped>

</style>