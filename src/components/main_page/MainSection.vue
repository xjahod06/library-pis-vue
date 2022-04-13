<template>
  <div>
  <b-container class="bv-example-row">
    <b-row>
      <b-col><h1 align="left">{{ name }}</h1></b-col>
      <b-col><h3 align="right">More ></h3></b-col>
    </b-row>

    <b-row>
      <MainTile img="@/assets/logo.png"
                type="smth"
                name="Harry Potter"
                author="JK Rowling"
                genre="fantasy">
      </MainTile>
      <MainTile img="@/assets/logo.png"
                type="smth"
                name="Harry Potter"
                author="JK Rowling"
                genre="fantasy">
      </MainTile>
      <MainTile img="@/assets/logo.png"
                type="smth"
                name="Harry Potter"
                author="JK Rowling"
                genre="fantasy">
      </MainTile>
      <MainTile img="@/assets/logo.png"
                type="smth"
                name="Harry Potter"
                author="JK Rowling"
                genre="fantasy">
      </MainTile>
      <MainTile img="@/assets/logo.png"
                type="smth"
                name="Harry Potter"
                author="JK Rowling"
                genre="fantasy">
      </MainTile>
      <MainTile img="@/assets/logo.png"
                type="smth"
                name="Harry Potter"
                author="JK Rowling"
                genre="fantasy">
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
    name: String
  }
}
</script>

<style scoped>

h1{
  color: #333!important;
  font-weight: bold;
}

h3 {
  color: #777!important;
  font-weight: bold;
  padding-top: 10px;
}



</style>