<template>
    <div
        class="note-card"
        @click="() => emits('editRequested', props.id)"
    >
        <md-ripple></md-ripple>
        <md-elevation></md-elevation>
        <h1 class="title-medium">{{ props.title }}</h1>
        <p class="body-medium">{{ props.description }}</p>
    </div>
</template>

<script
    setup
    lang="ts"
>
import { type TNote } from '../../store/NoteStore'

const props = defineProps<TNote>()
const emits = defineEmits<{
    'editRequested': [number]
}>()
</script>

<style scoped>
.note-card {
    --md-elevation-level: 0;
    transition-duration: 200ms;
    @apply relative overflow-clip border border-outline-variant rounded-md px-4 py-2 surface-bright min-w-32 min-h-32 max-h-96;
}

.note-card:hover {
    --md-elevation-level: 1;
}

.note-card:active {
    --md-elevation-level: 0;
}
</style>
