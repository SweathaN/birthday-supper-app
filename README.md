# Birthday Supper Club Playbook

A fully offline, zero-dependency static web app for running a multi-course birthday dinner for ~13 guests.  
Open `index.html` in any browser — no server required.

---

## What the app is

A data-driven service playbook split across focused data files (`data/*.js`) and a single renderer (`app.js`).  
It covers:

- **Overview** — metadata (guests, timing), course legend, quick-links
- **Timeline** — sortable/filterable cook schedule with live tick-off
- **Prep Checklist** — per-course prep steps with dependency blocking
- **Course Summary** — format, yield, and summary for each course
- **House Setup** — pre-service venue checklist (table, lighting, music, bar, ambience, guest arrival)
- **13-Cover Quantity Book** — ingredient quantities with confidence labels
- **Order / Buy Plan** — day-by-day procurement list
- **PM Controls** — equipment capacity, hold SOPs, critical path, tasting gates
- **Cutlery + Gear** — count list and per-course serving gear

---

## How to open on phone (iOS Safari — same Wi-Fi as your PC)

1. **On your PC**, double-click `start.bat` (or run `node serve.mjs`).
   You'll see output like:
   ```
   Local:   http://localhost:8080/
   Phone:   http://192.168.1.9:8080/   (same Wi-Fi)
   ```
2. **First time only — allow the firewall:** Windows may pop up "Allow Node.js to communicate on private networks" → click **Allow**.
   If your phone can't connect, open **PowerShell as Administrator** and run:
   ```powershell
   New-NetFirewallRule -DisplayName "Birthday Supper App (Node 8080)" -Direction Inbound -Protocol TCP -LocalPort 8080 -Action Allow -Profile Private
   ```
3. **On your iPhone** (connected to the same Wi-Fi), open Safari and go to the `http://<your-pc-ip>:8080/` URL shown above.
4. Tap **Share** → **Add to Home Screen** → the app opens full-screen, works like a native app.

**Note:** The server must be running on your PC for the phone to reach it. Data (edits) live in your phone's browser storage, so they persist between visits even when the PC is off. Use the **Sync** button to email a snapshot back to yourself so you can merge into the master files with `scripts/apply-sync.mjs`.

### Why not host on the internet?
Your Microsoft-managed GitHub account (EMU) blocks public repos and GitHub Pages, so free public hosting isn't available. This local-server approach keeps everything private and costs nothing.

---

## Edit Mode

Tap **✏ Edit** in the top toolbar to enter edit mode.

- **Course names and summaries** become editable (tap to type, blur to save).
- **Step names and actions** become editable in Course Summary cards and the Recipe popup.
- **Meta fields** (guests, times) become editable in the overview pills.
- **🗑 Delete** buttons appear next to each step — tap to remove a step.
- **+ Add step** buttons appear at the bottom of each course's step list — tap to open an inline form.
- **House Setup** labels and notes become editable.

All edits are saved to `localStorage` key `pb-overrides-v2` as a JSON diff — no data files are modified on the phone.

A **yellow pill** in the toolbar shows "N unsaved edits" when there are pending overrides.

To discard all edits: tap **⋯ → Reset all overrides**.

---

## Sync Flow

### Phone → Desktop

1. On the phone, tap **⇪ Sync**.
   - On iOS, the native share sheet opens with a `.json` file — AirDrop or email it to yourself.
   - On desktop browsers, a dialog offers **Download JSON**, **Copy to clipboard**, or **Email**.
2. On your Mac/PC, apply the snapshot to the source files:

   ```bash
   # Dry run — review the diff
   node scripts/apply-sync.mjs ~/Downloads/supper-sync-2025-07-20-1430.json

   # Apply changes to data/*.js
   node scripts/apply-sync.mjs ~/Downloads/supper-sync-2025-07-20-1430.json --write
   ```

3. Commit and push:

   ```bash
   git add data/meta.js data/courses.js
   git commit -m "Apply phone overrides from 2025-07-20"
   git push
   ```

4. On the phone, pull the latest version (reload the page or re-open from home screen).

### What the snapshot contains

```json
{
  "version": 2,
  "exportedAt": "ISO date",
  "overrides": { ... },
  "syncState": { "step-id": true, ... }
}
```

`overrides` is a compact diff — only edited fields are included, so applying it is safe even on a partially different base.

---

## Data files

| File | Global | Description |
|---|---|---|
| `data/meta.js` | `PB_META` | Event metadata (guests, times) |
| `data/courses.js` | `PB_COURSES` | Course definitions with steps |
| `data/global-steps.js` | `PB_GLOBAL_STEPS` | Cross-course setup steps |
| `data/combined-steps.js` | `PB_COMBINED_STEPS` | Steps that span multiple courses |
| `data/tasks.js` | `PB_CHECKLIST`, `PB_FINAL_CHECKS` | Checklist step IDs |
| `data/timeline.js` | `PB_TIMELINE` | Timeline entries |
| `data/procurement.js` | `PB_PROCUREMENT` | Buy plan rows |
| `data/cutlery.js` | `PB_CUTLERY` | Cutlery counts and per-course gear |
| `data/quantities13.js` | `PB_QUANTITIES_13` | 13-cover quantity book |
| `data/ops-controls.js` | `PB_OPS_CONTROLS` | PM controls tables |
| `data/house-setup.js` | `PB_HOUSE_SETUP` | House setup checklist groups |

---

## Development

No build step. Edit any file and refresh the browser. Everything works offline via `file://` protocol.

```
BirthdaySupperApp/
├── index.html
├── styles.css
├── app.js
├── data/
│   └── *.js
├── assets/
├── scripts/
│   ├── apply-sync.mjs
│   └── README.md
├── .gitignore
└── README.md
```
