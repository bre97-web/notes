import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

import Index from '../pages/Index.vue'
import Settings from '../pages/root/Settings.vue'
import Notes from '../pages/root/Notes.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home/notes'
    },
    {
        path: '/home',
        component: Index,
        name: 'home',
        redirect: '/home/notes',
        children: [
            {
                path: 'notes',
                components: {
                    root: Notes
                },
                name: 'notes',
            },
            {
                path: 'settings',
                components: {
                    root: Settings,
                },
                name: 'settings',
            }
        ]
    },

] as const

export const Router = createRouter({
    history: createWebHashHistory(),
    routes,
})
