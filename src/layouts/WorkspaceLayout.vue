<template>
    <slot></slot>
    <div class="fixed left-0 bottom-0 w-full flex flex-col pointer-events-none transition-all duration-700">
        <nav class="z-40 self-end pt-4 pr-4 pb-2 pointer-events-auto transition-all duration-700">
            <slot name="fab"></slot>
        </nav>
        <div class="z-40 flex-grow flex-shrink md:self-end md:pr-4 pt-2 pointer-events-auto overflow-auto duration-700">
            <slot name="bottom-sheet"></slot>
        </div>
    </div>
</template>

<script
    setup
    lang="ts"
>

</script>

<style scoped></style>
