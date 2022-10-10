<template>
    <v-card class="fill-height card-book">
        <v-icon v-if="verifyCollection(book)" @click="removeCollection(book)" color="blue" class="icon-collection">mdi-star-check</v-icon>
        <v-icon v-else @click="addCollection(book)" color="blue" class="icon-collection">mdi-star-check-outline</v-icon>
        <v-img
            width="100%"
            height="260px"
            :src="book.cover"
        ></v-img>
        <v-card-title class="pb-0 title-book" :title="book.title" @click="goTo(book.url)">{{book.title}}</v-card-title>
        <v-card-actions class="card-footer">
            <div class="d-flex flex-column">            
                <span><v-icon small>mdi-account</v-icon> {{book.author}}</span>
                <span><v-icon small>mdi-tag</v-icon> {{book.category}}</span>
                <span><v-icon small>mdi-barcode</v-icon> {{book.isbn}}</span>
                <span><v-icon small>mdi-calendar</v-icon> {{book.createAt}}</span>
            </div>
        </v-card-actions>
    </v-card>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'book',
  props: {
    book: {
        type: Object,
        default: () => {}
    }
  },
  computed:{
    ...mapState("collections", ['collections'])
  },
  methods: {
    ...mapMutations("collections", ['ADD_COLLECTION', 'REMOVE_COLLECTION']),
    goTo(url){
      window.open(url, '_blank');
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
    .card-book{
        height: 530px;
        width: 210px;
        position: relative;
    }
    .icon-collection{
        position: absolute !important;
        top:5px;
        right:5px;
        z-index: 4;
    }
    .card-footer{
        position: absolute;
        bottom:0;
        width: 100%
    }
</style>