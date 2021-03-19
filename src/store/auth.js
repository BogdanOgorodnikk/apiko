import firebase from 'firebase'

export default {
    state: {
    },
    mutations: {
    },
    actions: {
        async login({commit}, {email, password}) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch (e) {
                alert('Произошла ошибка' + e)
                commit('setError', e)
                throw e;
            }
        },
        async register({dispatch}, {email, fullname, password}) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/info`).set({
                    fullname
                })
            } catch (e) {
                alert('Произошла ошибка' + e)
                throw e;
            }
        },
        getUid() {
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        },
        async logout({commit}) {
            await firebase.auth().signOut()
            commit('clearInfo')
        }
    }
  }
  