# Scripts

## apply-sync.mjs

A Node.js helper that takes a snapshot JSON (exported from the phone via the **⇪ Sync** button) and merges any overrides back into the `data/*.js` source files.

### Requirements

- Node.js 18+ (uses ESM + built-in `vm`, `fs`, `path`)
- No npm install needed — uses only Node built-ins

### Usage

```bash
# Dry run — shows a diff summary, writes nothing
node scripts/apply-sync.mjs path/to/supper-sync-2025-07-20-1430.json

# Apply changes to data files
node scripts/apply-sync.mjs path/to/supper-sync-2025-07-20-1430.json --write
```

### What it does

1. Reads the snapshot JSON (version 2) exported from the app.
2. Loads `data/meta.js` and `data/courses.js` using `vm.runInNewContext`.
3. Prints a human-readable diff of every field that would change.
4. With `--write`, overwrites only the files that have changes, serialising the updated `window.PB_*` objects back to JS source.

### Conservative merge policy

- Only fields **present in the overrides** are touched.
- Unedited fields are preserved exactly as in the source file.
- User-added steps (ids starting with `u-`) are appended to the relevant course's `steps` array.
- Deleted steps are removed from `steps` arrays.

### Typical desktop workflow

```
1. User edits on phone → taps ⇪ Sync → shares / emails JSON
2. On desktop: save JSON somewhere accessible
3. node scripts/apply-sync.mjs ~/Downloads/supper-sync-…json        # review diff
4. node scripts/apply-sync.mjs ~/Downloads/supper-sync-…json --write # apply
5. git add data/meta.js data/courses.js
6. git commit -m "Apply phone overrides from 2025-07-20"
7. git push
8. On phone: reload the page from home screen → changes appear
```
