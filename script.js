document.querySelectorAll('.video').forEach(function (b) {
  b.addEventListener('click', function () {
    var f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + b.dataset.id + '?autoplay=1&rel=0';
    f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    // YouTube rejects embeds without a referrer (error 153); the page itself uses no-referrer.
    f.referrerPolicy = 'strict-origin-when-cross-origin';
    f.title = b.getAttribute('aria-label');
    b.replaceChildren(f);
  }, { once: true });
});
(function () {
  var links = [].slice.call(document.querySelectorAll('nav a[href^="#"]'));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  var current = null;
  function update() {
    var line = innerHeight * 0.35, active = null;
    sections.forEach(function (s, i) { if (s && s.getBoundingClientRect().top <= line) active = links[i]; });
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) active = links[links.length - 1];
    if (active === current) return;
    if (current) current.classList.remove('active');
    current = active;
    if (current) {
      current.classList.add('active');
      var bar = current.parentElement;
      bar.scrollTo({ left: current.offsetLeft - (bar.clientWidth - current.offsetWidth) / 2, behavior: 'smooth' });
    }
  }
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  update();
})();
// Numbers are stored reversed + base64 so they don't appear as plain text in the public repo.
document.querySelectorAll('.call[data-n]').forEach(function (a) {
  var n = atob(a.dataset.n).split('').reverse().join('');
  var local = '0' + n.slice(3);
  a.href = 'tel:+' + n;
  a.querySelector('span').textContent = local.slice(0, 3) + ' ' + local.slice(3, 6) + ' ' + local.slice(6);
});
document.querySelectorAll('.copy').forEach(function (b) {
  var label = b.textContent;
  b.addEventListener('click', function () {
    navigator.clipboard.writeText(b.dataset.copy).then(function () {
      b.textContent = b.dataset.done;
      setTimeout(function () { b.textContent = label; }, 1500);
    });
  });
});
