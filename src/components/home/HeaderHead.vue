<template>
    <div class="header-head">
        <div class="header-head__box">
            <div class="header-head__box-wrap">
                <img class="header-head__box--images" src="../../assets/img/logo.png" alt="logo">
                <img @click.prevent="openMenu" class="header-head__box--phone-menu" src="../../assets/img/menu.png" alt="menu">
            </div>
            <transition name="fade">
                <div class="header-head__box--item" v-if="open">
                    <router-link class="header-head__item--button" to='/product'>+ ADD</router-link>
                    <router-link class="header-head__item--logout" to='/login' v-if="isAuth == false">LOGIN</router-link>
                    <h3 class="header-head__item--logout" @click.prevent="logout" v-else>LOGOUT</h3>
                    <img src="../../assets/img/heart.svg" alt="heart" @click.prevent="showLikesProduct">
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import {bus} from '../../main'

export default {
    name: "HeaderHead",
    props: ['open'],
    async mounted() {
    if(!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
  },
    methods: {
        async logout() {
            await this.$store.dispatch('logout')
        },
        showLikesProduct() {
            bus.$emit('getLikesPosts')
        },
        openMenu() {
            this.open = !this.open
            this.$emit('TargetMenu', this.open)
        }
    },
    computed: {
        fullname() {
            return this.$store.getters.info.fullname
        },
        isAuth() {
            return this.$store.state.info.isAuth
        }
    }
}
</script>

<style lang="scss" scoped>
    .header-head {
        margin-top: 18px;
    }
    .header-head__box {
        display: flex;
        justify-content: space-between;
    }
    .header-head__box--item {
        display: flex;
        margin-top: 2px;
    }
    .header-head__item--button {
        display: block;
        background: #349A89;
        font-size: 14px;
        font-weight: 400;
        color: #fff;
        padding: 15px 40px 16px 50px;
        border-radius: 4px;
        margin-right: 33px;
        text-decoration: none;
        cursor: pointer;
        border: none;
    }
    .header-head__item--logout {
        font-size: 12px;
        font-weight: 400;
        color: #fff;
        margin-right: 40px;
        margin-top: 15px;
        text-decoration: none;
        cursor: pointer;
    }
    .header-head__box--phone-menu {
        display: none;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        transition: opacity .5s;
    }
    @media screen and (max-width: 500px) {
        .header-head__box {
            display: block;
        }
        .header-head__box-wrap {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
        }
        .header-head__box--phone-menu {
            display: block;
            width: 50px;
            height: 26px;
        }
        .header-head__box--item {
            display: block;
        }
        .header-head__box--images {
            display: block;
        }
        .header-head__item--button {
            margin-right: 0;
            text-align: center;
            width: 92px;
            padding: 8px 8px 8px 10px;
        }
        .header-head__item--logout {
            margin-bottom: 15px;
        }
    }
</style>