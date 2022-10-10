<template>
  <v-row>
    <v-col :cols="12" :sm="6" :md="6" :lg="4" :xl="3"
    v-for="i in [1,2,3,4,5,6]" :key="i">
      <v-card color="white">
        <span style="color: black">{{i}}</span>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'listBooks',
  data: () => {
    return {
      books: []
    }
  },
  methods: {
    ...mapActions("books", ['getBooksService']),
    async getBooks(){
      try {
        let res = await this.getBooksService()
        if(res.status == 'successs'){
          this.books = res.data
        }
      } catch (error) {
        console.log("error", error)
      }
    }
  },
  async mounted() {
    await this.getBooks()
  }
}
</script>
