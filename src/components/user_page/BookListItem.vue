<template>
  <div>
    <b-row>
      <b-col cols="2"><b-img class="book-user-img" src="@/assets/logo.png"></b-img>
        <div id="type">
          <h5>{{ type }}</h5>
        </div></b-col>
      <b-col cols="3"><p class="book-user-text">{{name}}</p></b-col>
      <b-col cols="3"><p class="book-user-text">
        <b>From: </b>{{ dateFrom | formatDate }}<br>
        <b>To: </b>{{ dateTo | formatDate }}
        </p></b-col>
      <b-col cols="2" style="padding-top: 20px;" align="left"><h3>
        <b-badge
            v-if="state === 'ACTIVE'"
            variant="success">{{state}}</b-badge>
        <b-badge
            v-if="state === 'CAN_NOT_PROLONG' || state === 'TO_PICK_UP'"
            variant="warning">{{state}}</b-badge>
        <b-badge v-if="state === 'TO_RETURN'"
                 variant="danger">{{state}}</b-badge>
        <b-badge v-if="state === 'RETURNED' || state === 'NOT_ACTIVE'"
                 variant="info" >{{state}}</b-badge>
      </h3></b-col>
      <b-col class="mt-3">

        <div  v-if="canManipulate">
          <b-button v-if="!borrowing"
                    @click="deleteReservation"
                    align="right"
                    variant="danger">Cancel</b-button>
          <br v-if="! borrowing">

          <b-button  class="mt-3"
                     @click="showModal"
                     align="right"
                     variant="warning">Prolong</b-button>

          <b-modal ref="my-modal" hide-footer title="Change date." @hidden="onHidden">
            <div class="d-block text-center">
              <b-alert class="mt-2" v-model="showDismissibleAlert" variant="success" dismissible>
                {{ successMessage }}</b-alert>
              <b-alert class="mt-2" v-model="showDismissibleAlertError" variant="danger" dismissible>
                {{errorMessage}}</b-alert>
              <b-form-datepicker id="example-datepicker"
                                 v-model="dateToNew"
                                 placeholder="Choose new date"
                                 class="mb-2">
              </b-form-datepicker>            </div>
            <b-button v-if="!borrowing" class="mt-2" variant="outline-primary" block @click="prolongReservation">Save</b-button>
            <b-button v-else-if="!electronic" class="mt-2" variant="outline-primary" block @click="prolongBorrowing">Save</b-button>
            <b-button v-if="electronic" class="mt-2" variant="outline-primary" block @click="prolongElectronicBorrowing">Save</b-button>

          </b-modal>
        </div>
      </b-col>
    </b-row>
  </div>
</template>


<script>
import ApiConnect from "@/services/ApiConnect";

