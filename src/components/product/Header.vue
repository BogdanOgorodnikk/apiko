<template>
    <div class="header">
        <div class="container">
            <div class="header__box">
                <div class="header__box-wrap">
                    <router-link to="/"><img class="header__box--images" src="../../assets/img/logo.png" alt="logo"></router-link>
                    <img @click.prevent="openMenu" class="header__box--menu" src="../../assets/img/menu.png" alt="menu">
                </div>
                <div class="header__box--item" v-if="open">
                    <img class="header__box--item-avatar" src="../../assets/img/avatar.png" alt="avatar">
                    <img src="../../assets/img/heart.svg" alt="heart">
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "Header",
    data: () => ({
        open: true
    }),
    mounted() {
        window.onresize = () => {
            this.windowWidth = window.innerWidth
            if(this.windowWidth <= 500) {
                this.open = false
            } else {
                this.open = true
            }
        }
    },
    methods: {
        openMenu() {
            this.open = !this.open
        }
    }
}
</script>

<style lang="scss" scoped>
    .header {
        background: linear-gradient(180deg, #090810 0%, #171236 100%);
        overflow: hidden;
    }
    .header__box {
        display: flex;
        justify-content: space-between;
        margin-top: 18px;
        margin-bottom: 17px;
    }
    .header__box--item {
        display: flex;
    }
    .header__box--item-avatar {
        margin-right: 36px;
    }
    .header__box--menu {
        display: none;
    }
    @media screen and (max-width: 500px) {
        .header__box {
            display: block;
        }
        .header__box--menu {
            display: block;
            width: 50px;
            height: 26px;
        }
        .header__box-wrap {
            display: flex;
            justify-content: space-between;
        }
        .header__box--item {
            margin-top: 10px;
        }
    }
</style>