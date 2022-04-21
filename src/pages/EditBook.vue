<template>
  <div>
    <NavbarFinal></NavbarFinal>
    <b-container>
      <b-form @submit.prevent="submit" novalidate>
        <b-form-group
            id="email-label"
            label="Email address:"
            label-for="email"
        >
          <b-form-input
              ref="email"
              id="email"
              v-model="form.email"
              type="email"
              placeholder="Enter email"
              required
          ></b-form-input>
        </b-form-group>
      </b-form>

      <b-button v-b-modal.modal-1>preview book page</b-button>

      <b-modal id="modal-1" title="Preview" size="xl" hide-footer>
        <b-row>
          <b-col cols="4">
            <BookTitle
                img="@/assets/logo.png"
                format="book"
                :publisher="book.publisher"
                :released="new Date(book.publicationDate)"
                :pages="book.pages"
                :hasElectronicCopy="hasElectronicCopy"
                :hardCopies="book.hardCopyExemplars"
                :electronicCopies="book.electronicCopyExemplars"
            >

            </BookTitle>
          </b-col>
          <b-col cols="8">
            <BookInfo
                :title="book.name"
                :publicationNumber="''+book.publicationNumber"
                :authors="book.authors"
                :isbn="book.isbn"
                :genres="book.genres"
                :description="book.description"
            >

            </BookInfo>
          </b-col>
        </b-row>
      </b-modal>





      <label class="typo__label" for="authors">Async multiselect</label>
      <multiselect
          v-model="selectedAuthors"
          id="authors"
          label="name"
          track-by="name"
          placeholder="Type to search"
          open-direction="bottom"
          :options="authors"
          :multiple="true"
          :searchable="true"
          :loading="isLoading"
          :internal-search="false"
          :clear-on-select="false"
          :close-on-select="false"
          :options-limit="300"
          :limit="3"
          :limit-text="limitText"
          :max-height="600"
          :show-no-results="false"
          :hide-selected="true"
          @search-change="asyncFind"
      >
        <!--
        <template slot="tag" slot-scope="{ option, remove }">
          <b-badge pill variant="primary">{{ option.name }} <b-icon icon="x" scale="2" @click="remove(option)" type="button"></b-icon></b-badge>
        </template>-->
        <template slot="clear" slot-scope="props">
          <div class="multiselect__clear" v-if="selectedAuthors.length" @mousedown.prevent.stop="clearAll(props.search)"></div>
        </template>
        <template slot="noResult">
          <span>Oops! No elements found. Consider changing the search query.</span>
        </template>
      </multiselect>
    </b-container>
  <!--<pre class="language-json"><code>{{ selectedCountries  }}</code></pre>-->
    <MyFooter></MyFooter>
  </div>
</template>
<script>
import NavbarFinal from "@/components/main_page/NavbarFinal";
import MyFooter from "@/components/main_page/MyFooter";
import ApiConnect from "@/services/ApiConnect";
import Multiselect from "vue-multiselect";
import BookInfo from "@/components/book_page/BookInfo";
import BookTitle from "@/components/book_page/BookTitle";


export default {
  name: "EditBook",
  components: {
    BookInfo,
    BookTitle,
    Multiselect,
    NavbarFinal,
    MyFooter
  },
  data () {
    return {
      selectedAuthors: [],
      authors: [],
      isLoading: false,
      book: {},

      form: {
        id: '',
        name: '',
        description: '',
        publisher: '',
        language: '',
        coverPhoto: '',
        authors: [],
        hardCopyExemplars: [],
        electronicCopyExemplars: [],
        isbn: '',
        publicationNumber: '',
        publicationDate: '',
        pages: '',
        genres: [],
      }
    }
  },
  methods: {
    limitText (count) {
      return `and ${count} other authors`
    },
    asyncFind(query) {
      this.isLoading = true
      let params = {params: {"name": query}};
      ApiConnect.get('/authors/', params).then(response => {
        console.log(response.data,query)
        this.authors = response.data
        this.isLoading = false
      })

    },
    clearAll () {
      this.selectedAuthors = []
    },
    getBook(id){
      ApiConnect.get('/books/'+id).then((response) =>{
        this.book = response.data
        this.selectedAuthors = response.data.authors
      });
    }
  },
  created() {
    this.getBook(this.$route.params.id);
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

</style>