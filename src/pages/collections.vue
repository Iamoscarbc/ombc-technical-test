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
        <v-row v-if="booksShow.length != 0">
          <v-col v-for="i in booksShow" :key="i._id" class="list-books">
            <book :book="i"/>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col>
            <span>Not Collections yet</span>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </template>
  
  <script>
  import book from '@/components/book'
  import { mapState } from 'vuex'
  export default {
    name: 'listCollections',
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
      ...mapState("collections", ['collections']),
      booksShow(){
        let books = this.collections.filter(x => x.show)
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
    }
  }
  </script>
  <style lang="scss">
  .list-books{
    cursor: pointer;
    display: flex;
    justify-content: center;
  }
  </style>