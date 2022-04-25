<template>
 <div>
   <NavbarFinal></NavbarFinal>
   <b-container>
     <h1><span v-if="this.$route.query.genres !== undefined">{{ this.$route.query.genres }}</span> Authors:</h1>
     <b-row>
       <AuthorTile v-for="author in authors"
                 :img="author.photographPath"
                 :name = author.name
                 :surname = author.surname
                 :id = author.id
                 :date-of-birth = "new Date(author.dateOfBirth)"
       >

       </AuthorTile>
     </b-row>
   </b-container>
   <MyFooter></MyFooter>
 </div>
</template>

<script>
import MyFooter from "@/components/main_page/MyFooter";
import ApiConnect from "@/services/ApiConnect";
import AuthorTile from "@/components/genre_page/AuthorTile";
import NavbarFinal from "@/components/main_page/NavbarFinal";

export default {
  name: "Authors",
  components: {AuthorTile, MyFooter, NavbarFinal},
  data(){
    return {
      authors: [],
    }
  },

  methods: {
    getAuthors(){
      let params;
      if(this.$route.query.genres !== undefined) {
        params = {params: {"genres": this.$route.query.genres}}
      }else{
        params = {params: {}}
      }
      ApiConnect.get('authors/',params).then((response) =>
          this.authors = response.data,
      )}
  },

  created() {
    this.getAuthors();
  },
}
</script>

<style scoped>

</style>