<template>
  <div id="my-footer">
    <p id="my-footer-text">Copyright {{currentYear}}. All Rights Reserved. </p>
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
