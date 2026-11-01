/* =========================================================
   Body & Ornament: survey
   All questions live in SCREENS below. Each answer is sent
   to the Google Sheet; each field id becomes a column.
   ========================================================= */

const ENDPOINT = 'https://script.google.com/macros/s/AKfycbwqAv085VX73bidNe09nWe6USNeDExP3v2KFJWGx5DD_hma0EoxrXSyWI_kArfjxvc/exec';

const YES_NO = ['Yes', 'No'];
const yes = (id) => (a) => a[id] === 'Yes';

const SCREENS = [
  { type: 'intro' },

  /* ---------- I. ABOUT YOU ---------- */
  { type: 'section', num: 'I', title: 'About you', text: 'A few details to understand who is answering.' },
  { section: 'About you', fields: [
    { id: 'Age', type: 'choice', label: 'How old are you?', required: true,
      options: ['18–24', '25–30', '31–40', '41–50', '51 and over'] },
  ]},
  { section: 'About you', fields: [
    { id: 'Gender', type: 'choice', label: 'How do you identify?', required: true,
      options: ['Woman', 'Man', 'Non-binary', 'Prefer to self-describe', 'Prefer not to say'],
      other: 'Prefer to self-describe', otherPlaceholder: 'In your own words' },
  ]},
  { section: 'About you', fields: [
    { id: 'Occupation', type: 'choice', label: 'What do you currently do?', required: true,
      options: ['Student', 'Employed', 'Self-employed / freelance', 'Looking for work', 'Other'],
      other: 'Other', otherPlaceholder: 'Tell me more' },
  ]},
  { section: 'About you', fields: [
    { id: 'Education', type: 'choice', label: 'What is your highest level of education?', required: true,
      options: ['Secondary school', 'Apprenticeship / vocational training', 'Bachelor', 'Master', 'PhD', 'Other'],
      other: 'Other', otherPlaceholder: 'Which one?' },
  ]},
  { section: 'About you', fields: [
    { id: 'Location', type: 'choice', label: 'Where do you live?', required: true,
      options: ['Geneva area', 'Elsewhere in Switzerland', 'Elsewhere in Europe', 'Outside Europe'] },
  ]},
  { section: 'About you', fields: [
    { id: 'Contact', type: 'inputs', label: 'Would you like to stay in touch?',
      hint: 'Optional. If you’d be happy to share more about your pieces later, leave your name and an email or Instagram.',
      inputs: [
        { id: 'Contact name', placeholder: 'Name' },
        { id: 'Contact email / @', placeholder: 'Email or @instagram' },
      ] },
  ]},

  /* ---------- II. PERSONAL LINK ---------- */
  { type: 'section', num: 'II', title: 'Your adornments', text: 'Your own relationship with jewellery and the things you wear on your body.' },
  { section: 'Your adornments', fields: [
    { id: 'Adornments worn', type: 'multi', label: 'What type of adornment do you wear?', hint: 'Select all that apply', required: true,
      options: ['Jewellery', 'Piercing', 'Tattoo', 'Implant', 'Other'],
      other: 'Other', otherPlaceholder: 'What else?' },
  ]},
  { section: 'Your adornments', fields: [
    { id: 'Jewellery usual in family', type: 'choice', layout: 'row', sublabel: 'In your family?', required: true, options: YES_NO,
      label: 'Is wearing jewellery something usual or normal around you?' },
    { id: 'Jewellery usual among friends', type: 'choice', layout: 'row', sublabel: 'Among your friends?', required: true, options: YES_NO },
  ]},
  { section: 'Your adornments', fields: [
    { id: 'Environment influenced', type: 'choice', layout: 'row', required: true, options: YES_NO,
      label: 'Do you think your cultural, social or family environment has influenced your relationship with jewellery or body adornment?' },
    { id: 'Environment influenced: how', type: 'textarea', label: 'How?', showIf: yes('Environment influenced') },
  ]},
  { section: 'Your adornments', fields: [
    { id: 'Jewellery part of identity', type: 'choice', layout: 'row', required: true, options: YES_NO,
      label: 'Would you consider your jewellery as part of your identity?' },
    { id: 'Jewellery part of identity: why', type: 'textarea', label: 'Why?', showIf: yes('Jewellery part of identity') },
  ]},
  { section: 'Your adornments', fields: [
    { id: 'Aesthetics vs symbolism', type: 'choice', required: true,
      label: 'Would you say aesthetics is…',
      hint: '…compared to the emotional or symbolic aspect of the jewellery you wear',
      options: ['More important', 'As important', 'Less important'] },
  ]},
  { section: 'Your adornments', fields: [
    { id: 'Jewellery represented', type: 'multi', required: true, hint: 'Select all that apply',
      label: 'Have you ever owned or worn a piece of jewellery that represented…',
      options: ['A particular period of your life', 'A relationship', 'A personal change', 'Something else', 'None of these'],
      exclusive: 'None of these', other: 'Something else', otherPlaceholder: 'What?' },
  ]},
  { section: 'Your adornments', fields: [
    { id: 'Feelings when wearing jewellery', type: 'textarea',
      label: 'What feelings or sensations do you associate with wearing jewellery?' },
  ]},

  /* ---------- III. SUBJECT ---------- */
  { type: 'section', num: 'III', title: 'Body & ornament', text: 'How adornment meets the body, and how far it can go.' },
  { section: 'Body & ornament', fields: [
    { id: 'Body parts to adorn', type: 'choice', layout: 'row', required: true, options: YES_NO,
      label: 'Are there any parts of your body you particularly enjoy adorning or highlighting?' },
    { id: 'Body parts to adorn: what and why', type: 'textarea', label: 'Which ones, and why?', showIf: yes('Body parts to adorn') },
  ]},
  { section: 'Body & ornament', fields: [
    { id: 'Jewellery changes perception', type: 'choice', layout: 'row', required: true, options: YES_NO,
      label: 'Do you feel that jewellery changes how other people perceive you?' },
    { id: 'Jewellery changes perception: example', type: 'textarea', label: 'Can you give an example?', showIf: yes('Jewellery changes perception') },
  ]},
  { section: 'Body & ornament', fields: [
    { id: 'Would wear transforming jewellery', type: 'choice', layout: 'row', required: true, options: YES_NO,
      label: 'Would you wear jewellery that visibly transforms, distorts or changes the appearance of a part of your body?' },
    { id: 'Would wear transforming jewellery: why', type: 'textarea', label: 'Why?', showIf: (a) => !!a['Would wear transforming jewellery'] },
  ]},
  { section: 'Body & ornament', showIf: yes('Would wear transforming jewellery'), fields: [
    { id: 'Limit to transformation', type: 'choice', layout: 'row', required: true, options: YES_NO,
      label: 'Is there a limit to how much you would transform your body through adornment?' },
    { id: 'Limit to transformation: what', type: 'textarea', label: 'What would it be?', showIf: yes('Limit to transformation') },
  ]},

  { type: 'submit' },
];

