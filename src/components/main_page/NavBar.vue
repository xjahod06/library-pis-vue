<template>
  <div id="mynavbar">
    <b-container>


    <b-navbar toggleable="lg" variant="info">
      <b-navbar-brand left href="#">
        <b-img class="navbar-logo" src="@/assets/library_logo.png" alt="Responsive image" ></b-img>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#">Catalog</b-nav-item>
          <b-nav-item-dropdown id="my-dropdown" text="Genre" right>
            <BookGenre href="#" genre="Beletria" />
          </b-nav-item-dropdown>
          <b-nav-item href="#">Login/Register</b-nav-item>
        </b-navbar-nav>

      </b-collapse>

    </b-navbar>
    </b-container>
    <SearchBar></SearchBar>
  </div>

</template>

<script>

import SearchBar from "@/components/main_page/SearchBar";
import BookGenre from "@/components/main_page/BookGenre";

export default {
  name: 'NavBar',
  components: {
    SearchBar,
    BookGenre
  }
}
</script>
