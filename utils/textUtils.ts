// SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>
//
// SPDX-License-Identifier: Apache-2.0

/**
 * Strips HTML (e.g. the tiptap rich-text output stored on a card description)
 * down to readable plain text.
 *
 * Block-level tags become line breaks and list items are prefixed with a bullet
 * so the result stays legible as flat text. Common HTML entities are decoded,
 * with `&amp;` handled last to avoid double-decoding. The transform is
 * regex-only (no DOM) so it is safe in any render context.
 *
 * @param html - The raw HTML string; may be null/undefined/empty.
 * @returns The plain-text representation, or an empty string when there is no content.
 */
export const htmlToPlainText = (html?: string | null): string => {
  if (!html) return "";

  return html
    .replace(/<\s*br\s*\/?\s*>/gi, "\n")
    .replace(/<\/\s*(p|div|h[1-6]|li|blockquote|pre|tr)\s*>/gi, "\n")
    .replace(/<\s*li[^>]*>/gi, "• ")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;/gi, "'")
    .replace(/&amp;/gi, "&")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};
