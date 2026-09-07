<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>, gitoak -->
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
  <main id="settings" class="pb-8 pl-8 pr-6 pt-6">
    <ModalConfirmation
      v-show="deleteBoardModalVisible"
      :close-button-text="$t('general.cancelAction')"
      :confirm-button-text="
        $t('pages.settings.deleteAllDataConfirmationAction')
      "
      :description="$t('pages.settings.deleteAllDataConfirmationDescription')"
      :title="$t('pages.settings.deleteAllDataConfirmationHeading')"
      @closeModal="deleteBoardModalVisible = false"
      @confirmAction="deleteAllData"
    />

    <div
      class="grid max-w-6xl grid-cols-1 items-start gap-x-6 gap-y-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
    >
      <!-- ============ 外观 ============ -->
      <section id="appearance" class="lg:col-start-2 lg:row-span-3 lg:row-start-1">
        <h2 class="mb-3 flex flex-row items-center gap-2.5 text-xl font-bold">
          <span class="bg-accent inline-block size-2 rounded-full" />
          {{ $t("pages.settings.sectionAppearanceHeading") }}
        </h2>

        <!-- 主题选择 -->
        <div
          v-if="!theme.autoThemeEnabled"
          class="bg-elevation-1 border-elevation-2 mb-4 rounded-xl border p-5"
        >
          <div
            class="text-dim-3 mb-4 text-xs font-bold uppercase tracking-wide"
          >
            {{ $t("pages.settings.sectionThemeHeading") }}
          </div>
          <div class="grid grid-cols-2 gap-3">
            <button
              v-for="opt in themeOptions"
              :key="opt.id"
              class="transition-button flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 p-3.5"
              :class="
                activeTheme === opt.id
                  ? 'theme-card-selected border-accent'
                  : 'bg-primary border-elevation-2 hover:border-elevation-3'
              "
              @click="setTheme(opt.id)"
            >
              <span class="flex flex-row gap-1">
                <template v-if="opt.swatches">
                  <span
                    v-for="(color, i) in opt.swatches"
                    :key="i"
                    class="size-4 rounded border border-black/20"
                    :style="{ backgroundColor: color }"
                  />
                </template>
                <template v-else>
                  <span
                    class="size-4 rounded"
                    style="background-image: linear-gradient(135deg, #f28fad, #89b4fa)"
                  />
                  <span
                    class="size-4 rounded"
                    style="background-image: linear-gradient(135deg, #a6e3a1, #f9e2af)"
                  />
                  <span
                    class="size-4 rounded"
                    style="background-image: linear-gradient(135deg, #cba6f7, #89dceb)"
                  />
                </template>
              </span>
              <component
                :is="opt.icon"
                class="size-6"
                :class="activeTheme === opt.id ? 'text-accent' : 'text-dim-2'"
              />
              <span
                class="text-[13px] font-semibold"
                :class="activeTheme === opt.id ? 'text-accent' : ''"
              >
                {{ opt.label }}
              </span>
            </button>
          </div>
          <button
            class="text-dim-3 transition-button hover:text-dim-2 mt-4 cursor-pointer text-sm"
            @click="$router.go(0)"
          >
            {{ $t("pages.settings.colorResetText")
            }}<span class="underline">{{
              $t("pages.settings.colorResetLink")
            }}</span
            >.
          </button>
        </div>

        <!-- 跟随系统 + 自定义编辑器 -->
        <div class="bg-elevation-1 border-elevation-2 rounded-xl border">
          <div class="flex flex-row items-center justify-between gap-5 p-4">
            <div class="flex flex-row items-start gap-3.5">
              <div
                class="bg-elevation-2 text-dim-1 grid size-9 shrink-0 place-items-center rounded-lg"
              >
                <ComputerDesktopIcon class="size-5" />
              </div>
              <div>
                <div class="text-[15px] font-semibold">
                  {{ $t("pages.settings.setThemeAuto") }}
                </div>
              </div>
            </div>
            <SwitchRoot
              v-model:checked="theme.autoThemeEnabled"
              :class="switchClass"
              @update:checked="setTheme('auto')"
            >
              <SwitchThumb :class="thumbClass" />
            </SwitchRoot>
          </div>

          <div
            v-if="themeEditorDisplayed"
            class="border-elevation-2 border-t p-4"
          >
            <div class="flex flex-row items-start gap-3.5">
              <div
                class="bg-elevation-2 text-dim-1 grid size-9 shrink-0 place-items-center rounded-lg"
              >
                <PaintBrushIcon class="size-5" />
              </div>
              <div class="flex-1">
                <h3 class="text-[15px] font-semibold">
                  {{ $t("pages.settings.customThemeEditorHeading") }}
                </h3>
                <CustomThemeEditor class="mt-3" />
                <h3 class="mt-5 text-[15px] font-semibold">
                  {{ $t("pages.settings.customThemeImportHeading") }}
                </h3>
                <span class="text-dim-2 text-[13px]">{{
                  $t("pages.settings.customThemeImportHeadingSubtext")
                }}</span>
                <div class="my-2 flex flex-row gap-2">
                  <button
                    class="bg-elevation-1 bg-elevation-2-hover border-accent flex cursor-pointer flex-row items-center gap-2 rounded-md border border-dotted px-4 py-1.5"
                    @click="importThemeFromJson"
                  >
                    <ArrowDownTrayIcon class="size-4" />
                    {{ $t("general.importAction") }}
                  </button>
                  <button
                    class="bg-elevation-1 bg-elevation-2-hover border-accent flex cursor-pointer flex-row items-center gap-2 rounded-md border border-dotted px-4 py-1.5"
                    @click="exportThemeToJson"
                  >
                    <ArrowUpTrayIcon class="size-4" />
                    {{ $t("general.exportAction") }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ 看板 ============ -->
      <section id="board" class="lg:col-start-1 lg:row-start-1">
        <h2 class="mb-3 flex flex-row items-center gap-2.5 text-xl font-bold">
          <span class="bg-accent inline-block size-2 rounded-full" />
          {{ $t("pages.settings.preferencesHeading") }}
        </h2>

        <div class="bg-elevation-1 border-elevation-2 rounded-xl border">
          <div class="flex flex-row items-center justify-between gap-5 p-4">
            <div class="flex flex-row items-start gap-3.5">
              <div
                class="bg-elevation-2 text-dim-1 grid size-9 shrink-0 place-items-center rounded-lg"
              >
                <MagnifyingGlassIcon class="size-5" />
              </div>
              <div>
                <div class="text-[15px] font-semibold">
                  {{ $t("pages.settings.preferencesZoomHeading") }}
                </div>
                <div class="text-dim-3 mt-0.5 text-[13px]">
                  {{ $t("pages.settings.preferencesZoomSubtext") }}
                </div>
              </div>
            </div>
            <KanbanZoomAdjustment />
          </div>

          <div
            class="border-elevation-2 flex flex-row items-center justify-between gap-5 border-t p-4"
          >
            <div class="flex flex-row items-start gap-3.5">
              <div
                class="bg-elevation-2 text-dim-1 grid size-9 shrink-0 place-items-center rounded-lg"
              >
                <PlusCircleIcon class="size-5" />
              </div>
              <div>
                <div class="text-[15px] font-semibold">
                  {{ $t("pages.settings.preferencesAddToTopButtonHeading") }}
                </div>
                <div class="text-dim-3 mt-0.5 text-[13px]">
                  {{ $t("pages.settings.preferencesAddToTopButtonSubtext") }}
                </div>
              </div>
            </div>
            <SwitchRoot
              v-model:checked="globalSettingsStore.addToTopOfColumnButtonEnabled"
              :class="switchClass"
              @update:checked="(val) => globalSettingsStore.setAddToTopOfColumnButtonEnabled(val)"
            >
              <SwitchThumb :class="thumbClass" />
            </SwitchRoot>
          </div>

          <div
            class="border-elevation-2 flex flex-row items-center justify-between gap-5 border-t p-4"
          >
            <div class="flex flex-row items-start gap-3.5">
              <div
                class="bg-elevation-2 text-dim-1 grid size-9 shrink-0 place-items-center rounded-lg"
              >
                <RectangleStackIcon class="size-5" />
              </div>
              <div>
                <div class="text-[15px] font-semibold">
                  {{
                    $t(
                      "pages.settings.preferencesDisplayNumberOfCardsHeading"
                    )
                  }}
                </div>
                <div class="text-dim-3 mt-0.5 text-[13px]">
                  {{
                    $t(
                      "pages.settings.preferencesDisplayNumberOfCardsSubtext"
                    )
                  }}
                </div>
              </div>
            </div>
            <SwitchRoot
              v-model:checked="globalSettingsStore.displayColumnCardCountEnabled"
              :class="switchClass"
              @update:checked="(val) => globalSettingsStore.setDisplayColumnCardCountEnabled(val)"
            >
              <SwitchThumb :class="thumbClass" />
            </SwitchRoot>
          </div>

          <div
            class="border-elevation-2 flex flex-row items-center justify-between gap-5 border-t p-4"
          >
            <div class="flex flex-row items-start gap-3.5">
              <div
                class="bg-elevation-2 text-dim-1 grid size-9 shrink-0 place-items-center rounded-lg"
              >
                <CalendarIcon class="size-5" />
              </div>
              <div>
                <div class="text-[15px] font-semibold">
                  {{
                    $t(
                      "pages.settings.preferencesDefaultRelativeDueDatesHeading"
                    )
                  }}
                </div>
                <div class="text-dim-3 mt-0.5 text-[13px]">
                  {{
                    $t(
                      "pages.settings.preferencesDefaultRelativeDueDatesSubtext"
                    )
                  }}
                </div>
              </div>
            </div>
            <SwitchRoot
              v-model:checked="globalSettingsStore.defaultRelativeDueDatesEnabled"
              :class="switchClass"
              @update:checked="(val) => globalSettingsStore.setDefaultRelativeDueDatesEnabled(val)"
            >
              <SwitchThumb :class="thumbClass" />
            </SwitchRoot>
          </div>
        </div>
      </section>

      <!-- ============ 通用 ============ -->
      <section id="general" class="lg:col-start-1 lg:row-start-2">
        <h2 class="mb-3 flex flex-row items-center gap-2.5 text-xl font-bold">
          <span class="bg-accent inline-block size-2 rounded-full" />
          {{ $t("pages.settings.miscellaneousHeading") }}
        </h2>

        <div class="bg-elevation-1 border-elevation-2 rounded-xl border">
          <div class="flex flex-row items-center justify-between gap-5 p-4">
            <div class="flex flex-row items-start gap-3.5">
              <div
                class="bg-elevation-2 text-dim-1 grid size-9 shrink-0 place-items-center rounded-lg"
              >
                <GlobeAltIcon class="size-5" />
              </div>
              <div>
                <div class="text-[15px] font-semibold">
                  {{ $t("pages.settings.languageSelectorHeading") }}
                  <span class="text-dim-3 text-sm">{{
                    locale != "en" ? "(Language)" : ""
                  }}</span>
                </div>
                <div class="text-dim-3 mt-0.5 text-[13px]">
                  {{ $t("pages.settings.languageSelectorSubtext") }}
                </div>
              </div>
            </div>
            <LanguageSelector />
          </div>

          <div
            class="border-elevation-2 flex flex-row items-center justify-between gap-5 border-t p-4"
          >
            <div class="flex flex-row items-start gap-3.5">
              <div
                class="bg-elevation-2 text-dim-1 grid size-9 shrink-0 place-items-center rounded-lg"
              >
                <SparklesIcon class="size-5" />
              </div>
              <div>
                <div class="text-[15px] font-semibold">
                  {{ $t("pages.settings.miscellaneousAnimationsHeading") }}
                </div>
                <div class="text-dim-3 mt-0.5 text-[13px]">
                  {{ $t("pages.settings.miscellaneousAnimationsSubtext") }}
                </div>
              </div>
            </div>
            <SwitchRoot
              v-model:checked="globalSettingsStore.animationsEnabled"
              :class="switchClass"
              @update:checked="(val) => globalSettingsStore.setAnimationsEnabled(val)"
            >
              <SwitchThumb :class="thumbClass" />
            </SwitchRoot>
          </div>

          <div
            class="border-elevation-2 flex flex-row items-center justify-between gap-5 border-t p-4"
          >
            <div class="flex flex-row items-start gap-3.5">
              <div
                class="bg-elevation-2 text-dim-1 grid size-9 shrink-0 place-items-center rounded-lg"
              >
                <LanguageIcon class="size-5" />
              </div>
              <div>
                <div class="text-[15px] font-semibold">
                  {{ $t("pages.settings.miscellaneousDisableSpellcheckHeading") }}
                </div>
                <div class="text-dim-3 mt-0.5 text-[13px]">
                  {{ $t("pages.settings.miscellaneousDisableSpellcheckSubtext") }}
                </div>
              </div>
            </div>
            <SwitchRoot
              v-model:checked="globalSettingsStore.disableSpellcheck"
              :class="switchClass"
              @update:checked="(val) => globalSettingsStore.setDisableSpellcheck(val)"
            >
              <SwitchThumb :class="thumbClass" />
            </SwitchRoot>
          </div>

          <div
            class="border-elevation-2 flex flex-row items-center justify-between gap-5 border-t p-4"
          >
            <div class="flex flex-row items-start gap-3.5">
              <div
                class="bg-elevation-2 text-dim-1 grid size-9 shrink-0 place-items-center rounded-lg"
              >
                <BoltIcon class="size-5" />
              </div>
              <div>
                <div class="text-[15px] font-semibold">
                  {{ $t("pages.settings.miscellaneousAutostartHeading") }}
                </div>
                <div class="text-dim-3 mt-0.5 text-[13px]">
                  {{ $t("pages.settings.miscellaneousAutostartSubtext") }}
                </div>
              </div>
            </div>
            <SwitchRoot
              v-model:checked="globalSettingsStore.autostartEnabled"
              :class="switchClass"
              @update:checked="(val) => globalSettingsStore.setAutostartEnabled(val)"
            >
              <SwitchThumb :class="thumbClass" />
            </SwitchRoot>
          </div>
        </div>
      </section>

      <!-- ============ 数据 ============ -->
      <section id="data" class="lg:col-start-1 lg:row-start-3">
        <h2 class="mb-3 flex flex-row items-center gap-2.5 text-xl font-bold">
          <span class="bg-accent inline-block size-2 rounded-full" />
          {{ $t("pages.settings.sectionDataHeading") }}
        </h2>

        <div
          class="flex flex-row items-center justify-between gap-5 rounded-xl border border-red-500/40 bg-red-500/10 p-4"
        >
          <div class="flex flex-row items-start gap-3.5">
            <div
              class="grid size-9 shrink-0 place-items-center rounded-lg bg-red-500/15 text-red-500"
            >
              <ExclamationTriangleIcon class="size-5" />
            </div>
            <div>
              <div class="text-[15px] font-semibold text-red-500">
                {{ $t("pages.settings.miscellaneousDeleteAllDataHeading") }}
              </div>
              <div class="text-dim-3 mt-0.5 text-[13px]">
                <span class="font-semibold text-red-500">{{
                  $t("pages.settings.miscellaneousDeleteAllDataSubtextRed")
                }}</span>
                {{ $t("pages.settings.miscellaneousDeleteAllDataSubtext") }}
              </div>
            </div>
          </div>
          <button
            class="transition-button shrink-0 cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
            @click="deleteBoardModalVisible = true"
          >
            {{ $t("general.deleteAction") }}
          </button>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { ThemeIdentifiers } from "@/types/kanban-types";
import type { Component } from "vue";

import IconCatppuccin from "@/components/icon/Catppuccin.vue";
import { kanriThemeSchema } from "@/types/json-schemas";
import { catppuccin, dark, light } from "@/utils/themes";
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  BoltIcon,
  CalendarIcon,
  ComputerDesktopIcon,
  ExclamationTriangleIcon,
  GlobeAltIcon,
  LanguageIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  PaintBrushIcon,
  PlusCircleIcon,
  RectangleStackIcon,
  SparklesIcon,
  SunIcon,
  SwatchIcon,
} from "@heroicons/vue/24/outline";

