<script>
    export default {
        props: {
            to: String
        },

        methods: {
            onClick() {
                // `link` can be a `404` url as well
                const link = this.$router.navigate(this.to)
                history.pushState(null, '', link)
            }
        }
    }
</script>

<template>
    <a :href="to" @click.prevent="onClick">
        <slot />
    </a>
</template>
