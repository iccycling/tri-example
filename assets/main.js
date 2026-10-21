/* ============================================================
   IC Tri — main.js
   Mobile-Menü · Dropdown · FAQ · WhatsApp-Dialog · Blog-Bildformat
   ============================================================ */
(() => {
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const onEscape = [];   // Schließ-Funktionen, die bei Esc laufen


  /* ── MOBILE-MENÜ ── */
  const nav       = $('nav');
  const hamburger = $('.nav-hamburger');
  const drawer    = $('.nav-drawer');

  if (nav && hamburger && drawer) {
    const setDrawer = (open) => {
      drawer.classList.toggle('open', open);
      drawer.setAttribute('aria-hidden', String(!open));
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
    };
    drawer.id ||= 'nav-drawer';
    hamburger.setAttribute('aria-controls', drawer.id);
    setDrawer(false);

    hamburger.addEventListener('click', () => setDrawer(!drawer.classList.contains('open')));
    $$('a', drawer).forEach(a => a.addEventListener('click', () => setDrawer(false)));
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !drawer.contains(e.target)) setDrawer(false);
    });
    onEscape.push(() => setDrawer(false));
  }


  /* ── NAV-DROPDOWN (Training ▾) ──
     Hover öffnet per CSS; Klick/Tap und Tastatur laufen über .open */
  const dropdowns = $$('.has-dropdown');
  const setDropdown = (dd, open) => {
    dd.classList.toggle('open', open);
    $('.nav-dd-trigger', dd)?.setAttribute('aria-expanded', String(open));
  };
  const closeDropdowns = (except) => dropdowns.forEach(dd => { if (dd !== except) setDropdown(dd, false); });

  dropdowns.forEach(dd => {
    $('.nav-dd-trigger', dd)?.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = !dd.classList.contains('open');
      closeDropdowns(dd);
      setDropdown(dd, willOpen);
    });
    dd.addEventListener('mouseleave', () => setDropdown(dd, false));
    dd.addEventListener('focusout', (e) => { if (!dd.contains(e.relatedTarget)) setDropdown(dd, false); });
  });
  document.addEventListener('click', () => closeDropdowns());
  onEscape.push(() => closeDropdowns());


  /* ── FAQ-AKKORDEON (jeweils eine Frage offen) ── */
  const faqItems = $$('.faq-item');
  const setFaq = (item, open) => {
    item.classList.toggle('open', open);
    $('.faq-question', item)?.setAttribute('aria-expanded', String(open));
  };
  faqItems.forEach(item => {
    setFaq(item, false);
    $('.faq-question', item)?.addEventListener('click', () => {
      const willOpen = !item.classList.contains('open');
      faqItems.forEach(i => setFaq(i, false));
      setFaq(item, willOpen);
    });
  });


  /* ── WHATSAPP-DIALOG ── */
  const wa      = $('#waOverlay');
  const waClose = $('[data-wa-close]');
  let lastTrigger = null;

  if (wa) {
    const setModal = (open) => {
      wa.classList.toggle('open', open);
      wa.setAttribute('aria-hidden', String(!open));
      (open ? waClose : lastTrigger)?.focus();
    };
    wa.setAttribute('role', 'dialog');
    wa.setAttribute('aria-modal', 'true');
    wa.setAttribute('aria-hidden', 'true');

    $$('[data-wa-trigger]').forEach(btn => btn.addEventListener('click', (e) => {
      e.preventDefault();
      lastTrigger = e.currentTarget;
      setModal(true);
    }));
    waClose?.addEventListener('click', () => setModal(false));
    wa.addEventListener('click', (e) => { if (e.target === wa) setModal(false); });
    onEscape.push(() => { if (wa.classList.contains('open')) setModal(false); });
    wa.addEventListener('keydown', (e) => {          // Tab bleibt im Dialog
      if (e.key !== 'Tab' || !wa.classList.contains('open')) return;
      const f = $$('a[href], button:not([disabled])', wa);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }


  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') onEscape.forEach(fn => fn());
  });
})();


