<template>
    <div
        class="fixed inset-0 transition-all duration-200"
        :class="[isOpen ? 'opacity-100 w-full min-h-screen max-h-screen pointer-events-auto overflow-clip z-50 surface on-surface' : 'opacity-0 translate-y-full pointer-events-none']"
    >
        <div
            class="relative md:container md:mx-auto w-full h-full overflow-auto"
            @scroll="scrollEventhandle"
        >

            <header class="flex items-center justify-end sticky top-0 z-10 h-full min-h-16 max-h-16 px-2">
                <md-icon-button @click="() => emits('request-close')">
                    <md-icon>close</md-icon>
                </md-icon-button>
            </header>
            <form
                class="relative h-full flex flex-col gap-2 p-4 z-0"
                id="edit-note-form"
                @input="inputEventHandle"
            >
                <textarea
                    id="edit-note-input-title"
                    label="Title"
                    :value="injection?.target?.title"
                />
                <textarea
                    id="edit-note-input-description"
                    label="Description"
                    :value="injection?.target?.description"
                ></textarea>
            </form>
        </div>
        <nav class="sticky bottom-0 surface-container-highest">
            <div class="flex gap-1 items-center p-2">
                <md-icon-button @click="emits('request-remove', injection?.target?.id!)">
                    <md-icon>delete</md-icon>
                </md-icon-button>
            </div>
        </nav>
    </div>
</template>

<script
    setup
    lang="ts"
>
import { computed, inject } from 'vue'
import { NoteEditorDataProvider, INoteEditorDataProvider } from '../../store/NoteStore'

const emits = defineEmits<{
    'note-change': [{ title: string, description: string, id: number }],
    'request-close': [],
    'request-remove': [number],
}>()
const inputEventHandle = (e: Event) => {
    const noteNodes = [(e.target as HTMLFormElement).form.children.item(0).value, (e.target as HTMLFormElement).form.children.item(1).value]
    console.log(noteNodes)
    emits('note-change', {
        title: noteNodes[0],
        description: noteNodes[1],
        id: injection!.target!.id!,
    })
}

const injection = inject<INoteEditorDataProvider>(NoteEditorDataProvider)
const isOpen = computed(() => injection?.target !== null)

const scrollEventhandle = () => {
    const titleBox = document.querySelector('#edit-note-input-title') as HTMLElement
    const y = titleBox.getClientRects().item(0)!.y
    if (y <= 32) {
        titleBox.classList.add('top')
    } else {
        titleBox.classList.remove('top')
    }
}
</script>

<style scoped>
#edit-note-input-title,
#edit-note-input-description {
    appearance: none;
    all: unset;
    @apply px-4 py-2 shape-medium flex-shrink-0;
    word-wrap: break-word;
    word-break: break-all;
    transition-property: all;
    transition-duration: 200ms;
}

#edit-note-input-title {
    @apply headline-medium z-20 primary-container on-primary-container h-fit flex-grow;

}

#edit-note-input-title.top {
    @apply title-large z-20 bg-transparent mr-16 p-0 pl-2 text-nowrap overflow-clip text-ellipsis whitespace-nowrap h-fit flex-grow-0;

}

#edit-note-input-title.top~#edit-note-input-description {
    @apply surface-container on-surface shadow-md ring ring-[--md-sys-color-primary];
    transition-duration: 50ms;
}

#edit-note-input-description {
    @apply body-large resize-y surface-container on-surface flex-grow;
}
</style>
