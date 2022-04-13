<template>
  <div class="my-containter">
    <p class="my-footer-text">Copyright {{currentYear}}. All Rights Reserved. </p>
  </div>
</template>

<script>
export default {
  name: 'MyFooter',
  data() {
    return {
      currentYear: new Date().getFullYear(),// gets current year
    };
  }
}
</script>

<style scoped>
.my-containter{
  background-color: #24433e!important;
  padding-top: 20px;
  padding-bottom: 20px;
  position: sticky;
  top: 100vh;
}
.my-footer-text{
  color: #d0d3d3;
  font-size: 20px;
}

</style>