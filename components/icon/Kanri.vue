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
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- Board frame -->
    <rect
      x="6"
      y="8"
      width="36"
      height="32"
      rx="5"
      stroke="currentColor"
      stroke-width="4"
    />
    <!-- Column dividers -->
    <path d="M18 8v32M30 8v32" stroke="currentColor" stroke-width="4" />
    <!-- Column 1 cards -->
    <rect x="9" y="12" width="6" height="4" rx="2" fill="currentColor" />
    <rect x="9" y="18" width="6" height="4" rx="2" fill="currentColor" />
    <rect x="9" y="24" width="6" height="12" rx="2" fill="currentColor" />
    <!-- Column 2 cards -->
    <rect x="21" y="12" width="6" height="4" rx="2" fill="currentColor" />
    <rect x="21" y="18" width="6" height="4" rx="2" fill="currentColor" />
    <rect x="21" y="24" width="6" height="7" rx="2" fill="currentColor" />
    <rect x="21" y="33" width="6" height="4" rx="2" fill="currentColor" />
    <!-- Column 3 cards -->
    <rect x="33" y="12" width="6" height="4" rx="2" fill="currentColor" />
    <rect x="33" y="18" width="6" height="4" rx="2" fill="currentColor" />
    <rect x="33" y="24" width="6" height="4" rx="2" fill="currentColor" />
    <rect x="33" y="30" width="6" height="8" rx="2" fill="currentColor" />
  </svg>
</template>
