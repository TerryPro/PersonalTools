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
  <Modal :blur-background="false" @closeModal="closeModal()">
    <template #content>
      <main class="min-w-[32rem] max-w-3xl">
        <form @submit.prevent="createNewBoard()">
        <div class="flex flex-row items-start justify-between">
          <h1 class="pointer-events-auto pr-5 text-2xl font-bold">
            {{ $t("modals.newBoard.title") }}
          </h1>
          <XMarkIcon
            class="text-accent-hover size-6 cursor-pointer"
            @click="closeModal()"
          />
        </div>
        <section id="inputs" class="mt-4 flex flex-col">
          <label class="text-medium mb-2 text-lg text-dim-1" for="boardName">{{
            $t("modals.newBoard.name")
          }}</label>
          <input
            id="boardName"
            ref="boardNameInput"
            v-model="newBoardName"
            class="placeholder:text-dim-3-placeholder border-accent-focus h-10 max-w-80 rounded-md border border-elevation-3 bg-elevation-2 p-2 transition-colors duration-300 focus:border-2 focus:border-dotted focus:outline-none"
            maxlength="500"
            :placeholder="$t('modals.newBoard.placeholder')"
            type="text"
            @focus="boardNameEmptyError = false"
            @blur="checkIfBoardNameEmpty"
          >
          <p v-if="boardNameEmptyError" class="mt-0.5 text-red-500">
            {{ $t("modals.newBoard.boardNameEmptyError") }}
          </p>

        </section>
        <section class="mt-4">
          <label class="text-medium mb-2 block text-lg text-dim-1">
            {{ $t("modals.newBoard.templateLabel") }}
          </label>
          <div class="flex max-w-2xl flex-row gap-2 overflow-x-auto pb-1">
            <button
              v-for="option in templateOptions"
              :key="option.id"
              type="button"
              class="flex min-w-40 shrink-0 flex-col gap-0.5 rounded-md border p-2 text-left transition-colors"
              :class="
                selectedTemplateId === option.id
                  ? 'border-accent bg-elevation-2'
                  : 'border-elevation-3 bg-elevation-1 hover:bg-elevation-2'
              "
              @click="selectTemplate(option.tpl)"
            >
              <span class="font-semibold">{{ option.name }}</span>
              <span class="text-xs text-dim-2">{{ option.description }}</span>
            </button>
          </div>
        </section>
        <section class="mt-6">
          <div class="mb-2 flex items-center gap-2">
            <h2 class="text-medium text-lg text-dim-1">
              {{ $t("modals.newBoard.columns") }}
            </h2>
            <div
              class="flex cursor-pointer items-center justify-center rounded-full bg-accent p-1 text-center text-buttons transition-colors hover:bg-accent-darker"
              @click="addColumnAndScrollToEnd()"
            >
              <PhPlus class="size-4" />
            </div>
          </div>
          <div class="flex max-w-xl flex-row items-center gap-2 overflow-auto">
            <div
              v-for="(column, index) in columns"
              :key="column.id"
              class="column flex flex-row items-center gap-2 rounded-lg bg-elevation-2 p-2"
            >
              <input
                v-model="column.title"
                class="w-32 text-ellipsis rounded-md border-none bg-elevation-3 px-2 py-1 text-normal focus:outline-none"
                type="text"
              >
              <PhTrash
                class="text-accent-hover size-5 cursor-pointer"
                @click="columns.splice(index, 1)"
              />
            </div>
          </div>
        </section>
        <section
          id="buttons"
          class="mt-6 flex w-full flex-row items-center justify-end gap-8"
        >
          <button
            class="text-accent-hover transition-button"
            type="button"
            @click="closeModal()"
          >
            {{ $t("general.cancelAction") }}
          </button>
          <button
            class="transition-button rounded-md bg-accent px-4 py-2 text-buttons hover:bg-accent-darker"
            type="submit"
          >
            {{ $t("modals.newBoard.createBoardAction") }}
          </button>
        </section>
        </form>
      </main>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import type { Column } from "@/types/kanban-types";
import type { Ref } from "vue";

import emitter from "@/utils/emitter";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { PhPlus, PhTrash } from "@phosphor-icons/vue";
import { useI18n } from "vue-i18n";

import { boardTemplates, type BoardTemplate } from "~/utils/boardTemplates";

const emit = defineEmits<{
  (e: "closeModal"): void;
}>();

const { t } = useI18n();

// Builds fresh, editable columns (with new IDs) from a board template. Column
// titles are localized via i18n; the example template also seeds sample cards.
const buildColumnsFromTemplate = (template: BoardTemplate): Array<Column> =>
  template.columnKeys.map((key, index) => ({
    id: generateUniqueID(),
    title: t(`modals.newBoard.templateColumns.${key}`),
    cards: template.exampleCards?.[index]
      ? template.exampleCards[index].map((card) => ({
          ...card,
          id: generateUniqueID(),
        }))
      : [],
  }));

const templateOptions = computed(() =>
  boardTemplates.map((tpl) => ({
    id: tpl.id,
    tpl,
    name: t(`modals.newBoard.templates.${tpl.id}`),
    description: tpl.columnKeys
      .map((key) => t(`modals.newBoard.templateColumns.${key}`))
      .join(" → "),
  }))
);

const selectTemplate = (template: BoardTemplate) => {
  selectedTemplateId.value = template.id;
  columns.value = buildColumnsFromTemplate(template);
};

const boardNameInput: Ref<HTMLInputElement | null> = ref(null);
const boardNameEmptyError = ref(false);

const newBoardName = ref("");
const selectedTemplateId = ref(boardTemplates[0]?.id ?? "basic");
const columns: Ref<Array<Column>> = ref(
  boardTemplates[0] ? buildColumnsFromTemplate(boardTemplates[0]) : []
);

onUpdated(() => {
  nextTick(() => {
    if (boardNameInput.value == null) return;
    boardNameInput.value.focus();
  });
});

const checkIfBoardNameEmpty = () => {
  nextTick(() => {
    if (newBoardName.value == null || !/\S/.test(newBoardName.value)) {
      boardNameEmptyError.value = true;
    } else {
      boardNameEmptyError.value = false;
    }
  });
};

const addColumnAndScrollToEnd = () => {
  columns.value.push({
    cards: [],
    id: generateUniqueID(),
    title: t("modals.newBoard.newColumn"),
  });
  nextTick(() => {
    const columnElements = document.querySelectorAll(".column");
    const lastColumn = columnElements[columnElements.length - 1];
    if (!lastColumn) return;

    lastColumn.scrollIntoView({
      behavior: "smooth",
    });
  });
};

const createNewBoard = () => {
  if (newBoardName.value == null || !/\S/.test(newBoardName.value)) return;

  emitter.emit("createBoard", {
    columns: columns.value,
    title: newBoardName.value,
  });

  closeModal();
};

const closeModal = () => {
  newBoardName.value = "";
  boardNameEmptyError.value = false; // we do not want to show the error before the user clicks outside the input for the first time
  const defaultTemplate = boardTemplates[0];
  selectedTemplateId.value = defaultTemplate?.id ?? "basic";
  columns.value = defaultTemplate ? buildColumnsFromTemplate(defaultTemplate) : [];
  emit("closeModal");
};
</script>

<style scoped>
.force-flex {
  display: flex !important;
}
</style>
