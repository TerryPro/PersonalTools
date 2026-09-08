// SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>
//
// SPDX-License-Identifier: Apache-2.0

import type { Card } from "~/types/kanban-types";
import { exampleColumns } from "~/utils/exampleData";

/**
 * A preset board skeleton offered in the "create new board" dialog.
 *
 * Column titles are stored as short i18n keys resolved under
 * `modals.newBoard.templateColumns.<key>` so created boards are localized.
 * `exampleCards` optionally seeds sample cards per column (index-aligned with
 * `columnKeys`); it is only used by the example template.
 */
export interface BoardTemplate {
  id: string;
  columnKeys: string[];
  exampleCards?: Card[][];
}

/**
 * The library of common board templates. The first entry is the default
 * selection in the new-board dialog.
 */
export const boardTemplates: BoardTemplate[] = [
  { id: "basic", columnKeys: ["todo", "inProgress", "done"] },
  {
    id: "project",
    columnKeys: ["backlog", "todo", "inProgress", "review", "done"],
  },
  { id: "bug", columnKeys: ["toReproduce", "inProgress", "fixed", "verified"] },
  { id: "content", columnKeys: ["ideas", "drafting", "review", "published"] },
  {
    id: "sales",
    columnKeys: ["lead", "contacted", "proposal", "negotiation", "won", "lost"],
  },
  { id: "gtd", columnKeys: ["inbox", "next", "waiting", "someday", "done"] },
  {
    id: "example",
    columnKeys: ["todo", "doing", "done"],
    // Reuse the seed cards from exampleData so demo content stays in one place.
    exampleCards: exampleColumns.map((column) => column.cards),
  },
];
