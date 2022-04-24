<template>
  <div id="book-title" class="text-center">
    <b-alert class="mt-2" v-model="showDismissibleAlertBorrow" variant="success" dismissible>
      {{ alertMessage }}</b-alert>
    <b-alert class="mt-2" v-model="showDismissibleAlertErrorBorrow" variant="danger" dismissible>
      {{alertMessage}}</b-alert>
    <b-row>
      <b-col>
        <b-img class="book-cover" :src="img" alt="Book cover" ></b-img>
      </b-col>
    </b-row>
    <b-row class="text-left">
      <b-col v-if="loggedUser" offset-md="2">
        <b-button @click="showModalReservation" variant="info" class="mr-2"> Reserve </b-button>
        <b-button v-if="hasElectronicCopy" @click="borrowEcopy" variant="success">Borrow electronic copy</b-button>
      </b-col>
    </b-row>

    <!--MODAL RESERVATION--->
    <b-modal ref="new-reservation" hide-footer title="Create new reservation">
      <div class="d-block text-center">
        <b-alert class="mt-2" v-model="showDismissibleAlert" variant="success" dismissible>
          {{ alertMessage }}</b-alert>
        <b-alert class="mt-2" v-model="showDismissibleAlertError" variant="danger" dismissible>
          {{alertMessage}}</b-alert>

        <p style="text-align: left" class="form-label" >Select start date*:</p>
        <b-form-datepicker id="example-datepickerRes"
                           v-model="dateFrom"
                           placeholder="Choose new date"
                           class="mb-2">
        </b-form-datepicker>
        <p style="text-align: left" class="form-label" >Select end date*:</p>
        <b-form-datepicker id="example-datepickerRes2"
                           v-model="dateTo"
                           placeholder="Choose new date"
                           class="mb-2">
        </b-form-datepicker>
        <p style="text-align: left" class="form-label" >Select hard copy*:</p>
        <b-form-select v-model="selectedHardCopy" :options="hardCopiesOptions"></b-form-select>

      </div>
      <b-button class="mt-3" variant="outline-primary" block @click="makeReservation">Save</b-button>
    </b-modal>


    <b-row align-h="center" class="mt-3">
      <b-col cols="4" class="text-right text-dark h5">
        Format
      </b-col>
      <b-col cols="4" class="text-left text-dark">
        {{ format }}
      </b-col>
    </b-row>
    <b-row align-h="center" class="mt-3">
      <b-col cols="4" class="text-right text-dark h5">
        Publisher
      </b-col>
      <b-col cols="4" class="text-left text-dark">
        {{ publisher }}
      </b-col>
    </b-row>
    <b-row align-h="center" class="mt-3" v-if="released !== undefined">
      <b-col cols="4" class="text-right text-dark h5">
        Released
      </b-col>
      <b-col cols="4" class="text-left text-dark">
        {{ released | formatDate }}
      </b-col>
    </b-row>
    <b-row align-h="center" class="mt-3" v-if="pages !== undefined">
      <b-col cols="4" class="text-right text-dark h5">
        Pages
      </b-col>
      <b-col cols="4" class="text-left text-dark">
        {{ pages }}
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ApiConnect from "@/services/ApiConnect";

export default {
  name: "BookTitle",
  props: {
    img: [],
    format: String,
    publisher: String,
    released: Date,
    pages: Number,
    hasElectronicCopy: Boolean,
    hardCopies: [],
    electronicCopies: []
  },
  data (){
    return {
      showDismissibleAlert: false,
      showDismissibleAlertError: false,
      showDismissibleAlertBorrow: false,
      showDismissibleAlertErrorBorrow: false,
      alertMessage: '',
      dateFrom: new Date(),
      dateTo: new Date(),
      selectedHardCopy: null
    }
  },
  methods: {
    showModalReservation() {
      this.$refs['new-reservation'].show()
    },
    showModalBorrow() {
      this.$refs['new-borrow'].show()
    },
    makeReservation(){
      let bookId = this.$route.params.id;
      let reservation = {}
      reservation.id = 0;

      let today = new Date();
      today.setHours(23,59,59,59);

      let startDate = new Date(this.dateFrom);
      startDate.setHours(23,59,59,59);

      let endDate = new Date(this.dateTo);
      endDate.setHours(23,59,59,59);

      if (startDate < today){
        this.showDismissibleAlertError = true;
        this.showDismissibleAlert = false;
        this.alertMessage = "Reservation can not start before today";
      }
      else if (startDate > endDate){
        this.showDismissibleAlertError = true;
        this.showDismissibleAlert = false;
        this.alertMessage = "Reservation can not end before starting.";
      }
      else if (startDate < endDate){
        reservation.state = 'ACTIVE';
        reservation.dateFrom = startDate;
        reservation.dateUntil = endDate;
        reservation.exemplar = this.selectedHardCopy;
        let user = {};
        user.id = parseInt(localStorage.getItem('id')); // todo mozno to zmenit na id
        reservation.reader= user;

        ApiConnect.post('/reservations', reservation).then(response => {
          this.showDismissibleAlert = true;
          this.showDismissibleAlertError = false;
          this.alertMessage = "Reservation succesfully created.";
        }).catch(error => {
          this.showDismissibleAlertError = true;
          this.showDismissibleAlert = false;
          this.alertMessage = "Error while creating reservation.";
        })
      }
      else {
        this.showDismissibleAlertError = true;
        this.showDismissibleAlert = false;
        this.alertMessage = "Reservation can not end the same day as starting.";
      }
    },

    borrowEcopy(){
      if (confirm("Do you really want to borrow electronic copy?")){
        let borrowing = {};
        borrowing.id = 0;
        borrowing.dateOfBorrowStart = new Date();

        let ecopy = this.electronicCopies[0];

        let borrowPeriod = ecopy.borrowPeriod;
        let dateTo = new Date();

        dateTo.setDate(dateTo.getDate() + borrowPeriod);
        borrowing.dateOfBorrowEnd = dateTo ;
        borrowing.borrowCounter = 1;
        borrowing.electronicCopy = ecopy;

        let user = {};
        user.id = parseInt(localStorage.getItem('id'));

        borrowing.reader = user;
        ApiConnect.post('/electronic-copy-borrowings', borrowing).then(response => {
          this.showDismissibleAlertBorrow = true;
          this.showDismissibleAlertErrorBorrow = false;
          this.alertMessage = "Succesfully borrowed electronic copy.";
          // todo link na stiahnutie suboru
        }).catch(error => {
          this.showDismissibleAlertError = true;
          this.showDismissibleAlert = false;
          this.alertMessage = "Error while borrowing electronic copy.";
        })
      }
    }
  },
  computed: {
    hardCopiesOptions: function(){
      let exemplars = []
      let counter = 1;
      for (let ex of this.hardCopies){
        let selectOption = {};
        selectOption.value = ex;
        selectOption.text = 'Exemplar ' + counter + '( state: '+ ex.state.toLowerCase() +')';
        if (counter === 1) this.selectedHardCopy=ex;
        counter += 1
        exemplars.push(selectOption);
      }
      return exemplars;
    },
    loggedUser: function (){
      if (localStorage.getItem('role') === "\"READER\"") return true;
      return false;
    }

  }

}
</script>

<style scoped>

</style>