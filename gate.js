// Passcode gate — runs before the app renders.
// Change the passcode by generating a new SHA-256 hash of your chosen passcode
// and replacing PASSCODE_HASH below. Session lasts 30 days per device.
//
// To generate a new hash in PowerShell:
//   $s='YOUR-NEW-PASSCODE'; $sha=[System.Security.Cryptography.SHA256]::Create()
//   ($sha.ComputeHash([Text.Encoding]::UTF8.GetBytes($s)) | %{ $_.ToString('x2') }) -join ''

(function () {
  const PASSCODE_HASH = "4287f782e7ec6781cadb6152837415883701b1537ae5657d7b23edc45d2629c6"; // "birthday-supper"
  const SESSION_KEY = "pb-gate-session-v1";
  const SESSION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

  async function sha256Hex(s) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
  }

  function hasValidSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return false;
      const { at, hash } = JSON.parse(raw);
      if (hash !== PASSCODE_HASH) return false;
      if (Date.now() - at > SESSION_MS) return false;
      return true;
    } catch { return false; }
  }

  function saveSession() {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ at: Date.now(), hash: PASSCODE_HASH }));
  }

  function showGate() {
    document.documentElement.style.visibility = "hidden";
    const overlay = document.createElement("div");
    overlay.id = "pb-gate";
    overlay.style.cssText = "position:fixed;inset:0;background:#1a1a1a;color:#f4f4f4;display:flex;align-items:center;justify-content:center;z-index:99999;font-family:system-ui,-apple-system,sans-serif;visibility:visible";
    overlay.innerHTML = `
      <form id="pb-gate-form" style="background:#2a2a2a;padding:32px;border-radius:12px;max-width:320px;width:90%;box-shadow:0 10px 40px rgba(0,0,0,.5)">
        <h2 style="margin:0 0 8px;font-size:20px">🔒 Birthday Supper</h2>
        <p style="margin:0 0 20px;color:#aaa;font-size:14px">Enter passcode to continue</p>
        <input id="pb-gate-input" type="password" autocomplete="current-password" autofocus
          style="width:100%;padding:12px;border-radius:8px;border:1px solid #555;background:#1a1a1a;color:#fff;font-size:16px;box-sizing:border-box" />
        <div id="pb-gate-err" style="color:#ff6b6b;font-size:13px;height:18px;margin-top:8px"></div>
        <button type="submit" style="width:100%;padding:12px;border-radius:8px;border:0;background:#e07a2c;color:#fff;font-size:16px;font-weight:600;cursor:pointer;margin-top:8px">Unlock</button>
      </form>`;
    // Prepend to <html> so it's visible even though body is hidden by the visibility trick.
    document.documentElement.appendChild(overlay);

    const form = overlay.querySelector("#pb-gate-form");
    const input = overlay.querySelector("#pb-gate-input");
    const err = overlay.querySelector("#pb-gate-err");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      err.textContent = "";
      const hash = await sha256Hex(input.value);
      if (hash === PASSCODE_HASH) {
        saveSession();
        overlay.remove();
        document.documentElement.style.visibility = "";
      } else {
        err.textContent = "Wrong passcode";
        input.value = "";
        input.focus();
      }
    });
  }

  if (!hasValidSession()) {
    // Hide the page ASAP, before styles.css even paints.
    if (document.documentElement) document.documentElement.style.visibility = "hidden";
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", showGate);
    } else {
      showGate();
    }
  }
})();
