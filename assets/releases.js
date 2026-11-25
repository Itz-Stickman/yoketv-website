// Points the download buttons at the newest YokeTV release on GitHub, so a new version shows up
// without editing the site. The links in the HTML are the fallback if GitHub can't be reached.
(function () {
  var REPO = 'Itz-Stickman/yoketv-releases';
  var KEY = 'yoketv-latest';
  function apply(r) {
    if (!r || !r.assets) return;
    var find = function (re) { return r.assets.filter(function (a) { return re.test(a.name); })[0]; };
    var setup = find(/^YokeTV-Setup-.*\.exe$/i);
    var portable = find(/portable\.exe$/i);
    var version = String(r.tag_name || '').replace(/^v/i, '');
    if (setup) document.querySelectorAll('[data-dl="setup"]').forEach(function (a) { a.href = setup.browser_download_url; });
    if (portable) document.querySelectorAll('[data-dl="portable"]').forEach(function (a) { a.href = portable.browser_download_url; });
    if (version) document.querySelectorAll('[data-version]').forEach(function (el) { el.textContent = version; });
  }
  try {
    var hit = JSON.parse(sessionStorage.getItem(KEY) || 'null');
    if (hit && Date.now() - hit.t < 10 * 60 * 1000) return apply(hit.r);
  } catch (e) {}
  fetch('https://api.github.com/repos/' + REPO + '/releases/latest', { headers: { Accept: 'application/vnd.github+json' } })
    .then(function (res) { if (!res.ok) throw new Error('GitHub ' + res.status); return res.json(); })
    .then(function (r) {
      try { sessionStorage.setItem(KEY, JSON.stringify({ t: Date.now(), r: { tag_name: r.tag_name, assets: r.assets } })); } catch (e) {}
      apply(r);
    })
    .catch(function () {});
})();
