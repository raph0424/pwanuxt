export const state = () => ({
  user: null
})
export const getters = {
  getIsUserLogged (state) {
    return state.user != null
  }
}
export const mutations = {
  setuser (state, payload) {
    state.user = payload
  }
}
