<template>
  <div>
    <b-alert class="mt-2" v-model="showDismissibleAlert" variant="success" dismissible>
      {{ successMessage }}</b-alert>
    <b-alert class="mt-2" v-model="showDismissibleAlertError" variant="danger" dismissible>
      {{errorMessage}}</b-alert>

    <b-row>
      <b-col><b-img class="book-user-img" src="@/assets/logo.png"></b-img>
        <div id="type">
          <h5>{{ type }}</h5>
        </div></b-col>
      <b-col cols="2"><p class="book-user-text">{{name}}</p></b-col>
      <b-col cols="3"><p class="book-user-text">
        <b>From: </b>{{ dateFrom | formatDate }}<br>
        <b>To: </b>{{ dateTo | formatDate }}
        </p></b-col>
      <b-col cols="1"><p class="book-user-text">{{state}}</p></b-col>
      <b-col class="mt-3">
        <div  v-if="canManipulate">
          <b-button v-if="!borrowing"
                    @click="deleteReservation"
                    align="right"
                    variant="danger">Cancel</b-button>
          <br v-if="! borrowing">
          <b-button  class="mt-3"
                     v-b-toggle.collapse1
                     align="right"
                     variant="warning">Prolong</b-button>
            <b-collapse id="collapse1" class="mt-2">
            <b-card class="container">
              <p style="font-size: 15px ; padding-bottom: 10px" class="book-user-text">Choose new date</p>
              <b-form-datepicker id="example-datepicker"
                                 v-model="dateToNew"
                                 placeholder="Choose new date"
                                 class="mb-2">
              </b-form-datepicker>
              <b-button  @click="prolongReservation" size="sm">Submit</b-button>
            </b-card>
          </b-collapse>
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
    data: {}
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

      if (newDate <= this.dateTo) {
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
        console.log(reservation);
        ApiConnect.put('/reservations', reservation).then(response => {
          this.showDismissibleAlert = true;
          this.showDismissibleAlertError = false;
          this.successMessage = "Date of reservation succesfully changed.";
          parent.location.reload();
        }).catch(error => {
          this.showDismissibleAlertError = true;
          this.showDismissibleAlert = false;
          this.errorMessage = "Erroe while changing date of reservation.";
        })
      }
    }
  },
  computed: {
    canManipulate: function () {
      let today = new Date();
      today.setHours(0, 0, 0, 0);
      return today <= this.dateTo;
    },
    collapseId: function () {
      return 'collapse' + this.id.toString();
    }
  }
}
</script>