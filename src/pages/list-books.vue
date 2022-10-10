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
        <v-col v-for="i in booksShow" :key="i._id" class="list-books">
          <book :book="i"/>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import book from '@/components/book'
import { mapActions } from 'vuex'
export default {
  name: 'listBooks',
  components: {
    book
  },
  data: () => {
    return {
      books: [],
      open: false,
      date: null,
      dateFormatted: null
    }
  },
  computed:{
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

.list-books{
  cursor: pointer;
  display: flex;
  justify-content: center;
}
</style>