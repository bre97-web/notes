<template>
    <FullScreenLayout>
        <ProductLayout>
            <template #header>
                <Header>
                    <template #title>
                        {{ pageTitle }}
                    </template>
                    <template #navigation-toggler>
                        <md-icon-button @click="toggleNavigation">
                            <md-icon>menu</md-icon>
                        </md-icon-button>
                    </template>
                    <template #actions>
                        <md-icon-button @click="() => theme.setIsDark(!theme.isDark)">
                            <md-icon>{{ theme.isDark ? 'light_mode' : 'dark_mode' }}</md-icon>
                        </md-icon-button>
                    </template>
                </Header>
            </template>
            <template #default>
                <div class="relative surface flex-grow max-h-screen flex-shrink-0 flex flex-row overflow-auto">
                    <Navigation
                        :is-open="isNavigationOpen"
                        @close="toggleNavigation"
                    >
                        <li
                            v-for="e in list"
                            :key="e.path"
                            @click="() => urlChangeEventHandle(e.path)"
                        >
                            <md-icon>{{ e.name }}</md-icon>
                            <span>{{ e.name?.toString().replace(e.name.toString()[0],
                            e.name.toString()[0].toUpperCase())
                                }}</span>
                            <md-ripple></md-ripple>
                        </li>
                    </Navigation>

                    <RouterView
                        name="root"
                        v-slot="{ Component }"
                    >
                        <component :is="Component"></component>
                    </RouterView>

                </div>
            </template>

        </ProductLayout>
    </FullScreenLayout>
</template>

<script
    setup
    lang="ts"
>
import FullScreenLayout from '../layouts/FullScreenLayout.vue'
import ProductLayout from '../layouts/ProductLayout.vue'
import { computed, ref } from 'vue'
import Header from '../components/header/Header.vue'
import Navigation from '../components/navigation/Navigation.vue'
import { useRouter } from 'vue-router'
import { Website } from '../utils/Consts'
import { useThemeStore } from '../store/ThemeStore'

const pageTitle = computed(() => {
    return router.currentRoute.value.name === 'home' ? Website.Title : router.currentRoute.value.name?.toString().replace(router.currentRoute.value.name.toString().at(0)!, router.currentRoute.value.name.toString().at(0)!.toUpperCase())
})

const theme = useThemeStore()
const router = useRouter()
const list = computed(() => router.getRoutes()[router.getRoutes().findIndex(e => e.name === 'home')].children)
const urlChangeEventHandle = (url: string) => {
    router.push(`/home/${url}`)
}

const isNavigationOpen = ref(false)
const toggleNavigation = () => {
    isNavigationOpen.value = !isNavigationOpen.value
}
</script>

<style scoped></style>