/* ── TEILEN-LEISTE: Link kopieren + System-Teilen-Dialog (Handy) ── */
(() => {
  const status = (btn, text) => {
    const el = btn.closest('.share')?.querySelector('.share-status');
    if (!el) return;
    el.textContent = text;
    setTimeout(() => { el.textContent = ''; }, 2200);
  };
  document.querySelectorAll('[data-copy-link]').forEach(btn => btn.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(btn.dataset.copyLink); status(btn, 'Link copied'); }
    catch { window.prompt('Copy this link:', btn.dataset.copyLink); }
  }));
  if (navigator.share) {
    document.querySelectorAll('[data-native-share]').forEach(btn => {
      btn.hidden = false;
      btn.addEventListener('click', () => navigator.share({ title: btn.dataset.title, url: btn.dataset.url }).catch(() => {}));
    });
  }
})();


/* ── GALERIE (wischen, klicken, Pfeiltasten) ── */
(() => {
  document.querySelectorAll('.gallery').forEach(g => {
    const track = g.querySelector('.gallery-track');
    const prev = g.querySelector('.gallery-prev');
    const next = g.querySelector('.gallery-next');
    const count = g.querySelector('.gallery-count');
    const n = track.children.length;
    if (n < 2) { g.dataset.single = ''; return; }
    const index = () => Math.round(track.scrollLeft / track.clientWidth);
    const update = () => {
      const i = index();
      count.textContent = `${i + 1} / ${n}`;
      prev.disabled = i === 0;
      next.disabled = i === n - 1;
    };
    const go = (d) => track.scrollTo({ left: (index() + d) * track.clientWidth, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    prev.addEventListener('click', () => go(-1));
    next.addEventListener('click', () => go(1));
    track.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); go(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    });
    window.addEventListener('resize', update);
    update();
  });
})();


/* ── EINBETTUNGEN (YouTube/Instagram): erst nach Klick laden ── */
(() => {
  document.querySelectorAll('[data-embed]').forEach(box => {
    const btn = box.querySelector('.embed-btn');
    btn?.addEventListener('click', () => {
      const f = document.createElement('iframe');
      f.src = box.dataset.embedSrc;
      f.title = box.dataset.embedTitle || 'Embedded content';
      f.loading = 'lazy';
      f.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen';
      f.allowFullscreen = true;
      f.referrerPolicy = 'strict-origin-when-cross-origin';
      if (box.dataset.embedHeight) f.height = box.dataset.embedHeight;
      box.replaceChildren(f);
      f.focus();
    });
  });
})();


/* ── DISZIPLINEN-KARTEN: Pfeil zum Weiterscrollen (Desktop: drei sichtbar, vierte Karte rechts) ── */
(() => {
  const wrap = document.querySelector('.disciplines-wrap');
  if (!wrap) return;
  const scroller = wrap.querySelector('.disciplines');
  const btn = wrap.querySelector('.disc-next');
  if (!scroller || !btn) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const state = () => {
    const max = scroller.scrollWidth - scroller.clientWidth;
    return { max, scrollable: max > 4, atEnd: scroller.scrollLeft >= max - 4 };
  };
  const update = () => {
    const s = state();
    btn.hidden = !s.scrollable;                       // mobil (Karten untereinander) gibt es nichts zu scrollen
    wrap.classList.toggle('at-end', !s.scrollable || s.atEnd);
    btn.setAttribute('aria-label', s.atEnd ? 'Back to the first discipline' : 'Show next discipline');
  };
  btn.addEventListener('click', () => {
    const s = state();
    const step = scroller.querySelector('.disc-item').offsetWidth;
    scroller.scrollBy({ left: s.atEnd ? -s.max : step, behavior: reduce.matches ? 'auto' : 'smooth' });
  });
  scroller.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  window.addEventListener('resize', update);
  update();
})();


/* ── Code-Blöcke, die breiter als die Textspalte sind, verbreitern ── */
document.querySelectorAll('.prose pre').forEach(pre => {
  if (pre.scrollWidth > pre.clientWidth + 2) pre.classList.add('is-wide');
});
