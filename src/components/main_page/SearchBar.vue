<template>

      <b-container id="mynavbar">
        <!--    <b-nav-form >-->
        <b-row no-gutters>
          <b-col  cols="11" ><b-form-input style="width: 100%" placeholder="Search"></b-form-input></b-col>
          <b-col  cols="1"><b-button style="width: 100%" variant="primary" type="submit">Search</b-button></b-col>
        </b-row>
        <!--    </b-nav-form>-->
      </b-container>

</template>

<script>
export default {
  name: 'SearchBar',
}
</script>
