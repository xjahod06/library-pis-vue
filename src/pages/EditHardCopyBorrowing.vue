<template>
<div>
      <NavbarFinal></NavbarFinal>
        <b-container class="edit_hard-copy-borrowings">
            <b-row class="text-center">
        <b-col>
          <font-awesome-icon icon="fa-solid fa-display" size="4x" v-b-modal.modal-preview type="button" class="preview"/>
        </b-col>
      </b-row>
      <b-row class="text-center mb-4">
        <b-col>
          preview borrow hard copy page
        </b-col>
      </b-row>
      <b-form @submit.prevent="submit">
        <b-row class="text-left">
          <b-col>
            <b-form-group
                id="start-date-label"
                label="Range of borrowing:"
                label-for="dateOfBorrowStart"
            >
            <div class="box">
              <section>
                <date-picker v-model="borrowingStarts" @selected="Start" value-type="timestamp"></date-picker>
                <date-picker v-model="borrowingEnds" @selected="End" value-type="timestamp"></date-picker>
              </section>
            </div>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
                id="state-label"
                label="State:"
                label-for="state"
            >
              <b-form-input
                  ref="state"
                  id="state"
                  v-model="borrowing.state"
                  type="text"
                  placeholder="Edit item state"
                  required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
                id="state-label"
                label="Borrowed by:"
                label-for="state"
            >
              
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group
                id="borrowCounter-label"
                label="Borrow Counter:"
                label-for="borrowCounter"
            >
              <b-form-input
                  ref="borrowCounter"
                  id="borrowCounter"
                  v-model="borrowing.borrowCounter"
                  type="number"
                  placeholder="Enter book publisher"
                  required
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
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
        <b-col v-show="isBook">
         <a>Title: {{ book.name }}</a>
          <p>Language: {{ book.language }} </p>
        </b-col>
        <b-col v-show="isMagazine">
          <p>Title: {{ magazine.name }}</p>
          <p>Language: {{ magazine.language }} </p>
        </b-col>
        </b-row>
        <b-col class="text-center mt-4">
          <b-button @click="submit" variant="primary">Update</b-button>
        </b-col>
      </b-form>
    </b-container>
    <MyFooter></MyFooter>
    </div>
</template>

<script>
import NavbarFinal from "@/components/main_page/NavbarFinal";
import MyFooter from "@/components/main_page/MyFooter";
import ApiConnect from "@/services/ApiConnect";
import BookTitle from "@/components/book_page/BookTitle";
import * as file from "../assets/js/file.js"
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

Date.prototype.toDateInputValue = (function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0,10);
});

export default {
    components: {
        MyFooter,
        NavbarFinal,
        DatePicker,
        BookTitle
    },
    data() {
        return {
          borrowing: {},
          borrowingStarts: null,
          borrowingEnds: null,
          returnDate: null,
          isMagazine: false,
          isBook: false,
          book: {},
          magazine: {}
        } 
    },
    methods: {
        getBorrowing(id){
          ApiConnect.get('/hard-copy-borrowings/'+id).then((response) =>
          {
            console.log(response);
            this.borrowing = response.data;
            this.borrowingStarts = this.borrowing.dateOfBorrowStart;
            this.borrowingEnds = this.borrowing.dateOfBorrowEnd;
            this.returnDate = this.borrowing.returnDate;
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
        submit(){
          console.log(this.borrowingStarts);
          console.log(this.borrowingEnds);
          console.log(this.borrowing);
        }
  },
  created() {
          this.getBorrowing(this.$route.params.id);
        }
}
</script>