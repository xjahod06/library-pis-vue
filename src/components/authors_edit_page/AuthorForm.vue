<template>
  <b-container class="author-form-list">

    <b-form @submit="onSubmit" v-if="show" class="author-form">

      <b-row class="form-row">
        <b-col cols="4"><p class="form-label" >Name:*</p> </b-col>
        <b-col cols="8">
          <b-form-input
              v-model="form.name"
              placeholder="Enter first name"
              id="fname"
              required>
          </b-form-input>
        </b-col>
      </b-row>

      <b-row class="form-row">
        <b-col cols="4"><p class="form-label">Last name:*</p> </b-col>
        <b-col cols="8">
          <b-form-input
              v-model="form.surname"
              placeholder="Enter last name"
              id="lname"
              required>
          </b-form-input>
        </b-col>
      </b-row>

      <b-row class="form-row">
        <b-col cols="4"><p class="form-label">Date of Birth:*</p></b-col>
        <b-col cols="8">
          <b-form-input
              id="dateOfBirth"
              v-model="form.dateOfBirth"
              type="date"
              required
              placeholder="Enter date of birth">
          </b-form-input></b-col>
      </b-row>

      <b-button type="submit" class="submit-button" >Submit</b-button>
    </b-form>
  </b-container>
</template>

<script>
import ApiConnect from "@/services/ApiConnect";

export default {
  name: 'AuthorForm',
  data() {
    return {
      show: true,

    };
  },
  props: {
    author: {},
    form: {},
  },
  methods: {
    onSubmit() {
      ApiConnect.put('authors/', this.form).then(response => {

        window.location.reload();
      }).catch(error => {
      })
    }
  }
}
</script>