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

function applySpellcheckSetting(el: HTMLElement, disabled: boolean) {
  if (disabled) {
    el.setAttribute("autocomplete", "off");
    el.setAttribute("autocorrect", "off");
    el.setAttribute("autocapitalize", "off");
    el.setAttribute("spellcheck", "false");
  } else {
    el.removeAttribute("autocomplete");
    el.removeAttribute("autocorrect");
    el.removeAttribute("autocapitalize");
    el.removeAttribute("spellcheck");
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("resizable", {
    mounted: function (el) {
      el.addEventListener("input", function (e: Event) {
        const target = e.target as HTMLTextAreaElement;
        target.style.height = "auto";
        target.style.height = `${target.scrollHeight + 2}px`;
      });
    },
  });

  nuxtApp.vueApp.directive("focus", {
    mounted: function (el) {
      el.focus();
    },
  });

  nuxtApp.vueApp.directive("disable-spellcheck", {
    mounted: function (el, binding) {
      applySpellcheckSetting(el, binding.value);
    },
    updated: function (el, binding) {
      applySpellcheckSetting(el, binding.value);
    },
  });
});
