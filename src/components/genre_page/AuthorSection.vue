<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col><h1>{{ name }}</h1></b-col>
        <b-col><h3>More ></h3></b-col>
      </b-row>

      <b-row>
        <AuthorTile v-for="load in data.slice(0,6)"
                    img="@/assets/logo.png"
                    :name = load.name
                    :surname = load.surname
                    :id = load.id
                    :dateOfBirth = load.dateOfBirth
        >
        </AuthorTile>
      </b-row>
    </b-container>
  </div>
</template>


<script>
import AuthorTile from "@/components/genre_page/AuthorTile";

export default {
  name: 'AuthorSection',
  components: {
    AuthorTile,
  },
  props: {
    name: String,
    data: {},
  },

}

</script>
