<template>
  <div class="book-list">
      <h1 class="book-list-title">{{type}}</h1>
      <b-container class="book-user-list">
        <div v-for="val in data">
          <div v-if="val.exemplar.book != undefined">
            <div v-if="borrowing">
              <BookListItem :name="val.exemplar.book.name"
                            type="book"
                            :id="val.id"
                            :borrowing="true"
                            :dateFrom="new Date(val.dateOfBorrowStart)"
                            :dateTo="new Date(val.dateOfBorrowEnd)"
                            :state="val.state"></BookListItem>
            </div>
            <div v-else>
              <BookListItem :name="val.exemplar.book.name"
                            type="book"
                            :id="val.id"
                            :borrowing="false"
                            :dateFrom="new Date(val.dateFrom)"
                            :dateTo="new Date(val.dateUntil)"
                            :state="val.state"></BookListItem>
            </div>

          </div>
          <div v-if="val.exemplar.magazine != undefined">
            <div v-if="borrowing">
              <BookListItem :name="val.exemplar.magazine.name"
                            type="magazine"
                            :id="val.id"
                            :borrowing="true"
                            :dateFrom="new Date(val.dateOfBorrowStart)"
                            :dateTo="new Date(val.dateOfBorrowEnd)"
                            :state="val.state"></BookListItem>
            </div>
            <div v-else>
              <BookListItem :name="val.exemplar.magazine.name"
                            type="magazine"
                            :id="val.id"
                            :borrowing="false"
                            :dateFrom="new Date(val.dateFrom)"
                            :dateTo="new Date(val.dateUntil)"
                            :state="val.state"></BookListItem>
            </div>
          </div>
        </div>
<!--      <BookListItem :name= :date=date :state=state></BookListItem>-->

      </b-container>
  </div>


</template>

<script>
  import BookListItem from "@/components/user_page/BookListItem";
  export default {
    name: 'BookList',
    props: {
      type: String,
      data: {},
      borrowing: Boolean,
    },
    components: {
      BookListItem
    }
  }
</script>