<template>
  <div>
    <NavbarFinal></NavbarFinal>
    <b-container class="edit-reservation-page">
      <b-row v-if="this.reservation.exemplar !== undefined">
        <b-col>
          <h1 class="display-4" >Reservation on book {{this.reservation.exemplar.titleName}}</h1>
        </b-col>
      </b-row>
      <b-form>
        <b-row>
          <b-col>
            <b-form-group
                id="dateFrom-label"
                label="Reserved form:"
                label-for="dateFrom"
            >
              <b-form-input
                  ref="dateFrom"
                  id="dateFrom"
                  v-model="reservation.dateFrom"
                  type="date"
                  placeholder="Enter date from of reservation start"
                  required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
                id="dateUntil-label"
                label="Reserved until:"
                label-for="dateUntil"
            >
              <b-form-input
                  ref="dateUntil"
                  id="dateUntil"
                  v-model="reservation.dateUntil"
                  type="date"
                  placeholder="Enter date until end of reservation"
                  required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
                id="state-label"
                label="state:"
                label-for="state"
            >
              <b-form-input
                  ref="state"
                  id="state"
                  v-model="reservation.state"
                  type="text"
                  placeholder="Enter state of reservation"
                  required
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <label class="typo__label">Select Book</label>
            <multiselect
                v-model="bookSelection"
                :options="data"
                :custom-label="nameWithType"
                placeholder="Select book or magazine"
                label="name"
                track-by="name"
            >

            </multiselect>
          </b-col>
          <b-col>
            <label class="typo__label">Select Exemplar</label>
            <multiselect
                v-model="exemplarSelection"
                :options="exemplars"
                placeholder="Select exemplar"
                label="state"
                track-by="id"
            >

            </multiselect>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <label class="typo__label">Select reader</label>
            <multiselect
                v-model="reservation.reader"
                :options="readers"
                placeholder="Select exemplar"
                label="fullname"
                track-by="id"
            >

            </multiselect>
          </b-col>
        </b-row>
        <b-row v-if="this.reservation.reader !== undefined">
          <b-col>
            <p>
              Reserved for {{ reservation.reader.fullname }}
            </p>
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
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import NavbarFinal from "@/components/main_page/NavbarFinal";
import MyFooter from "@/components/main_page/MyFooter";
import ApiConnect from "@/services/ApiConnect";
import Multiselect from "vue-multiselect";

Date.prototype.toDateInputValue = (function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0,10);
});

export default {
  name: "EditReservation",
  components: {
    Multiselect,
    NavbarFinal,
    MyFooter,
  },
  data () {
    return {
      reservation: {},
      books: [],
      magazines: [],
      data: [],
      selectedBook: undefined,
      exemplars: [],
      selectedExemplar: undefined,
      readers: [],
    }
  },
  methods: {
    getReservation(id){
      ApiConnect.get('/reservations/'+id).then(response => {
        console.log(response.data)
        this.reservation = response.data
        this.reservation.dateFrom = new Date(this.reservation.dateFrom).toDateInputValue()
        this.reservation.dateUntil = new Date(this.reservation.dateUntil).toDateInputValue()
        if(response.data.exemplar.book !== undefined) {
          ApiConnect.get('/books/'+response.data.exemplar.book.id).then(resp =>
            this.selectedBook = resp.data
          )
        }else{
          ApiConnect.get('/magazines/'+response.data.exemplar.magazine.id).then(resp =>
              this.selectedBook = resp.data
          )
        }

      })
    },
    submit(){
      ApiConnect.put('/reservations', this.reservation).then((response) =>{
        this.makeToast('Reservation on book'+this.reservation.exemplar.titleName +' has been updated successfully.')
      }).catch(error => {
        console.log(error)
      })
    },
    create(){
      ApiConnect.post('/reservations', this.reservation).then((response) =>{
        this.makeToast('Reservation on book '+this.reservation.exemplar.titleName+' has been created successfully.')
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
      ApiConnect.get('/reservations/').then(resp =>{
        this.$router.push('/edit_reservations/'+(resp.data[resp.data.length -1].id+1))
      })

    },
    makeToast(text) {
      this.$bvToast.toast(text, {
        title: 'Library',
        variant: 'success',
        autoHideDelay: 5000,
      })
    },
    nameWithType ({ name, issn, isbn }) {
      if (issn != undefined) return `${name} — [magazine]`
      if (isbn != undefined) return `${name} — [book]`
    },
    getData(){
      ApiConnect.get('/books/').then(resp =>{
        this.books = resp.data;
        ApiConnect.get('/magazines/').then(response =>{
          this.magazines = response.data;
          this.data = this.data.concat(this.books,this.magazines);
        })
      })
    },
    getReaders(){
      ApiConnect.get('/readers/').then(resp =>{
        this.readers = resp.data
      })
    }
  },
  created() {
    if(this.$route.params.id == 0){
      this.reservation = {
        id: 0,
        dateFrom: new Date().toDateInputValue(),
        dateUntil: undefined,
        exemplar: undefined,
        state: 'ACTIVE'
      }
    }else {
      this.getReservation(this.$route.params.id);
    }
    this.getData();
    this.getReaders();
  },
  computed: {
    bookSelection: {
      get() {
        if(this.reservation.exemplar !== undefined){
          this.exemplars = this.selectedBook.hardCopyExemplars
        }
        return this.selectedBook
      },
      set(newValue) {
        this.reservation.exemplar = undefined
        this.exemplars = newValue.hardCopyExemplars
        this.selectedBook = newValue
      }
    },
    exemplarSelection: {
      get() {
        return this.reservation.exemplar
      },
      set(newValue) {
        this.reservation.exemplar = newValue
      }
    }
  }
}
</script>

<style scoped>
.edit-reservation-page{
  color: black;
  text-align: left;
}
</style>