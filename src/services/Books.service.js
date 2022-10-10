const base = '/api/books'
export default {
  getBooksService: ($axios) => {
    return $axios.$get(`${base}`)
  }
}
