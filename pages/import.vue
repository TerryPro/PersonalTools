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
  <main id="settings" class="pl-8 pr-6 pt-6">
    <div class="max-w-3xl">
      <!-- ============ 导入 ============ -->
      <section id="import" class="mb-9 scroll-mt-20">
        <h2 class="mb-1 flex flex-row items-center gap-2.5 text-xl font-bold">
          <span class="inline-block size-2 rounded-full bg-accent" />
          {{ $t("pages.import.importTabHeading") }}
        </h2>
        <span class="mb-3 block text-sm text-dim-3">{{
          $t("pages.import.importTabSubtext")
        }}</span>

        <div class="rounded-xl border border-elevation-2 bg-elevation-1">
          <!-- 部分导入 -->
          <div class="flex flex-row items-start gap-3.5 p-4">
            <div
              class="grid size-9 shrink-0 place-items-center rounded-lg bg-elevation-2 text-dim-1"
            >
              <ArrowDownTrayIcon class="size-5" />
            </div>
            <div class="flex-1">
              <div class="text-[15px] font-semibold">
                {{ $t("pages.import.importTabPartialHeading") }}
              </div>
              <div class="mt-0.5 text-[13px] text-dim-3">
                {{ $t("pages.import.importTabPartialSubtext") }}
              </div>
              <div class="mt-3 flex flex-row flex-wrap gap-2">
                <button
                  class="transition-button bg-elevation-2-hover flex cursor-pointer flex-row items-center gap-2 rounded-md border border-dotted border-accent bg-elevation-1 px-4 py-2 font-semibold"
                  @click="importFromKanriBoard"
                >
                  {{ $t("pages.import.importOptionKanri") }}
                </button>
                <button
                  class="transition-button bg-elevation-2-hover flex cursor-pointer flex-row items-center gap-2 rounded-md border border-dotted border-accent bg-elevation-1 px-4 py-2 font-semibold"
                  @click="importFromTrelloBoard"
                >
                  {{ $t("pages.import.importOptionTrello") }}
                </button>
                <button
                  class="transition-button bg-elevation-2-hover flex cursor-pointer flex-row items-center gap-2 rounded-md border border-dotted border-accent bg-elevation-1 px-4 py-2 font-semibold"
                  @click="importFromGithubProject"
                >
                  {{ $t("pages.import.importOptionGithub") }}
                </button>
              </div>
            </div>
          </div>

          <!-- 完整导入 -->
          <div
            class="flex flex-row items-start gap-3.5 border-t border-elevation-2 p-4"
          >
            <div
              class="grid size-9 shrink-0 place-items-center rounded-lg bg-red-500/15 text-red-500"
            >
              <ExclamationTriangleIcon class="size-5" />
            </div>
            <div class="flex-1">
              <div class="text-[15px] font-semibold">
                {{ $t("pages.import.importTabFullHeading") }}
              </div>
              <div class="mt-0.5 text-[13px] text-red-500">
                {{ $t("pages.import.importTabFullSubtext") }}
              </div>
              <div class="mt-3 flex flex-row flex-wrap gap-2">
                <button
                  class="transition-button bg-elevation-2-hover flex cursor-pointer flex-row items-center gap-2 rounded-md border border-dotted border-accent bg-elevation-1 px-4 py-2 font-semibold"
                  @click="importFromKanriFull"
                >
                  {{ $t("pages.import.importOptionKanri") }}
                </button>
                <button
                  class="transition-button bg-elevation-2-hover flex cursor-pointer flex-row items-center gap-2 rounded-md border border-dotted border-accent bg-elevation-1 px-4 py-2 font-semibold"
                  @click="importFromKanbanElectronFull"
                >
                  {{ $t("pages.import.importOptionKanbanElectron") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ 导出 ============ -->
      <section id="export" class="mb-9 scroll-mt-20">
        <h2 class="mb-3 flex flex-row items-center gap-2.5 text-xl font-bold">
          <span class="inline-block size-2 rounded-full bg-accent" />
          {{ $t("pages.import.exportTabHeading") }}
        </h2>

        <div class="rounded-xl border border-elevation-2 bg-elevation-1">
          <!-- 部分导出 -->
          <div class="flex flex-row items-start gap-3.5 p-4">
            <div
              class="grid size-9 shrink-0 place-items-center rounded-lg bg-elevation-2 text-dim-1"
            >
              <ViewColumnsIcon class="size-5" />
            </div>
            <div class="flex-1">
              <div class="text-[15px] font-semibold">
                {{ $t("pages.import.exportTabPartialHeading") }}
              </div>
              <div class="mt-0.5 text-[13px] text-dim-3">
                {{ $t("pages.import.exportTabPartialSubtext") }}
              </div>
              <DropdownMenuRoot>
                <DropdownMenuTrigger
                  class="transition-button bg-elevation-2-hover mt-3 flex cursor-pointer flex-row items-center gap-2 rounded-md border border-dotted border-accent bg-elevation-1 px-4 py-2 font-semibold"
                >
                  {{ $t("pages.import.exportTabPartialSelectButton") }}
                </DropdownMenuTrigger>
                <DropdownMenuPortal to=".default-layout">
                  <DropdownMenuContent
                    align="start"
                    :side-offset="5"
                    class="w-96 rounded-md border border-elevation-2 bg-elevation-1 p-2"
                  >
                    <DropdownMenuLabel class="mb-1 px-2 text-sm text-dim-3">
                      {{ $t("pages.import.exportTabPartialSelectPrompt") }}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      v-for="board in boards"
                      :key="board.id"
                      class="bg-elevation-3-hover cursor-pointer rounded-md px-2 py-0.5"
                      @select="exportSingleBoard(board.id)"
                    >
                      {{ board.title }}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenuPortal>
              </DropdownMenuRoot>
            </div>
          </div>

          <!-- 完整导出 -->
          <div
            class="flex flex-row items-start gap-3.5 border-t border-elevation-2 p-4"
          >
            <div
              class="grid size-9 shrink-0 place-items-center rounded-lg bg-elevation-2 text-dim-1"
            >
              <ArrowUpTrayIcon class="size-5" />
            </div>
            <div class="flex-1">
              <div class="text-[15px] font-semibold">
                {{ $t("pages.import.exportTabFullHeading") }}
              </div>
              <div class="mt-0.5 text-[13px] text-dim-3">
                {{ $t("pages.import.exportTabFullSubtext") }}
              </div>
              <button
                class="transition-button bg-elevation-2-hover mt-3 flex cursor-pointer flex-row items-center gap-2 rounded-md border border-dotted border-accent bg-elevation-1 px-4 py-2 font-semibold"
                @click="exportJSON()"
              >
                {{ $t("pages.import.exportTabFullButton") }}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { Board, Column, Tag, Card } from "@/types/kanban-types";

import { useBackupStore } from "@/stores/backup";
import {
  kanbanElectronJsonSchema,
  kanriBoardSchema,
  kanriJsonSchema,
  trelloJsonSchema,
} from "@/types/json-schemas";
import { ask, message, open, save } from "@tauri-apps/plugin-dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  ExclamationTriangleIcon,
  ViewColumnsIcon,
} from "@heroicons/vue/24/outline";
import { useI18n } from "vue-i18n";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ZodError, z } from "zod";

