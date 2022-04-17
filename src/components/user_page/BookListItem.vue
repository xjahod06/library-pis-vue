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
        <b-button v-if="!borrowing"
                  @click="deleteReservation"
                  align="right"
                  variant="danger">Cancel</b-button>
        <br v-if="! borrowing">
        <b-button class="mt-3" align="right" variant="warning">Prolong</b-button>
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
    id: Number
  },
  data() {
    return {
      showDismissibleAlert: false,
      showDismissibleAlertError: false,
      successMessage: '',
      errorMessage: ''
    }
  },
  methods: {
    deleteReservation(){
      if (confirm("Do you really want to delete reservation?")){

        ApiConnect.delete('reservations/' + this.id).then(response => {
          console.log(this.id);
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
      console.log("button click");

    }
  }
}
</script>