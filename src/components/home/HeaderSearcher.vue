<template>
    <div class="header-searcher">
        <form class="header-searcher__form">
            <div class="header-searcher__form--block">
                <input type="text" class="header-searcher__form--input header-searcher__form--input-search" placeholder="Search products by name" v-model="searchTitle">
                <img class="header-searcher__form--search" src="../../assets/img/search.png" alt="searcher">
            </div>
            <div class="header-searcher__form--block">
                <input type="text" class="header-searcher__form--input header-searcher__form--input-location" placeholder="Location" v-model="searchLocation">
                <img class="header-searcher__form--location" src="../../assets/img/location.png" alt="location">
            </div>
            <button type="submit" class="header-searcher__form--button" @click.prevent="searchProduct">SEARCH</button>
        </form>
    </div>
</template>

<script>
import {bus} from '../../main'

export default {
    name: "HeaderSearcher",
    data: () => ({
        searchTitle: '',
        searchLocation: ''
    }),
    methods: {
        searchProduct() {
            bus.$emit('putSearch', this.searchTitle, this.searchLocation)
        }
    }
}
</script>

<style lang="scss" scoped>
    .header-searcher {
        margin-top: 40px;
        margin-bottom: 14px;
    }
    .header-searcher__form {
        display: flex;
        justify-content: center;
    }
    .header-searcher__form--block {
        position: relative;
        margin-right: 7px;
    }
    .header-searcher__form--input {
        height: 50px;
        border-radius: 4px;
        border: none;
        font-size: 15px;
        &::placeholder {
            font-size: 15px;
            color: #7B7B7B;
        }
    }
    .header-searcher__form--input-search {
        width: 467px;
        padding-left: 52px;
    }
    .header-searcher__form--search {
        display: block;
        position: absolute;
        top: 16px;
        left: 21px;
    }
    .header-searcher__form--input-location {
        padding-left: 38px;
        width: 198px;
    }
    .header-searcher__form--location {
        display: block;
        position: absolute;
        top: 16px;
        left: 10px;
    }
    .header-searcher__form--button {
        padding: 10px 56px 9px 61px;
        border: none;
        border-radius: 4px;
        background: #3E3961;
        font-size: 14px;
        font-weight: 400;
        color: #fff;
        cursor: pointer;
    }
    @media screen and (max-width: 880px) {
        .header-searcher__form--input-search {
            width: 235px;
        }
        .header-searcher__form--input-location {
            width: 110px;
        }
        .header-searcher__form--button {
            padding: 10px 8px 9px 8px;
        }
    }
    @media screen and (max-width: 500px) {
        .header-searcher__form {
            display: block;
        }
        .header-searcher__form--input-search {
            width: 100%;
            margin-bottom: 15px;
        }
        .header-searcher__form--input-location {
            width: 100%;
            margin-bottom: 15px;
        }
    }
</style>