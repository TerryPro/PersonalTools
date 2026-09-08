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
    v-if="!isSimplePreviewMode"
    :style="cssVars"
    class="bg-custom flex aspect-video h-32 flex-row gap-1.5 overflow-hidden rounded-t-md"
  >
    <div
      class="flex h-full w-max min-w-full flex-col rounded-t-md p-2"
      :style="{
        '-webkit-backdrop-filter':
          'blur(' + bgBlur + ') brightness(' + bgBrightness + ')',
        'backdrop-filter':
          'blur(' + bgBlur + ') brightness(' + bgBrightness + ')',
      }"
    >
      <span class="mb-0.5 text-[4px] font-bold"> {{ board.title }}</span>
      <div class="flex w-full flex-row gap-1.5">
        <div
          v-for="column in board.columns"
          :key="column.id"
          class="flex h-min w-10 shrink-0 flex-col gap-px rounded-sm bg-elevation-2 p-0.5 text-[3px] font-bold"
        >
          {{ column.title }}
          <div
            v-for="card in column.cards"
            :key="card.id"
            :class="
              card.color &&
              card.color !== 'bg-elevation-2' &&
              !card.color?.startsWith('#')
                ? card.color
                : 'bg-elevation-3'
            "
            class="text-no-overflow mb-0.5 flex flex-col rounded-[0.05rem] p-[2px] text-[2px]"
            :style="[
              card.color?.startsWith('#')
                ? { 'background-color': card.color }
                : {},
            ]"
          >
            <span class="text-no-overflow">{{ card.name }}</span>
            <!-- Thumbnail-scale echo of the card face: a faint description snippet
                 and one compact line per task. Purely decorative at this size, so
                 the plain-text helper is called inline rather than precomputed. -->
            <span
              v-if="htmlToPlainText(card.description)"
              class="text-no-overflow line-clamp-2 opacity-70"
            >{{ htmlToPlainText(card.description) }}</span>
            <template v-if="card.tasks && card.tasks.length > 0">
              <span
                v-for="(task, taskIndex) in card.tasks"
                :key="task.id ?? taskIndex"
                class="text-no-overflow line-clamp-1 opacity-70"
              >{{ task.finished ? "✓" : "○" }} {{ task.name }}</span>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-else
    class="flex aspect-video h-32 flex-row gap-4 overflow-hidden rounded-t-md bg-elevation-2 p-2"
  >
    <div
      v-for="column in board.columns"
      :key="column.id"
      class="bg-accent-no-hover flex h-min w-10 shrink-0 flex-col gap-0.5 rounded-sm p-1"
    >
      <div
        v-for="card in column.cards"
        :key="card.id"
        class="mb-1 rounded-sm bg-elevation-2 p-2"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Board } from "@/types/kanban-types";

import { useBackgroundImage } from "@/composables/useBackgroundImage";
import { htmlToPlainText } from "@/utils/textUtils";

const props = defineProps<{
  board: Board;
  isSimplePreviewMode: boolean;
}>();

const boardRef = computed(() => props.board);
const { cssVars, bgBlur, bgBrightness, initBackgroundImage } = useBackgroundImage(
  boardRef,
  {
    checkFileExists: false,
    mutateBoardOnMissingFile: false,
    syncBoardOnSetters: false,
    computeTitleColor: false,
  }
);

onMounted(async () => {
  if (!props.isSimplePreviewMode) {
    await initBackgroundImage();
  }
});
</script>

<style scoped>
.bg-custom {
  z-index: 1;
  background-image: var(--bg-custom-image);
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
