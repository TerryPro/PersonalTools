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
  <Modal @closeModal="$emit('closeModal')">
    <template #content>
      <main class="h-38 max-w-3xl">
        <div class="flex flex-row items-start justify-between">
          <h1 class="pointer-events-auto pr-5 text-2xl font-bold">
            {{ $t("modals.help.title") }}
          </h1>
          <XMarkIcon
            class="text-accent-hover size-6 cursor-pointer"
            @click="$emit('closeModal')"
          />
        </div>
        <h2 class="text-md mb-4 text-dim-3">
          {{ $t("modals.help.resources") }}
        </h2>
        <h3 class="mb-2 text-xl font-bold">
          {{ $t("modals.help.shortcuts") }}
        </h3>
        <ul class="ml-2 flex flex-col gap-2">
          <li>
            <kbd
              v-if="osType === 'darwin'"
              class="kbd-key px-2 font-mono"
            >
              <svg
                class="size-3 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"
                />
              </svg>
            </kbd>
            <kbd
              v-else
              class="kbd-key px-1.5 font-mono"
            >
              {{ $t("modals.help.ctrlKey") }}
            </kbd>
            +
            <kbd
              class="kbd-key px-1.5 font-mono"
            >
              b
            </kbd>
            {{ $t("modals.help.ctrl+b") }}
          </li>
          <li>
            <kbd
              v-if="osType === 'darwin'"
              class="kbd-key px-2 font-mono"
            >
              <svg
                class="size-3 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"
                />
              </svg>
            </kbd>
            <kbd
              v-else
              class="kbd-key px-1.5 font-mono"
            >
              {{ $t("modals.help.ctrlKey") }}
            </kbd>
            +
            <kbd
              class="kbd-key px-1.5 font-mono"
            >
              d
            </kbd>
            {{ $t("modals.help.ctrl+d") }}
          </li>
          <li>
            <kbd
              v-if="osType === 'darwin'"
              class="kbd-key px-2 font-mono"
            >
              <svg
                class="size-3 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"
                />
              </svg>
            </kbd>
            <kbd
              v-else
              class="kbd-key px-1.5 font-mono"
            >
              {{ $t("modals.help.ctrlKey") }}
            </kbd>
            +
            <kbd
              class="kbd-key px-1.5 font-mono"
            >
              t
            </kbd>
            {{ $t("modals.help.ctrl+t") }}
          </li>
          <li>
            <kbd
              v-if="osType === 'darwin'"
              class="kbd-key px-2 font-mono"
            >
              <svg
                class="size-3 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"
                />
              </svg>
            </kbd>
            <kbd
              v-else
              class="kbd-key px-1.5 font-mono"
            >
              {{ $t("modals.help.ctrlKey") }}
            </kbd>
            +
            <kbd
              class="kbd-key px-1.5 font-mono"
            >
              n
            </kbd>
            {{ $t("modals.help.ctrl+n") }}
          </li>
          <li>
            <kbd
              v-if="osType === 'darwin'"
              class="kbd-key px-2 font-mono"
            >
              <svg
                class="size-3 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"
                />
              </svg>
            </kbd>
            <kbd
              v-else
              class="kbd-key px-1.5 font-mono"
            >
              {{ $t("modals.help.ctrlKey") }}
            </kbd>
            +
            <kbd
              v-if="osType === 'darwin'"
              class="kbd-key min-w-[30px] px-1.5 font-mono"
            >
              <svg
                class="size-3 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 3h6l6 18h6" />
                <path d="M14 3h7" />
              </svg>
            </kbd>
            <kbd
              v-else
              class="kbd-key px-1.5 font-mono"
            >
              alt
            </kbd>
            +
            <kbd
              class="kbd-key px-1.5 font-mono"
            >
              &lt;
            </kbd>
            <kbd
              class="kbd-key px-1.5 font-mono"
            >
              &gt;
            </kbd>
            {{ $t("modals.help.ctrl+alt+<>") }}
          </li>
          <li>
            <kbd
              v-if="osType === 'darwin'"
              class="kbd-key px-2 font-mono"
            >
              <svg
                class="size-3 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"
                />
              </svg>
            </kbd>
            <kbd
              v-else
              class="kbd-key px-1.5 font-mono"
            >
              {{ $t("modals.help.ctrlKey") }}
            </kbd>
            +
            <kbd
              class="kbd-key px-1.5 font-mono"
            >
              +
            </kbd>
            <kbd
              class="kbd-key px-1.5 font-mono"
            >
              -
            </kbd>
            {{ $t("modals.help.ctrl++-") }}
          </li>
        </ul>
        <h3 class="mb-2 mt-4 text-xl font-bold">
          {{ $t("modals.help.support") }}
        </h3>
        <div class="flex flex-row gap-3">
          <a
            href="https://www.kanriapp.com/getting-started/faq"
            target="_blank"
            class="bg-elevation-3-hover flex flex-row items-center gap-2 rounded-md border border-elevation-3 px-4 py-1.5 transition-colors duration-300"
          >
            <BookOpenIcon class="size-6" />
            {{ $t("modals.help.docs") }}
          </a>
          <a
            href="https://github.com/trobonox/kanri/issues"
            target="_blank"
            class="bg-elevation-3-hover flex flex-row items-center gap-2 rounded-md border border-elevation-3 px-4 py-1.5 transition-colors duration-300"
          >
            <IconGithub class="size-6" />
            {{ $t("modals.help.github") }}
          </a>
          <a
            href="https://discord.gg/AVqHrvxB9C"
            target="_blank"
            class="bg-elevation-3-hover flex flex-row items-center gap-2 rounded-md border border-elevation-3 px-4 py-1.5 transition-colors duration-300"
          >
            <IconDiscord class="size-6" />
            {{ $t("modals.help.discord") }}
          </a>
        </div>
        <h3 class="mb-1 mt-4 text-xl font-bold">
          {{ $t("modals.help.creditsTitle") }}
        </h3>
        <div class="block max-w-2xl">
          <p class="text-sm text-dim-2">
            {{ $t("modals.help.creditsText1") }}
            <br >
          </p>
          <p class="text-sm text-dim-2">
            {{ $t("modals.help.creditsText2") }}
          </p>
        </div>
        <p class="mb-2 pt-2">
          {{ $t("modals.help.copyrights", { email: "hello@trobo.dev" }) }}<br >
          <span class="text-lg font-bold">Kanri </span>
          <span class="text-accent-lighter">
            {{
              $t("modals.help.version", {
                major: versionInfo.buildMajor,
                minor: versionInfo.buildMinor,
                revision: versionInfo.buildRevision,
              })
            }}
          </span>
          -
          <nuxt-link
            class="text-accent-darker-hover text-accent"
            to="/licenses"
            @click="$emit('closeModal')"
          >
            {{ $t("modals.help.thirdPartyLicenseNotices") }}
          </nuxt-link>
        </p>
      </main>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "@/components/Modal.vue";
import versionInfo from "@/version_info.json";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { BookOpenIcon } from "@heroicons/vue/24/outline";
import { platform } from "@tauri-apps/plugin-os";

const osType = ref("");

onMounted(async () => {
  osType.value = platform();
});

defineEmits<{
  (e: "closeModal"): void;
}>();
</script>

<style scoped>
ul {
  list-style-type: circle;
  list-style-position: inside;
}

/* themed keycap for shortcut badges: follows the active theme via CSS vars
   instead of hardcoded gray/white + Tailwind dark: variants */
.kbd-key {
  display: inline-flex;
  min-height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  border: 1px solid var(--elevation-3);
  background-color: var(--elevation-2);
  color: var(--text);
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  box-shadow: 0 2px 0 0 var(--elevation-3);
}
</style>
