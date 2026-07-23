const SYNC_STORAGE_KEY = "bday-runbook-sync-v1";
const STEP_DETAILS_STORAGE_KEY = "bday-step-details-overrides-v1";
const OVERRIDES_KEY = "pb-overrides-v2";
const EDIT_MODE_KEY = "pb-edit-mode";
let syncBound = false;

/* ── Override management ─────────────────────────────────────────── */

function getOverrides() {
  try {
    return JSON.parse(localStorage.getItem(OVERRIDES_KEY) || "{}");
  } catch (_) {
    return {};
  }
}

function saveOverrides(patch) {
  const ov = getOverrides();

  if (patch.meta) {
    ov.meta = Object.assign({}, ov.meta || {}, patch.meta);
  }
  if (patch.houseSetup) {
    ov.houseSetup = Object.assign({}, ov.houseSetup || {}, patch.houseSetup);
  }
  if (patch.deletedStep) {
    ov.deletedSteps = ov.deletedSteps || [];
    if (!ov.deletedSteps.includes(patch.deletedStep)) {
      ov.deletedSteps.push(patch.deletedStep);
    }
  }
  if (patch.courses) {
    ov.courses = ov.courses || {};
    Object.entries(patch.courses).forEach(([cid, cPatch]) => {
      ov.courses[cid] = ov.courses[cid] || {};
      const existing = ov.courses[cid];
      if (cPatch.name !== undefined) existing.name = cPatch.name;
      if (cPatch.summary !== undefined) existing.summary = cPatch.summary;
      if (cPatch.components !== undefined) existing.components = cPatch.components;
      if (cPatch.steps) {
        existing.steps = existing.steps || {};
        Object.entries(cPatch.steps).forEach(([sid, sPatch]) => {
          existing.steps[sid] = Object.assign({}, existing.steps[sid] || {}, sPatch);
        });
      }
      if (cPatch.addedStep) {
        existing.addedSteps = existing.addedSteps || [];
        existing.addedSteps.push(cPatch.addedStep);
      }
    });
  }

  ov.updatedAt = new Date().toISOString();
  localStorage.setItem(OVERRIDES_KEY, JSON.stringify(ov));
  updateDirtyPill();
}

function withOverrides(courses) {
  const ov = getOverrides();
  const courseOverrides = ov.courses || {};
  const deletedSteps = ov.deletedSteps || [];

  return (courses || []).map(course => {
    const co = courseOverrides[course.id] || {};
    const stepOverrides = co.steps || {};
    const addedSteps = (co.addedSteps || []).filter(s => !deletedSteps.includes(s.id));

    const mergedSteps = (course.steps || [])
      .filter(s => !deletedSteps.includes(s.id))
      .map(s => Object.assign({}, s, stepOverrides[s.id] || {}));

    return Object.assign({}, course, {
      name: co.name !== undefined ? co.name : course.name,
      summary: co.summary !== undefined ? co.summary : course.summary,
      components: co.components !== undefined ? co.components : course.components,
      steps: [...mergedSteps, ...addedSteps]
    });
  });
}

function getMergedCourses() {
  return withOverrides(window.PB_COURSES || []);
}

function getMergedMeta() {
  return Object.assign({}, window.PB_META || {}, getOverrides().meta || {});
}

function getMergedHouseSetup() {
  const base = window.PB_HOUSE_SETUP || [];
  const hsOv = (getOverrides().houseSetup || {});
  return base.map(group => {
    const items = hsOv[group.id] !== undefined ? hsOv[group.id] : group.items;
    return Object.assign({}, group, { items });
  });
}

/* ── Edit mode helpers ───────────────────────────────────────────── */

function isEditMode() {
  return localStorage.getItem(EDIT_MODE_KEY) === "1";
}

function editAttr(path) {
  return isEditMode() ? ` contenteditable="true" data-edit-path="${path}"` : "";
}

function deleteStep(courseId, stepId) {
  if (!confirm("Remove this step?")) return;
  saveOverrides({ deletedStep: stepId });
  rerenderAllContent();
}

function openAddStepForm(courseId, container) {
  // Remove any existing form in this container
  const existing = container.querySelector(".add-step-form");
  if (existing) { existing.remove(); return; }

  const form = el("div", "add-step-form");
  form.innerHTML = `
    <label>Step name</label>
    <input type="text" class="asf-name" placeholder="e.g. Taste and adjust seasoning">
    <label>When</label>
    <input type="text" class="asf-when" placeholder="e.g. Sat 6:45 PM">
    <label>Station</label>
    <input type="text" class="asf-station" placeholder="e.g. Stove">
    <label>Phase</label>
    <input type="text" class="asf-phase" placeholder="e.g. Send">
    <label>Actions (one per line)</label>
    <textarea class="asf-actions" rows="3" placeholder="Step 1&#10;Step 2"></textarea>
    <div class="add-step-form-btns">
      <button type="button" class="popup-btn asf-save">Add Step</button>
      <button type="button" class="popup-btn asf-cancel">Cancel</button>
    </div>
  `;

  form.querySelector(".asf-save").addEventListener("click", () => {
    const name = form.querySelector(".asf-name").value.trim();
    if (!name) { alert("Step name is required."); return; }
    const when = form.querySelector(".asf-when").value.trim() || "";
    const station = form.querySelector(".asf-station").value.trim() || "";
    const phase = form.querySelector(".asf-phase").value.trim() || "Prep";
    const actionsRaw = form.querySelector(".asf-actions").value;
    const actions = actionsRaw.split("\n").map(s => s.trim()).filter(Boolean);
    const newStep = {
      id: `u-${courseId}-${Date.now()}`,
      name, when, station, phase, actions,
      ingredients: [], durationMin: 0, critical: false, dependsOn: [], fail: "", fix: ""
    };
    saveOverrides({ courses: { [courseId]: { addedStep: newStep } } });
    form.remove();
    rerenderAllContent();
  });

  form.querySelector(".asf-cancel").addEventListener("click", () => form.remove());
  container.appendChild(form);
}

