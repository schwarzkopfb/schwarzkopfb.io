<style src="../style/bg-layer.less" lang="less" scoped></style>

<script>
    export default {
        props: {
            start: {
                type: String,
                default: 'top[sqrt]: 100px'
            },
            end: {
                type: String,
                default: 'top[sqrt]: -150px'
            }
        },

        methods: {
            shouldBreak() {
                return Math.random() < 0.2
            }
        }
    }
</script>

<template>
    <div class="layer" :data-100="start" :data-end="end">
        <template v-for="n in 30">
            <div v-if="shouldBreak()" class="break"></div>
            <div v-else class="hex"></div>
        </template>
    </div>
</template>
