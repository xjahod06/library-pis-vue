<template>
  <b-row>
    <b-col><b-img class="book-user-img" src="@/assets/logo.png"></b-img>
      <div id="type">
        <h5>{{ type }}</h5>
      </div></b-col>
    <b-col cols="3"><p class="book-user-text">{{name}}</p></b-col>
    <b-col cols="3"><p class="book-user-text">{{ date | formatDate }}</p></b-col>
    <b-col cols="1"><p class="book-user-text">{{state}}</p></b-col>
    <b-col><b-icon align="left" icon="caret-down-fill" font-scale="5"></b-icon></b-col>
  </b-row>
</template>


<script>
export default {
  name: 'BookListItem',
  props: {
    name: String,
    date: Date,
    state: String,
    type: String
  }
}
</script>