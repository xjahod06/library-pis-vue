<template>
  <b-container class="author-form-list edit-book-page">
    <b-row class="text-center">
      <b-col>
        <font-awesome-icon icon="fa-solid fa-display" size="4x" v-b-modal.modal-preview type="button" class="preview"/>
      </b-col>
    </b-row>
    <b-row class="text-center mb-4">
      <b-col style="color: black">
        preview author page
      </b-col>
    </b-row>
    <b-form @submit.prevent="submit">
      <b-row class="form-row">
        <b-col>
        <b-form-group
            id="name-label"
            label="Name:"
            label-for="name"
        >
          <b-form-input
              ref="name"
              id="name"
              v-model="form.name"
              type="text"
              placeholder="Enter first name"
              required
          ></b-form-input>
        </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
              id="surname-label"
              label="Surname:"
              label-for="surname"
          >
            <b-form-input
                ref="surname"
                id="surname"
                v-model="form.surname"
                type="text"
                placeholder="Enter last name"
                required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="form-row">
        <b-col>
          <b-form-group
          id="dateOfBirth-label"
          label="Date of birth*:"
          label-for="dateOfBirth">
          <b-form-datepicker
              id="dateOfBirth"
              ref="dateOfBirth"
              v-model="form.dateOfBirth "
              type="date"
              required
              placeholder="Enter date of birth">
          </b-form-datepicker>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
              id="dateOfDeath-label"
              label="Date of death*:"
              label-for="dateOfDeath">
          <b-form-datepicker
              id="dateOfDeath"
              ref="dateOfDeath"
              reset-button
              label-reset-button="Clear"
              v-model="form.dateOfDeath "
              type="date"
              required
              placeholder="Enter date of death">
          </b-form-datepicker>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="form-row">
        <b-col>
          <b-form-group
              id="photograph-label"
              label="Photograph*:"
              label-for="photograph">
          <b-form-file
              v-model="photograph"
              id="photograph"
              ref="photograph"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
          ></b-form-file>
          </b-form-group>
        </b-col>
        <b-col></b-col>
      </b-row>

      <b-row class="form-row">
        <b-col>
        <b-form-group
            id="description-label"
            label="Description:"
            label-for="description"
        >
          <b-form-textarea
              ref="description"
              id="description"
              v-model="form.description"
              placeholder="Enter description about author..."
              rows="8"

          ></b-form-textarea>
        </b-form-group>
        </b-col>
      </b-row>

      <b-row v-if="this.$route.params.id != 0">
        <b-col class="text-center mt-4">
          <b-button @click="submit" variant="primary">Update</b-button>
        </b-col>
      </b-row>
      <b-row v-if="this.$route.params.id == 0">
        <b-col class="text-center mt-4">
          <b-button @click="create" variant="success">Create</b-button>
        </b-col>
      </b-row>
    </b-form>

    <b-modal id="modal-preview" title="Preview" size="xl" hide-footer>
        <b-row>
            <AuthorBigTile
                :name="form.name"
                :surname="form.surname"
                :birth="new Date(form.dateOfBirth)"
                :death="new Date(form.dateOfDeath)"
                :description="form.description"
                :img = "imgPreview"
            ></AuthorBigTile>

        </b-row>

    </b-modal>

  </b-container>
</template>

<script>
import ApiConnect from "@/services/ApiConnect";
import AuthorBigTile from "@/components/author/AuthorBigTile";

export default {
  name: 'AuthorForm',
  components: {
    AuthorBigTile,
  },
  data() {
    return {
      show: true,
      photograph: null
    };
  },
  props: {
    author: {},
    form: {},
  },
  methods: {
     async onSubmit() {
       if (this.photograph !== null){
         var fileBuffer = await this.convertFileToArrayBuffer();
         var array = new Uint8Array(fileBuffer);
         this.form.photograph = Array.from(array);
       }

       ApiConnect.put('authors/', this.form).then(response => {
         window.location.reload();
       }).catch(error => {
       })

     },
    async submit(){
      if (this.photograph !== null){
        var fileBuffer = await this.convertFileToArrayBuffer();
        var array = new Uint8Array(fileBuffer);
        this.form.photograph = Array.from(array);
      }
      ApiConnect.put('/authors', this.form).then((response) =>{
        console.log(response)
        this.makeToast('Author '+this.author.name+' ' + this.author.surname  +'has been updated successfully.')
      }).catch(error => {
        console.log(error)
      })
    },
    async create(){
      if (this.photograph !== null){
        var fileBuffer = await this.convertFileToArrayBuffer();
        var array = new Uint8Array(fileBuffer);
        this.form.photograph = Array.from(array);
      }
      ApiConnect.post('/authors', this.form).then((response) =>{
        this.makeToast('Author '+this.form.name+' ' + this.form.surname  +'has been created successfully.')

      }).catch(error => {
      })
      ApiConnect.get('/authors/').then(resp =>{
        this.$router.push('/edit_authors/'+(resp.data[resp.data.length -1].id+1))
      })
    },
    convertFileToArrayBuffer(){
      return new Promise((resolve, reject) => {
        try {
          if (this.photograph !== null){
            resolve(this.photograph.arrayBuffer());
          }

        }
        catch (e){
          reject (e);
        }
      })
    },
    makeToast(text) {
      this.$bvToast.toast(text, {
        title: 'Library',
        variant: 'success',
        autoHideDelay: 5000,
      })
    },
  },
  computed: {
    imgPreview: function() {
      if (this.photograph !== null){
        this.convertFileToArrayBuffer().then(fileBuffer => {
          var array = new Uint8Array(fileBuffer);
          this.form.photograph = Array.from(array);
        });

      }
      return this.form.photograph;
    }
  },

}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.edit-book-page{
  color: black;
  text-align: left;
}
.preview{
  color: #24433e;
  box-shadow: 0 6px 10px rgba(0,0,0,0), 0 0 6px rgba(0,0,0,0);
  transition: .3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12);
}
.preview:hover{
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06);
}
</style>
