export const state = () => ({
    collections: []
})

export const mutations = {
    ADD_COLLECTION(state, value){
        state.collections.push(value)
    },
    REMOVE_COLLECTION(state, value){
        let index = state.collections.findIndex(x => x._id == value._id)
        state.collections.splice(index, 1)
    }
}