const router = useRouter();

const backupStore = useBackupStore();
const globalSettingsStore = useSettingsStore();
const theme = useThemeStore();

const { t } = useI18n();

const boards: Ref<Board[]> = ref([]);

onMounted(async () => {
  boards.value = await backupStore.getBoards();
});

const exportJSON = async () => {
  const filePath = await save({
    defaultPath: `./${new Date().toISOString().slice(0, 10)}_kanri_data_export.json`,
    filters: [
      {
        extensions: ["json"],
        name: "JSON File",
      },
    ],
    title: t("pages.import.exportFullJsonDialogTitle"),
  });

  const snapshot = await backupStore.exportFullState();

  const fileContents = JSON.stringify(snapshot, null, 2);

  if (filePath == null) return;
  await writeTextFile(filePath, fileContents);

  await message(t("pages.import.exportFullJsonSuccessMessage"), {
    kind: "info",
  });
};

const exportSingleBoard = async (boardId: string) => {
  const filePath = await save({
    defaultPath: `./${new Date().toISOString().slice(0, 10)}_kanri_board_export_${boardId}.json`,
    filters: [
      {
        extensions: ["json"],
        name: "JSON File",
      },
    ],
    title: t("pages.import.exportPartialJsonDialogTitle"),
  });

  if (filePath == null) return;

  const boardToExport = boards.value.find((board) => board.id === boardId);

  if (!boardToExport) {
    await message(t("pages.import.exportPartialJsonErrorBoardNotFound"), {
      kind: "error",
    });
    return;
  }

  const fileContents = JSON.stringify(boardToExport, null, 2);

  await writeTextFile(filePath, fileContents);

  await message(t("pages.import.exportPartialJsonSuccessMessage"), {
    kind: "info",
  });
};

