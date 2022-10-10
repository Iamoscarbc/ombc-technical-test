<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col :cols="0" :sm="6" :md="8"></v-col>
        <v-col :cols="12" :sm="6" :md="4">
          <v-menu
            ref="open"
            v-model="open"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                filled
                v-model="dateFormatted"
                label="Picker without buttons"
                append-icon="mdi-calendar"
                v-bind="attrs"
                v-on="on"
                @blur="date = parseDate(dateFormatted)"
                hide-details
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              @input="open = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="i in booksShow" :key="i._id" style="cursor: pointer;display: flex; justify-content: center;">
          <v-card class="fill-height" style="height: 530px; width: 210px; position: relative;">
          <v-icon v-if="verifyCollection(i)" @click="removeCollection(i)" color="blue" style="position: absolute; top:5px; right:5px; z-index: 10;">mdi-star-check</v-icon>
          <v-icon v-else @click="addCollection(i)" color="blue" style="position: absolute; top:5px; right:5px; z-index: 10;">mdi-star-check-outline</v-icon>
            <v-img
              width="100%"
              height="260px"
              :src="i.cover"
            ></v-img>
            <v-card-title class="pb-0 title-book" :title="i.title" @click="goTo(i.url)">{{i.title}}</v-card-title>
            <v-card-actions style="position: absolute; bottom:0; width: 100%">
              <div class="d-flex flex-column">            
                <span><v-icon small>mdi-account</v-icon> {{i.author}}</span>
                <span><v-icon small>mdi-tag</v-icon> {{i.category}}</span>
                <span><v-icon small>mdi-barcode</v-icon> {{i.isbn}}</span>
                <span><v-icon small>mdi-calendar</v-icon> {{i.createAt}}</span>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'listBooks',
  data: () => {
    return {
      books: [],
      open: false,
      date: null,
      dateFormatted: null
    }
  },
  computed:{
    ...mapState("collections", ['collections']),
    booksShow(){
      let books = this.books.filter(x => x.show)
      if(!!this.dateFormatted){
        return books.filter(x => x.createAt == this.date)
      }
      return books
    }
  },
  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    }
  },
  methods: {
    ...mapMutations("collections", ['ADD_COLLECTION', 'REMOVE_COLLECTION']),
    ...mapActions("books", ['getBooksService']),
    async getBooks(){
      try {
        let res = await this.getBooksService()
        if(res.status == 'success'){
          this.books = res.data
        }
      } catch (error) {
        console.log("error", error)
      }
    },
    goTo(url){
      window.open(url, '_blank');
    },
    formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate (date) {
      if (!date || date.split('/').length != 3) {
        this.date = null
        this.dateFormatted = null
        return null
      }
      const [day, month, year] = date.split('/')
      if(!day || !month || !year || year.length != 4){        
        this.date = null
        this.dateFormatted = null
        return null
      }
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    addCollection(book){
      this.ADD_COLLECTION(book)
    },
    removeCollection(book){
      this.REMOVE_COLLECTION(book)
    },
    verifyCollection(book){
      return this.collections.find(x => x._id == book._id)
    }
  },
  async mounted() {
    await this.getBooks()
  }
}
</script>
<style lang="scss">
.title-book{
  font-size: 18px;
  height: 145px;
  overflow: hidden;
  text-overflow: ellipsis;
  align-items: flex-start;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  &:hover{
    text-decoration: underline;
    color: rgb(83, 83, 240);
  }
}
</style>