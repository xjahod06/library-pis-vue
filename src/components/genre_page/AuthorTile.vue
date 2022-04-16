<template>
  <b-col>
    <b-img class="tile-img" src="@/assets/logo.png" alt="Author photo" ></b-img>

    <h3>{{ name }}</h3>
    <h3>{{ surname }}</h3>
  </b-col>
</template>

<script>
export default {
  name: 'AuthorTile',
  props: {
    name: String,
    surname: String,
    img: String,
  }
}
</script>