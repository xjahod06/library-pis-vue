
<template>
  <NavBar/>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
  data() {
    return {
      count: 0
    }
  },
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>
#app {
  color: #2c3e50;
  background-color: #ebebeb;
}
</style>
