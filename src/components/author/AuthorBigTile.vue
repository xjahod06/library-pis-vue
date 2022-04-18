<template>
  <div class="Author-big-tile">
    <b-row align-v="center">
      <b-col cols="3">
        <b-img src="@/assets/logo.png" alt="Author Photo" ></b-img>
      </b-col>
      <b-col id="author-info" class="py-2 px-4 pt-4">
        <h1 class="text-left display-3 mb-0"> {{ name }} {{ surname }}</h1>
        <h2 class="text-left mt-2">{{ birthDate }} - </h2>
        <p class="text-justify">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam erat volutpat. Nullam dapibus fermentum ipsum. Vestibulum fermentum tortor id mi. Nullam dapibus fermentum ipsum. Nullam lectus justo, vulputate eget mollis sed, tempor sed magna. Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui. Nulla non lectus sed nisl molestie malesuada. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Suspendisse sagittis ultrices augue. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Cras pede libero, dapibus nec, pretium sit amet, tempor quis. Mauris suscipit, ligula sit amet pharetra semper, nibh ante cursus purus, vel sagittis velit mauris vel metus. Nulla accumsan, elit sit amet varius semper, nulla mauris mollis quam, tempor suscipit diam nulla vel leo. Proin pede metus, vulputate nec, fermentum fringilla, vehicula vitae, justo. Morbi scelerisque luctus velit.</p>
      </b-col>

    </b-row>
  </div>
</template>

<script>
export default {
  name: "AuthorBigTile",
  props: {
    name: String,
    birth: Number,
    surname: String
  },
  computed: {
    birthDate() {
      let dt = new Date(this.birth);
      return dt.getDay() + "." + dt.getMonth() + "." + dt.getFullYear();

    }
  }
}
</script>

<style scoped>
#author-info{
  background-color: #24433e;
  color: #d0d3d3 !important;
}
h5, p{
  color: #d0d3d3 !important;
}
.display-3{
  color: #d0d3d3 !important;
  margin-bottom: -15px !important;
}
small{
  color: #cbcbcb !important;
}
</style>