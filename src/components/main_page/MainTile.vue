<template>
  <b-col cols="2">
    <b-row>
      <b-img class="tile-img" src="@/assets/logo.png" alt="Book cover" ></b-img>
    </b-row>
    <b-row class="text-left">
      <b-badge pill variant="warning">{{ type }}</b-badge>
    </b-row>
    <b-row class="text-left mt-2">
      <h5 class="text-left">
        {{ name }}
      </h5>
    </b-row>
    <b-row class="text-left">
      <small>{{ authorsToPrint }}</small>
    </b-row>
    <b-row class="text-left" v-if="genres !== undefined">
      <small>{{ genresToPrint }}</small>
    </b-row>
    <b-row class="text-left" v-if="fields !== undefined">
      <small>{{ fieldsToPrint }}</small>
    </b-row>
  </b-col>
</template>

<script>

export default {
name: 'MainTile',
  props: {
    type: String,
    name: String,
    authors: {},
    genres: {},
    img: String,
    fields: {},
  },
  computed: {
    authorsToPrint() {
      let data = JSON.parse(JSON.stringify(this.authors));
      let string = "";
      data.forEach((dato) => string += " " + dato.name);
      return string;
    },
    fieldsToPrint() {
      let data = JSON.parse(JSON.stringify(this.fields));
      let string = "";
      data.forEach((dato) => string += " " + dato.name);
      return string;
    },
    genresToPrint() {
      let data = JSON.parse(JSON.stringify(this.genres));
      let string = "";
      data.forEach((dato) => string += " " + dato.name);
      return string;
    }
  }
}
</script>
