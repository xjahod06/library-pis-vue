<template>
  <b-dropdown-item href="#">{{ genre }}</b-dropdown-item>
</template>

<script>
export default {
  name: 'BookGenre',
  props: {
    genre: String
  }
}
</script>
