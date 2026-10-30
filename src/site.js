/* Behaviour for kumarharsh.in. Plain DOM, no framework. Each block only runs on the pages that have its markup. */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* ---------- Phone menu ---------- */
(function menu() {
  const btn = $('.menu-btn');
  const panel = $('#menu');
  if (!btn || !panel) return;
  const closeBtn = $('.menu-close', panel);

  const open = () => {
    panel.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };
  const shut = (returnFocus = true) => {
    panel.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (returnFocus) btn.focus();
  };

  btn.addEventListener('click', open);
  closeBtn.addEventListener('click', () => shut());
  // Links to a section on the current page keep the user here, so close without moving focus.
  panel.addEventListener('click', (e) => { if (e.target.closest('a')) shut(false); });
  document.addEventListener('keydown', (e) => {
    if (panel.hidden) return;
    if (e.key === 'Escape') return shut();
    if (e.key !== 'Tab') return;
    const items = $$('a, button', panel);
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  matchMedia('(min-width: 761px)').addEventListener('change', (e) => { if (e.matches && !panel.hidden) shut(false); });
})();

/* ---------- Work index filter ---------- */
(function workFilter() {
  const buttons = $$('[data-filter]');
  if (!buttons.length) return;
  const rows = $$('[data-cat]');
  const count = $('[data-count]');

  buttons.forEach((btn) => btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    let shown = 0;
    buttons.forEach((b) => {
      const on = b === btn;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', String(on));
    });
    rows.forEach((row) => {
      const show = filter === 'all' || row.dataset.cat === filter;
      row.hidden = !show;
      if (show) shown += 1;
    });
    if (count) count.textContent = shown;
  }));
})();

/* ---------- Honey: simulate a provider outage ---------- */
(function outageDemo() {
  const chips = $$('[data-mode]');
  if (!chips.length) return;
  const rows = $$('[data-row]');
  const result = $('[data-outage-result]');

  const show = (current) => {
    chips.forEach((chip, i) => {
      const on = i === current;
      chip.setAttribute('aria-pressed', String(on));
      chip.style.background = on ? '#EEEFEA' : 'transparent';
      chip.style.color = on ? '#1F2723' : '#EEEFEA';
    });
    rows.forEach((row, i) => {
      const failed = i < current;
      const active = i === current;
      $('[data-status]', row).textContent = failed ? chips[current].dataset.fail : active ? 'Answering' : 'Standing by';
      $('[data-dot]', row).style.background = active ? '#D8452B' : 'transparent';
      row.style.opacity = failed ? '0.45' : '1';
    });
    result.textContent = chips[current].dataset.result;
  };
  chips.forEach((chip, i) => chip.addEventListener('click', () => show(i)));
})();

/* ---------- Services: scope estimator ---------- */
(function estimator() {
  const root = $('#estimator');
  const options = root ? $$('[data-group]', root) : [];
  if (!options.length) return;

  const out = (key) => $(`[data-r="${key}"]`, root);
  const setPressed = (btn, on) => {
    btn.setAttribute('aria-pressed', String(on));
    btn.classList.toggle('on', on);
  };
  const pressed = (group) => options.find((o) => o.dataset.group === group && o.getAttribute('aria-pressed') === 'true');

  const update = () => {
    const scope = pressed('scope').dataset;
    const time = pressed('time').dataset;
    const addons = options.filter((o) => o.dataset.group === 'addon' && o.getAttribute('aria-pressed') === 'true').map((o) => o.dataset.label);
    const names = addons.join(', ');

    out('resTitle').textContent = scope.title;
    out('resTime').textContent = time.out;
    out('resDesc').textContent = scope.inc;
    out('resAddons').textContent = addons.length ? `Add-ons: ${names}.` : 'No add-ons selected.';

    const subject = encodeURIComponent(`Freelance AI Inquiry: ${scope.subj} (${time.out})`);
    const body = encodeURIComponent(
      "Hi Harsh,\n\nI explored your portfolio and I'd like to hire you for a freelance AI project.\n\n" +
      `Project scope: ${scope.title}\nDesired timeline: ${time.out}\nAdd-ons: ${addons.length ? names : 'None'}\n\n` +
      'Project details / context:\n[Tell Harsh a bit about your product, users or what you want to build]\n\n' +
      'Please let me know your current bandwidth and when we can schedule a quick 15-minute alignment call.\n\nBest,\n[Your name]'
    );
    out('mailto').href = `mailto:hello@kumarharsh.in?subject=${subject}&body=${body}`;
  };

  options.forEach((btn) => btn.addEventListener('click', () => {
    const group = btn.dataset.group;
    if (group === 'addon') {
      setPressed(btn, btn.getAttribute('aria-pressed') !== 'true');
    } else {
      options.filter((o) => o.dataset.group === group).forEach((o) => setPressed(o, o === btn));
    }
    update();
  }));
})();

/* ---------- Contact: compose the brief as an email ---------- */
(function brief() {
  const form = $('#brief');
  if (!form) return;
  const note = $('#brief-note');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(`Project brief: ${data.get('project')}`);
    const body = encodeURIComponent(
      `Hi Harsh,\n\n${data.get('message')}\n\nWhat I want to build: ${data.get('project')}\n\nBest,\n${data.get('name')}\n${data.get('email')}`
    );
    window.location.href = `mailto:hello@kumarharsh.in?subject=${subject}&body=${body}`;
    if (note) note.textContent = 'Opening your email app. If nothing opens, write to hello@kumarharsh.in.';
  });
})();
