<template>
  <div id="book-title" class="text-center">
    <b-row>
      <b-col>
        <b-img class="tile-img" src="@/assets/logo.png" alt="Book cover" ></b-img>
      </b-col>
    </b-row>
    <b-row class="text-left">
      <b-col offset-md="2">
        <b-button @click="showModalReservation" variant="info" class="mr-2"> Reserve </b-button>
        <b-button v-if="hasElectronicCopy" @click="showModalBorrow" variant="success">Borrow electronic copy</b-button>
      </b-col>
    </b-row>

    <!--MODAL RESERVATION--->
    <b-modal ref="new-reservation" hide-footer title="Create new reservation" @hidden="onHidden">
      <div class="d-block text-center">
        <b-alert class="mt-2" v-model="showDismissibleAlert" variant="success" dismissible>
          {{ alertMessage }}</b-alert>
        <b-alert class="mt-2" v-model="showDismissibleAlertError" variant="danger" dismissible>
          {{alertMessage}}</b-alert>
        <b-form-datepicker id="example-datepicker"
                           v-model="dateFrom"
                           placeholder="Choose new date"
                           class="mb-2">
        </b-form-datepicker>
        <b-form-datepicker id="example-datepicker"
                           v-model="dateTo"
                           placeholder="Choose new date"
                           class="mb-2">
        </b-form-datepicker>
      </div>
      <b-button class="mt-2" variant="outline-primary" block @click="makeReservation">Save</b-button>
    </b-modal>

    <!--MODAL ELECTRONIC BORROWING --->
    <b-modal ref="new-borrow" hide-footer title="Borrow electronic copy" @hidden="onHidden">
      <div class="d-block text-center">
        <b-alert class="mt-2" v-model="showDismissibleAlert" variant="success" dismissible>
          {{ alertMessage }}</b-alert>
        <b-alert class="mt-2" v-model="showDismissibleAlertError" variant="danger" dismissible>
          {{alertMessage}}</b-alert>

        <b-form-datepicker id="example-datepicker"
                           v-model="dateFrom"
                           placeholder="Choose new date"
                           class="mb-2">
        </b-form-datepicker>

        <b-form-datepicker id="example-datepicker"
                           v-model="dateTo"
                           placeholder="Choose new date"
                           class="mb-2">
        </b-form-datepicker>

      </div>
      <b-button class="mt-2" variant="outline-primary" block @click="makeReservation">Save</b-button>
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
export default {
  name: "BookTitle",
  props: {
    img: String,
    format: String,
    publisher: String,
    released: Number,
    pages: Number,
    hasElectronicCopy: Boolean
  },
  data (){
    return {
      showDismissibleAlert: false,
      showDismissibleAlertError: false,
      alertMessage: '',
      dateFrom: new Date(),
      dateTo: new Date()
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
      let id = this.$route.params.id;
      let reservation = {}
      reservation.id = id;

      console.log("vytvaram rezervaciu");
    },
    borrowEcopy(){
      console.log("borrowujem ecopy");
    }
  },

}
</script>

<style scoped>

</style>