import firebase from 'firebase/app'

export default {
    state: {
    },
    mutations: {
    },
    actions: {
        async createProduct({dispatch}, {title, location, description, photos, price}) {
            try {
                let imageUrl
                let key
                const uid = await dispatch('getUid')
                const product = await firebase.database().ref(`/products`).push({title, location, description, price, uid})
                key = product.key
                const filename = photos.name
                const ext = filename.slice(filename.lastIndexOf('.'))
                const fileData = await firebase.storage().ref('products/' + key + ext).put(photos)
                imageUrl = await fileData.ref.getDownloadURL()
                await firebase.database().ref('/products').child(key).update({imageUrl: imageUrl})
                return {title, location, description, price, uid, imageUrl: imageUrl, id:product.key}
            } catch (e) {
                return false + e
            }
        },
    }
  }
  