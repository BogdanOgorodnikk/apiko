<template>
    <div class="header">
        <div class="container">
            <HeaderHead
                :open = 'open'
                @TargetMenu = "changeOpen"
            />
            <transition name="fade">
                <HeaderSearcher  v-if="open"/>
            </transition>
        </div>
    </div>
</template>

<script>
import HeaderHead from './HeaderHead'
import HeaderSearcher from './HeaderSearcher'

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
        changeOpen(data) {
            this.open = data
        }
    },
    components: {
        HeaderHead,
        HeaderSearcher
    }
}
</script>

<style lang="scss" scoped>
    .header {
        background: linear-gradient(180deg, #090810 0%, #171236 100%);
        overflow: hidden;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        transition: opacity .5s;
    }
</style>