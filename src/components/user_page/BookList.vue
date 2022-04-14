<template>
  <div class="book-list">
      <h1 class="book-list-title">{{type}}</h1>
      <b-container class="book-user-list">

      <BookListItem :name=name :date=date :state=state></BookListItem>

      </b-container>
  </div>


</template>

<script>
  import BookListItem from "@/components/user_page/BookListItem";
  export default {
    name: 'BookList',
    props: {
      type: String,
      name: String,
      date: Date,
      state: String
    },
    components: {
      BookListItem
    }
  }
</script>