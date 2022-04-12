<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div>
      <p>Using stand-alone:<p/>
      <div class="mb-4">
        <b-avatar></b-avatar>
        <b-avatar variant="primary" text="BV"></b-avatar>
        <b-avatar variant="info" src="https://placekitten.com/300/300"></b-avatar>
        <b-avatar variant="success" icon="people-fill"></b-avatar>
      </div>
      <p>Using in components (list group) example:<p/>
      <b-list-group style="max-width: 300px;">
        <b-list-group-item class="d-flex align-items-center">
          <b-avatar class="mr-3"></b-avatar>
          <span class="mr-auto">J. Circlehead</span>
          <b-badge>5</b-badge>
        </b-list-group-item>
        <b-list-group-item class="d-flex align-items-center">
          <b-avatar variant="primary" text="BV" class="mr-3"></b-avatar>
          <span class="mr-auto">BootstrapVue</span>
          <b-badge>12</b-badge>
        </b-list-group-item>
        <b-list-group-item class="d-flex align-items-center">
          <b-avatar variant="info" src="https://placekitten.com/300/300" class="mr-3"></b-avatar>
          <span class="mr-auto">Super Kitty</span>
          <b-badge>9</b-badge>
        </b-list-group-item>
        <b-list-group-item class="d-flex align-items-center">
          <b-avatar variant="success" icon="people-fill" class="mr-3"></b-avatar>
          <span class="mr-auto">ACME group</span>
          <b-badge>7</b-badge>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
