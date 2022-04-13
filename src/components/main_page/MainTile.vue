<template>
  <b-col>
    <b-img class="navbar-logo" src="@/assets/logo.png" alt="Book cover" ></b-img>
    <div class="type">
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

<style scoped>
.type {
  background-color: #ffa332;
  border-radius: 20px;
}

h3 {
  color: #777!important;
  font-weight: bold;
  padding-top: 10px;
}

h5{
  color: #333;
  font-weight: bold;
}

p{
  color: #6a6a6a;
}

.navbar-logo {
  width: 100px;
  padding: 0px;
}
</style>