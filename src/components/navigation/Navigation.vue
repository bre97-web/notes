<template>
    <div
        class="scrim-mask"
        :class="[!props.isOpen && 'close']"
        @click="() => emits('close')"
    ></div>
    <div
        class="navigation-rail"
        :class="[!props.isOpen && 'close']"
    >
        <ul class="navigation-list">
            <slot></slot>
        </ul>

        <div class="actions">
            <slot name="actions"></slot>
        </div>
    </div>
</template>

<script
    setup
    lang="ts"
>

const props = defineProps<{
    isOpen: boolean
}>()
const emits = defineEmits<{
    'close': []
}>()

</script>

<style scoped>
.navigation-rail {
    @apply fixed top-0 z-50 md:relative rounded-r-[28px] md:rounded-none surface md:surface-container min-w-[336px] max-w-[336px] w-[336px] h-full md:h-[inherit] flex flex-col py-4 px-2 overflow-clip;
}

.navigation-rail:not(.close),
.navigation-rail:not(.close)>* {
    @apply transition-all duration-200;
}

.navigation-rail.close {
    @apply pointer-events-none min-w-0 max-w-0 w-0 opacity-0 origin-left transition-all duration-200 delay-100 px-0;
}

.navigation-rail.close>* {
    @apply opacity-0 transition-all duration-200;
}

.scrim-mask {
    @apply fixed inset-0 top-0 left-0 opacity-100 w-full h-full z-40 bg-black bg-opacity-25 md:invisible md:pointer-events-none md:hidden;
    transition-property: all;
    transition-delay: 75ms;
    transition-duration: 200ms;
}

.scrim-mask.close {
    @apply pointer-events-none opacity-0;
}

ul.navigation-list {
    @apply relative h-full w-full flex flex-col items-center justify-start gap-1 z-10 md:z-0 overflow-auto;
}

ul.navigation-list :slotted(li) {
    @apply relative shape-full px-6 flex gap-2 items-center justify-start h-[56px] w-full flex-shrink-0;
}

.actions {
    @apply flex flex-col gap-2 items-center justify-center;
}
</style>
