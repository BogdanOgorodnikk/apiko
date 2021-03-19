<template>
    <div class="container">
        <form class="sort-form">
            <select class="sort-form__selected">
                <option disabled selected>Choose category</option>
            </select>
            <img class="sort-form__selected-icon" src="../../assets/img/selectedgrid.png" alt="selectedgrid">
            <input @change="setPrice" type="text" class="sort-form__input" placeholder="Price from (USD)" v-model="filterPriceFrom">
            <div class="sort-form__line"></div>
            <input @change="setPrice" type="text" class="sort-form__input" placeholder="Price to (USD)" v-model="filterPriceTo">
        </form>
    </div>
</template>

<script>
import {bus} from '../../main'
export default {
    name: "SortForm",
    data: () => ({
        filterPriceFrom: '',
        filterPriceTo: ''
    }),
    methods: {
        setPrice() {
            bus.$emit('putFilter', this.filterPriceFrom, this.filterPriceTo)
        }
    }
}
</script>

<style lang="scss" scoped>
    .sort-form {
        background: #fff;
        border-radius: 4px;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.217111);
        width: 855px;
        height: 59px;
        margin: 19px auto 8px;
        position: relative;
        overflow: hidden;
    }
    .sort-form__selected {
        width: 285px;
        height: 35px;
        margin: 12px 23px 12px 11px;
        background: #F9FAFB;
        border-radius: 5px;
        border: 1px solid #DEDEE0;
        padding-left: 39px;
        color: #505050;
        font-size: 14px;
        font-weight: 400;
    }
    .sort-form__selected-icon {
        position: absolute;
        top: 21px;
        left: 22px;
    }
    .sort-form__input {
        width: 143px;
        height: 35px;
        background: #F9FAFB;
        border-radius: 5px;
        border: 1px solid #DEDEE0;
        padding: 10px 8px 9px 9px;
        color: #505050;
        font-size: 14px;
        font-weight: 400;
    }
    .sort-form__line {
        display: inline-block;
        height: 1px;
        background: #DEDEE0;
        width: 12px;
        margin: 0 7px;
        margin-bottom: 4px;
    }
    @media screen and (max-width: 870px) {
        .sort-form {
            max-width: 855px;
            width: 100%;
        }
    }
    @media screen and (max-width: 670px) {
        .sort-form {
            height: auto;
        }
        .sort-form__input {
            display: block;
            width: 97%;
            margin-left: 11px;
            margin-right: 11px;
            margin-bottom: 10px;
        }
        .sort-form__line {
            display: none;
        }
        .sort-form__selected {
            width: 97%;
        }
    }
    @media screen and (max-width: 400px) {
        .sort-form__input {
            width: 94%;
        }
        .sort-form__selected {
            width: 94%;
        }
    }
</style>