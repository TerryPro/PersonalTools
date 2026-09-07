<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev> -->
<!-- -->
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->
<!--
Kanri is an offline Kanban board app made using Tauri and Nuxt.
Copyright (C) 2022-2026 trobonox <hello@trobo.dev>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>. -->

<template>
  <div class="mb-6 flex w-full max-w-3xl flex-col gap-4">
    <div id="color-row" class="flex flex-row items-center justify-between">
      <label for="color-picker">{{
        $t("components.customThemeEditor.optionAccentColor")
      }}</label>
      <div class="flex flex-row gap-4">
        <HexColorInput v-model="customTheme.accent" />
        <input ref="colorInput" v-model="customTheme.accent" type="color" >
      </div>
    </div>

    <div class="flex flex-row items-center justify-between">
      <label for="color-picker">{{
        $t("components.customThemeEditor.optionPrimaryTextColor")
      }}</label>
      <div class="flex flex-row gap-4">
        <HexColorInput v-model="customTheme.text" />
        <input ref="colorInput" v-model="customTheme.text" type="color" >
      </div>
    </div>

    <div class="flex flex-row items-center justify-between">
      <label for="color-picker">{{
        $t("components.customThemeEditor.optionButtonTextColor")
      }}</label>
      <div class="flex flex-row gap-4">
        <HexColorInput v-model="customTheme.textButtons" />
        <input
          ref="colorInput"
          v-model="customTheme.textButtons"
          type="color"
        >
      </div>
    </div>

    <div class="flex flex-row items-center justify-between">
      <label for="color-picker">{{
        $t("components.customThemeEditor.optionPrimaryBackgroundColor")
      }}</label>
      <div class="flex flex-row gap-4">
        <HexColorInput v-model="customTheme.bgPrimary" />
        <input ref="colorInput" v-model="customTheme.bgPrimary" type="color" >
      </div>
    </div>

    <div class="flex flex-row items-center justify-between">
      <label for="color-picker">{{
        $t("components.customThemeEditor.option1stElevationColor")
      }}</label>
      <div class="flex flex-row gap-4">
        <HexColorInput v-model="customTheme.elevation1" />
        <input ref="colorInput" v-model="customTheme.elevation1" type="color" >
      </div>
    </div>

    <div class="flex flex-row items-center justify-between">
      <label for="color-picker">{{
        $t("components.customThemeEditor.option2ndElevationColor")
      }}</label>
      <div class="flex flex-row gap-4">
        <HexColorInput v-model="customTheme.elevation2" />
        <input ref="colorInput" v-model="customTheme.elevation2" type="color" >
      </div>
    </div>

    <div class="flex flex-row items-center justify-between">
      <label for="color-picker">{{
        $t("components.customThemeEditor.option3rdElevationColor")
      }}</label>
      <div class="flex flex-row gap-4">
        <HexColorInput v-model="customTheme.elevation3" />
        <input ref="colorInput" v-model="customTheme.elevation3" type="color" >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { lightenColor } from "@/utils/colorUtils";
import { professionalLight } from "@/utils/themes";
import type { BuiltinThemeId } from "@/stores/theme";
import type { Theme, ThemeIdentifiers } from "@/types/kanban-types";

const props = defineProps<{
  themeId: ThemeIdentifiers;
}>();

const theme = useThemeStore();

// Built-in themes persist user edits as overrides; the custom theme keeps its own saved palette
const isCustomTheme = props.themeId === "custom";

const seedPalette = (): Theme => {
  if (isCustomTheme) {
    // copy: v-model writes must not mutate store state objects directly;
    // first-time custom themes start from the professional light preset
    return { ...(theme.savedCustomTheme ?? professionalLight) };
  }
  return theme.getEffectiveThemeColors(props.themeId as BuiltinThemeId);
};

const customTheme = ref<Theme>(seedPalette());
let prevSnapshot: Theme = { ...customTheme.value };

const persist = () => {
  const snapshot: Theme = { ...customTheme.value };
  if (isCustomTheme) {
    theme.setTheme("custom", snapshot);
  } else {
    theme.setThemeOverride(props.themeId as BuiltinThemeId, snapshot);
  }
};

// update derived shades whenever their base color changes
watch(
  customTheme,
  (newValue) => {
    const changedKeys = (
      Object.keys(newValue) as (keyof Theme)[]
    ).filter((key) => newValue[key] !== prevSnapshot[key]);
    if (changedKeys.length === 0) return;

    const updatedTheme: Theme = { ...newValue };
    if (changedKeys.includes("accent")) {
      updatedTheme.accentDarker = lightenColor(newValue.accent, -20);
    }
    if (changedKeys.includes("text")) {
      updatedTheme.textD1 = lightenColor(newValue.text, 20);
      updatedTheme.textD2 = lightenColor(newValue.text, 40);
      updatedTheme.textD3 = lightenColor(newValue.text, 60);
      updatedTheme.textD4 = lightenColor(newValue.text, 80);
    }

    prevSnapshot = { ...updatedTheme };
    customTheme.value = updatedTheme;
    persist();
  },
  { deep: true }
);

onMounted(async () => {
  if (!isCustomTheme) return;

  const savedPalette = theme.savedCustomTheme ?? professionalLight;
  await theme.setTheme("custom", savedPalette);
  customTheme.value = { ...savedPalette };
  prevSnapshot = { ...customTheme.value };
});
</script>

<style scoped>
input[type="color"] {
  -webkit-appearance: none;
  appearance: none;
  border-radius: 8px;
  cursor: pointer;
}
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
  border-radius: 8px;
}
input[type="color"]::-webkit-color-swatch {
  border-radius: 8px;
  border-width: 2px;
  border-style: solid;
  border-color: var(--text);
}
</style>