/* ---------- intro text (easy to edit) ---------- */
const INTRO = {
  eyebrow: 'HEAD – Genève · Master research',
  title: 'Body & Ornament',
  paragraphs: [
    'Hi, I’m Coline, a jewellery designer. My work explores jewellery and body adornment (piercings, tattoos, implants, every object that lives with the body) and how it shapes the way we see ourselves and are seen by others.',
    'This survey will help me build the foundation of my Master collection and thesis. There are no right or wrong answers: I’m interested in your own experience, whatever your relationship to adornment is, even if you don’t wear any.',
  ],
  meta: ['About 8 minutes', 'Anonymous', 'Written answers are optional'],
  button: 'Begin',
};

const THANKS = {
  title: 'Thank you',
  text: 'Your answers have been received. They mean a lot to this project. Feel free to share the survey with anyone who might have something to say about it.',
};

/* =========================================================
   Engine: no need to edit below this line
   ========================================================= */
const app = document.getElementById('app');
const topbar = document.getElementById('topbar');
const backBtn = document.getElementById('backBtn');
const progressFill = document.getElementById('progressFill');
const progressLabel = document.getElementById('progressLabel');

const answers = {};
const history = [];
let current = 0;
let submitting = false;

const visible = (s) => !s.showIf || s.showIf(answers);
const questionScreens = () => SCREENS.filter((s) => s.fields && visible(s));

function el(tag, attrs = {}, children = []) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') n.className = v;
    else if (k === 'text') n.textContent = v;
    else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
    else if (v !== undefined && v !== null) n.setAttribute(k, v);
  }
  [].concat(children).forEach((c) => c && n.append(c));
  return n;
}

function fieldDone(f) {
  if (f.showIf && !f.showIf(answers)) return true;
  if (!f.required) return true;
  const v = answers[f.id];
  return Array.isArray(v) ? v.length > 0 : !!v;
}
const screenDone = (s) => (s.fields || []).every(fieldDone);

