const PRIVACY_CUTOFF_YEAR = new Date().getFullYear() - 100;
const DATA_URL = 'data/family.json';

let familyData = { persons: {}, families: {} };
let currentView = 'pedigree';

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

function isPrivate(person) {
  if (person.death?.date) return false;
  const birthYear = person.birth?.date ? parseInt(person.birth.date.slice(0,4)) : null;
  if (!birthYear) return true;
  return birthYear > PRIVACY_CUTOFF_YEAR;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  if (!m) return y;
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(m)-1]} ${d ? d+' ' : ''}${y}`;
}

function getLifeDates(person) {
  if (isPrivate(person)) return 'Living';
  const b = person.birth?.date ? formatDate(person.birth.date) : '?';
  const d = person.death?.date ? formatDate(person.death.date) : '';
  return d ? `${b} – ${d}` : `b. ${b}`;
}

function renderPedigree(rootId, generations = 4) {
  const container = $('#tree-root');
  container.innerHTML = '<ul class="tree"></ul>';
  const tree = $('.tree', container);

  let currentGen = [rootId];

  for (let g = 0; g < generations; g++) {
    if (!currentGen.length) break;

    const genUl = document.createElement('ul');
    genUl.className = 'generation';
    genUl.setAttribute('role', 'list');
    genUl.setAttribute('aria-label', `Generation ${g + 1}`);

    const nextGen = [];

    for (const pid of currentGen) {
      const person = familyData.persons[pid];
      if (!person) continue;

      const li = document.createElement('li');
      li.innerHTML = renderPersonCard(person, pid);
      li.querySelector('.person-card').addEventListener('click', () => openPerson(pid));
      genUl.appendChild(li);

      const famc = familyData.families[person.famc];
      if (famc) {
        if (famc.husb) nextGen.push(famc.husb);
        if (famc.wife) nextGen.push(famc.wife);
      }
    }

    tree.appendChild(genUl);
    currentGen = nextGen;
  }
}

function renderDescendants(rootId, maxGen = 3) {
  const container = $('#tree-root');
  container.innerHTML = '';

  function buildBranch(pid, depth) {
    const person = familyData.persons[pid];
    if (!person) return null;

    const ul = document.createElement('ul');
    ul.className = 'generation';
    ul.style.flexDirection = 'column';

    const li = document.createElement('li');
    li.innerHTML = renderPersonCard(person, pid);
    li.querySelector('.person-card').addEventListener('click', () => openPerson(pid));

    if (depth < maxGen) {
      const fams = person.fams || [];
      for (const fid of fams) {
        const fam = familyData.families[fid];
        if (!fam) continue;

        const spouseId = fam.husb === pid ? fam.wife : fam.husb;
        if (spouseId && familyData.persons[spouseId]) {
          const spouseLi = document.createElement('li');
          spouseLi.innerHTML = renderPersonCard(familyData.persons[spouseId], spouseId, true);
          spouseLi.querySelector('.person-card').addEventListener('click', () => openPerson(spouseId));
          ul.appendChild(spouseLi);
        }

        if (fam.children?.length) {
          const childUl = document.createElement('ul');
          childUl.className = 'generation';
          childUl.style.marginTop = '1rem';
          for (const cid of fam.children) {
            const branch = buildBranch(cid, depth + 1);
            if (branch) childUl.appendChild(branch);
          }
          if (childUl.children.length) {
            const wrapper = document.createElement('li');
            wrapper.appendChild(childUl);
            li.appendChild(wrapper);
          }
        }
      }
    }

    ul.appendChild(li);
    return ul;
  }

  const tree = buildBranch(rootId, 0);
  if (tree) {
    tree.className = 'tree';
    container.appendChild(tree);
  }
}

function renderPersonCard(person, pid, isSpouse = false) {
  const priv = isPrivate(person);
  const name = priv ? 'Living' : (person.name || 'Unknown');
  const dates = priv ? '' : getLifeDates(person);

  return `
    <div class="person-card ${isSpouse ? 'spouse' : ''}" tabindex="0" role="button" 
         aria-label="${name}${dates ? ', ' + dates : ''}" data-id="${pid}">
      <div class="name">${name}</div>
      ${dates ? `<div class="dates">${dates}</div>` : ''}
      ${priv ? '<span class="privacy-badge">Private</span>' : ''}
    </div>
  `;
}

function renderPeopleList() {
  const list = $('#people-list');
  list.innerHTML = '';

  const entries = Object.entries(familyData.persons)
    .sort((a, b) => a[1].name?.localeCompare(b[1].name));

  for (const [pid, person] of entries) {
    const priv = isPrivate(person);
    const li = document.createElement('li');
    li.innerHTML = `
      <div>
        <div style="font-weight:600">${priv ? 'Living' : (person.name || 'Unknown')}</div>
        <div style="font-size:0.875rem;color:var(--color-text-muted)">${getLifeDates(person)}</div>
      </div>
      ${priv ? '<span class="privacy-badge">Private</span>' : ''}
    `;
    li.addEventListener('click', () => openPerson(pid));
    list.appendChild(li);
  }
}

function openPerson(pid) {
  const person = familyData.persons[pid];
  if (!person) return;

  const priv = isPrivate(person);
  $('#modal-name').textContent = priv ? 'Living Person' : (person.name || 'Unknown');
  $('#modal-dates').textContent = getLifeDates(person);

  $('#modal-birth').textContent = priv ? 'Private' : 
    (person.birth ? `${formatDate(person.birth.date)}${person.birth.place ? ' — ' + person.birth.place : ''}` : 'Unknown');

  $('#modal-death').textContent = priv ? 'Private' :
    (person.death ? `${formatDate(person.death.date)}${person.death.place ? ' — ' + person.death.place : ''}` : '—');

  let spouseText = '—';
  const fams = person.fams || [];
  if (!priv && fams.length) {
    const spouses = fams.map(fid => {
      const fam = familyData.families[fid];
      if (!fam) return null;
      const sid = fam.husb === pid ? fam.wife : fam.husb;
      return sid ? (familyData.persons[sid]?.name || 'Unknown') : null;
    }).filter(Boolean);
    if (spouses.length) spouseText = spouses.join(', ');
  }
  $('#modal-spouse').textContent = priv ? 'Private' : spouseText;

  let childrenText = '—';
  if (!priv && fams.length) {
    const children = fams.flatMap(fid => {
      const fam = familyData.families[fid];
      return fam?.children?.map(cid => familyData.persons[cid]?.name || 'Unknown') || [];
    });
    if (children.length) childrenText = children.join(', ');
  }
  $('#modal-children').textContent = priv ? 'Private' : childrenText;

  $('#person-modal').showModal();
}

function initSearch() {
  const input = $('#search-input');
  const results = $('#search-results');

  input.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (!q) {
      results.hidden = true;
      return;
    }

    const matches = Object.entries(familyData.persons)
      .filter(([_, p]) => !isPrivate(p) && p.name?.toLowerCase().includes(q))
      .slice(0, 8);

    results.innerHTML = matches.map(([pid, p]) => `
      <li><button type="button" data-pid="${pid}">${p.name} <span style="color:var(--color-text-muted)">(${getLifeDates(p)})</span></button></li>
    `).join('');

    results.hidden = matches.length === 0;

    $$('button', results).forEach(btn => {
      btn.addEventListener('click', () => {
        openPerson(btn.dataset.pid);
        results.hidden = true;
        input.value = '';
      });
    });
  });

  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !results.contains(e.target)) {
      results.hidden = true;
    }
  });
}

function initNav() {
  const toggle = $('#menu-toggle');
  const navList = $('#nav-list');

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !expanded);
    navList.classList.toggle('open');
  });

  $$('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.view-btn').forEach(b => {
        b.setAttribute('aria-pressed', 'false');
        b.classList.remove('active');
      });
      btn.setAttribute('aria-pressed', 'true');
      btn.classList.add('active');
      currentView = btn.dataset.view;

      const rootId = Object.keys(familyData.persons)[0];
      if (currentView === 'pedigree') renderPedigree(rootId);
      else renderDescendants(rootId);
    });
  });

  $$('.nav-list a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href').slice(1);

      $$('main > section').forEach(s => s.hidden = true);
      $(`#${target}`).hidden = false;

      $$('.nav-list a').forEach(l => l.removeAttribute('aria-current'));
      link.setAttribute('aria-current', 'page');

      navList.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');

      if (target === 'people') renderPeopleList();
    });
  });

  $('.modal-close').addEventListener('click', () => $('#person-modal').close());
  $('#person-modal').addEventListener('click', (e) => {
    if (e.target === $('#person-modal')) $('#person-modal').close();
  });
}

