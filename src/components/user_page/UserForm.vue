<template>
  <b-container class="book-user-list">
    <b-row>
      <b-col cols="4" aria-rowspan="6"><b-img src="@/assets/logo.png"></b-img></b-col>
      <b-col cols="8">

        <b-form @submit="onSubmit" v-if="show" class="user-form">

          <b-row class="form-row">
            <b-col cols="4"><p class="form-label" >Name*:</p> </b-col>
            <b-col cols="8">
              <b-form-input
                v-model="form.name"
                placeholder="Enter name"
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
            <b-col cols="4"><p class="form-label">Email*:</p></b-col>
            <b-col cols="8">
              <b-form-input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="Enter email">
              </b-form-input></b-col>
          </b-row>

          <b-row class="form-row">
            <b-col cols="4"><p class="form-label">Street:*</p> </b-col>
            <b-col cols="8">
              <b-form-input
                  id="street"
                  v-model="form.street"
                  placeholder="Enter street name"
                  required>
              </b-form-input>
            </b-col>
          </b-row>

          <b-row class="form-row">
            <b-col cols="4"><p class="form-label">House number:*</p></b-col>
            <b-col cols="8">
              <b-form-input
                  v-model="form.houseNumber"
                  placeholder="Enter house number"
                  required>
              </b-form-input>
            </b-col>
          </b-row>

          <b-row class="form-row">
            <b-col cols="4"><p class="form-label">City:*</p> </b-col>
            <b-col cols="8">
              <b-form-input
                  id="city"
                  v-model="form.city"
                  placeholder="Enter city"
                  required>
              </b-form-input>
            </b-col>
          </b-row>

          <b-row class="form-row">
            <b-col cols="4"><p class="form-label">Postal code:*</p> </b-col>
            <b-col cols="8">
              <b-form-input
                  id="zip"
                  v-model="form.postcode"
                  placeholder="Enter postal code"
                  required>
              </b-form-input>
            </b-col>
          </b-row>

          <b-button type="submit" class="submit-button" >Submit</b-button>
        </b-form>
      </b-col>

    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'UserForm',
  data() {
    return {
      form: {
        name: '',
        surname: '',
        email: '',
        street: '',
        houseNumber: '',
        city: '',
        postcode: '',
      },
      show: true
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
    }
    }
}
</script>