function renderField(f, screen, nextBtn) {
  const wrap = el('div', { class: 'field' });
  if (f.label) wrap.append(el('h2', { class: 'label', text: f.label }));
  if (f.hint) wrap.append(el('p', { class: 'hint', text: f.hint }));
  if (f.sublabel) wrap.append(el('p', { class: 'sublabel', text: f.sublabel }));

  const refresh = () => rerenderConditional(screen, nextBtn);

  if (f.type === 'choice' || f.type === 'multi') {
    const multi = f.type === 'multi';
    const box = el('div', { class: 'options' + (f.layout === 'row' ? ' row' : ''), role: multi ? 'group' : 'radiogroup' });
    let otherInput;
    const isOn = (o) => multi ? (answers[f.id] || []).includes(o) : answers[f.id] === o;
    f.options.forEach((o) => {
      const b = el('button', {
        class: 'opt' + (multi ? ' multi' : ''), type: 'button',
        role: multi ? 'checkbox' : 'radio', 'aria-checked': String(isOn(o)),
        onclick: () => {
          if (multi) {
            let arr = answers[f.id] || [];
            if (arr.includes(o)) arr = arr.filter((x) => x !== o);
            else arr = (o === f.exclusive) ? [o] : arr.filter((x) => x !== f.exclusive).concat(o);
            answers[f.id] = arr;
          } else {
            answers[f.id] = o;
          }
          box.querySelectorAll('.opt').forEach((btn) => btn.setAttribute('aria-checked', String(isOn(btn.dataset.v))));
          if (otherInput) {
            otherInput.hidden = !isOn(f.other);
            if (!otherInput.hidden) otherInput.focus();
          }
          refresh();
          // single-choice questions on their own screen move on automatically
          if (!multi && screen.fields.length === 1 && !(f.other && o === f.other)) setTimeout(() => go(1), 320);
        },
      }, [el('span', { class: 'mark' }), el('span', { text: o })]);
      b.dataset.v = o;
      box.append(b);
    });
    wrap.append(box);
    if (f.other) {
      otherInput = el('input', { type: 'text', class: 'other-input', placeholder: f.otherPlaceholder || 'Please specify' });
      otherInput.value = answers[f.id + ' (other)'] || '';
      otherInput.hidden = !isOn(f.other);
      otherInput.addEventListener('input', () => { answers[f.id + ' (other)'] = otherInput.value; });
      wrap.append(otherInput);
    }
  } else if (f.type === 'textarea') {
    const t = el('textarea', { placeholder: 'Write as much or as little as you like…' });
    t.value = answers[f.id] || '';
    t.addEventListener('input', () => { answers[f.id] = t.value; });
    wrap.append(t);
  } else if (f.type === 'inputs') {
    const box = el('div', { class: 'inputs' });
    f.inputs.forEach((i) => {
      const inp = el('input', { type: 'text', placeholder: i.placeholder, autocomplete: 'off' });
      inp.value = answers[i.id] || '';
      inp.addEventListener('input', () => { answers[i.id] = inp.value; });
      box.append(inp);
    });
    wrap.append(box);
  }
  return wrap;
}

function rerenderConditional(screen, nextBtn) {
  const container = app.querySelector('.fields');
  screen.fields.forEach((f, idx) => {
    if (!f.showIf) return;
    const existing = container.querySelector(`[data-field="${idx}"]`);
    const show = f.showIf(answers);
    if (show && !existing) {
      const node = renderField(f, screen, nextBtn);
      node.dataset.field = idx;
      node.classList.add('reveal');
      const after = [...container.children].find((c) => +c.dataset.field > idx);
      container.insertBefore(node, after || null);
    } else if (!show && existing) {
      existing.remove();
    }
  });
  nextBtn.disabled = !screenDone(screen);
  updateProgress();
}

function updateProgress() {
  const qs = questionScreens();
  const s = SCREENS[current];
  const i = qs.indexOf(s);
  const done = s.type === 'submit' ? qs.length : Math.max(0, i);
  progressFill.style.width = (done / qs.length * 100) + '%';
  progressLabel.textContent = i >= 0 ? `${i + 1} / ${qs.length}` : '';
}

function show(index, dir = 1) {
  const old = app.firstElementChild;
  const render = () => {
    app.innerHTML = '';
    current = index;
    const s = SCREENS[index];
    topbar.hidden = s.type === 'intro' || s.type === 'thanks';
    backBtn.disabled = history.length === 0;
    const screen = buildScreen(s);
    if (dir < 0) screen.classList.add('back-dir');
    app.append(screen);
    window.scrollTo(0, 0);
    updateProgress();
    const first = screen.querySelector('textarea, input:not([hidden])');
    if (first && window.matchMedia('(hover: hover)').matches) first.focus({ preventScroll: true });
  };
  if (old) { old.classList.add('leaving'); setTimeout(render, 260); } else render();
}