async function init() {
  try {
    const res = await fetch(DATA_URL);
    familyData = await res.json();
  } catch (e) {
    console.warn('No data file found, using demo data');
    familyData = getDemoData();
  }

  initNav();
  initSearch();

  const rootId = Object.keys(familyData.persons)[0] || 'I1';
  renderPedigree(rootId);
}

function getDemoData() {
  return {
    persons: {
      "I1": { name: "Eleanor Rigby", birth: { date: "1920-03-15", place: "Liverpool, England" }, death: { date: "1995-07-22", place: "Portland, OR" }, sex: "F", fams: ["F1"], famc: "F2" },
      "I2": { name: "Maxwell Edison", birth: { date: "1918-11-02", place: "London, England" }, death: { date: "1988-04-10" }, sex: "M", fams: ["F1"], famc: "F3" },
      "I3": { name: "Joan Edison", birth: { date: "1945-06-01", place: "Portland, OR" }, sex: "F", fams: ["F4"], famc: "F1" },
      "I4": { name: "Robert Edison", birth: { date: "1948-09-12", place: "Portland, OR" }, sex: "M", famc: "F1" },
      "I5": { name: "Desmond Jones", birth: { date: "1942-01-30", place: "Seattle, WA" }, sex: "M", fams: ["F4"], famc: "F5" },
      "I6": { name: "Molly Jones", birth: { date: "1970-05-15", place: "Portland, OR" }, sex: "F", famc: "F4" },
      "I7": { name: "Arthur Rigby", birth: { date: "1890-12-03", place: "Liverpool, England" }, death: { date: "1965-08-19" }, sex: "M", fams: ["F2"], famc: "F6" },
      "I8": { name: "Martha Rigby", birth: { date: "1895-04-22", place: "Manchester, England" }, death: { date: "1972-11-30" }, sex: "F", fams: ["F2"] },
      "I9": { name: "George Edison", birth: { date: "1885-07-14", place: "London, England" }, death: { date: "1955-03-03" }, sex: "M", fams: ["F3"] },
      "I10": { name: "Dorothy Edison", birth: { date: "1892-10-08", place: "Bristol, England" }, death: { date: "1960-12-25" }, sex: "F", fams: ["F3"] }
    },
    families: {
      "F1": { husb: "I2", wife: "I1", children: ["I3", "I4"] },
      "F2": { husb: "I7", wife: "I8", children: ["I1"] },
      "F3": { husb: "I9", wife: "I10", children: ["I2"] },
      "F4": { husb: "I5", wife: "I3", children: ["I6"] },
      "F5": {},
      "F6": {}
    }
  };
}

init();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}