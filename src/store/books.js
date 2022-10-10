import BooksService from '@/services/Books.service.js'
export const state = () => ({

})

export const getters = {}

export const mutations = {}

export const actions = {
  async getBooksService({state, commit}){
    return await BooksService.getBooksService(this.$axios)
  }
}
