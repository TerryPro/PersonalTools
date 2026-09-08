/* SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>

SPDX-License-Identifier: GPL-3.0-or-later

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
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { defineStore } from "pinia";
import type { z } from "zod";
import type { Board } from "@/types/kanban-types";
import type { kanbanElectronJsonSchema, kanriJsonSchema } from "@/types/json-schemas";
import { useTauriStore } from "@/stores/tauriStore";

type KanriFullBackup = z.infer<typeof kanriJsonSchema>;
type KanbanElectronBackup = z.infer<typeof kanbanElectronJsonSchema>;

/**
 * Encapsulates every raw Tauri store read/write used by the import/export
 * page so no page touches the persistence layer directly (enforced by the
 * `no-store-outside-stores` ESLint rule). It owns the full-app backup and
 * restore as well as the board-list read/append shared by the partial
 * importers (single board, Trello, GitHub Projects).
 *
 * These actions deliberately mirror the exact key set, ordering and
 * conditional writes the import page performed previously, so exported files
 * stay byte-for-byte compatible and imports behave identically.
 */
export const useBackupStore = defineStore("backup", {
  actions: {
    /** Current persisted boards (empty array when none are stored yet). */
    async getBoards(): Promise<Board[]> {
      const store = useTauriStore().store;
      return ((await store.get("boards")) as Board[]) || [];
    },

    /** Persist a new boards array (used by the partial board importers). */
    async setBoards(boards: Board[]) {
      const store = useTauriStore().store;
      await store.set("boards", boards);
    },

    /** Reads every persisted setting into a single exportable snapshot. */
    async exportFullState() {
      const store = useTauriStore().store;

      const savedBoards = await store.get("boards");
      const boardSortingOption = await store.get("boardSortingOption");
      const pins = await store.get("pins");
      const reverseSorting = await store.get("reverseSorting");
      const activeTheme = await store.get("activeTheme");
      const colors = await store.get("colors");
      const savedCustomTheme = await store.get("savedCustomTheme");
      const themeOverrides = await store.get("themeOverrides");
      const columnZoomLevel = await store.get("columnZoomLevel");
      const lastInstalledVersion = await store.get("lastInstalledVersion");
      const animationsEnabled = await store.get("animationsEnabled");
      const defaultRelativeDueDatesEnabled = await store.get(
        "defaultRelativeDueDatesEnabled"
      );
      const addToTopOfColumnButtonEnabled = await store.get(
        "addToTopOfColumnButtonEnabled"
      );
      const displayColumnCardCountEnabled = await store.get(
        "displayColumnCardCountEnabled"
      );

      return {
        activeTheme,
        boardSortingOption,
        boards: savedBoards,
        pins,
        colors,
        columnZoomLevel,
        lastInstalledVersion,
        savedCustomTheme,
        themeOverrides,
        reverseSorting,
        animationsEnabled,
        defaultRelativeDueDatesEnabled,
        addToTopOfColumnButtonEnabled,
        displayColumnCardCountEnabled,
      };
    },

    /** Restores a full Kanri backup snapshot into the persistent store. */
    async importFullState(data: KanriFullBackup) {
      const store = useTauriStore().store;

      await store.set("boards", data.boards);
      await store.set("pins", data.pins);
      await store.set("colors", data.colors);
      await store.set("activeTheme", data.activeTheme);
      await store.set("columnZoomLevel", data.columnZoomLevel);
      await store.set("boardSortingOption", data.boardSortingOption);
      await store.set("savedCustomTheme", data.savedCustomTheme);
      if (data.themeOverrides !== undefined && data.themeOverrides !== null) {
        await store.set("themeOverrides", data.themeOverrides);
      }
      await store.set("lastInstalledVersion", data.lastInstalledVersion);
      await store.set("animationsEnabled", data.animationsEnabled);
      if (data.defaultRelativeDueDatesEnabled !== undefined) {
        await store.set(
          "defaultRelativeDueDatesEnabled",
          data.defaultRelativeDueDatesEnabled
        );
      }
      await store.set("reverseSorting", data.reverseSorting);
      await store.set(
        "addToTopOfColumnButtonEnabled",
        data.addToTopOfColumnButtonEnabled
      );
      await store.set(
        "displayColumnCardCountEnabled",
        data.displayColumnCardCountEnabled
      );
    },

    /** Restores boards + theme from a legacy kanban-electron backup. */
    async importElectronState(
      data: KanbanElectronBackup,
      convertedBoards: Board[]
    ) {
      const store = useTauriStore().store;

      await store.set("boards", convertedBoards);
      await store.set("colors", data.colors);
      await store.set("activeTheme", data.activeTheme);
      if (data.columnZoomLevel) {
        await store.set("columnZoomLevel", data.columnZoomLevel);
      }
    },
  },
});
