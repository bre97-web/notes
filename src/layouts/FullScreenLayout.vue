<template>
    <div class="full-screen">
        <slot></slot>
    </div>
</template>

<script
    setup
    lang="ts"
>

</script>

<style scoped>
.full-screen {
    @apply relative h-full min-h-screen max-h-screen overflow-clip;
}
</style>
