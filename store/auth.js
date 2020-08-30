export const state = () => ({
  user: null
})
export const getters = {
  getIsUserLogged (state) {
    return state.user != null
  },
  getEmail (state) {
    return state.user.email
  }
}
export const mutations = {
  setuser (state, payload) {
    state.user = payload
  }
}
