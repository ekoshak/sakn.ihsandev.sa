document.querySelectorAll('.video').forEach(function (b) {
  b.addEventListener('click', function () {
    var f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + b.dataset.id + '?autoplay=1&rel=0';
    f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    f.title = b.getAttribute('aria-label');
    b.replaceChildren(f);
  }, { once: true });
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
