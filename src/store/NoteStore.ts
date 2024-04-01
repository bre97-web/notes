import { defineStore } from 'pinia'
import { GenerateId } from '../utils/Id'

export type TNote = {
    title: string
    description: string
    id: number
}

export const NoteEditorDataProvider = Symbol()
export interface INoteEditorDataProvider {
    target: TNote | null
}

export const useNoteStore = defineStore('notes-store', {
    state: () => ({
        notes: [] as Array<TNote>,
    }),
    getters: {
        getNotes: (s) => s.notes,
        getNote: (s) => (id: number) => s.notes.find(e => e.id === id),
    },
    actions: {
        createNote(note: Omit<TNote, 'id'>) {
            this.notes.push({
                ...note,
                id: GenerateId()
            })
        },
        removeNote(note: TNote) {
            this.notes.splice(this.notes.lastIndexOf(note), 1)
        },
        removeNoteById(id: number) {
            const target = this.notes.find(e => e.id === id)
            if (target === null || target === undefined) {
                throw new Error('Not found note')
            }
            this.notes.splice(this.notes.lastIndexOf(target), 1)
        },
        updateNoteById(id: number, e: Omit<TNote, 'id'>) {
            const target = this.notes.find(e => e.id === id)
            if (target === null || target === undefined) {
                throw new Error('Not found note')
            }
            target.title = e.title
            target.description = e.description
        }
    },
    persist: true
})
