<template>
  <b-col cols="2" class="mx-2">
    <b-row class="text-center">
      <b-img class="tile-img" src="@/assets/logo.png" alt="Author photo" ></b-img>
    </b-row>

    <b-row class="text-left mt-2">
      <router-link :to="{path: 'authors/' + id}">
        <h5 class="text-left">
          {{ name }} {{ surname }}
        </h5>
      </router-link>
    </b-row>
    <b-row class="text-left">
      <h6>{{ birth }}</h6>
    </b-row>
  </b-col>
</template>

<script>
export default {
  name: 'AuthorTile',
  props: {
    name: String,
    surname: String,
    img: String,
    id: Number,
    dateOfBirth: Number,
  },
  computed: {
    birth(){
      let dt = new Date(this.dateOfBirth);
      return dt.getDay()+"."+dt.getMonth()+"."+dt.getFullYear();
    }
  }
}
</script>

 <style scoped>
 h6{
   color: black;
 }
 </style>