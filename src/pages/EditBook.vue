<template>
  <div>
    <NavbarFinal></NavbarFinal>
    <b-container class="edit-book-page">
      <b-row class="text-center">
        <b-col>
          <font-awesome-icon icon="fa-solid fa-display" size="4x" v-b-modal.modal-preview type="button" class="preview"/>
        </b-col>
      </b-row>
      <b-row class="text-center mb-4">
        <b-col>
          preview book page
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
                  v-model="new Date(book.publicationDate).toDateInputValue()"
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
                  type="number"
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
                  type="number"
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
            <label class="typo__label">Genres</label>
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
          <b-col cols="6" class="text-left"><label>Cover photo</label><br>
            <div style="position: initial">
              <b-form-file
                  v-model="coverPhoto"
                  placeholder="Choose a file or drop it here..."
                  drop-placeholder="Drop file here..."
              ></b-form-file>
            </div>
          </b-col>
        </b-row>
        <b-row class="mt-3" v-if="this.$route.params.id != 0">
          <b-col cols="6" class="text-left">
            <label >Hard exemplars</label><br>
            <div class="dropdown-menu d-block" style="position: initial">
              <template v-for="hardCopy in book.hardCopyExemplars">
                <span v-if="hardCopy.availability === false" class="dropdown-item text-danger">
                  state: {{ hardCopy.state }}, not available
                </span>
                <span v-if="hardCopy.availability !== false" class="dropdown-item text-success">
                  state: {{ hardCopy.state }}, available
                </span>
              </template>
            </div>
          </b-col>
          <b-col cols="6" class="text-left">
            <label >Electronic exemplars</label><br>
            <div class="dropdown-menu d-block" style="position: initial">
              <template v-for="Copy in book.electronicCopyExemplars">
                <span v-if="Copy.availability === false" class="dropdown-item text-danger">
                  state: {{ Copy.state }}, not available
                </span>
                <span v-if="Copy.availability !== false" class="dropdown-item text-success">
                  state: {{ Copy.state }}, available
                </span>
              </template>
            </div>
          </b-col>
        </b-row>
        <b-row class="mt-3" v-if="this.$route.params.id != 0">
          <b-col>
            <b-button variant="success" class="ml-4"  v-b-modal.modal-addHardCopy> Add </b-button>
          </b-col>
          <b-col>
            <b-button variant="success" class="ml-4"  v-b-modal.modal-addElectronicCopy> Add </b-button>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col>
            <label>Description:</label>
            <b-form-textarea
                id="description"
                placeholder="Description"
                rows="8"
                v-model="book.description"
            ></b-form-textarea>
          </b-col>
        </b-row>
        <b-row v-if="this.$route.params.id != 0">
          <b-col class="text-center mt-4">
            <b-button @click="submit" variant="primary">Update</b-button>
          </b-col>
        </b-row>
        <b-row v-if="this.$route.params.id == 0">
          <b-col class="text-center mt-4">
            <b-button @click="create" variant="success">Create</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-container>
  <!--<pre class="language-json"><code>{{ selectedCountries  }}</code></pre>-->
    <MyFooter></MyFooter>
    <b-modal id="modal-preview" title="Preview" size="xl" hide-footer>
      <b-row>
        <b-col cols="4">
          <BookTitle
              :img="imgPreview"
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
    <b-modal
        id="modal-addElectronicCopy"
        title="Add electronic copy"
        hide-footer
        ref="addElectronicCopy"
    >
      <b-form @submit.prevent="submit">
        <b-form-group
            id="maximumNumberOfExtension-label"
            label="Maximum number of extension:"
            label-for="maximumNumberOfExtension"
        >
          <b-form-input
              ref="maximumNumberOfExtension"
              id="maximumNumberOfExtension"
              v-model="electronicExtension"
              type="number"
              placeholder="Enter maximum number of borrowing extension"
              required
          ></b-form-input>
        </b-form-group>
        <b-form-group
            id="borrowPeriod-label"
            label="Borrow period:"
            label-for="borrowPeriod"
        >
          <b-form-input
              ref="borrowPeriod"
              id="borrowPeriod"
              v-model="electronicPeriod"
              type="number"
              placeholder="Enter maximus day that book could be borrowed"
              required
          ></b-form-input>
        </b-form-group>
        <b-button variant="success" class="ml-4" @click="addElectronicExample"> Add electronic copy </b-button>
      </b-form>
    </b-modal>
    <b-modal
        id="modal-addHardCopy"
        title="Add hard copy"
        hide-footer
        ref="addHardCopy"
    >
      <b-form @submit.prevent="submit">
        <b-form-group
            id="maximumNumberOfExtension-label"
            label="Maximum number of extension:"
            label-for="maximumNumberOfExtension"
        >
          <b-form-input
              ref="maximumNumberOfExtension"
              id="maximumNumberOfExtension"
              v-model="hardExtension"
              type="number"
              placeholder="Enter maximum number of borrowing extension"
              required
          ></b-form-input>
        </b-form-group>
        <b-form-group
            id="borrowPeriod-label"
            label="Borrow period:"
            label-for="borrowPeriod"
        >
          <b-form-input
              ref="borrowPeriod"
              id="borrowPeriod"
              v-model="hardPeriod"
              type="number"
              placeholder="Enter maximus day that book could be borrowed"
              required
          ></b-form-input>
        </b-form-group>
        <b-form-group
            id="state-label"
            label="Books state:"
            label-for="state"
        >
          <b-form-input
              ref="state"
              id="state"
              v-model="hardState"
              type="text"
              placeholder="Enter exemplar state"
              required
          ></b-form-input>
        </b-form-group>
        <b-button variant="success" class="ml-4" @click="addHardExample"> Add hard copy </b-button>
      </b-form>
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
import * as file from "../assets/js/file.js"

