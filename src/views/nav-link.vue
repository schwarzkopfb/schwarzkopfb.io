<script>
    export default {
        props: {
            to: String
        }
    }
</script>

<template>
    <a :href="to" @click.prevent="$parent.onLinkClick(to)">
        <slot />
    </a>
</template>
