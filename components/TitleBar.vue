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
  <div
    class="bg-primary-darker border-elevation-1 flex h-10 shrink-0 select-none items-center border-b"
    data-tauri-drag-region
  >
    <!-- macOS: reserve space for the native traffic light buttons -->
    <div
      v-if="isMac"
      class="h-full w-[78px] shrink-0"
      data-tauri-drag-region
    />

    <!-- App identity (part of the draggable region) -->
    <div
      class="flex h-full items-center gap-2 pl-3"
      data-tauri-drag-region
    >
      <IconKanri class="text-accent-logo-icon pointer-events-none size-5" />
      <span
        class="text-dim-2 pointer-events-none text-sm font-semibold tracking-wide"
        data-tauri-drag-region
      >
        Kanri
      </span>
    </div>

    <!-- Flexible draggable spacer -->
    <div class="h-full flex-1" data-tauri-drag-region />

    <!-- Help & About (globally available) -->
    <button
      class="text-dim-2 bg-elevation-2-hover transition-button flex h-full w-11 shrink-0 items-center justify-center"
      type="button"
      :aria-label="$t('components.sidebar.help')"
      :title="$t('components.sidebar.help')"
      @click="showSidebarHelpModal = true"
    >
      <PhQuestion class="size-4" />
    </button>

    <!-- Window controls (Windows / Linux only) -->
    <div v-if="showControls" class="flex h-full items-stretch">
      <button
        class="text-dim-2 bg-elevation-2-hover transition-button flex h-full w-11 items-center justify-center"
        type="button"
        :aria-label="$t('components.titlebar.minimize')"
        :title="$t('components.titlebar.minimize')"
        @click="onMinimize"
      >
        <PhMinus class="size-4" />
      </button>
      <button
        class="text-dim-2 bg-elevation-2-hover transition-button flex h-full w-11 items-center justify-center"
        type="button"
        :aria-label="
          isMaximized
            ? $t('components.titlebar.restore')
            : $t('components.titlebar.maximize')
        "
        :title="
          isMaximized
            ? $t('components.titlebar.restore')
            : $t('components.titlebar.maximize')
        "
        @click="onToggleMaximize"
      >
        <PhCopy v-if="isMaximized" class="size-4" />
        <PhSquare v-else class="size-[0.85rem]" />
      </button>
      <button
        class="text-dim-2 transition-button flex h-full w-11 items-center justify-center hover:bg-red-500 hover:text-white"
        type="button"
        :aria-label="$t('components.titlebar.close')"
        :title="$t('components.titlebar.close')"
        @click="onClose"
      >
        <PhX class="size-4" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentWindow } from "@tauri-apps/api/window";
import { platform } from "@tauri-apps/plugin-os";
import { PhCopy, PhMinus, PhQuestion, PhSquare, PhX } from "@phosphor-icons/vue";

const { showSidebarHelpModal } = storeToRefs(useLayoutStore());

const isMac = ref(false);
const showControls = ref(false);
const isMaximized = ref(false);

let appWindow: ReturnType<typeof getCurrentWindow> | undefined;
let unlisten: (() => void) | undefined;

onMounted(async () => {
  // Skip window wiring when running outside of Tauri (e.g. plain browser dev).
  if (typeof window === "undefined" || !("__TAURI_INTERNALS__" in window)) {
    showControls.value = false;
    return;
  }

  appWindow = getCurrentWindow();

  try {
    isMac.value = platform() === "macos";
  } catch {
    isMac.value = false;
  }

  // macOS keeps its native traffic lights, so hide the custom controls there.
  showControls.value = !isMac.value;

  try {
    isMaximized.value = await appWindow.isMaximized();
    unlisten = await appWindow.onResized(async () => {
      if (appWindow) isMaximized.value = await appWindow.isMaximized();
    });
  } catch (err) {
    console.error("Failed to initialize window state for title bar:", err);
  }
});

onBeforeUnmount(() => {
  if (unlisten) unlisten();
});

const onMinimize = () => appWindow?.minimize();
const onToggleMaximize = () => appWindow?.toggleMaximize();
const onClose = () => appWindow?.close();
</script>
