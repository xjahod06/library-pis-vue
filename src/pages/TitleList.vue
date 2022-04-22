<template>
  <div id="titles">
    <NavbarFinal></NavbarFinal>
        <b-tabs content-class="mt-3" fill class="bg-light">
          <b-tab title="Books" active>
            <dataTable
                endpointGet="/books/"
                endpointEdit="/edit_books/"
                endpointDel="/books/"
                type="book"
                :fields="fieldsBooks"
                sortBy="isbn"
                :parse="parseBooks"
            >
            </dataTable>
          </b-tab>
          <b-tab title="Magazines">
            <dataTable
                endpointGet="/magazines/"
                endpointEdit="/edit_magazines/"
                endpointDel="/magazines/"
                type="magazine"
                :fields="fieldsMagazines"
                sortBy="issn"
                :parse="parseMagazines"
            >
            </dataTable>
          </b-tab>
        </b-tabs>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import MyFooter from "@/components/main_page/MyFooter";
import NavbarFinal from "@/components/main_page/NavbarFinal";
import dataTable from "@/components/title_list/dataTable";

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
    NavbarFinal,
    dataTable
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
      fieldsMagazines: [
        {key: 'issn', sortable: true},
        {key: 'name', sortable: true},
        {key: 'publisher', sortable: true},
        {key: 'authors', sortable: true},
        {key: 'fields', sortable: true},
        {key: 'edit', sortable: false},
        {key: 'delete', sortable: false},
      ]

    }
  },
  methods: {
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
  }
}
</script>

<style scoped>

</style>