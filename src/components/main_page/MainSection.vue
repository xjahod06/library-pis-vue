<template>
  <div>
  <b-container class="bv-example-row">
    <b-row>
      <b-col><h1>{{ name }}</h1></b-col>
      <b-col><h3>More ></h3></b-col>
    </b-row>

    <b-row>
      <MainTile v-for="load in data.slice(0,6)"
          img="@/assets/logo.png"
                :genres = load.genres
                :type = load.language
                :name = load.name
                :authors = load.authors
                :fields = load.fields
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
