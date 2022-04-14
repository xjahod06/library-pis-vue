<template>
  <b-row>
    <b-col><b-img class="book-user-img" src="@/assets/logo.png"></b-img></b-col>
    <b-col cols="3"><p class="book-user-text">{{name}}</p></b-col>
    <b-col cols="3"><p class="book-user-text">{{date}}</p></b-col>
    <b-col cols="3"><p class="book-user-text">{{state}}</p></b-col>
    <b-col><b-icon icon="arrow-down"></b-icon></b-col>
  </b-row>
</template>


<script>
export default {
  name: 'BookListItem',
  props: {
    name: String,
    date: Date,
    state: String
  }
}
</script>