## Summary
Rewrite the existing static site located in the `veiq.ai` folder into a Vue-based implementation **inside the same repository**.

## Goal
Migrate the old static marketing site to Vue without changing the overall visual identity or user-facing structure.

## Requirements
- Preserve the current design as closely as possible
- Preserve the same page navigation / scroll navigation behavior
- Optimize the images/assets currently used by the site
- Rewrite styling to Tailwind **where it makes sense**
- Replace custom scripts with built-in Vue patterns/components/features **where possible**

## Scope notes
- Existing source of truth is the current static site in `veiq.ai`
- This is primarily a frontend migration / modernization task
- Keep the resulting UX familiar to the current version
- Avoid unnecessary redesigns unless required for the Vue migration

## Suggested implementation direction
- Analyze the current static structure and split it into Vue components
- Recreate section-based navigation in Vue
- Migrate reusable layout and UI styling into Tailwind utilities where practical
- Keep any non-trivial styles as custom CSS only when Tailwind is not a good fit
- Audit and optimize images (size/format/compression) without visibly degrading quality
- Replace imperative DOM scripts with idiomatic Vue reactivity / component behavior

## Deliverable
A working Vue version of the existing `veiq.ai` site committed in this repository, with the same overall design and navigation, improved asset efficiency, and a cleaner modern frontend structure.
