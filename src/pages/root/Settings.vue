<template>
    <div class="w-full">
        <md-tabs
            class="tabs"
            ref="tabsRef"
            style="--md-primary-tab-container-color: var(--md-sys-color-surface-container);"
        >
            <!-- @change="currentTabChnageEventHandle" -->
            <md-primary-tab>
                Theme
                <md-icon slot="icon">palette</md-icon>
            </md-primary-tab>
            <md-primary-tab>
                System
                <md-icon slot="icon">database</md-icon>
            </md-primary-tab>
        </md-tabs>

        <div class="settings-page lg:container lg:mx-auto">
            {{ currentTab }}
            {{ tabsRef?.activeTab?.ariaLabel }}

            <label>
                <span>Color</span>
                <span
                    style="position: relative"
                    class="h-full aspect-square"
                >
                    <div
                        id="theme-picker-anchor"
                        class="h-full aspect-square shape-small"
                        :style="hctBackgroundColorStyle"
                        @click="() => menuEl?.show()"
                    ></div>
                    <md-menu
                        id="theme-picker-menu"
                        anchor="theme-picker-anchor"
                        ref="menuEl"
                    >

                        <md-slider
                            min="0"
                            max="360"
                            labeled
                            ticks
                            :value="hct[0]"
                            @input="(e: Event) => hct[0] = (e.target as MdSlider).value!"
                        ></md-slider>

                        <md-slider
                            min="0"
                            max="145"
                            labeled
                            ticks
                            :value="hct[1]"
                            @input="(e: Event) => hct[1] = (e.target as MdSlider).value!"
                        ></md-slider>

                        <md-slider
                            min="0"
                            max="100"
                            labeled
                            ticks
                            :value="hct[2]"
                            @input="(e: Event) => hct[2] = (e.target as MdSlider).value!"
                        ></md-slider>

                    </md-menu>
                </span>
            </label>
            <md-divider></md-divider>

            <label>
                <span>Dark</span>
                <md-switch
                    :selected="theme.isDark"
                    @change="(e: Event) => theme.setIsDark((e.target as MdSwitch).selected)"
                ></md-switch>
            </label>
            <md-divider></md-divider>

            <label>
                <span>Varian</span>
                <md-outlined-select
                    @change="(e: Event) => theme.setVariant(parseInt((e.target as MdOutlinedSelect).value) as TMaterialVariant)"
                >
                    <md-select-option
                        v-for="(e, i) in MaterialVariants"
                        :value="i"
                        :key="i"
                        :selected="i === theme.variant"
                    >
                        <div slot="headline">{{ e }}</div>
                    </md-select-option>
                </md-outlined-select>
            </label>
            <md-divider></md-divider>

            <label>
                <span>Contra</span>
                <md-slider
                    min="-1"
                    max="1"
                    :value="theme.contrastLevel"
                    labeled
                    ticks
                    step="0.5"
                    @input="(e: InputEvent) => theme.setContrastLevel((e.target as MdSlider).value as TMaterialContrastLevel)"
                ></md-slider>
            </label>

            <md-divider></md-divider>
        </div>
    </div>
</template>

<script
    setup
    lang="ts"
>
import { type MdMenu, type MdOutlinedSelect, type MdSlider, type MdSwitch, type MdTabs } from '@material/web/all'
import { CSSProperties, computed, reactive, ref, watch } from 'vue'
import { useThemeStore } from '../../store/ThemeStore'
import { type TColor, type TMaterialContrastLevel, type TMaterialVariant } from '@glare-labs/material-tokens-generator'
import { Hct, hexFromArgb } from '@material/material-color-utilities'

const tabsRef = ref<MdTabs | null>(null)
const currentTab = computed(() => tabsRef.value?.activeTab)
// const currentTabChnageEventHandle = (e) => {
//     console.log(e)
// }

const theme = useThemeStore()
const menuEl = ref<MdMenu | null>(null)
const hct = reactive([0, 0, 0])
const hctBackgroundColorStyle = computed<CSSProperties>(() => ({
    backgroundColor: hexFromArgb(Hct.from(hct[0], hct[1], hct[2]).toInt())
}))
watch(hct, () => {
    console.log('u')
    theme.setSourceColor(hexFromArgb(Hct.from(hct[0], hct[1], hct[2]).toInt()) as TColor)
})
const MaterialVariants = ['MONOCHROME ', 'NEUTRAL', 'TONAL_SPOT', 'VIBRANT', 'EXPRESSIVE', 'FIDELITY', 'CONTENT']

</script>

<style scoped>
.tabs {
    @apply z-0 [&>*]:z-0;
}

.settings-page {
    @apply flex flex-col gap-2;
}

.settings-page>label {
    @apply px-8 py-2 inline-flex items-center justify-between h-[56px];
}

.settings-page>label>span {
    @apply self-start title-medium;
}

.settings-page>label>span~* {
    @apply flex-grow-0 flex-shrink-0;
}
</style>