const importFromKanriFull = async () => {
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
    await message(t("pages.import.importErrorBadJson"), {
      title: "Kanri",
      kind: "error",
    });
  }
  if (parsedJson === null) return;

  let zodParsed = null;
  try {
    zodParsed = kanriJsonSchema.parse(parsedJson);
  } catch (error) {
    console.error(error);
    if (
      //@ts-expect-error we do not know what type of error we will receive
      error.issues[0].code === "invalid_type" &&
      //@ts-expect-error we do not know what type of error we will receive
      error.issues[0].path[0] === "boards" &&
      //@ts-expect-error we do not know what type of error we will receive
      error.issues[0].received === "null"
    ) {
      return await message(t("pages.import.importErrorNoBoards"), {
        title: "Kanri",
        kind: "error",
      });
    }

    await message(t("pages.import.importErrorGoodJsonFaultyData"), {
      title: "Kanri",
      kind: "error",
    });
  }
  if (zodParsed === null) return;

  await backupStore.importFullState(zodParsed);

  globalSettingsStore.loadSettings();
  theme.loadThemeSettings();

  await message(t("pages.import.importSuccessFull"), { kind: "info" });

  // Manual refresh
  router.go(0);
};

const importFromKanbanElectronFull = async () => {
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
    await message(t("pages.import.importErrorBadJson"), {
      title: "Kanri",
      kind: "error",
    });
  }
  if (parsedJson === null) return;

  let zodParsed = null;
  try {
    zodParsed = kanbanElectronJsonSchema.parse(parsedJson);
  } catch (error) {
    if (!(error instanceof ZodError)) {
      console.error(String(error));
      return;
    }

    if (
      error.issues[0].code === "invalid_type" &&
      error.issues[0].path[0] === "boards" &&
      error.issues[0].received === "null"
    ) {
      return await message(t("pages.import.importErrorNoBoards"), {
        title: "Kanri",
        kind: "error",
      });
    }

    await message(t("pages.import.importErrorKanbanElectron"), {
      title: "Kanri",
      kind: "error",
    });
  }
  if (zodParsed === null) return;

  const convertedBoards: Array<Board> = [];
  zodParsed.boards.forEach((board) => {
    convertedBoards.push({
      columns: board.lists,
      id: board.id,
      title: board.title,
    });
  });

  await backupStore.importElectronState(zodParsed, convertedBoards);

  globalSettingsStore.loadSettings();

  await message(t("pages.import.importSuccessPartial"), { kind: "info" });

  // Manual refresh
  router.go(0);
};

const importFromKanriBoard = async () => {
  const selected = await open({
    filters: [
      {
        extensions: ["json"],
        name: "JSON File",
      },
    ],
    multiple: true,
  });

  if (selected === null) return;

  const convertedBoards: Array<Board> = await backupStore.getBoards();
  if (typeof selected === "string") {
    const result = await kanriParse(selected);

    if (result === undefined) return;

    const checkForDuplicates = convertedBoards.filter((board) => {
      return board.id === result.id;
    });

    if (checkForDuplicates.length !== 0) {
      const confirmation = await ask(
        t("pages.import.importDuplicateBoard", { boardName: result.title }),
        { title: "Kanri", kind: "info" }
      );
      if (!confirmation) {
        return;
      } else {
        result.id = generateUniqueID();
        while (convertedBoards.some((board) => board.id === result.id)) {
          result.id = generateUniqueID();
        }
        result.title = result.title + t("pages.import.duplicateSuffix");
      }
    }

    convertedBoards.push(result);
  } else {
    for (let i = 0; i < selected.length; i++) {
      const result = await kanriParse(selected[i]);

      if (result === undefined) return;

      const checkForDuplicates = convertedBoards.filter((board) => {
        return board.id === result.id;
      });

      if (checkForDuplicates.length !== 0) {
        const confirmation = await ask(
          t("pages.import.importDuplicateBoard", { boardName: result.title }),
          { title: "Kanri", kind: "info" }
        );

        if (!confirmation) {
          return;
        } else {
          result.id = generateUniqueID();
          while (convertedBoards.some((board) => board.id === result.id)) {
            result.id = generateUniqueID();
          }
          result.title = result.title + t("pages.import.duplicateSuffix");
        }
      }

      convertedBoards.push(result);
    }
  }

  if (convertedBoards.length === 0) return;

  await backupStore.setBoards(convertedBoards);

  await message(t("pages.import.importSuccessPartial"), { kind: "info" });

  // Manual refresh: the raw store write does not update the Pinia boards state
  // nor this page's export list, so reload to pick the imported boards up.
  router.go(0);
};