/* ── Dirty pill ─────────────────────────────────────────────────── */

function countOverrideEdits() {
  const ov = getOverrides();
  let n = 0;
  const co = ov.courses || {};
  Object.values(co).forEach(c => {
    const so = c.steps || {};
    n += Object.keys(so).length;
    n += (c.addedSteps || []).length;
    if (c.name !== undefined) n++;
    if (c.summary !== undefined) n++;
  });
  n += Object.keys(ov.meta || {}).length;
  n += (ov.deletedSteps || []).length;
  return n;
}

function updateDirtyPill() {
  const pill = byId("dirty-pill");
  if (!pill) return;
  const n = countOverrideEdits();
  if (n > 0) {
    pill.textContent = `${n} unsaved edit${n === 1 ? "" : "s"}`;
    pill.style.display = "";
  } else {
    pill.style.display = "none";
  }
}

/* ── Toolbar init ────────────────────────────────────────────────── */

function initToolbar() {
  updateDirtyPill();

  const editBtn = byId("toolbar-edit");
  const syncBtn = byId("toolbar-sync");
  const moreBtn = byId("toolbar-more");
  const menu = byId("toolbar-menu");
  const resetBtn = byId("reset-overrides-btn");

  function applyEditMode() {
    if (isEditMode()) {
      document.body.classList.add("edit-mode");
      if (editBtn) { editBtn.textContent = "\u2713 Editing"; editBtn.classList.add("active"); }
    } else {
      document.body.classList.remove("edit-mode");
      if (editBtn) { editBtn.textContent = "\u270E Edit"; editBtn.classList.remove("active"); }
    }
  }

  applyEditMode();

  if (editBtn) {
    editBtn.addEventListener("click", () => {
      const next = isEditMode() ? "0" : "1";
      localStorage.setItem(EDIT_MODE_KEY, next);
      applyEditMode();
      rerenderAllContent();
    });
  }

  if (syncBtn) {
    syncBtn.addEventListener("click", handleSync);
  }

  if (moreBtn && menu) {
    moreBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.style.display = menu.style.display === "none" ? "" : "none";
    });
    document.addEventListener("click", () => { menu.style.display = "none"; });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (!confirm("Reset ALL overrides? This cannot be undone.")) return;
      localStorage.removeItem(OVERRIDES_KEY);
      updateDirtyPill();
      rerenderAllContent();
    });
  }

  // Close sync dialog
  const closeSyncBtn = byId("close-sync");
  if (closeSyncBtn) {
    const dlg = byId("sync-dialog");
    closeSyncBtn.addEventListener("click", () => dlg && dlg.close());
  }

  // Blur handler for contenteditable fields (capture phase)
  document.addEventListener("blur", (e) => {
    if (!isEditMode()) return;
    const target = e.target;
    if (!target || !target.getAttribute) return;
    const path = target.getAttribute("data-edit-path");
    if (!path) return;
    handleEditBlur(target, path);
  }, true);
}

function handleEditBlur(target, path) {
  const value = target.textContent.trim();
  const parts = path.split(".");

  if (parts[0] === "meta") {
    const key = parts[1];
    const num = parseFloat(value);
    saveOverrides({ meta: { [key]: isNaN(num) ? value : num } });

  } else if (parts[0] === "courses") {
    const cid = parts[1];
    const field2 = parts[2];
    if (field2 === "name" || field2 === "summary") {
      saveOverrides({ courses: { [cid]: { [field2]: value } } });
    } else if (field2 === "steps") {
      const sid = parts[3];
      const field = parts[4];
      if (field === "actions") {
        const idx = parseInt(parts[5]);
        const step = getStepById(sid) || {};
        const actions = (step.actions || []).slice();
        actions[idx] = value;
        saveOverrides({ courses: { [cid]: { steps: { [sid]: { actions } } } } });
      } else if (field === "durationMin") {
        saveOverrides({ courses: { [cid]: { steps: { [sid]: { durationMin: parseInt(value) || 0 } } } } });
      } else if (["name","when","station","phase","fail","fix"].includes(field)) {
        saveOverrides({ courses: { [cid]: { steps: { [sid]: { [field]: value } } } } });
      }
    }

  } else if (parts[0] === "houseSetup") {
    const groupId = parts[1];
    const idx = parseInt(parts[2]);
    const field = parts[3];
    const groups = getMergedHouseSetup();
    const group = groups.find(g => g.id === groupId);
    if (group) {
      const items = group.items.map((it, i) =>
        i === idx ? Object.assign({}, it, { [field]: value }) : it
      );
      saveOverrides({ houseSetup: { [groupId]: items } });
    }
  }
}

/* ── Sync ────────────────────────────────────────────────────────── */