function buildScreen(s) {
  if (s.type === 'intro') {
    return el('section', { class: 'screen intro' }, [
      el('div', { class: 'hero-img', role: 'img', 'aria-label': 'Chrome mouth jewellery by Coline Gros' }),
      el('p', { class: 'eyebrow', text: INTRO.eyebrow }),
      el('h1', { class: 'title', text: INTRO.title }),
      ...INTRO.paragraphs.map((p) => el('p', { class: 'body', text: p })),
      el('div', { class: 'meta' }, INTRO.meta.map((m) => el('span', { text: m }))),
      el('div', { class: 'actions' }, [el('button', { class: 'btn', type: 'button', text: INTRO.button, onclick: () => go(1) })]),
    ]);
  }
  if (s.type === 'section') {
    return el('section', { class: 'screen section-card' }, [
      el('div', { class: 'numeral', text: s.num }),
      el('h1', { class: 'title', text: s.title }),
      el('p', { text: s.text }),
      el('button', { class: 'btn chrome', type: 'button', text: 'Continue', onclick: () => go(1) }),
    ]);
  }
  if (s.type === 'submit') {
    const err = el('p', { class: 'error', hidden: '' });
    const btn = el('button', { class: 'btn', type: 'button', text: 'Send my answers', onclick: () => submit(btn, err) });
    return el('section', { class: 'screen section-card' }, [
      el('div', { class: 'numeral', text: '✦' }),
      el('h1', { class: 'title', text: 'All done' }),
      el('p', { text: 'Thank you for taking the time. You can go back to change anything, or send your answers now.' }),
      btn, err,
    ]);
  }
  if (s.type === 'thanks') {
    return el('section', { class: 'screen thanks' }, [
      el('div', { class: 'numeral', text: '✦' }),
      el('h1', { class: 'title', text: THANKS.title }),
      el('p', { text: THANKS.text }),
    ]);
  }
  // question screen
  const nextBtn = el('button', { class: 'btn', type: 'button', text: 'Next', onclick: () => go(1) });
  const fields = el('div', { class: 'fields' });
  s.fields.forEach((f, idx) => {
    if (f.showIf && !f.showIf(answers)) return;
    const node = renderField(f, s, nextBtn);
    node.dataset.field = idx;
    fields.append(node);
  });
  nextBtn.disabled = !screenDone(s);
  return el('section', { class: 'screen' }, [
    el('p', { class: 'q-section', text: s.section }),
    fields,
    el('div', { class: 'actions' }, [nextBtn, el('span', { class: 'enter-hint', text: 'or press Enter ↵' })]),
  ]);
}

function go(dir) {
  if (dir > 0) {
    const s = SCREENS[current];
    if (s.fields && !screenDone(s)) return;
    let n = current + 1;
    while (n < SCREENS.length && !visible(SCREENS[n])) n++;
    if (n >= SCREENS.length) return;
    history.push(current);
    show(n, 1);
  } else if (history.length) {
    show(history.pop(), -1);
  }
}

/* every field becomes a column, always in the same order */
function allFieldIds() {
  const ids = [];
  SCREENS.forEach((s) => (s.fields || []).forEach((f) => {
    if (f.type === 'inputs') f.inputs.forEach((i) => ids.push([i.id, s, f]));
    else {
      ids.push([f.id, s, f]);
      if (f.other) ids.push([f.id + ' (other)', s, f]);
    }
  }));
  return ids;
}

async function submit(btn, err) {
  if (submitting) return;
  submitting = true;
  btn.disabled = true; btn.textContent = 'Sending…'; err.hidden = true;
  const body = new URLSearchParams();
  allFieldIds().forEach(([id, s, f]) => {
    const active = visible(s) && (!f.showIf || f.showIf(answers));
    let v = active ? answers[id] : '';
    if (id.endsWith(' (other)')) {
      const parent = answers[f.id];
      const on = Array.isArray(parent) ? parent.includes(f.other) : parent === f.other;
      if (!on) v = '';
    }
    body.append(id, Array.isArray(v) ? v.join(', ') : (v || '').trim());
  });
  try {
    await fetch(ENDPOINT, { method: 'POST', mode: 'no-cors', body });
    history.length = 0;
    SCREENS.push({ type: 'thanks' });
    show(SCREENS.length - 1);
  } catch (e) {
    submitting = false;
    btn.disabled = false; btn.textContent = 'Try again';
    err.hidden = false; err.textContent = 'Something went wrong with the connection. Please check your internet and try again.';
  }
}

backBtn.addEventListener('click', () => go(-1));
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' || e.shiftKey || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'BUTTON') return;
  const s = SCREENS[current];
  if (s.fields || s.type === 'section' || s.type === 'intro') { e.preventDefault(); go(1); }
});

show(0);
