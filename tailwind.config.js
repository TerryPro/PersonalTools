// SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>
//
// SPDX-License-Identifier: CC0-1.0

module.exports = {
  content: [],
  plugins: [],
  theme: {
    extend: {
      // Theme colors resolve to the CSS variables injected by layouts/default.vue,
      // so standard Tailwind variants (hover:, focus:, disabled:, ...) work with
      // built-in and user-defined themes alike.
      colors: {
        accent: {
          DEFAULT: "var(--accent)",
          darker: "var(--accent-darker)",
          lighter: "color-mix(in srgb, var(--accent) 70%, white)",
          logo: "var(--logo-accent)",
        },
        primary: {
          DEFAULT: "var(--bg-primary)",
          darker: "color-mix(in srgb, var(--bg-primary) 100%, black 10%)",
        },
        elevation: {
          1: "var(--elevation-1)",
          2: "var(--elevation-2)",
          3: "var(--elevation-3)",
          4: "color-mix(in srgb, var(--elevation-3) 95%, white)",
          5: "color-mix(in srgb, var(--elevation-3) 85%, white)",
        },
        dim: {
          1: "var(--text-dim-1)",
          2: "var(--text-dim-2)",
          3: "var(--text-dim-3)",
          4: "var(--text-dim-4)",
        },
        buttons: "var(--text-buttons)",
        normal: "var(--text)",
      },
      // Applied globally by Tailwind preflight (html { font-family: ... }).
      // System-first stacks: no bundled fonts, native look per OS, CJK fallbacks included.
      fontFamily: {
        sans: [
          "Inter",
          '"Segoe UI Variable Text"',
          '"Segoe UI"',
          "system-ui",
          '"Microsoft YaHei UI"',
          '"PingFang SC"',
          '"Noto Sans CJK SC"',
          "sans-serif",
        ],
        mono: [
          '"JetBrains Mono"',
          '"Cascadia Code"',
          "Consolas",
          "ui-monospace",
          "monospace",
        ],
      },
      keyframes: {
        slideDownAndFade: {
          from: { opacity: 0, transform: "translateY(-2px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: "translateX(2px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: "translateY(2px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: "translateX(-2px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
      },
      animation: {
        slideDownAndFade:
          "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade:
          "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
};
