(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var INK = '#1E2023', PAPER = '#F1EFE9', STONE = '#DEDACF', MOSS = '#4F6048';

  /* ---------- elevation drawings (all shapes are paths so they can draw themselves) ---------- */
  var n;
  function P(d, fill, w) {
    return '<path style="--i:' + (n++) + '" pathLength="1" d="' + d + '" fill="' + (fill || 'none') + '" stroke="' + INK + '" stroke-width="' + (w || 2) + '" stroke-linejoin="round" stroke-linecap="round"/>';
  }
  function R(x, y, w, h, fill, sw) { return P('M' + x + ' ' + y + 'h' + w + 'v' + h + 'h' + (-w) + 'z', fill, sw); }
  function person(x) { return P('M' + x + ' 340v-20M' + x + ' 340l-5 -20M' + x + ' 340l5 -20M' + x + ' 320v-16', 'none', 1.6) + P('M' + (x - 4) + ' 298a4 4 0 1 0 8 0a4 4 0 1 0 -8 0', INK, 1); }

  var SHAPES = {
    house: function () {
      var g = R(150, 170, 300, 170, PAPER);
      g += P('M120 172L300 78L480 172z', MOSS);
      for (var i = 0; i < 3; i++) g += R(176 + i * 76, 200, 48, 64, STONE);
      g += R(176, 200, 48, 64, STONE) + P('M200 200v64M176 232h48', 'none', 1.5);
      g += R(396, 236, 44, 104, INK);
      g += P('M330 140a12 12 0 1 0 24 0a12 12 0 1 0 -24 0', STONE, 1.6);
      return g;
    },
    tower: function () {
      var g = R(150, 286, 300, 54, STONE) + R(230, 40, 140, 246, PAPER);
      for (var r = 1; r < 10; r++) g += P('M230 ' + (40 + r * 24.6) + 'h140', 'none', 1.4);
      for (var c = 1; c < 4; c++) g += P('M' + (230 + c * 35) + ' 40v246', 'none', 1.2);
      for (var b = 0; b < 3; b++) g += R(230, 64.6 + b * 98.4, 140, 24.6, MOSS);
      g += R(200, 296, 200, 44, 'none') + P('M300 296v44M250 296v44M350 296v44', 'none', 1.4);
      g += P('M270 40V18h60v22', 'none');
      return g;
    },
    pavilion: function () {
      var g = R(90, 150, 420, 16, INK) + R(104, 132, 392, 18, MOSS);
      g += R(176, 166, 248, 174, STONE);
      for (var i = 1; i < 6; i++) g += P('M' + (176 + i * 41.3) + ' 166v174', 'none', 1.3);
      g += P('M176 252h248', 'none', 1.3);
      [112, 150, 442, 480].forEach(function (x) { g += R(x, 166, 8, 174, INK); });
      g += R(262, 280, 76, 60, PAPER);
      return g;
    },
    barrel: function () {
      var g = R(90, 140, 420, 34, MOSS) + R(90, 174, 420, 166, PAPER);
      for (var i = 0; i < 5; i++) {
        var x = 108 + i * 78;
        g += P('M' + x + ' 340V252a30 30 0 0 1 60 0V340', STONE);
        g += P('M' + (x + 30) + ' 222V340', 'none', 1.2);
      }
      return g;
    },
    terrace: function () {
      var g = '';
      var steps = [[80, 280, 440], [130, 220, 340], [180, 160, 240], [230, 100, 140]];
      steps.forEach(function (s, i) {
        g += R(s[0], s[1], s[2], 60, i % 2 ? STONE : PAPER);
        var w = Math.floor(s[2] / 70);
        for (var k = 0; k < w; k++) g += R(s[0] + 22 + k * 70, s[1] + 18, 36, 30, i % 2 ? PAPER : STONE, 1.6);
        g += R(s[0] - 6, s[1] - 12, s[2] + 12, 12, MOSS);
      });
      return g;
    },
    saw: function () {
      var g = R(90, 236, 420, 104, PAPER);
      for (var i = 0; i < 4; i++) {
        var x = 90 + i * 105;
        g += P('M' + x + ' 236V150L' + (x + 105) + ' 236z', STONE);
        g += P('M' + x + ' 150V236', 'none', 5) + P('M' + x + ' 160V230', MOSS, 8);
      }
      g += R(120, 270, 70, 70, INK) + R(220, 270, 90, 36, STONE) + R(350, 270, 120, 36, STONE);
      return g;
    }
  };

  function drawing(type, opts) {
    opts = opts || {};
    n = 0;
    var body = SHAPES[type]();
    return '<svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg"><g class="' + (opts.anim ? 'draw' : '') + '">' +
      P('M0 340H600', 'none', 3) + body + person(548) + '</g></svg>';
  }

  /* ---------- projects ---------- */
  var PROJECTS = [
    { slug: 'maison-aubier', name: 'Maison Aubier', cat: 'Housing', place: 'Caluire, France', year: '2025', area: '240 m²', status: 'Completed', shape: 'house',
      lead: 'A family house shaped by a single sloping roof and a deep, shaded porch.',
      body: 'The brief asked for a home that could host three generations. We stacked quiet rooms on the garden side and opened the living spaces toward the south through a long glazed gallery.\nThe roof is covered in moss-coloured standing-seam zinc that ages with the oak joinery. Rain is collected in a stone basin that doubles as a seat by the door.' },
    { slug: 'tour-des-vignes', name: 'Tour des Vignes', cat: 'Housing', place: 'Bordeaux, France', year: '2024', area: '6,800 m²', status: 'Completed', shape: 'tower',
      lead: 'A slender residential tower with a public ground floor and planted sky terraces.',
      body: 'Thirty-two apartments are organised around a naturally ventilated core. Every third floor opens onto a planted terrace shared by the residents above and below.\nAt street level the podium holds a bakery, a bike workshop and a small library that the neighbourhood already treats as its own.' },
    { slug: 'pavillon-lenoir', name: 'Pavillon Lenoir', cat: 'Cultural', place: 'Nantes, France', year: '2025', area: '380 m²', status: 'Completed', shape: 'pavilion',
      lead: 'A glass pavilion for exhibitions and concerts, covered by a planted roof.',
      body: 'Four slender columns carry a thin slab and a meadow roof. The glazed facade folds away in summer so the hall becomes an open shelter in the park.\nInside, the acoustic ceiling is made of recycled wool felt cut into long slats. It softens the room without hiding the structure.' },
    { slug: 'halle-des-arches', name: 'Halle des Arches', cat: 'Cultural', place: 'Marseille, France', year: '2023', area: '2,100 m²', status: 'Completed', shape: 'barrel',
      lead: 'A covered market built from a rhythm of low brick vaults.',
      body: 'Sixty stalls sit under a sequence of shallow vaults that bring daylight deep inside. The structure was built by local masons with bricks fired less than forty kilometres away.\nIn the evening the hall turns into a public room: long tables come out, and the arches are lit from below.' },
    { slug: 'terrasses-du-roc', name: 'Terrasses du Roc', cat: 'Housing', place: 'Annecy, France', year: '2026', area: '3,200 m²', status: 'On site', shape: 'terrace',
      lead: 'Thirty-six apartments stepping down a hillside, each with its own garden.',
      body: 'Instead of fighting the slope, the building follows it. Every apartment has a planted terrace on the roof of the one below, and all living rooms face the lake.\nThe structure is cross-laminated timber on a concrete base, which cut embodied carbon by almost forty percent compared to the first scheme.' },
    { slug: 'fabrique-sud', name: 'Fabrique Sud', cat: 'Workspace', place: 'Toulouse, France', year: '2024', area: '1,450 m²', status: 'Completed', shape: 'saw',
      lead: 'A 1950s workshop turned into a studio campus for forty small companies.',
      body: 'We kept the sawtooth roof and its north-facing glazing, which still gives the best working light in the city. New plywood volumes slot in as meeting rooms and kitchens without touching the old walls.\nThe central aisle stayed empty on purpose. It is now the studio street, with a shared workshop at one end and a cafe at the other.' }
  ];

  /* ---------- menu ---------- */
  var burger = $('#burger'), menu = $('#menu');
  if (burger) {
    var setMenu = function (o) { menu.classList.toggle('open', o); burger.setAttribute('aria-expanded', o); burger.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); };
    burger.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
    $$('#menu a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  }

  /* ---------- home ---------- */
  var sky = $('#skyline');
  if (sky) {
    var tiles = ['house', 'tower', 'pavilion'].map(function (t, i) {
      n = i * 40;
      return '<g transform="translate(' + (i * 600) + ' 0)"><g class="draw">' + P('M0 340H600', 'none', 3) + SHAPES[t]() + (i === 2 ? person(548) : '') + '</g></g>';
    }).join('');
    sky.innerHTML = '<svg viewBox="0 0 1800 400" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg">' + tiles + '</svg>';
  }

  var list = $('#list');
  if (list) {
    list.innerHTML = PROJECTS.map(function (p) {
      return '<a class="row" href="project.html?p=' + p.slug + '" data-cat="' + p.cat + '">' +
        '<div class="r-head"><h3>' + p.name + '</h3><span class="pl">' + p.place + '</span><span class="pl">' + p.cat + '</span><span class="yr">' + p.year + '</span></div>' +
        '<div class="reveal"><div><div class="r-body">' + drawing(p.shape) + '<div><p>' + p.lead + '</p><b>View project</b></div></div></div></div></a>';
    }).join('');
    $('#chips').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      $$('#chips button').forEach(function (x) { x.classList.toggle('on', x === b); });
      $$('.row', list).forEach(function (r) { r.hidden = b.dataset.f !== 'all' && r.dataset.cat !== b.dataset.f; });
    });
  }

  /* ---------- project page ---------- */
  var holder = $('#project');
  if (holder) {
    var slug = new URLSearchParams(location.search).get('p');
    var idx = PROJECTS.map(function (p) { return p.slug; }).indexOf(slug);
    if (idx < 0) idx = 0;
    var p = PROJECTS[idx], nx = PROJECTS[(idx + 1) % PROJECTS.length];
    document.title = p.name + ' | Atelier Vérane';
    $('#pName').textContent = p.name;
    $('#pSub').textContent = p.lead;
    $('#pArt').innerHTML = drawing(p.shape, { anim: true });
    $('#pArt').setAttribute('aria-label', 'Elevation drawing of ' + p.name);
    $('#pMeta').innerHTML = [['Type', p.cat], ['Location', p.place], ['Year', p.year], ['Area', p.area], ['Status', p.status]].map(function (m) { return '<div><dt>' + m[0] + '</dt><dd>' + m[1] + '</dd></div>'; }).join('');
    var paras = p.body.split('\n');
    $('#pText').innerHTML = '<p>' + p.lead + '</p><div>' + paras.map(function (t) { return '<p>' + t + '</p>'; }).join('') + '</div>';
    var nxt = $('#pNext'); nxt.href = 'project.html?p=' + nx.slug; nxt.innerHTML = '<small>Next project</small><strong>' + nx.name + '</strong>';
  }

  /* ---------- contact: set data-endpoint on the form (Formspree, Web3Forms...) ---------- */
  var f = $('#contactForm');
  if (f) {
    var msg = $('.msg', f);
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!f.name.value.trim() || !/^\S+@\S+\.\S+$/.test(f.email.value.trim()) || !f.message.value.trim()) { msg.textContent = 'Please complete your name, a valid email and a few words about the project.'; return; }
      if (f.botcheck.value) return;
      var ok = function () { msg.textContent = 'Thank you. We have your message and will reply within two working days.'; f.reset(); };
      if (!f.dataset.endpoint) { ok(); return; }
      msg.textContent = 'Sending...';
      fetch(f.dataset.endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(f) })
        .then(function (r) { if (!r.ok) throw 0; ok(); })
        .catch(function () { msg.textContent = 'Something went wrong. Please write to studio@atelier-verane.com.'; });
    });
  }
})();
