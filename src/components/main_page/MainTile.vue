<template>
  <b-col cols="2">
    <b-row>
      <b-img class="tile-img" src="@/assets/logo.png" alt="Book cover" ></b-img>
    </b-row>
    <b-row class="text-left">
      <b-badge pill variant="warning">{{ type }}</b-badge>
    </b-row>
    <b-row class="text-left mt-2">
      <router-link :to="{path: root + id}">
        <h5 class="text-left">
          {{ name }}
        </h5>
      </router-link>
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
    id: Number,
    root: String,
  },
  methods: {
    getAuthors(data){
      let dataParsed = JSON.parse(JSON.stringify(data));
      let string = "";
      dataParsed.forEach((dato) => string += "&" + dato.surname + " " + dato.name);
      string = string.replace('&','')
      string = string.replaceAll("&",", ")
      return string;
    },
    getNames(data){
      let dataParsed = JSON.parse(JSON.stringify(data));
      let string = "";
      dataParsed.forEach((dato) => string += "&" + dato.name);
      string = string.replace('&','')
      string = string.replaceAll("&",", ")
      return string;
    }
  },
  computed: {
    authorsToPrint() {
      return this.getAuthors(this.authors);
    },
    fieldsToPrint() {
      return this.getNames(this.fields);
    },
    genresToPrint() {
      return this.getNames(this.genres);
    }
  }
}
</script>
