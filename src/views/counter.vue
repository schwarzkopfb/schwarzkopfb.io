<style src="../style/counter.less" lang="less" scoped></style>

<script>
    export default {
        props: {
            data: Object
        },

        computed: {
            count() {
                return Object.keys(this.data).length
            }
        }
    }
</script>

<template>
    <div class="counter">
        <div v-for="(target, label, index) of data"
             class="year"
             data--50-center-center="top: -1px"
             data-50-center-center="top: 100px"
             :data-anchor-target="target"
             :style="{ 'z-index': count - index }"
             :key="label"
        >
            <span>{{ label }}</span>
        </div>
    </div>
</template>
