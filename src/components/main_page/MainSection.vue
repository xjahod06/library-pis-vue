<template>
  <div>
  <b-container class="bv-example-row">
    <b-row>
      <b-col><h1>{{ name }}</h1></b-col>
      <b-col><h3>More ></h3></b-col>
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