function buildSyncSnapshot() {
  const now = new Date();
  const pad = n => String(n).padStart(2, "0");
  const ts = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`;
  return {
    version: 2,
    exportedAt: now.toISOString(),
    overrides: getOverrides(),
    syncState: getSyncState(),
    _filename: `supper-sync-${ts}.json`
  };
}

function handleSync() {
  const snap = buildSyncSnapshot();
  const json = JSON.stringify(snap, null, 2);
  const filename = snap._filename;

  const doShare = async () => {
    const file = new File([json], filename, { type: "application/json" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: "Supper sync", text: "Sync from phone" });
        return true;
      } catch (err) {
        if (err.name !== "AbortError") console.warn("Share failed:", err);
      }
    }
    return false;
  };

  doShare().then(shared => {
    if (!shared) openSyncFallbackDialog(json, filename);
  });
}

function openSyncFallbackDialog(json, filename) {
  const dialog = byId("sync-dialog");
  const body = byId("sync-dialog-body");
  if (!dialog || !body) return;

  body.innerHTML = "";

  const note = el("p", "", "Share not available on this browser. Use one of the options below:");
  body.appendChild(note);

  // Download button
  const dlBtn = el("button", "popup-btn", "\u2193 Download JSON");
  dlBtn.addEventListener("click", () => {
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 1000);
  });
  body.appendChild(dlBtn);

  // Copy button
  const copyBtn = el("button", "popup-btn", "\u29C0 Copy to clipboard");
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(json).then(() => {
      copyBtn.textContent = "\u2713 Copied!";
      setTimeout(() => { copyBtn.textContent = "\u29C0 Copy to clipboard"; }, 2000);
    }).catch(() => alert("Clipboard not available. Use Download instead."));
  });
  body.appendChild(copyBtn);

  // Email button
  const truncated = encodeURIComponent(json.slice(0, 1500));
  const mailBtn = el("button", "popup-btn", "\u2709 Email (body truncated)");
  mailBtn.addEventListener("click", () => {
    window.location.href = `mailto:?subject=Supper%20Sync&body=${truncated}%0A%0A(Attach%20the%20downloaded%20JSON%20for%20full%20data)`;
  });
  body.appendChild(mailBtn);

  const hint = el("p", "", "Tip: Download the file and attach it to an email for the full snapshot.");
  body.appendChild(hint);

  if (typeof dialog.showModal === "function") dialog.showModal();
}


function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function byId(id) { return document.getElementById(id); }

function buildCourseMap(courses) {
  const map = {};
  courses.forEach(c => { map[c.id] = c; });
  return map;
}

function cssVarForCourse(courseId) {
  return courseId === "drink" ? "--drink" : `--${courseId}`;
}

function getSyncState() {
  return JSON.parse(localStorage.getItem(SYNC_STORAGE_KEY) || "{}");
}

function setSyncState(state) {
  localStorage.setItem(SYNC_STORAGE_KEY, JSON.stringify(state));
}

function applySync(taskId, checked, state) {
  document.querySelectorAll(`input[type="checkbox"][data-sync="${taskId}"]`).forEach(cb => {
    cb.checked = checked;
  });
  state[taskId] = checked;
}

function buildAllSteps() {
  const courses = getMergedCourses();
  const courseSteps = courses.flatMap(c =>
    (c.steps || []).map(s => ({ ...s, courseId: c.id, courseLabel: c.label }))
  );
  const globalSteps = (window.PB_GLOBAL_STEPS || []);
  return [...globalSteps, ...courseSteps];
}

function buildRunbookRows(state) {
  const steps = buildAllSteps();
  return steps.map(step => {
    const deps = step.dependsOn || [];
    const missingDeps = deps.filter(depId => !state[depId]);
    const blocked = !state[step.id] && missingDeps.length > 0;
    return { ...step, done: !!state[step.id], blocked, missingDeps };
  });
}

function renderMeta() {
  const meta = byId("meta");
  const m = getMergedMeta();
  const editMode = isEditMode();
  const entries = [
    ["guests", `<strong>Guests:</strong> <span${editAttr("meta.guests")}>${m.guests}</span>`],
    ["serviceStart", `<strong>Service Start:</strong> <span${editAttr("meta.serviceStart")}>${m.serviceStart}</span>`],
    ["arrival", `<strong>Arrival:</strong> <span${editAttr("meta.arrival")}>${m.arrival}</span>`],
    ["saturdayStart", `<strong>Saturday Start:</strong> <span${editAttr("meta.saturdayStart")}>${m.saturdayStart}</span>`],
    ["kozhukattai", `<strong>Kozhukattai:</strong> <span${editAttr("meta.kozhukattai")}>${m.kozhukattai}</span>`]
  ];
  meta.innerHTML = "";
  entries.forEach(([, t]) => meta.appendChild(el("div", "pill", t)));
}

function renderLegend(courseMap) {
  const legend = byId("legend");
  const grid = el("div", "legend-grid");
  getMergedCourses().forEach(c => {
    const row = el("div");
    row.innerHTML = `<span class="dot" style="background:var(${cssVarForCourse(c.id)})"></span><button type="button" class="recipe-link-btn" data-recipe-id="${c.id}"><span${editAttr(`courses.${c.id}.name`)}>${c.label} - ${c.name}</span></button>`;
    grid.appendChild(row);
  });
  legend.innerHTML = "";
  legend.appendChild(grid);

  const links = byId("quick-links");
  links.innerHTML = "";
  [
    ["#timeline-page", "Timeline"],
    ["#checklist-page", "Checklist"],
    ["#recipes-page", "Course Summary"],
    ["#house-setup-page", "House Setup"],
    ["#quantities-page", "13-Cover Quantity Book"],
    ["#ops-controls-page", "PM Controls"],
    ["#procurement-page", "Order/Buy Plan"],
    ["#cutlery-page", "Cutlery + Gear"]
  ].forEach(([href, text]) => {
    const a = el("a", "", text);
    a.href = href;
    links.appendChild(a);
  });
}

function renderMasterIngredientsTop() {
  const wrap = byId("master-ingredients-top");
  wrap.innerHTML = "";

  getMergedCourses().forEach(course => {
    const sec = el("section", `ing-course ${course.className}`);
    const heading = el("h3", course.textClass, `${course.label} - ${course.name}`);
    const ul = el("ul");

    course.components.forEach(component => {
      component.ingredients.forEach(ingredient => {
        const li = el("li", course.textClass, `${component.name}: ${ingredient}`);
        ul.appendChild(li);
      });
    });

    sec.appendChild(heading);
    sec.appendChild(ul);
    wrap.appendChild(sec);
  });
}

function bindIngredientsDialog() {
  const openBtn = byId("open-ingredients");
  const closeBtn = byId("close-ingredients");
  const dialog = byId("ingredients-dialog");

  if (!openBtn || !closeBtn || !dialog) return;

  openBtn.addEventListener("click", () => {
    if (typeof dialog.showModal === "function") dialog.showModal();
  });

  closeBtn.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const clickedOutside =
      event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom;
    if (clickedOutside) dialog.close();
  });
}

function parseWhenToSortKey(whenText) {
  const text = String(whenText || "").toLowerCase().replace(/~/g, "").trim();
  let day = 9;
  if (text.includes("wed")) day = 1;
  else if (text.includes("thu")) day = 2;
  else if (text.includes("fri")) day = 3;
  else if (text.includes("sat")) day = 4;

  let minutes = 12 * 60;
  if (text.includes("night")) minutes = 21 * 60;

  const m = text.match(/(\d{1,2}):(\d{2})\s*(am|pm)/);
  if (m) {
    let hh = Number(m[1]);
    const mm = Number(m[2]);
    const meridiem = m[3];
    if (meridiem === "pm" && hh !== 12) hh += 12;
    if (meridiem === "am" && hh === 12) hh = 0;
    minutes = (hh * 60) + mm;
  }

  return (day * 1440) + minutes;
}

function getTimelineRowsForView(courseMap) {
  const state = getSyncState();
  const allSteps = buildAllSteps();
  const combined = window.PB_COMBINED_STEPS || [];
  const stepMap = {};
  [...allSteps, ...combined].forEach(s => { stepMap[s.id] = s; });

  const filterEl = byId("timeline-course-filter");
  const sortEl = byId("timeline-sort");
  const courseFilter = filterEl ? filterEl.value : "all";
  const sortMode = sortEl ? sortEl.value : "schedule-asc";

  let rows = (window.PB_TIMELINE || []).map((entry, index) => {
    const step = stepMap[entry.stepId];
    if (!step) return null;
    const deps = step.dependsOn || [];
    const missingDeps = deps.filter(d => !state[d]);
    const blocked = !state[step.id] && missingDeps.length > 0;
    const course = courseMap[entry.courseId];
    const courseClass = course ? course.textClass : "";
    const isCombined = combined.some(c => c.id === step.id);
    return { ...step, done: !!state[step.id], blocked, missingDeps, courseClass, originalIndex: index, isCombined };
  }).filter(Boolean);

  if (courseFilter !== "all") {
    rows = rows.filter(r => r.courseId === courseFilter);
  }

  rows.sort((a, b) => {
    const keyA = parseWhenToSortKey(a.when);
    const keyB = parseWhenToSortKey(b.when);
    if (keyA !== keyB) return sortMode === "schedule-desc" ? keyB - keyA : keyA - keyB;
    return a.originalIndex - b.originalIndex;
  });

  return rows;
}

function initTimelineControls(courseMap) {
  const filterEl = byId("timeline-course-filter");
  const sortEl = byId("timeline-sort");
  if (!filterEl || !sortEl) return;

  filterEl.innerHTML = "";
  const allOpt = document.createElement("option");
  allOpt.value = "all";
  allOpt.textContent = "All Courses";
  filterEl.appendChild(allOpt);

  const globalOpt = document.createElement("option");
  globalOpt.value = "none";
  globalOpt.textContent = "Global";
  filterEl.appendChild(globalOpt);

  const combinedOpt = document.createElement("option");
  combinedOpt.value = "combined";
  combinedOpt.textContent = "Combined";
  filterEl.appendChild(combinedOpt);

  getMergedCourses().forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = `${c.label} - ${c.name}`;
    filterEl.appendChild(opt);
  });
  sortEl.value = "schedule-asc";

  filterEl.addEventListener("change", () => renderTimeline(courseMap));
  sortEl.addEventListener("change", () => renderTimeline(courseMap));
}

function renderTimeline(courseMap) {
  const table = byId("timeline-table");
  const rows = getTimelineRowsForView(courseMap);

  table.innerHTML = `<thead><tr><th class="chk-col">Tick</th><th>When</th><th>Course</th><th>Phase</th><th>Step</th><th>Station</th></tr></thead><tbody></tbody>`;
  const tbody = table.querySelector("tbody");

  rows.forEach(r => {
    const trClass = `${r.courseClass} ${r.blocked ? "chef-blocked" : ""}`.trim();
    const tr = el("tr", trClass);
    const combinedBadge = r.isCombined ? `<span class="status-chip status-warn">COMBINED</span> ` : "";
    const delBtn = (isEditMode() && r.courseId && r.courseId !== "none")
      ? `<button type="button" class="delete-step-btn" data-del-step="${r.id}" data-del-course="${r.courseId}" title="Delete step">\uD83D\uDDD1</button>`
      : "";
    tr.innerHTML = `
      <td class="chk-col"><input type="checkbox" data-sync="${r.id}" ${r.done ? "checked" : ""}></td>
      <td>${r.when}</td>
      <td>${r.courseLabel}</td>
      <td>${r.phase}</td>
      <td>${combinedBadge}<button type="button" class="prep-link-btn" data-step-id="${r.id}">${r.name}</button>${delBtn}</td>
      <td>${r.station}</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderChecklist(courseMap) {
  const grid = byId("checklist-grid");
  const go = byId("go-no-go");
  const state = getSyncState();
  const allSteps = buildAllSteps();
  const stepMap = {};
  allSteps.forEach(s => { stepMap[s.id] = s; });
  const editMode = isEditMode();

  grid.innerHTML = "";
  getMergedCourses().forEach(c => {
    const checkIds = (window.PB_CHECKLIST || {})[c.id] || [];
    // Include user-added steps in checklist too
    const addedIds = (c.steps || []).filter(s => s.id.startsWith("u-")).map(s => s.id);
    const allIds = [...checkIds, ...addedIds].filter(sid => {
      const s = stepMap[sid] || c.steps.find(x => x.id === sid);
      return !!s;
    });

    const items = allIds.map(sid => {
      const s = stepMap[sid] || (c.steps || []).find(x => x.id === sid);
      if (!s) return "";
      const done = !!state[sid];
      const deps = s.dependsOn || [];
      const missing = deps.filter(d => !state[d]);
      const blocked = !done && missing.length > 0;
      const blockedNote = blocked ? ` <em>(blocked by ${missing.join(", ")})</em>` : "";
      const delBtn = editMode ? `<button type="button" class="delete-step-btn" data-del-step="${sid}" data-del-course="${c.id}" title="Delete step">\uD83D\uDDD1</button>` : "";
      const stepName = editMode
        ? `<span${editAttr(`courses.${c.id}.steps.${sid}.name`)}>${s.name}</span>`
        : s.name;
      return `<li>${delBtn}<input type="checkbox" data-sync="${sid}" ${done ? "checked" : ""}><span><strong>${s.phase}:</strong> <button type="button" class="prep-link-btn" data-step-id="${sid}">${stepName}</button>${blockedNote}</span></li>`;
    }).join("");

    const addBtn = editMode ? `<li><button type="button" class="add-step-btn" data-add-course="${c.id}">+ Add step</button></li>` : "";

    const card = el("section", `course-card check ${c.className}`);
    card.innerHTML = `
      <div class="course-head"><button type="button" class="recipe-link-btn" data-recipe-id="${c.id}">${c.label} - ${c.name}</button></div>
      <ul class="check-list ${c.textClass}">${items}${addBtn}</ul>
    `;
    grid.appendChild(card);
  });

  const globalIds = window.PB_FINAL_CHECKS || [];
  const globalSteps = window.PB_GLOBAL_STEPS || [];
  const globalMap = {};
  globalSteps.forEach(s => { globalMap[s.id] = s; });
  go.innerHTML = `
    <h3>Global Gates</h3>
    <ul class="check-list">
      ${globalIds.map(sid => {
        const s = globalMap[sid];
        if (!s) return "";
        return `<li><input type="checkbox" data-sync="${sid}" ${state[sid] ? "checked" : ""}><span><strong>${s.phase}:</strong> <button type="button" class="prep-link-btn" data-step-id="${sid}">${s.name}</button></span></li>`;
      }).join("")}
    </ul>
  `;
}

function renderCourseSummary() {
  const grid = byId("summary-grid");
  grid.innerHTML = "";
  const editMode = isEditMode();
  getMergedCourses().forEach(c => {
    const nameEl = editMode
      ? `<span${editAttr(`courses.${c.id}.name`)}>${c.name}</span>`
      : c.name;
    const summaryEl = editMode
      ? `<span${editAttr(`courses.${c.id}.summary`)}>${c.summary}</span>`
      : c.summary;
    const card = el("section", `course-card ${c.className}`);
    card.innerHTML = `
      <div class="course-head"><button type="button" class="recipe-link-btn" data-recipe-id="${c.id}">${c.label} - ${nameEl}</button></div>
      <div class="course-body ${c.textClass}">
        <p><strong>Format:</strong> ${c.format}</p>
        <p><strong>Yield:</strong> ${c.yield}</p>
        <p><strong>Summary:</strong> ${summaryEl}</p>
      </div>
    `;
    grid.appendChild(card);
  });
}

function buildRecipePopupHtml(course) {
  const editMode = isEditMode();
  const cid = course.id;

  const ingredientsByComponent = course.components.map(component => {
    const items = component.ingredients.map(ingredient => `<li>${ingredient}</li>`).join("");
    return `<h4>${component.name}</h4><ul>${items}</ul>`;
  }).join("");

  const stepsSections = (course.steps || []).map(step => {
    const sid = step.id;
    const ingList = (step.ingredients || []).length
      ? `<ul>${step.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>`
      : "";
    const actionList = (step.actions || []).length
      ? `<ol>${step.actions.map((a, ai) => {
          const ea = editMode ? `${editAttr(`courses.${cid}.steps.${sid}.actions.${ai}`)}` : "";
          return `<li><span${ea}>${a}</span></li>`;
        }).join("")}</ol>`
      : "";
    const nameSpan = editMode
      ? `<span${editAttr(`courses.${cid}.steps.${sid}.name`)}>${step.name}</span>`
      : step.name;
    const delBtn = editMode
      ? `<button type="button" class="delete-step-btn" data-del-step="${sid}" data-del-course="${cid}" title="Delete step">\uD83D\uDDD1</button>`
      : "";
    return `
      <div class="recipe-step">
        <h4>${delBtn}${nameSpan} <span class="recipe-step-meta">(${step.phase} \u00b7 ${step.when} \u00b7 ${step.station})</span></h4>
        ${ingList}
        ${actionList}
      </div>
    `;
  }).join("");

  const addBtn = editMode
    ? `<div id="recipe-add-step-wrap-${cid}"><button type="button" class="add-step-btn" data-add-course="${cid}">+ Add step</button></div>`
    : "";

  return `
    <p class="recipe-meta"><strong>Format:</strong> ${course.format} | <strong>Yield:</strong> ${course.yield}</p>
    <p class="recipe-meta"><strong>Prep Window:</strong> ${course.prepWindow}</p>
    <section class="recipe-section ${course.textClass}">
      <h3>All Ingredients</h3>
      ${ingredientsByComponent}
    </section>
    <section class="recipe-section ${course.textClass}">
      <h3>Steps</h3>
      ${stepsSections}
      ${addBtn}
    </section>
  `;
}

function bindRecipeDialog(courseMap) {
  const dialog = byId("recipe-dialog");
  const closeBtn = byId("close-recipe");
  const title = byId("recipe-title");
  const content = byId("recipe-content");

  if (!dialog || !closeBtn || !title || !content) return;

  document.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-recipe-id]");
    if (!btn) return;

    const recipeId = btn.getAttribute("data-recipe-id");
    const mergedMap = buildCourseMap(getMergedCourses());
    const course = mergedMap[recipeId];
    if (!course) return;

    title.textContent = `${course.label} - ${course.name}`;
    content.innerHTML = buildRecipePopupHtml(course);
    if (typeof dialog.showModal === "function") dialog.showModal();
  });

  closeBtn.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const clickedOutside =
      event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom;
    if (clickedOutside) dialog.close();
  });
}

