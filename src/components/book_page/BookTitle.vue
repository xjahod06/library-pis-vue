<template>
  <div id="book-title" class="text-center">
    <b-row>
      <b-col>
        <b-img class="tile-img" src="@/assets/logo.png" alt="Book cover" ></b-img>
      </b-col>
    </b-row>
    <b-row class="text-left">
      <b-col offset-md="2">
        <b-button> Reserve </b-button>
      </b-col>
    </b-row>
    <b-row align-h="center" class="mt-3">
      <b-col cols="4" class="text-right text-dark h5">
        Format
      </b-col>
      <b-col cols="4" class="text-left text-dark">
        {{ format }}
      </b-col>
    </b-row>
    <b-row align-h="center" class="mt-3">
      <b-col cols="4" class="text-right text-dark h5">
        Publisher
      </b-col>
      <b-col cols="4" class="text-left text-dark">
        {{ publisher }}
      </b-col>
    </b-row>
    <b-row align-h="center" class="mt-3" v-if="released !== undefined">
      <b-col cols="4" class="text-right text-dark h5">
        Released
      </b-col>
      <b-col cols="4" class="text-left text-dark">
        {{ released | formatDate }}
      </b-col>
    </b-row>
    <b-row align-h="center" class="mt-3" v-if="pages !== undefined">
      <b-col cols="4" class="text-right text-dark h5">
        Pages
      </b-col>
      <b-col cols="4" class="text-left text-dark">
        {{ pages }}
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "BookTitle",
  props: {
    img: String,
    format: String,
    publisher: String,
    released: Number,
    pages: Number,
  },
}
</script>

<style scoped>

</style>