import { message, open, save } from "@tauri-apps/plugin-dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";

import { useI18n } from "vue-i18n";

const router = useRouter();

const globalSettingsStore = useSettingsStore();
const theme = useThemeStore();

const { t, locale } = useI18n();

const { activeTheme } = toRefs(theme);
const themeEditorDisplayed = computed(() => activeTheme.value === "custom");
const systemTheme = useDark();

const deleteBoardModalVisible = ref(false);

// 复用的开关样式（消除各处重复的长 class 串）
const switchClass =
  "bg-elevation-2 bg-accent-checked relative flex h-[24px] w-[42px] cursor-pointer rounded-full shadow-sm focus-within:outline focus-within:outline-black";
const thumbClass =
  "bg-button-text my-auto block size-[18px] translate-x-0.5 rounded-full shadow-sm transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]";

interface ThemeOption {
  id: ThemeIdentifiers;
  label: string;
  icon: Component;
  swatches: string[] | null;
}

const themeOptions = computed<ThemeOption[]>(() => [
  {
    id: "light",
    label: t("pages.settings.lightThemeOption"),
    icon: SunIcon,
    swatches: [light.bgPrimary, light.elevation1, light.accent],
  },
  {
    id: "dark",
    label: t("pages.settings.darkThemeOption"),
    icon: MoonIcon,
    swatches: [dark.bgPrimary, dark.elevation1, dark.accent],
  },
  {
    id: "catppuccin",
    label: t("pages.settings.catppuccinThemeOption"),
    icon: IconCatppuccin,
    swatches: [catppuccin.bgPrimary, catppuccin.elevation1, catppuccin.accent],
  },
  {
    id: "custom",
    label: t("pages.settings.customThemeOption"),
    icon: SwatchIcon,
    swatches: null,
  },
]);

