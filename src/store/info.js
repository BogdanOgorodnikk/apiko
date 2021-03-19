import firebase from 'firebase/app'

export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        },
        clearInfo(state) {
            state.info = {}
        }
    },
    actions: {
        async fetchInfo({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid')
                const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
                commit('setInfo', info)
            } catch (e) {
                return false
            }
        },
        async likeProducts({dispatch}, {title, price, imageUrl, location}) {
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/likeProducts`).push({title, price, imageUrl, location})
            } catch (e) {
                return false
            }
        }
    },
    getters: {
        info: s => s.info
    }
  }
  