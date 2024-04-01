<template>
    <div class="page-container">

        <slot name="header"></slot>
        <slot></slot>
    </div>
</template>

<script
    setup
    lang="ts"
>

</script>

<style scoped>
.page-container {
    @apply relative h-full min-h-screen max-h-screen w-full flex flex-col surface-container on-surface;
}



/* .content {
    @apply relative w-full flex-grow-0 flex-shrink-0 surface flex flex-row overflow-auto;
}

.content:deep(>*) {
    @apply flex-grow overflow-clip;
}
*/
</style>
