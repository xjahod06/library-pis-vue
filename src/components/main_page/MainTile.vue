<template>
  <b-col>
    <b-img class="tile-img" src="@/assets/logo.png" alt="Book cover" ></b-img>
    <div id="type">
      <h5>{{ type }}</h5>
    </div>
    <h3>{{ name }}</h3>
    <p>{{ author }}</p>
    <p>{{ genre }}</p>
  </b-col>
</template>

<script>
export default {
name: 'MainTile',
  props: {
    type: String,
    name: String,
    author: String,
    genre: String,
    img: String
  }
}
</script>