const setTheme = async (themeName: ThemeIdentifiers) => {
  activeTheme.value = themeName;

  const themes = { catppuccin, dark, light };

  if (themeName === "custom") {
    // handling is done through watcher in CustomThemeEditor
    return;
  }

  if (themeName === "auto") {
    const resolvedThemeName = systemTheme.value ? "dark" : "light";
    await theme.toggleAutoTheme(resolvedThemeName);

    return;
  }

  await theme.setTheme(themeName, themes[themeName]);
};

const deleteAllData = async () => {
  if (!deleteBoardModalVisible.value) return;

  await globalSettingsStore.deleteAllData();
  activeTheme.value = "dark";

  router.go(0);

  await message("Successfully deleted data.", { title: "Kanri", kind: "info" });
};

const exportThemeToJson = async () => {
  const filePath = await save({
    defaultPath: "./kanri_theme_export.json",
    filters: [
      {
        extensions: ["json"],
        name: "JSON File",
      },
    ],
    title: t("pages.settings.exportThemeDialogTitle"),
  });

  const fileContents = JSON.stringify(theme.colors, null, 2);

  if (filePath == null) return;
  await writeTextFile(filePath, fileContents);
};

const importThemeFromJson = async () => {
  const selected = await open({
    filters: [
      {
        extensions: ["json"],
        name: "JSON File",
      },
    ],
    multiple: false,
  });

  if (selected === null) return;

  const textFile = await readTextFile(selected as string);
  if (!textFile) return;

  let parsedJson = null;
  try {
    parsedJson = JSON.parse(textFile);
  } catch (error) {
    console.error("Could not parse imported JSON;", error);
    await message(t("pages.settings.loadJsonErrorMessage"), {
      title: "Kanri",
      kind: "error",
    });
  }
  if (parsedJson === null) return;

  let zodParsed = null;
  try {
    zodParsed = kanriThemeSchema.parse(parsedJson);
  } catch (error) {
    console.error(error);
    await message(t("pages.settings.parseJsonErrorMessage"), {
      title: "Kanri",
      kind: "error",
    });
  }
  if (zodParsed === null) return;

  await theme.setTheme("custom", zodParsed);

  // Manual refresh
  router.go(0);
};
</script>

<style>
.bg-accent-checked[data-state="checked"] {
  background-color: var(--accent);
}
</style>

<style scoped>
.theme-card-selected {
  background-color: color-mix(in srgb, var(--accent) 10%, var(--bg-primary));
}
</style>
