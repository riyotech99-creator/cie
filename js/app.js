/* =====================================================================
 *  LOGIKA APLIKASI
 *  File ini membaca isi dari js/config.js lalu menampilkannya ke halaman.
 *  Kamu TIDAK perlu mengedit file ini untuk mengganti konten.
 * ===================================================================== */

(function () {
  "use strict";

  // Bantuan kecil untuk ambil elemen
  const $ = (id) => document.getElementById(id);
  const setText = (id, text) => { const el = $(id); if (el) el.textContent = text || ""; };

  /* ------------------------------------------------------------------
   * 1) LANDING
   * ------------------------------------------------------------------ */
  function initLanding() {
    const c = CONFIG.landing || {};
    setText("landingTitle", c.judul);
    setText("landingSubtitle", c.subjudul);
    const btn = $("landingBtn");
    if (btn) btn.textContent = c.tombol || "Mulai";

    // Foto latar (hanya dipasang jika filenya ada)
    if (c.fotoLatar) {
      const img = new Image();
      img.onload = () => {
        const landing = $("landing");
        if (landing) landing.style.backgroundImage = `url("${c.fotoLatar}")`;
      };
      img.src = c.fotoLatar;
    }
  }

  /* ------------------------------------------------------------------
   * 2) COUNTER (real-time)
   * ------------------------------------------------------------------ */
  function initCounter() {
    setText("counterTitle", (CONFIG.counter && CONFIG.counter.judul) || "");
    setText("counterNote", (CONFIG.counter && CONFIG.counter.catatan) || "");

    const grid = $("counterGrid");
    if (!grid) return;

    const start = new Date(CONFIG.tanggalJadian + "T00:00:00");
    if (isNaN(start.getTime())) {
      grid.innerHTML = '<p style="color:#d6336c">Periksa lagi "tanggalJadian" di config.js (format: YYYY-MM-DD).</p>';
      return;
    }

    const cells = [
      { key: "hari", label: "Hari" },
      { key: "jam", label: "Jam" },
      { key: "menit", label: "Menit" },
      { key: "detik", label: "Detik" },
    ];

    // Bangun struktur sel sekali saja
    grid.innerHTML = cells
      .map(
        (c) =>
          `<div class="counter__cell"><span class="counter__num" id="cnt-${c.key}">0</span><span class="counter__label">${c.label}</span></div>`
      )
      .join("");

    function tick() {
      let diff = Math.floor((Date.now() - start.getTime()) / 1000);
      if (diff < 0) diff = 0;
      const hari = Math.floor(diff / 86400);
      const jam = Math.floor((diff % 86400) / 3600);
      const menit = Math.floor((diff % 3600) / 60);
      const detik = diff % 60;
      setText("cnt-hari", hari.toLocaleString("id-ID"));
      setText("cnt-jam", String(jam).padStart(2, "0"));
      setText("cnt-menit", String(menit).padStart(2, "0"));
      setText("cnt-detik", String(detik).padStart(2, "0"));
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ------------------------------------------------------------------
   * 3) TIMELINE
   * ------------------------------------------------------------------ */
  function initTimeline() {
    const track = $("timelineTrack");
    if (!track) return;
    const items = CONFIG.timeline || [];

    track.innerHTML = items
      .map((it) => {
        const img = it.foto
          ? `<img src="${it.foto}" alt="${escapeHtml(it.judul || "")}" loading="lazy" onerror="this.style.display='none'">`
          : "";
        return `
          <div class="tl-item" data-reveal>
            <div class="tl-card">
              ${img}
              <div class="tl-card__body">
                <p class="tl-card__date">${escapeHtml(it.tanggal || "")}</p>
                <h3 class="tl-card__title">${escapeHtml(it.judul || "")}</h3>
                <p class="tl-card__text">${escapeHtml(it.cerita || "")}</p>
              </div>
            </div>
          </div>`;
      })
      .join("");
  }

  /* ------------------------------------------------------------------
   * 4) GALERI + LIGHTBOX
   * ------------------------------------------------------------------ */
  let galleryPhotos = [];
  let lightboxIndex = 0;

  function initGallery() {
    const g = CONFIG.galeri || {};
    setText("galleryTitle", g.judul);
    setText("gallerySubtitle", g.subjudul);

    const grid = $("galleryGrid");
    if (!grid) return;
    galleryPhotos = (g.foto || []).filter((f) => f && f.src);

    grid.innerHTML = galleryPhotos
      .map((f, i) => {
        const cap = f.caption
          ? `<span class="gallery__caption">${escapeHtml(f.caption)}</span>`
          : "";
        return `
          <div class="gallery__item" data-index="${i}" data-reveal>
            <img src="${f.src}" alt="${escapeHtml(f.caption || "Foto kenangan")}" loading="lazy" onerror="this.parentElement.style.display='none'">
            ${cap}
          </div>`;
      })
      .join("");

    grid.addEventListener("click", (e) => {
      const item = e.target.closest(".gallery__item");
      if (item) openLightbox(Number(item.dataset.index));
    });

    initLightboxControls();
  }

  function openLightbox(index) {
    if (!galleryPhotos.length) return;
    lightboxIndex = index;
    updateLightbox();
    $("lightbox").hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    $("lightbox").hidden = true;
    document.body.style.overflow = "";
  }
  function updateLightbox() {
    const f = galleryPhotos[lightboxIndex];
    if (!f) return;
    $("lightboxImg").src = f.src;
    $("lightboxImg").alt = f.caption || "Foto kenangan";
    setText("lightboxCaption", f.caption);
  }
  function moveLightbox(step) {
    lightboxIndex = (lightboxIndex + step + galleryPhotos.length) % galleryPhotos.length;
    updateLightbox();
  }
  function initLightboxControls() {
    $("lightboxClose").addEventListener("click", closeLightbox);
    $("lightboxPrev").addEventListener("click", () => moveLightbox(-1));
    $("lightboxNext").addEventListener("click", () => moveLightbox(1));
    $("lightbox").addEventListener("click", (e) => {
      if (e.target.id === "lightbox") closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if ($("lightbox").hidden) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") moveLightbox(-1);
      if (e.key === "ArrowRight") moveLightbox(1);
    });
  }

  /* ------------------------------------------------------------------
   * 5) VIDEO (YouTube)
   * ------------------------------------------------------------------ */
  function initVideo() {
    const v = CONFIG.video || {};
    const section = $("video");
    // Sembunyikan seluruh section jika tidak ada video
    if (!v.youtubeId) {
      if (section) section.style.display = "none";
      return;
    }
    setText("videoTitle", v.judul);
    setText("videoSubtitle", v.subjudul);
    const frame = $("videoFrame");
    if (frame) {
      frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(
        v.youtubeId
      )}" title="${escapeHtml(v.judul || "Video")}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }
  }

  /* ------------------------------------------------------------------
   * 6) SURAT CINTA
   * ------------------------------------------------------------------ */
  function initLetter() {
    const s = CONFIG.surat || {};
    setText("letterTitle", s.judul);
    const toggle = $("letterToggle");
    const paper = $("letterPaper");
    if (!toggle || !paper) return;

    toggle.textContent = s.tombolBuka || "Buka surat";

    const paragraphs = (s.paragraf || []).map((p) => `<p>${escapeHtml(p)}</p>`).join("");
    paper.innerHTML = `
      <p class="letter__greeting">${escapeHtml(s.pembuka || "")}</p>
      ${paragraphs}
      <p class="letter__signoff">${escapeHtml(s.penutup || "")}</p>
      <p class="letter__ttd">${escapeHtml(s.ttd || "")}</p>`;

    toggle.addEventListener("click", () => {
      const opening = paper.hidden;
      paper.hidden = !opening;
      toggle.textContent = opening ? "Tutup surat" : s.tombolBuka || "Buka surat";
    });
  }

  /* ------------------------------------------------------------------
   * 7) KEJUTAN + CONFETTI
   * ------------------------------------------------------------------ */
  function initSurprise() {
    const k = CONFIG.kejutan || {};
    setText("surpriseTitle", k.judul);
    const btn = $("surpriseBtn");
    if (btn) btn.textContent = k.tombol || "Kejutan";
    setText("surpriseMessage", k.pesan);
    setText("surpriseSmall", k.pesanKecil);

    if (btn) {
      btn.addEventListener("click", () => {
        $("surpriseReveal").hidden = false;
        btn.style.display = "none";
        launchConfetti();
      });
    }
  }

  /* ---------- Confetti sederhana (tanpa library) ---------- */
  function launchConfetti() {
    const canvas = $("confettiCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const colors = ["#ff8fab", "#ff5d8f", "#d6336c", "#ffd0dd", "#d9a86c", "#ffffff"];
    const pieces = [];
    for (let i = 0; i < 160; i++) {
      pieces.push({
        x: Math.random() * w,
        y: Math.random() * -h,
        r: 4 + Math.random() * 6,
        c: colors[(Math.random() * colors.length) | 0],
        sp: 2 + Math.random() * 4,
        ang: Math.random() * Math.PI * 2,
        spin: -0.1 + Math.random() * 0.2,
      });
    }

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const startTime = Date.now();
    (function frame() {
      ctx.clearRect(0, 0, w, h);
      pieces.forEach((p) => {
        p.y += p.sp;
        p.x += Math.sin(p.ang) * 1.2;
        p.ang += p.spin;
        if (p.y > h + 20) p.y = -20;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.ang);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6);
        ctx.restore();
      });
      // Berhenti setelah 6 detik agar tidak boros
      if (Date.now() - startTime < 6000) {
        requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, w, h);
        window.removeEventListener("resize", onResize);
      }
    })();
  }

  /* ------------------------------------------------------------------
   * HATI MELAYANG (latar)
   * ------------------------------------------------------------------ */
  function initFloatingHearts() {
    const layer = $("floatingHearts");
    if (!layer) return;
    const emojis = ["❤", "💕", "💗", "🤍", "💞"];
    const COUNT = 14;
    for (let i = 0; i < COUNT; i++) {
      const s = document.createElement("span");
      s.textContent = emojis[(Math.random() * emojis.length) | 0];
      s.style.left = Math.random() * 100 + "vw";
      s.style.fontSize = 0.9 + Math.random() * 1.6 + "rem";
      s.style.animationDuration = 8 + Math.random() * 10 + "s";
      s.style.animationDelay = Math.random() * 12 + "s";
      layer.appendChild(s);
    }
  }

  /* ------------------------------------------------------------------
   * REVEAL ON SCROLL
   * ------------------------------------------------------------------ */
  function initScrollReveal() {
    const els = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
  }

  /* ------------------------------------------------------------------
   * UTIL
   * ------------------------------------------------------------------ */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ------------------------------------------------------------------
   * JALANKAN
   * ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    if (typeof CONFIG === "undefined") {
      console.error("config.js tidak ditemukan / ada kesalahan penulisan di config.js");
      return;
    }
    document.title = `${CONFIG.namaKamu || ""} ❤ ${CONFIG.namaDia || ""}`.trim();
    initLanding();
    initCounter();
    initTimeline();
    initGallery();
    initVideo();
    initLetter();
    initSurprise();
    initFloatingHearts();
    // dipanggil terakhir agar elemen timeline/galeri yang baru dibuat ikut terpantau
    initScrollReveal();
  });
})();
