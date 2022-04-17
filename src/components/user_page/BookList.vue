<template>
  <div class="book-list">
      <h1 class="book-list-title">{{type}}</h1>
      <b-container class="book-user-list">
        <b-card style="background-color: transparent; border: none"  no-body>
          <b-card-body
              id="nav-scroller"
              ref="content"
              style="position:relative;
                     height:330px;
                     overflow-y:scroll;"
          >
            <div v-for="val in sortedData">
              <div v-if="val.exemplar.book != undefined">
                <div v-if="borrowing">
                  <BookListItem :name="val.exemplar.book.name"
                                type="book"
                                :id="val.id"
                                :user="user"
                                :data="val"
                                :borrowing="true"
                                :dateFrom="new Date(val.dateOfBorrowStart)"
                                :dateTo="new Date(val.dateOfBorrowEnd)"
                                :state="val.state"></BookListItem>
                </div>
                <div v-else>
                  <BookListItem :name="val.exemplar.book.name"
                                type="book"
                                :id="val.id"
                                :user="user"
                                :data="val"
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
                                :user="user"
                                :data="val"
                                :borrowing="true"
                                :dateFrom="new Date(val.dateOfBorrowStart)"
                                :dateTo="new Date(val.dateOfBorrowEnd)"
                                :state="val.state"></BookListItem>
                </div>
                <div v-else>
                  <BookListItem :name="val.exemplar.magazine.name"
                                type="magazine"
                                :id="val.id"
                                :user="user"
                                :data="val"
                                :borrowing="false"
                                :dateFrom="new Date(val.dateFrom)"
                                :dateTo="new Date(val.dateUntil)"
                                :state="val.state"></BookListItem>
                </div>
              </div>
            </div>

          </b-card-body>
        </b-card>
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
      user: {}
    },
    components: {
      BookListItem
    },
    computed: {
      sortedData: function() {
        // todo toto bude chyba kvoli inemu nazvu premennych
        this.data.sort( (a,b) => {
          return new Date(b.dateUntil) - new Date(a.dateUntil);
        });
        return this.data;
      }
    }

  }
</script>