function renderProcurement(courseMap) {
  const table = byId("procurement-table");
  table.innerHTML = `<thead><tr><th>Day</th><th>Course</th><th>Order / Buy Item</th></tr></thead><tbody></tbody>`;
  const tbody = table.querySelector("tbody");

  window.PB_PROCUREMENT.forEach(row => {
    const course = courseMap[row.courseId];
    const tr = el("tr", course ? course.textClass : "");
    tr.innerHTML = `<td>${row.day}</td><td>${course ? course.label : row.courseId}</td><td>${row.item}</td>`;
    tbody.appendChild(tr);
  });
}

function renderCutlery() {
  const table1 = byId("cutlery-table");
  table1.innerHTML = `<thead><tr><th>Item</th><th>Required Count</th></tr></thead><tbody></tbody>`;
  const tb1 = table1.querySelector("tbody");
  window.PB_CUTLERY.counts.forEach(([item, count]) => {
    const tr = el("tr");
    tr.innerHTML = `<td>${item}</td><td>${count}</td>`;
    tb1.appendChild(tr);
  });

  const table2 = byId("serve-by-course-table");
  table2.innerHTML = `<thead><tr><th>Course</th><th>Guest Eatware</th><th>Serving Gear</th></tr></thead><tbody></tbody>`;
  const tb2 = table2.querySelector("tbody");
  window.PB_CUTLERY.byCourse.forEach(([course, eat, gear]) => {
    const tr = el("tr");
    tr.innerHTML = `<td>${course}</td><td>${eat}</td><td>${gear}</td>`;
    tb2.appendChild(tr);
  });
}