const kanriParse = async (board: string) => {
  const textFile = await readTextFile(board);
  if (!textFile) return;

  let parsedJson = null;
  try {
    parsedJson = JSON.parse(textFile);
  } catch (error) {
    console.error("Could not parse imported JSON;", error);
    await message(t("pages.import.importErrorBadJson"), {
      title: "Kanri",
      kind: "error",
    });
  }
  if (parsedJson === null) return;

  let zodParsed = null;
  try {
    zodParsed = kanriBoardSchema.parse(parsedJson);
  } catch (error) {
    if (!(error instanceof ZodError)) {
      console.error(String(error));
      return;
    }

    console.error(error);
    if (
      error.issues[0].code === "invalid_type" &&
      error.issues[0].path[0] === "boards" &&
      error.issues[0].received === "null"
    ) {
      return await message(t("pages.import.importErrorNoBoards"), {
        title: "Kanri",
        kind: "error",
      });
    }

    await message(t("pages.import.importErrorGoodJsonFaultyData"), {
      title: "Kanri",
      kind: "error",
    });
  }
  if (zodParsed === null) return;

  return zodParsed;
};

const importFromTrelloBoard = async () => {
  const selected = await open({
    filters: [
      {
        extensions: ["json"],
        name: "JSON File",
      },
    ],
    multiple: true,
  });

  if (selected === null || selected.length === 0) return;

  const convertedBoards: Array<Board> = await backupStore.getBoards();
  if (typeof selected === "string") {
    const result = await trelloParse(selected);

    if (result === undefined) return;

    convertedBoards.push(result);
  } else {
    for (let i = 0; i < selected.length; i++) {
      const result = await trelloParse(selected[i]);

      if (result === undefined) return;

      convertedBoards.push(result);
    }
  }

  if (convertedBoards.length === 0) return;

  await backupStore.setBoards(convertedBoards);

  await message(t("pages.import.importSuccessPartial"), { kind: "info" });

  // Manual refresh
  router.go(0);
};