export default {
  name: 'BookListItem',
  props: {
    name: String,
    dateFrom: Date,
    dateTo: Date,
    state: String,
    type: String,
    borrowing: Boolean,
    id: Number,
    user: {},
    data: {},
    electronic: Boolean
  },
  data() {
    return {
      showDismissibleAlert: false,
      showDismissibleAlertError: false,
      successMessage: '',
      errorMessage: '',
      dateToNew: this.dateTo,
    }
  },
  methods: {
    deleteReservation(){
      if (confirm("Do you really want to delete reservation?")){
        ApiConnect.delete('reservations/' + this.id).then(response => {
          this.showDismissibleAlert = true;
          this.showDismissibleAlertError = false;
          this.successMessage = "Reservation successfully deleted."
          alert("Reservation succesfully deleted.");
          parent.location.reload();
        }).catch(error=>{
          this.showDismissibleAlertError = true;
          this.showDismissibleAlert = false;
          this.errorMessage = "There was a problem while deleting reservation.";
        })
      }

    },
    prolongReservation(){
      let newDate = new Date(this.dateToNew);
      newDate.setHours(23,59,59,59);
      let actualDate = this.dateTo;
      actualDate.setHours(23,59,59,59);
      if (newDate <= actualDate) {
        this.showDismissibleAlertError = true;
        this.showDismissibleAlert = false;
        this.errorMessage = "New date can not be the same/less then actual date of reservation.";
      }
      else {
        let reservation = {};
        reservation.id = this.id;
        reservation.dateFrom = this.dateFrom;
        reservation.dateUntil = newDate;
        reservation.state = '';
        reservation.reader = this.user;
        reservation.exemplar = this.data.exemplar;

        ApiConnect.put('/reservations', reservation).then(response => {
          this.showDismissibleAlert = true;
          this.showDismissibleAlertError = false;
          this.successMessage = "Date of reservation succesfully changed.";
        }).catch(error => {
          this.showDismissibleAlertError = true;
          this.showDismissibleAlert = false;
          this.errorMessage = "Error while changing date of reservation.";
        })
      }
    },
    prolongBorrowing(){
      let newDate = new Date(this.dateToNew);
      newDate.setHours(23,59,59,59);
      let actualDate = this.dateTo;
      actualDate.setHours(23,59,59,59);
      if (newDate <= actualDate) {
        this.showDismissibleAlertError = true;
        this.showDismissibleAlert = false;
        this.errorMessage = "New date can not be the same/less then actual date of borrowing.";
      }
      else {
        let borrowing = {};
        borrowing.id = this.id;
        borrowing.dateOfBorrowStart = this.dateFrom;
        borrowing.dateOfBorrowEnd = newDate;
        borrowing.borrowCounter = this.data.borrowCounter + 1;
        borrowing.reader = this.user;
        borrowing.state = '';
        borrowing.exemplar = this.data.exemplar;

        ApiConnect.put('/hard-copy-borrowings', borrowing).then(response => {
          this.showDismissibleAlert = true;
          this.showDismissibleAlertError = false;
          this.successMessage = "Date of borrowing succesfully changed.";
        }).catch(error => {
          this.showDismissibleAlertError = true;
          this.showDismissibleAlert = false;
          this.errorMessage = "Error while changing date of borrowing.";
        })
      }
    },
    prolongElectronicBorrowing(){
      let newDate = new Date(this.dateToNew);
      newDate.setHours(23,59,59,59);
      let actualDate = this.dateTo;
      actualDate.setHours(23,59,59,59);
      if (newDate <= actualDate) {
        this.showDismissibleAlertError = true;
        this.showDismissibleAlert = false;
        this.errorMessage = "New date can not be the same/less then actual date of borrowing.";
      }
      else {
        let borrowing = {};
        borrowing.id = this.id;
        borrowing.dateOfBorrowStart = this.dateFrom;
        borrowing.dateOfBorrowEnd = newDate;
        borrowing.borrowCounter = this.data.borrowCounter + 1;
        borrowing.reader = this.user;
        borrowing.electronicCopy = this.data.electronicCopy;

        ApiConnect.put('/electronic-copy-borrowings', borrowing).then(response => {
          this.showDismissibleAlert = true;
          this.showDismissibleAlertError = false;
          this.successMessage = "Date of borrowing succesfully changed.";
        }).catch(error => {
          this.showDismissibleAlertError = true;
          this.showDismissibleAlert = false;
          this.errorMessage = "Error while changing date of borrowing.";
        })
      }      },
    showModal() {
      this.$refs['my-modal'].show()
    },
    onHidden (event) {
      parent.location.reload();
    },
  },
  computed: {
    canManipulate: function () {
      let today = new Date();
      let result = true;
      today.setHours(0, 0, 0, 0);
      if ( today <= this.dateTo) {
        result = true;
      }
      if (this.borrowing && (this.data.state === 'TO_RETURN' ||
          this.data.state === 'CAN_NOT_PROLONG' || this.data.state=== 'RETURNED')) {
        result = false;
      }
      if (! this.borrowing && this.data.state === 'NOT_ACTIVE'){
        result = false;
      }
      return result;
    },
  }
}
</script>