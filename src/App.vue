<template>
    <ThemeProvider
        :contrast-level="theme.contrastLevel"
        :source-color="theme.sourceColor"
        :is-dark="theme.isDark"
        :variant="theme.variant"
    >

        <RouterView v-slot="{ Component }">
            <component :is="Component"></component>
        </RouterView>

    </ThemeProvider>
</template>

<script
    setup
    lang="ts"
>
import ThemeProvider from './components/theme-provider/ThemeProvider.vue'
import { useThemeStore } from './store/ThemeStore'

const theme = useThemeStore()
</script>

<style scoped></style>
