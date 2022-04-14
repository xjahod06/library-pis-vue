<template>

<!--    <b-nav-form >-->
      <div class="grid-container">

      <b-form-input class="grid-item search-bar" placeholder="Search"></b-form-input>
      <b-button class="grid-item" variant="primary" type="submit">Search</b-button>
      </div>
<!--    </b-nav-form>-->


</template>

<script>
export default {
  name: 'SearchBar',
}
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto auto auto ;
  background-color: #24433e;
  padding: 10px;
}
.grid-item {
  text-align: left;
}
.search-bar {
  text-align: left;
  grid-column: 1 / span 8;
}


</style>