const trelloParse = async (board: string) => {
  const textFile = await readTextFile(board);
  if (!textFile) return;

  let parsedJson = null;
  try {
    parsedJson = JSON.parse(textFile);
  } catch (error) {
    console.error("Could not parse imported JSON;", error);
    await message(t("pages.import.importErrorBadJson"), {
      title: "Kanri",
      kind: "error",
    });
    return undefined;
  }
  if (parsedJson === null) return undefined;

  let zodParsed: null | z.infer<typeof trelloJsonSchema> = null;
  try {
    zodParsed = trelloJsonSchema.parse(parsedJson);
  } catch (error) {
    if (!(error instanceof ZodError)) {
      console.error(String(error));
      return;
    }

    console.error(error);
    if (
      error.issues[0].code === "invalid_type" &&
      error.issues[0].path[0] === "boards" &&
      error.issues[0].received === "null"
    ) {
      await message(t("pages.import.importErrorNoBoards"), {
        title: "Kanri",
        kind: "error",
      });
      return undefined;
    }

    await message(t("pages.import.importErrorTrello"), {
      title: "Kanri",
      kind: "error",
    });
    return undefined;
  }
  if (zodParsed === null) return undefined;

  const columns: Column[] = [];
  zodParsed.lists.forEach((column) => {
    if (column.closed === false) {
      columns.push({
        cards: [],
        id: column.id,
        title: column.name,
      });
    }
  });

  zodParsed.cards.forEach((card) => {
    const selectedCol = columns.filter((column) => {
      return column.id === card.idList;
    });

    if (selectedCol.length > 1 || selectedCol.length === 0) return undefined;

    const tasks: { finished: boolean; name: string }[] = [];

    if (card.idChecklists.length > 0) {
      card.idChecklists.forEach((checklistId) => {
        const checklist = zodParsed?.checklists.filter(
          (checklist) => checklist.id === checklistId
        )[0];

        if (checklist) {
          checklist.checkItems.forEach((checkItem) => {
            tasks.push({
              finished: checkItem.state === "complete" ? true : false,
              name: checkItem.name,
            });
          });
        }
      });
    }

    const tags: Array<Tag> = [];
    if (card.labels.length > 0) {
      card.labels.forEach((label) => {
        tags.push({
          id: label.id,
          text: label.name,
          color: cssColorStringToHex(label.color),
          style: `background-color: ${cssColorStringToHex(label.color)}`,
        });
      });
    }

    const kanriCard = {
      description: card.desc,
      id: card.id,
      name: card.name,
      tasks: tasks,
      tags: tags,
      dueDate: card.due,
    };

    selectedCol[0].cards.push(kanriCard);
  });

  const globalTags: Board["globalTags"] = [];
  zodParsed.labels.forEach((label) => {
    if (label.name.length === 0) return;

    globalTags.push({
      id: label.id,
      text: label.name,
      color: cssColorStringToHex(label.color),
      style: `background-color: ${cssColorStringToHex(label.color)}`,
    });
  });

  const kanriBoard = {
    globalTags: globalTags,
    columns: columns,
    id: generateUniqueID(),
    lastEdited: new Date().toISOString(),
    title: zodParsed.name,
  };

  let kanriConvertedParsed = null;
  try {
    kanriConvertedParsed = kanriBoardSchema.parse(kanriBoard);
  } catch (error) {
    console.error(error);
    await message(t("pages.import.importErrorTrelloConversion"), {
      title: "Kanri",
      kind: "error",
    });
    return undefined;
  }
  if (kanriConvertedParsed === null) return undefined;

  return kanriConvertedParsed;
};

const importFromGithubProject = async () => {
  const selected = await open({
    filters: [
      {
        extensions: ["tsv"],
        name: "TSV File",
      },
    ],
    multiple: true,
  });

  const convertedBoards: Array<Board> = await backupStore.getBoards();

  if (selected === null) return;

  const selectedFiles = Array.isArray(selected) ? selected : [selected];

  for (const file of selectedFiles) {
    const textFile = await readTextFile(file);
    if (!textFile) continue;

    const lines = textFile.split("\n");
    if (lines[0] !== "Title	URL	Assignees	Status	Labels") {
      await message(
        t("pages.import.importErrorGithub", {
          file,
          email: "support@kanriapp.com",
        }),
        { kind: "error" }
      );
      console.error(`Invalid GH Projects board file: ${file}`);
      continue;
    }

    const board: Board = {
      id: generateUniqueID(),
      title: (file.split(/[/\\]/).pop() || file).replace(/\.tsv$/, ""),
      columns: [],
      globalTags: [],
      lastEdited: new Date(),
    };

    // Skip the header row
    for (let i = 1; i < lines.length; i++) {
      const [title, url, , status, labels] = lines[i].split("\t");

      if (!title.trim()) continue;

      let column = board.columns.find((col) => col.title === status);
      if (!column) {
        column = {
          id: generateUniqueID(),
          title: status,
          cards: [],
        };
        board.columns.push(column);
      }

      const cardTags: Array<Tag> = [];
      if (labels) {
        const labelArray = labels.split(",");
        for (const label of labelArray) {
          const trimmedLabel = label.trim();

          if (!board.globalTags) board.globalTags = [];
          let tag = board.globalTags.find((t) => t.text === trimmedLabel);

          if (!tag) {
            tag = {
              id: generateUniqueID(),
              text: trimmedLabel,
            };
            board.globalTags.push(tag);
          }
          cardTags.push(tag);
        }
      }

      const card: Card = {
        id: generateUniqueID(),
        name: title.trim(),
        description: url ? url.trim() : "",
        tags: cardTags,
      };

      column.cards.push(card);
    }

    convertedBoards.push(board);
  }

  await backupStore.setBoards(convertedBoards);
  await message(t("pages.import.importSuccessGithub"), { kind: "info" });

  // Manual refresh: the raw store write does not update the Pinia boards state
  // nor this page's export list, so reload to pick the imported boards up.
  router.go(0);
};
</script>
