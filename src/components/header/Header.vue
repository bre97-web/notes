<template>
    <header class="header">
        <div class="start">
            <nav
                v-if="$slots['navigation-toggler']"
                class="navigation-toggler"
            >
                <slot name="navigation-toggler"></slot>
            </nav>
            <section class="title">
                <slot name="title"></slot>
            </section>
        </div>

        <nav class="actions">
            <slot name=actions></slot>
        </nav>
    </header>
</template>

<script
    setup
    lang="ts"
>


</script>

<style scoped>
.header {
    @apply w-full lg:container lg:mx-auto px-4 py-2 bg-transparent on-surface flex items-center justify-between;
}

.start {
    @apply flex items-center gap-2;
}

.navigation.toggler {
    @apply flex-shrink-0 flex-grow-0;
}

.title {
    @apply title-medium;
}

.actions {
    @apply flex items-center gap-1;
}
</style>
