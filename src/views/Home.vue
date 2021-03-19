<template>
    <div class="home">
        <Header />
        <SortForm />
        <ProductList />
    </div>
</template>

<script>
import SortForm from '../components/home/SortForm'
import ProductList from '../components/home/ProductList'
import Header from '../components/home/Header'

export default {
    name: "Home",
    components: {
        Header,
        SortForm,
        ProductList
    }
}
</script>