<template>
    <router-link class="error-router" to="/login" v-if="fullname == 'empty'">Вы не пройшли авторизацию, нажмите для авторизации</router-link>
    <div class="product" v-else>
        <Header />
        <CreateProduct />
    </div>
</template>

<script>
import Header from '../components/product/Header'
import CreateProduct from '../components/product/CreateProduct'

export default {
    name: "product",
    components: {
        Header,
        CreateProduct
    },
    computed: {
        fullname() {
            return this.$store.getters.info.fullname || 'empty'
        }
    }
}
</script>

<style lang="scss" scoped>
    .error-router {
        display: block;
        text-align: center;
        margin: 100px auto;
    }
</style>