function normalizeIngredientName(name) {
  return String(name || "").trim().toLowerCase();
}

function renderQuantities() {
  const meta = byId("quantity-meta");
  const courseTables = byId("quantity-course-tables");
  const rollupTable = byId("quantity-rollup-table");
  const qty = window.PB_QUANTITIES_13;

  if (!meta || !courseTables || !rollupTable || !qty) return;

  meta.innerHTML = `
    <h3>Quantity Policy</h3>
    <p><strong>Covers:</strong> ${qty.covers}</p>
    <p><strong>Buffer:</strong> ${qty.bufferPolicy}</p>
    <p class="qty-note">Confidence labels: exact, derived, range. Derived and range lines should be validated in one dry run.</p>
  `;

  courseTables.innerHTML = "";
  const rollup = {};

  qty.courses.forEach(course => {
    const table = el("table", "qty-course");
    table.innerHTML = `
      <caption style="caption-side:top;text-align:left;padding:8px 2px;font-weight:700;">${course.courseLabel} - ${course.confidenceNote}</caption>
      <thead><tr><th>Ingredient</th><th>Min</th><th>Max</th><th>Unit</th><th>Confidence</th></tr></thead>
      <tbody></tbody>
    `;

    const tbody = table.querySelector("tbody");
    course.items.forEach(item => {
      const tr = el("tr");
      tr.innerHTML = `<td>${item.ingredient}</td><td>${item.min}</td><td>${item.max}</td><td>${item.unit}</td><td>${item.confidence}</td>`;
      tbody.appendChild(tr);

      const key = `${normalizeIngredientName(item.ingredient)}__${item.unit}`;
      if (!rollup[key]) {
        rollup[key] = { ingredient: item.ingredient, unit: item.unit, min: 0, max: 0, confidenceSet: new Set() };
      }
      rollup[key].min += Number(item.min || 0);
      rollup[key].max += Number(item.max || 0);
      rollup[key].confidenceSet.add(item.confidence || "range");
    });

    courseTables.appendChild(table);
  });

  rollupTable.innerHTML = `<thead><tr><th>Consolidated Ingredient</th><th>Total Min</th><th>Total Max</th><th>Unit</th><th>Confidence Mix</th></tr></thead><tbody></tbody>`;
  const rb = rollupTable.querySelector("tbody");
  Object.values(rollup)
    .sort((a, b) => a.ingredient.localeCompare(b.ingredient))
    .forEach(item => {
      const confidenceMix = Array.from(item.confidenceSet).join(", ");
      const tr = el("tr");
      tr.innerHTML = `<td>${item.ingredient}</td><td>${item.min.toFixed(2).replace(/\.00$/, "")}</td><td>${item.max.toFixed(2).replace(/\.00$/, "")}</td><td>${item.unit}</td><td>${confidenceMix}</td>`;
      rb.appendChild(tr);
    });
}

