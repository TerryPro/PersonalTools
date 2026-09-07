<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>, PwshLab, tareqdayya, alexlalves -->
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
  <div class="size-full">
    <KanbanBoardView
      :key="boardId"
      :board-id="boardId"
      @board-deleted="onBoardDeleted"
      @board-duplicated="onBoardDuplicated"
    />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const boardId = computed(() => route.params.id as string);

// Standalone board page: after deleting or duplicating we return to the
// board overview, mirroring the previous behaviour of this route.
const onBoardDeleted = () => {
  router.push("/");
};

const onBoardDuplicated = () => {
  router.push("/");
};
</script>
