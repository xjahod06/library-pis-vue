<template>
  <div id="book-info" class="text-left px-4 py-2">
    <b-row>
      <b-col>
        <h1 class="display-3 mb-0">{{ title }}</h1>
      </b-col>
    </b-row>

    <b-row class="text-left">
      <b-col>
        <h2>By {{ authorsToPrint }}</h2>
      </b-col>
    </b-row>
    <b-row class="text-right">
      <b-col>
        {{ genresToPrint }}
      </b-col>
    </b-row>

    <b-row >
      <b-col class="text-justify">
        <h5>Description: </h5>
        {{ description }}
      </b-col>
    </b-row>

    <b-row class="mt-4">
      <b-col class="text-left">
        <small>Edition {{ publicationNumber }} </small>
      </b-col>
      <b-col class="text-right">
        <small v-if="isbn !== undefined" >ISBN {{ isbn }} </small>
        <small v-if="!isNaN(issn)" >ISSN {{ issn }} </small>
      </b-col>
    </b-row>

  </div>
</template>

<script>
export default {
  name: "BookInfo",
  props: {
    title: String,
    publicationNumber: String,
    authors: {},
    isbn: String,
    issn: Number,
    genres: {},
    description: String,
  },
  methods: {
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
      return this.getNames(this.authors);
    },
    genresToPrint() {
      return this.getNames(this.genres);
    }
  }
}
</script>

<style scoped>
#book-info{
  background-color: #24433e;
  color: #d0d3d3 !important;
}
h5{
  color: #d0d3d3 !important;
}
.display-3{
  color: #d0d3d3 !important;
  margin-bottom: -15px !important;
}
small{
  color: #cbcbcb !important;
}

</style>