function getStepById(stepId) {
  const combined = (window.PB_COMBINED_STEPS || []).find(s => s.id === stepId);
  if (combined) return combined;
  return buildAllSteps().find(s => s.id === stepId);
}

function getStepDetailOverrides() {
  return JSON.parse(localStorage.getItem(STEP_DETAILS_STORAGE_KEY) || "{}");
}

function setStepDetailOverrides(overrides) {
  localStorage.setItem(STEP_DETAILS_STORAGE_KEY, JSON.stringify(overrides));
}

function getMergedStepDetails(stepId) {
  const step = getStepById(stepId) || {};
  const overrides = getStepDetailOverrides();
  const patch = overrides[stepId] || {};
  return {
    purpose: patch.purpose || step.fail || "",
    ingredients: Array.isArray(patch.ingredients) ? patch.ingredients : (step.ingredients || []),
    actions: Array.isArray(patch.actions) ? patch.actions : (step.actions || [])
  };
}

function buildStepPopupHtml(step, courseMap) {
  const details = getMergedStepDetails(step.id);
  return `
    <p class="recipe-meta"><strong>Course:</strong> ${step.courseLabel} | <strong>Phase:</strong> ${step.phase} | <strong>When:</strong> ${step.when} | <strong>Station:</strong> ${step.station}</p>
    <input type="hidden" id="step-edit-id" value="${step.id}">
    <h3>Purpose / Risk</h3>
    <textarea id="step-purpose" rows="2">${details.purpose}</textarea>
    <h3>Ingredients For This Step (one per line)</h3>
    <textarea id="step-ingredients" rows="8">${details.ingredients.join("\n")}</textarea>
    <h3>What To Do (one step per line)</h3>
    <textarea id="step-actions" rows="8">${details.actions.join("\n")}</textarea>
    <h3>Risk + Recovery</h3>
    <textarea id="step-risk" rows="2">${step.fail || ""}</textarea>
    <textarea id="step-recovery" rows="2">${step.fix || ""}</textarea>
    <div class="step-actions-row">
      <button type="button" class="popup-btn" id="save-step-details">Save Step Notes</button>
      <button type="button" class="popup-btn" id="reset-step-details">Reset To Base</button>
    </div>
  `;
}

