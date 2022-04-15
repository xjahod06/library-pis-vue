<template>
  <div>
  <b-container class="bv-example-row">
    <b-row>
      <b-col><h1 align="left">{{ name }}</h1></b-col>
      <b-col><h3 align="right">More ></h3></b-col>
    </b-row>

    <b-row>
      <MainTile v-for="load in data.slice(0,6)"
          img="@/assets/logo.png"
                :genre = load.genres
                :type = load.language
                :name = load.name
                :author = load.authors[0].name
                :magazin = load.fields
                >
      </MainTile>
    </b-row>
  </b-container>
  </div>
</template>


<script>
import MainTile from "@/components/main_page/MainTile";

export default {
  name: 'MainSection',
  components: {
    MainTile,
  },
  props: {
    name: String,
    data: {},
  },

}

</script>
