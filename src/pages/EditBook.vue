<template>
  <div>
    <NavbarFinal></NavbarFinal>
    <b-container class="edit-book-page">
      <b-row class="text-center mb-4">
        <b-col>
          <b-button v-b-modal.modal-1>preview book page</b-button>
        </b-col>
      </b-row>
      <b-form @submit.prevent="submit">
        <b-row>
          <b-col>
            <b-form-group
                id="title-label"
                label="Title:"
                label-for="title"
            >
              <b-form-input
                  ref="title"
                  id="title"
                  v-model="book.name"
                  type="text"
                  placeholder="Enter book title"
                  required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
                id="language-label"
                label="Language:"
                label-for="lang"
            >
              <b-form-input
                  ref="lang"
                  id="lang"
                  v-model="book.language"
                  type="text"
                  placeholder="Enter book Language"
                  required
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group
                id="publisher-label"
                label="Publisher:"
                label-for="publisher"
            >
              <b-form-input
                  ref="publisher"
                  id="publisher"
                  v-model="book.publisher"
                  type="text"
                  placeholder="Enter book publisher"
                  required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
                id="isbn-label"
                label="ISBN:"
                label-for="isbn"
            >
              <b-form-input
                  ref="isbn"
                  id="isbn"
                  v-model="book.isbn"
                  type="number"
                  placeholder="Enter book isbn"
                  required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
                id="publicationDate-label"
                label="Publication date:"
                label-for="lang"
            >
              <b-form-input
                  ref="publicationDate"
                  id="publicationDate"
                  v-model="book.publicationDate"
                  type="date"
                  placeholder="Enter date when book was published"
                  required
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group
                id="publicationNumber-label"
                label="publication number:"
                label-for="publicationNumber"
            >
              <b-form-input
                  ref="publicationNumber"
                  id="publicationNumber"
                  v-model="book.publicationNumber"
                  type="Number"
                  placeholder="Enter book publication number"
                  required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
                id="pages-label"
                label="pages:"
                label-for="pages"
            >
              <b-form-input
                  ref="pages"
                  id="pages"
                  v-model="book.pages"
                  type="Number"
                  placeholder="Enter number of book pages"
                  required
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <label class="typo__label" for="authors">Authors</label>
            <multiselect
                v-model="book.authors"
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
                :limit-text="limitTextAuthor"
                :max-height="600"
                :show-no-results="false"
                :hide-selected="true"
                @search-change="asyncFindAuthor"
            >
              <!--
              <template slot="tag" slot-scope="{ option, remove }">
                <b-badge pill variant="primary">{{ option.name }} <b-icon icon="x" scale="2" @click="remove(option)" type="button"></b-icon></b-badge>
              </template>-->
              <template slot="clear" slot-scope="props">
                <div class="multiselect__clear" v-if="book.authors.length" @mousedown.prevent.stop="clearAll(props.search)"></div>
              </template>
              <template slot="noResult">
                <span>Oops! No authors found. Consider changing the search query.</span>
              </template>
            </multiselect>
          </b-col>
          <b-col>
            <label class="typo__label">Simple select / dropdown</label>
            <multiselect
                v-model="book.genres"
                :options="genres"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                placeholder="Pick some"
                label="name"
                track-by="name"
                :preselect-first="true">
              <template slot="clear" slot-scope="props">
                <div class="multiselect__clear" v-if="book.genres.length" @mousedown.prevent.stop="clearAll(props.search)"></div>
              </template>
              <template slot="noResult">
                <span>Oops! No Genres found. Consider changing the search query.</span>
              </template>
            </multiselect>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col>
            <label for="description">Description:</label>
            <b-form-textarea
                id="description"
                placeholder="Tall textarea"
                rows="8"
                v-model="book.description"
            ></b-form-textarea>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="text-center mt-4">
            <b-button @click="submit" variant="primary">Update</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-container>
  <!--<pre class="language-json"><code>{{ selectedCountries  }}</code></pre>-->
    <MyFooter></MyFooter>
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
      authors: [],
      isLoading: false,
      genres: [],
      isLoadingGenre: false,
      book: {},
    }
  },
  methods: {
    limitTextAuthor (count) {
      return `and ${count} other authors`
    },
    asyncFindAuthor(query) {
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
      });
    },
    getGenres(){
      ApiConnect.get('/genres/').then((response) =>{
        this.genres = response.data
      })
    },
    submit(){
      ApiConnect.put('/books', this.book).then((response) =>
        console.log(response)
      ).catch(error => {
        console.log(error)
      })
    }
  },
  created() {
    this.getBook(this.$route.params.id);
    this.getGenres();
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.edit-book-page{
  color: black;
  text-align: left;
}
</style>