function bindStepDialog(courseMap) {
  const dialog = byId("step-dialog");
  const closeBtn = byId("close-step");
  const title = byId("step-title");
  const content = byId("step-content");
  if (!dialog || !closeBtn || !title || !content) return;

  const readLines = (text) => String(text || "").split("\n").map(s => s.trim()).filter(Boolean);

  document.addEventListener("click", (event) => {
    const saveBtn = event.target.closest("#save-step-details");
    if (saveBtn) {
      const idEl = byId("step-edit-id");
      const stepId = idEl ? idEl.value : "";
      if (!stepId) return;

      const purpose = (byId("step-purpose") || {}).value || "";
      const ingredients = readLines((byId("step-ingredients") || {}).value || "");
      const actions = readLines((byId("step-actions") || {}).value || "");
      const risk = (byId("step-risk") || {}).value || "";
      const recovery = (byId("step-recovery") || {}).value || "";

      const overrides = getStepDetailOverrides();
      overrides[stepId] = { purpose, ingredients, actions };
      setStepDetailOverrides(overrides);

      const step = getStepById(stepId);
      if (step) {
        step.fail = risk.trim() || step.fail;
        step.fix = recovery.trim() || step.fix;
      }
      return;
    }

    const resetBtn = event.target.closest("#reset-step-details");
    if (resetBtn) {
      const idEl = byId("step-edit-id");
      const stepId = idEl ? idEl.value : "";
      if (!stepId) return;

      const overrides = getStepDetailOverrides();
      delete overrides[stepId];
      setStepDetailOverrides(overrides);

      const step = getStepById(stepId);
      if (step) {
        content.innerHTML = buildStepPopupHtml(step, courseMap);
      }
      return;
    }

    const btn = event.target.closest("[data-step-id]");
    if (!btn) return;
    const step = getStepById(btn.getAttribute("data-step-id"));
    if (!step) return;

    title.textContent = `${step.courseLabel} - ${step.phase}`;
    content.innerHTML = buildStepPopupHtml(step, courseMap);
    if (typeof dialog.showModal === "function") dialog.showModal();
  });

  closeBtn.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const clickedOutside =
      event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom;
    if (clickedOutside) dialog.close();
  });
}

function renderOpsControls() {
  const cfg = window.PB_OPS_CONTROLS;
  if (!cfg) return;

  const cap = byId("capacity-table");
  const hold = byId("hold-sop-table");
  const path = byId("critical-path-table");
  const taste = byId("tasting-gates-table");
  const thru = byId("throughput-table");
  const reset = byId("reset-table");
  const gates = byId("gates-table");
  const cont = byId("contingency-table");
  const lock = byId("quantity-lock-card");

  if (!cap || !hold || !path || !taste || !thru || !reset || !gates || !cont || !lock) return;

  cap.innerHTML = `<thead><tr><th>Time Window</th><th>Burners Need/Have</th><th>Oven Need/Have</th><th>Steam Need/Have</th><th>Risk</th></tr></thead><tbody>${cfg.equipmentCapacity.map(r => `<tr><td>${r.window}</td><td>${r.burnersNeed}/${r.burnersHave}</td><td>${r.ovensNeed}/${r.ovensHave}</td><td>${r.steamersNeed}/${r.steamersHave}</td><td>${r.risk}</td></tr>`).join("")}</tbody>`;
  hold.innerHTML = `<thead><tr><th>Course</th><th>Component</th><th>Hold Rule</th><th>Max Hold (Min)</th><th>Reheat Rule</th></tr></thead><tbody>${cfg.holdSop.map(r => `<tr><td>${r.course}</td><td>${r.component}</td><td>${r.hold}</td><td>${r.maxHoldMin}</td><td>${r.reheatRule}</td></tr>`).join("")}</tbody>`;
  path.innerHTML = `<thead><tr><th>When</th><th>Lane</th><th>Critical Action</th></tr></thead><tbody>${cfg.criticalPath.map(r => `<tr><td>${r.when}</td><td>${r.lane}</td><td>${r.action}</td></tr>`).join("")}</tbody>`;
  taste.innerHTML = `<thead><tr><th>Tasting Gate</th><th>Check</th></tr></thead><tbody>${cfg.tastingGates.map(r => `<tr><td>${r.gate}</td><td>${r.check}</td></tr>`).join("")}</tbody>`;
  thru.innerHTML = `<thead><tr><th>Course</th><th>Throughput Target</th><th>Fallback</th></tr></thead><tbody>${cfg.throughputTargets.map(r => `<tr><td>${r.course}</td><td>${r.target}</td><td>${r.fallback}</td></tr>`).join("")}</tbody>`;
  reset.innerHTML = `<thead><tr><th>After</th><th>Reset Task</th><th>Min</th></tr></thead><tbody>${cfg.resetTasks.map(r => `<tr><td>${r.afterCourse}</td><td>${r.task}</td><td>${r.durationMin}</td></tr>`).join("")}</tbody>`;
  gates.innerHTML = `<thead><tr><th>Gate Time</th><th>Rule</th><th>If Fail</th></tr></thead><tbody>${cfg.goNoGo.map(r => `<tr><td>${r.time}</td><td>${r.rule}</td><td>${r.statusIfFail}</td></tr>`).join("")}</tbody>`;
  cont.innerHTML = `<thead><tr><th>Trigger</th><th>Action</th></tr></thead><tbody>${cfg.contingency.map(r => `<tr><td>${r.trigger}</td><td>${r.action}</td></tr>`).join("")}</tbody>`;
  lock.innerHTML = `<h3>Quantity Lock Candidates (Next Dry Run)</h3><ul>${cfg.quantityLockCandidates.map(i => `<li>${i}</li>`).join("")}</ul><p class="qty-note">Allergen matrix intentionally excluded as requested.</p>`;
}

