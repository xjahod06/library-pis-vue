<template>
  <div>
    <NavbarFinal></NavbarFinal>
    <b-container>
      <h1 class="display-1 text-center mt-4" >404</h1>
      <p class="lead">
        We could not find this page in our book
      </p>
      <font-awesome-icon icon="fa-solid fa-book-open" size="10x" class="text-dark"/>
    </b-container>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import MyFooter from "@/components/main_page/MyFooter";
import NavbarFinal from "@/components/main_page/NavbarFinal";

export default {
  name: "404",
  components: {
    MyFooter,
    NavbarFinal,
  }
}
</script>

<style scoped>

</style>