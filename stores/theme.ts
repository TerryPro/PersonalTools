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

import { defineStore } from 'pinia'
import { dark, professionalLight } from '@/utils/themes';
import { withDerivedColors } from '@/utils/colorUtils';
import type { ResolvedTheme, Theme, ThemeIdentifiers } from '@/types/kanban-types';

export type BuiltinThemeId = Exclude<ThemeIdentifiers, "auto" | "custom">;
export type ThemeOverrides = Partial<Record<BuiltinThemeId, Theme>>;

export const useThemeStore = defineStore("theme", {
  state: () => {
    const activeTheme = ref("dark");
    const colors: Ref<ResolvedTheme | null> = ref(null);
    const savedCustomTheme: Ref<Theme | null> = ref(null);
    const autoThemeEnabled = ref(false);
    const themeOverrides: Ref<ThemeOverrides> = ref({});

    return { activeTheme, colors, savedCustomTheme, autoThemeEnabled, themeOverrides };
  },
  actions: {
    async loadThemeSettings() {
      const store = useTauriStore().store;

      const activeThemeSaved: string = await store.get("activeTheme") ?? "dark";
      const colorsSaved: ResolvedTheme = withDerivedColors(await store.get("colors") ?? dark);
      const savedCustomThemeSaved: Theme | null = await store.get("savedCustomTheme") ?? null;
      const themeOverridesSaved: ThemeOverrides = await store.get("themeOverrides") ?? {};
      const autoThemeEnabledSaved: boolean = await store.get("activeTheme") === "auto" ? true : false;

      this.activeTheme = activeThemeSaved;
      this.colors = colorsSaved;
      this.savedCustomTheme = savedCustomThemeSaved;
      this.autoThemeEnabled = autoThemeEnabledSaved;
      this.themeOverrides = themeOverridesSaved;
    },

    // Effective palette of a built-in theme: stock palette merged with user overrides
    getEffectiveThemeColors(themeId: BuiltinThemeId): ResolvedTheme {
      // withDerivedColors spreads into a new object, so reactive consumers
      // can never mutate the stock palette or persisted overrides
      return withDerivedColors(this.themeOverrides[themeId] ?? themes[themeId]);
    },

    async setTheme(theme: string, colors: Theme | null = null) {
      const store = useTauriStore().store;

      // built-in themes always resolve to stock palette merged with user overrides
      if (theme === "light" || theme === "dark" || theme === "catppuccin") {
        colors = this.getEffectiveThemeColors(theme);
      }

      this.activeTheme = theme;
      await store.set("activeTheme", theme);

      if (colors) {
        this.colors = withDerivedColors(colors);
        await store.set("colors", this.colors);

        if (theme === "custom") {
          this.savedCustomTheme = this.colors;
          await store.set("savedCustomTheme", this.colors);
        }
      }
    },

    async toggleAutoTheme(resolvedSystemTheme: "light" | "dark" = "dark") {
      const store = useTauriStore().store;

      if (this.autoThemeEnabled) {
        this.activeTheme = "auto";
        await store.set("activeTheme", "auto");
      } else {
        this.activeTheme = resolvedSystemTheme;
        await store.set("activeTheme", resolvedSystemTheme);
      }

      this.colors = this.getEffectiveThemeColors(resolvedSystemTheme);
      await store.set("colors", this.colors);
    },

    async setThemeOverride(themeId: BuiltinThemeId, colors: Theme) {
      const store = useTauriStore().store;

      const resolved = withDerivedColors(colors);
      this.themeOverrides = { ...this.themeOverrides, [themeId]: resolved };
      await store.set("themeOverrides", this.themeOverrides);

      if (this.activeTheme === themeId) {
        this.colors = resolved;
        await store.set("colors", resolved);
      }
    },

    async resetThemeOverride(themeId: BuiltinThemeId) {
      const store = useTauriStore().store;

      const nextOverrides = Object.fromEntries(
        Object.entries(this.themeOverrides).filter(([id]) => id !== themeId)
      ) as ThemeOverrides;
      this.themeOverrides = nextOverrides;
      await store.set("themeOverrides", nextOverrides);

      if (this.activeTheme === themeId) {
        this.colors = withDerivedColors(themes[themeId]);
        await store.set("colors", this.colors);
      }
    },

    // Restore the custom theme to its professional light preset palette
    async resetCustomTheme() {
      const store = useTauriStore().store;

      const preset: ResolvedTheme = withDerivedColors(professionalLight);
      this.savedCustomTheme = preset;
      await store.set("savedCustomTheme", preset);

      if (this.activeTheme === "custom") {
        this.colors = preset;
        await store.set("colors", preset);
      }
    }
  }
})
