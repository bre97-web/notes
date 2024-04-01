<template>
    <div
        class="fixed z-30 left-0 bottom-0 w-full h-fit flex flex-col pointer-events-none transition-all duration-200 delay-75"
        :class="[!isOpenBottomSheet && 'translate-y-72']"
        style="transition-timing-function: cubic-bezier(0.05, 0.7, 0.1, 1);"
    >
        <CreateNoteFab
            variant="primary"
            @click="createNoteClickEventHandle"
            class="pointer-events-auto p-4 self-end"
        ></CreateNoteFab>

        <div
            class="relative h-72 surface-container-low rounded-t-[28px] transition-all duration-200 flex flex-col gap-2 md:max-w-md md:self-end md:mr-4 pointer-events-auto"
            style="--md-elevation-level: 3; transition-timing-function: cubic-bezier(0.05, 0.7, 0.1, 1);"
        >
            <md-elevation></md-elevation>
            <form
                class="flex-grow flex flex-col gap-2 p-4"
                id="create-note-bottom-sheet"
                style="--md-outlined-text-field-container-shape: 12px;"
            >
                <h1 class="headline-large pb-4">Create Note</h1>
                <md-outlined-text-field
                    id="create-note-input-title"
                    label="Title"
                ></md-outlined-text-field>
                <md-outlined-text-field
                    id="create-note-input-description"
                    label="Description"
                    type="textarea"
                ></md-outlined-text-field>
                <div class="flex gap-1 self-end justify-self-end flex-grow-0">
                    <md-text-button
                        type="reset"
                        @click="closeCreateNoteBottomSheetClickEventHandle"
                    >
                        Cancel
                    </md-text-button>
                    <md-filled-tonal-button
                        type="reset"
                        @click="createNoteEventHandle"
                    >
                        Create
                    </md-filled-tonal-button>
                </div>
            </form>
        </div>
    </div>


    <ul class="lg:container lg:mx-auto w-full h-full flex flex-wrap items-stretch justify-stretch pt-8 px-4 gap-8">
        <NoteCard
            v-for="e in notes.getNotes"
            :key="e.id"
            :id="e.id"
            :title="e.title"
            :description="e.description"
            @edit-requested="editRequestedEventHandle"
        >
        </NoteCard>
    </ul>

    <NoteEditor
        ref="editorRef"
        @note-change="noteChangeEventHandle"
        @request-close="closeReuestedEventHandle"
        @request-remove="removeReuestedEventHandle"
    ></NoteEditor>
</template>

<script
    setup
    lang="ts"
>
import CreateNoteFab from '../../components/notes/CreateNoteFab.vue'
import NoteCard from '../../components/notes/NoteCard.vue'
import NoteEditor from '../../components/notes/NoteEditor.vue'
import { provide, ref } from 'vue'
import { INoteEditorDataProvider, NoteEditorDataProvider, useNoteStore, type TNote } from '../../store/NoteStore'
import { type MdOutlinedTextField } from '@material/web/all'

const noteEditorData = ref<INoteEditorDataProvider>({
    target: null as TNote | null
})
provide<INoteEditorDataProvider>(NoteEditorDataProvider, noteEditorData.value)


const notes = useNoteStore()
const createNoteEventHandle = () => {
    const form = document.getElementById('create-note-bottom-sheet')

    notes.createNote({
        title: (form?.querySelector('#create-note-input-title') as MdOutlinedTextField).value,
        description: (form?.querySelector('#create-note-input-description') as MdOutlinedTextField).value,
    })

    closeCreateNoteBottomSheetClickEventHandle()
}
const editRequestedEventHandle = (id: number) => {
    noteEditorData.value.target = notes.getNote(id)!
    console.log(noteEditorData.value.target)
}
const closeReuestedEventHandle = () => {
    noteEditorData.value.target = null
}
const removeReuestedEventHandle = (id: number) => {
    noteEditorData.value.target = null
    notes.removeNoteById(id)
}
const noteChangeEventHandle = ({ title, description, id }: TNote) => {
    notes.updateNoteById(id, {
        title,
        description
    })
}


const isOpenBottomSheet = ref(false)
const createNoteClickEventHandle = () => {
    isOpenBottomSheet.value = true
}
const closeCreateNoteBottomSheetClickEventHandle = () => {
    isOpenBottomSheet.value = false
}
</script>

<style scoped></style>