Date.prototype.toDateInputValue = (function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0,10);
});

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
      electronicExtension: 1,
      electronicPeriod: 42,
      hardExtension: 1,
      hardPeriod: 42,
      hardState: 'NEW',
      coverPhoto: null
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
      if (this.coverPhoto !== null){
        console.log(this.coverPhoto);
        this.coverPhoto = file.renameFile(this.coverPhoto);
        console.log(this.coverPhoto);

      }
      let formData = new FormData();

      formData.append('file', this.coverPhoto, this.coverPhoto.name);
      ApiConnect.post('uploadFile', formData).then((response)=> {
        console.log(response.data.fileDownloadUri);
        let filePath = response.data.fileDownloadUri;
        this.book.coverPhotoPath = filePath;
        ApiConnect.put('/books', this.book).then((response) =>{
          console.log(response)
          this.makeToast('Book '+this.book.name+' has been updated successfully.')
        }).catch(error => {
          console.log(error)
        })
      })


    },
    async create(){
      if (this.coverPhoto !== null){
        var fileBuffer = await this.convertFileToArrayBuffer();
        var array = new Uint8Array(fileBuffer);
        this.book.coverPhoto = Array.from(array);
      }
      ApiConnect.post('/books', this.book).then((response) =>{
        console.log(response)
        this.makeToast('Book '+this.book.name+' has been created successfully.')
      }).catch(error => {
        console.log(error)
      })
      ApiConnect.get('/books/').then(resp =>{
        this.$router.push('/edit_books/'+(resp.data[resp.data.length -1].id+1))
      })
    },
    convertFileToArrayBuffer(){
      return new Promise((resolve, reject) => {
        try {
          if (this.coverPhoto !== null){
            resolve(this.coverPhoto.arrayBuffer());
          }

        }
        catch (e){
          reject (e);
        }
      })
    },
    makeToast(text) {
      this.$bvToast.toast(text, {
        title: 'Library',
        variant: 'success',
        autoHideDelay: 5000,
      })
    },
    addElectronicExample() {
      this.$refs.addElectronicCopy.hide();
      let electronicExample = {};
      electronicExample.availability = true;
      electronicExample.book = this.book;
      electronicExample.borrowPeriod = this.electronicPeriod;
      electronicExample.maximumNumberOfExtension = this.electronicExtension;
      electronicExample.state = "ELECTRONIC";
      electronicExample.titleName = this.book.name;
      electronicExample.id = 0;
      ApiConnect.post('/electronic-copy-exemplars',electronicExample).then(response => {
        console.log(response);
      })
      this.makeToast('Electronic copy was added successfully.')
      ApiConnect.get('/books/'+this.book.id).then((response) =>{
        this.book.electronicCopyExemplars = response.data.electronicCopyExemplars
      });
    },
    addHardExample() {
      this.$refs.addHardCopy.hide();
      let hardExample = {};
      hardExample.availability = true;
      hardExample.book = this.book;
      hardExample.borrowPeriod = this.hardPeriod;
      hardExample.maximumNumberOfExtension = this.hardExtension;
      hardExample.state = this.hardState;
      hardExample.titleName = this.book.name;
      hardExample.id = 0;
      ApiConnect.post('/hard-copy-exemplars',hardExample).then(response => {
        console.log(response);
      })
      this.makeToast('Hard copy was added successfully.')
      ApiConnect.get('/books/'+this.book.id).then((response) =>{
        this.book.hardCopyExemplars = response.data.hardCopyExemplars
      });
    }
  },
  created() {
    if(this.$route.params.id == 0){
      this.book = {
            id: 0,
            name: '',
            description: '',
            publisher: '',
            language: '',
            coverPhoto: '',
            authors: [],
            hardCopyExemplars: [],
            electronicCopyExemplars: [],
            isbn: undefined,
            publicationNumber: undefined,
            publicationDate: new Date(),
            pages: '',
            genres: [],
      }
    }else{
      this.getBook(this.$route.params.id);
    }
    this.getGenres();
  },
  computed: {
    hasElectronicCopy (){
      if (this.book !== 'undefined'){
        if (this.book.electronicCopyExemplars.length > 0	){
          return true;
        }
      }

      return false;
    },
    imgPreview: function() {
      if (this.coverPhoto !== null){
        this.convertFileToArrayBuffer().then(fileBuffer => {
          var array = new Uint8Array(fileBuffer);
          this.book.coverPhoto = Array.from(array);
        });

      }
      return this.book.coverPhoto;
    }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.edit-book-page{
  color: black;
  text-align: left;
}
.preview{
  color: #24433e;
  box-shadow: 0 6px 10px rgba(0,0,0,0), 0 0 6px rgba(0,0,0,0);
  transition: .3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12);
}
.preview:hover{
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06);
}
</style>