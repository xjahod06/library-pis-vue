<template>
  <b-dropdown-item> <router-link to="/genre">{{genre}}</router-link></b-dropdown-item>
</template>

<script>
export default {
  name: 'BookGenre',
  props: {
    genre: String
  }
}
</script>
