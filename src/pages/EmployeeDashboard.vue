<template>
  <div>
    <NavBar></NavBar>
    <b-container class="bv-example-row">
      <b-row>
        <b-col><router-link to="edit_titles"><b-card
            text-variant="white"
            style="height: 250px; width: 250px; margin: 20px; background: #24433e;"
            class="text-light">
          <b-card-title
            style="text-align: center; background: #24433e;top: 50%">
            Edit Titles
          </b-card-title>
          <b-icon icon="book"
                  class="h1"
                  style="width: 120px; height: 120px">
          </b-icon>
        </b-card></router-link></b-col>
        <b-col><router-link to="/edit_authors"><b-card
            text-variant="white"
            style="height: 250px; width: 250px; margin: 20px; background: #24433e;"
            class="text-center">
          <b-card-title
              style="text-align: center; background: #24433e;top: 50%">
            Edit Authors
          </b-card-title>
          <b-icon icon="person-badge"
                  class="h1"
                  style="width: 120px; height: 120px">
          </b-icon>
        </b-card></router-link></b-col>
        <b-col><router-link to="/edit_borrowings"><b-card
            text-variant="white"
            style="height: 250px; width: 250px; margin: 20px; background: #24433e;"
            class="text-center">
          <b-card-title
              style="text-align: center; background: #24433e;top: 50%">
            Edit Borrowings
          </b-card-title>
          <b-icon icon="bookmark"
                  class="h1"
                  style="width: 120px; height: 120px">
          </b-icon>
        </b-card></router-link></b-col>
      </b-row>
      <b-row>
        <b-col><router-link to="/edit_fines"><b-card
            text-variant="white"
            style="height: 250px; width: 250px; margin: 20px; background: #24433e;"
            class="text-center">
          <b-card-title
              style="text-align: center; background: #24433e;top: 50%">
            Edit Fines
          </b-card-title>
          <b-icon icon="cash-stack"
                  class="h1"
                  style="width: 120px; height: 120px">
          </b-icon>
        </b-card></router-link></b-col>
        <b-col><router-link to="/edit_reservations"><b-card
            text-variant="white"
            style="height: 250px; width: 250px; margin: 20px; background: #24433e;"
            class="text-light">
          <b-card-title
              style="text-align: center; background: #24433e;top: 50%">
            Edit Reservations
          </b-card-title>
          <b-icon icon="journal-bookmark-fill"
                  class="h1"
                  style="width: 120px; height: 120px">
          </b-icon>
        </b-card></router-link></b-col>
        <b-col><router-link to="/edit_readers"><b-card
            text-variant="white"
            style="height: 250px; width: 250px; margin: 20px; background: #24433e;"
            class="text-center">
          <b-card-title
              style="text-align: center; background: #24433e;top: 50%">
            Edit Readers
          </b-card-title>
          <b-icon icon="person"
                  class="h1"
                  style="width: 120px; height: 120px">
          </b-icon>
        </b-card></router-link></b-col>
      </b-row>
    </b-container>

    <MyFooter></MyFooter>
  </div>
</template>

<script>
import NavBar from "@/components/main_page/NavBar";
import MyFooter from "@/components/main_page/MyFooter";
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import Vue from "vue";

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

export default {
  name: "EmployeeDashboard",
  components: {MyFooter, NavBar}
}
</script>

<style scoped>

</style>