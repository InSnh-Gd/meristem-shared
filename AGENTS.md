# Meristem Shared Agent Guide

## Scope
- This guide applies only to `meristem-shared/`.
- Keep behavior aligned with root `AGENTS.md`.

## Purpose
- `meristem-shared` is the shared type/interface package for Core and Client.
- It should contain portable contracts, not runtime orchestration logic.

## Runtime and Commands
- Install: `bun install`
- Build JS + d.ts: `bun run build`
- Emit declarations only: `bun run build-types`
- Clean output: `bun run clean`

## Engineering Constraints
- Bun-only workflow: use `bun install`, `bun run`, `bun test`, `bun publish`.
- Do not use `npm`/`yarn`/`pnpm`.
- Do not use Node.js runtime flows unless strictly necessary and explicitly approved.
- No `any`; use `unknown` + type guards.
- Keep TypeScript strict semantics; do not weaken strict checks.
- Avoid OOP/Java-style implementation; prefer FP/composition.
- Run LSP/type diagnostics after TypeScript edits.
- For uncertain external facts, use search MCP and cite evidence.

## Contract Boundaries
- Keep exports centralized in `src/index.ts`.
- Prefer stable type names and backward-compatible evolution.
- When a contract changes, update both producer and consumer repos in the same change set.
- Avoid introducing runtime-only dependencies into shared contracts.

## Canonical Terminology
- Use `AGENT` and `GIG` as canonical persona names.
- Do not introduce deprecated role terminology in code or docs.

## Key Files
- Export barrel: `src/index.ts`
- Envelope contract: `src/types/envelope.ts`
- Heartbeat contract: `src/types/heartbeat.ts`
- Pulse/inventory contract: `src/types/pulse.ts`
- Task contract: `src/types/task.ts`
- Error codes: `src/types/error.ts`

## Validation
- Build artifacts and declarations: `bun run build`.
- Ensure `dist/` output stays consistent with `src/` exports after changes.
- Sync contract-level documentation when shape/semantics change.
