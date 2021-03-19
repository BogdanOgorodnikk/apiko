import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(Vuelidate)
export const bus = new Vue()

firebase.initializeApp({
  apiKey: "AIzaSyAkdd6ebUsC-jIowDs9-2DGJltssZsHxW4",
  authDomain: "apiko-60ff5.firebaseapp.com",
  projectId: "apiko-60ff5",
  storageBucket: "gs://apiko-60ff5.appspot.com",
  messagingSenderId: "441347377714",
  appId: "1:441347377714:web:eed6cb16387e67314e8a2b",
  measurementId: "G-XP4PX67QKP"
})

let app;

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