function renderHouseSetup() {
  const grid = byId("house-setup-grid");
  if (!grid) return;
  grid.innerHTML = "";
  const editMode = isEditMode();
  const groups = getMergedHouseSetup();

  groups.forEach(group => {
    const card = el("div", "house-setup-card");
    const head = el("div", "house-setup-head", group.label);
    const body = el("div", "house-setup-body");

    (group.items || []).forEach((item, idx) => {
      const syncKey = `house-${group.id}-${idx}`;
      const state = getSyncState();
      const checked = !!state[syncKey];

      const row = el("div", "house-setup-row");
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.setAttribute("data-sync", syncKey);
      if (checked) cb.checked = true;

      const textWrap = el("div", "house-setup-text");
      const labelSpan = el("div", "house-setup-label");
      if (editMode) {
        labelSpan.setAttribute("contenteditable", "true");
        labelSpan.setAttribute("data-edit-path", `houseSetup.${group.id}.${idx}.label`);
      }
      labelSpan.textContent = item.label;

      const notesSpan = el("div", "house-setup-notes");
      if (editMode) {
        notesSpan.setAttribute("contenteditable", "true");
        notesSpan.setAttribute("data-edit-path", `houseSetup.${group.id}.${idx}.notes`);
        if (!item.notes) notesSpan.setAttribute("data-placeholder", "add notes\u2026");
      }
      notesSpan.textContent = item.notes || (editMode ? "" : "");

      textWrap.appendChild(labelSpan);
      textWrap.appendChild(notesSpan);
      row.appendChild(cb);
      row.appendChild(textWrap);
      body.appendChild(row);
    });

    if (editMode) {
      const addBtn = el("button", "add-house-item-btn", "+ Add item");
      addBtn.addEventListener("click", () => {
        const newItems = [...(group.items || []), { label: "New item", notes: "" }];
        saveOverrides({ houseSetup: { [group.id]: newItems } });
        renderHouseSetup();
      });
      body.appendChild(addBtn);
    }

    card.appendChild(head);
    card.appendChild(body);
    grid.appendChild(card);
  });
}

function rerenderRunbookDrivenViews(courseMap) {
  renderTimeline(courseMap);
  renderChecklist(courseMap);
}

function rerenderAllContent() {
  const mergedCourses = getMergedCourses();
  const courseMap = buildCourseMap(mergedCourses);
  renderMeta();
  renderLegend(courseMap);
  renderMasterIngredientsTop();
  renderCourseSummary();
  renderHouseSetup();
  rerenderRunbookDrivenViews(courseMap);
  updateDirtyPill();
}

// Event delegation for delete-step and add-step buttons
document.addEventListener("click", (event) => {
  const delBtn = event.target.closest("[data-del-step]");
  if (delBtn) {
    const stepId = delBtn.getAttribute("data-del-step");
    const courseId = delBtn.getAttribute("data-del-course");
    deleteStep(courseId, stepId);
    return;
  }

  const addBtn = event.target.closest("[data-add-course]");
  if (addBtn) {
    const courseId = addBtn.getAttribute("data-add-course");
    // Find a good container: the closest list or section
    const container = addBtn.closest(".check-list") || addBtn.closest(".recipe-section") || addBtn.parentElement;
    openAddStepForm(courseId, container || addBtn.parentElement);
    return;
  }
});

function bindCheckboxSyncAndStorage(courseMap) {
  const state = getSyncState();
  Object.keys(state).forEach(taskId => applySync(taskId, !!state[taskId], state));
  setSyncState(state);

  if (syncBound) return;
  syncBound = true;

  document.addEventListener("change", (event) => {
    const cb = event.target;
    if (!(cb instanceof HTMLInputElement) || cb.type !== "checkbox") return;
    const taskId = cb.getAttribute("data-sync");
    if (!taskId) return;

    const currentState = getSyncState();
    applySync(taskId, cb.checked, currentState);
    // If this is a combined step, also tick all sub-steps
    const combinedStep = (window.PB_COMBINED_STEPS || []).find(c => c.id === taskId);
    if (combinedStep && combinedStep.combines) {
      combinedStep.combines.forEach(subId => applySync(subId, cb.checked, currentState));
    }
    setSyncState(currentState);
    // Avoid full re-render on every checkbox; only re-render runbook views
    const mergedCourses = getMergedCourses();
    const mergedMap = buildCourseMap(mergedCourses);
    rerenderRunbookDrivenViews(mergedMap);
  });
}

function init() {
  const mergedCourses = getMergedCourses();
  const courseMap = buildCourseMap(mergedCourses);
  renderMeta();
  renderLegend(courseMap);
  initTimelineControls(courseMap);
  renderMasterIngredientsTop();
  renderCourseSummary();
  renderHouseSetup();
  renderProcurement(courseMap);
  renderCutlery();
  renderQuantities();
  renderOpsControls();
  rerenderRunbookDrivenViews(courseMap);
  bindCheckboxSyncAndStorage(courseMap);
  bindIngredientsDialog();
  bindRecipeDialog(courseMap);
  bindStepDialog(courseMap);
  initToolbar();
}

init();