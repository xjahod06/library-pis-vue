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
        <b-col cols="4"><p class="form-label">Description:*</p></b-col>
        <b-col cols="8">
          <b-form-textarea
              v-model="form.description"
              placeholder="Enter description about author..."
              rows="3"
              max-rows="6"
          ></b-form-textarea></b-col>
      </b-row>

      <b-row class="form-row">
        <b-col cols="4"><p class="form-label">Date of Birth:*</p></b-col>
        <b-col cols="8">
          <b-form-datepicker
              id="dateOfBirth"
              v-model="form.dateOfBirth "
              type="date"
              required
              placeholder="Enter date of birth">
          </b-form-datepicker></b-col>
      </b-row>
      <b-row class="form-row">
        <b-col cols="4"><p class="form-label">Date of Death:</p></b-col>
        <b-col cols="8">
          <b-form-datepicker
              id="dateOfBirth"
              v-model="form.dateOfDeath "
              type="date"
              required
              placeholder="Enter date of death">
          </b-form-datepicker></b-col>
      </b-row>
        <b-row class="form-row">
          <b-col cols="4" class="form-label">Picture: </b-col>
          <b-col cols="8">
            <b-form-file
                v-model="photograph"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
            ></b-form-file>
          </b-col>
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
      photograph: null
    };
  },
  props: {
    author: {},
    form: {},
  },
  methods: {
     async onSubmit() {
       if (this.photograph !== null){
         var fileBuffer = await this.convertFileToArrayBuffer();
         var array = new Uint8Array(fileBuffer);
         this.form.photograph = Array.from(array);
       }

       ApiConnect.put('authors/', this.form).then(response => {
         window.location.reload();
       }).catch(error => {
       })

     },
    convertFileToArrayBuffer(){
      return new Promise((resolve, reject) => {
        try {
          if (this.photograph !== null){
            resolve(this.photograph.arrayBuffer());
          }

        }
        catch (e){
          reject (e);
        }
      })
    }
  }
}
</script>