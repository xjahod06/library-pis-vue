<template>
<div>
  <NavbarFinal></NavbarFinal>
      <b-container class="edit_hard-copy-borrowings">
      <b-form @submit.prevent="submit">
        <b-row class="text-left">
          <b-col>
            <b-form-group
                id="state-label"
                label="ID:"
                label-for="state"
            >
              <b-form-input readonly
                  ref="state"
                  id="state"
                  v-model="borrowing.id"
                  type="number"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
                id="state-label"
                label="State:"
                label-for="state"
            >
              <b-form-input readonly
                  ref="state"
                  id="state"
                  v-model="borrowing.state"
                  type="text"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col v-if="isReturned === false">
            <b-form-group
                id="state-label"
                label="Borrowed by:"
                label-for="reader"
            >
            <b-form-input readonly
                  ref="reader.fullname"
                  id="reader.fullname"
                  v-model="borrowing.reader.fullname"
                  type="text"
              ></b-form-input>
            </b-form-group>
          </b-col>
          </b-row>
          <b-row>
          <b-col>
            <b-form-group
                id="start-date-label"
                label="Borrowed from:"
                label-for="dateOfBorrowStart"
            >
            <div class="box">
              <section>
                <date-picker v-model="borrowing.dateOfBorrowStart" value-type="timestamp"></date-picker>
              </section>
            </div>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
                id="start-date-label"
                label="Borrowed until:"
                label-for="dateOfBorrowStart"
            >
            <div class="box">
              <section>
                <date-picker v-model="borrowingEnds" value-type="timestamp"></date-picker>
              </section>
            </div>
            </b-form-group>
          </b-col>
            <b-col>

            </b-col>
          <b-col v-show="isReturned">
            <b-form-group
                id="return-date-label"
                label="Return date:"
                label-for="returnDate"
            >
            <div class="box">
              <section>
                <date-picker v-model="returnDate" value-type="timestamp"></date-picker>
              </section>
            </div>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
        <b-col>
          <font-awesome-icon icon="fa-solid fa-book-open " @click="getExemplar" size="4x" v-b-modal.modal-preview type="button" class="preview"/>
        </b-col>
        <b-col>
            <b-form-group
                id="borrowCounter-label"
                label="Borrow Counter:"
                label-for="borrowCounter"
            >
              <b-form-input readonly
                  ref="borrowCounter"
                  id="borrowCounter"
                  v-model="borrowing.borrowCounter"
                  type="number"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-col class="text-center mt-4">
          <b-button @click="submit" variant="primary">Update</b-button>
        </b-col>
      </b-form>
    </b-container>
    <b-modal id="modal-preview" title="Preview" size="xl" hide-footer>
      <b-row v-if="isBook">
        <b-col cols="4">
          <BookTitle
              :img="exemplar_parent.coverPhotoPath"
              format="book"
              :publisher="exemplar_parent.publisher"
              :released="new Date(exemplar_parent.publicationDate)"
              :pages="exemplar_parent.pages"
              :hardCopies="exemplar_parent.hardCopyExemplars"
              :electronicCopies="exemplar_parent.electronicCopyExemplars"
          >
          </BookTitle>
        </b-col>
        <b-col cols="8">
          <BookInfo
              :title="exemplar_parent.name"
              :publicationNumber="''+exemplar_parent.publicationNumber"
              :authors="exemplar_parent.authors"
              :isbn="exemplar_parent.isbn"
              :genres="exemplar_parent.genres"
              :description="exemplar_parent.description"
          >
          </BookInfo>
        </b-col>
      </b-row>
      <b-row v-else>
        <b-col cols="4">
          <BookTitle
              :img="exemplar_parent.coverPhotoPath"
              format="magazine"
              :publisher="exemplar_parent.publisher"
              :released="new Date(exemplar_parent.publicationDate)"
              :pages="exemplar_parent.pages"
              :hardCopies="exemplar_parent.hardCopyExemplars"
              :electronicCopies="exemplar_parent.electronicCopyExemplars"
          >
          </BookTitle>
        </b-col>
        <b-col cols="8">
          <BookInfo
              :title="exemplar_parent.name"
              :publicationNumber="''+exemplar_parent.publicationNumber"
              :authors="exemplar_parent.authors"
              :isbn="exemplar_parent.isbn"
              :genres="exemplar_parent.genres"
              :description="exemplar_parent.description"
          >
          </BookInfo>
        </b-col>
      </b-row>
    </b-modal>
    </div>
</template>

<script>
import ApiConnect from "@/services/ApiConnect";
import BookInfo from "@/components/book_page/BookInfo";
import BookTitle from "@/components/book_page/BookTitle";
import * as file from "../assets/js/file.js"
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import NavbarFinal from "@/components/main_page/NavbarFinal";
library.add(faBookOpen)

export default {
    components: {
        DatePicker,
        BookTitle,
        BookInfo,
      NavbarFinal
    },
    data() {
        return {
          borrowing: {},
          borrowingStarts: null,
          borrowingEnds: null,
          returnDate: null,
          isMagazine: false,
          isBook: false,
          isReturned: false,
          exemplar_parent: {},
          magazine: {},
          exemplar: {},
          fieldsFines: [
        {key: 'amount', sortable: true},
        {key: 'state', sortable: true},
        {key: 'borrowing_name', sortable: true},
        {key: 'reader', sortable: true},
        {key: 'pay', sortable: false},
        {key: 'delete', sortable: false},
      ]
        } 
    },
    methods: {
        getBorrowing(id){
          ApiConnect.get('/hard-copy-borrowings/'+id).then((response) =>
          {
            this.borrowing = response.data;
            this.borrowingStarts = this.borrowing.dateOfBorrowStart;
            this.borrowingEnds = this.borrowing.dateOfBorrowEnd;
            this.returnDate = this.borrowing.returnDate != null ? this.setReturnDate(true, this.borrowing.returnDate) : this.setReturnDate(false, null);
            if (this.borrowing.exemplar.book == null)
            {
              this.isMagazine = true;
              this.isBook = false;
              this.magazine = this.borrowing.exemplar.magazine;
            }
            else
            {
              this.isMagazine = false;
              this.isBook = true;
              this.book = this.borrowing.exemplar.book;
            }
          }).catch((error) =>
          {
            console.log(error);
          })
        },
        setReturnDate(bool, date)
        {
          this.isReturned = bool;
          return date || null;
        },
        submit(){
          this.borrowing.dateOfBorrowStart = this.borrowingStarts;
          this.borrowing.dateOfBorrowEnd =  this.borrowingEnds;
          this.borrowing.returnDate =  this.returnDate;
          ApiConnect.put('/hard-copy-exemplars', JSON.stringify(this.borrowing)).then((response) =>{
            this.makeToast('Borrowing '+this.borrowing.id+' has been updated successfully.')
          }).catch(error => {
          console.log(error)
          })
        },
        getExemplar(){
          if (this.isBook)
          {
            ApiConnect.get('/books/'+this.borrowing.exemplar.book.id).then((response) =>
            {
              console.log(response);
              this.exemplar_parent = response.data;
            }
            ).catch((error) => console.log(error))
          }
          else
          {
            ApiConnect.get('/magazines/'+this.borrowing.exemplar.magazine.id).then((response) =>
            {
              console.log(response);
              this.exemplar_parent = response.data;
            }
            ).catch((error) => console.log(error))
          }
        },
        makeToast(text) {
      this.$bvToast.toast(text, {
        title: 'Library',
        variant: 'success',
        autoHideDelay: 5000,
      })
    },
  },
  created() {
          this.getBorrowing(this.$route.params.id);
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