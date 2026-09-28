(function () {
  var items = document.querySelectorAll(
    '.letter img, .letter h1, .letter p, .letter .nav-button'
  );

  function showAll() {
    for (var i = 0; i < items.length; i++) {
      items[i].classList.add('is-visible');
    }
  }


  if (!('IntersectionObserver' in window)) {
    showAll();
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        entries[i].target.classList.add('is-visible');
        observer.unobserve(entries[i].target); 
      }
    }
  }, {
    threshold: 0,
    rootMargin: '0px 0px -40px 0px' 
  });

  for (var i = 0; i < items.length; i++) {
    observer.observe(items[i]);
  }
})();



(function () {
  var DURATION = 600;
  var buttons = document.querySelectorAll('.nav-button');
  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function attach(btn) {
    btn.addEventListener('click', function (e) {
      // Let ctrl/cmd/shift-click, middle-click, etc. behave normally
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      // Skip the animation for users who turned motion off
      if (reduceMotion) return;

      e.preventDefault();
      if (btn.classList.contains('is-jumping')) return; // ignore double-taps

      var href = btn.href;
      btn.classList.add('is-jumping');
      setTimeout(function () {
        window.location.href = href;
      }, DURATION);
    });

    btn.addEventListener('animationend', function () {
      btn.classList.remove('is-jumping');
    });
  }

  for (var i = 0; i < buttons.length; i++) attach(buttons[i]);

  // If someone presses the browser's Back button, iOS/macOS Safari may restore the
  // page from cache mid-animation; this resets the button.
  window.addEventListener('pageshow', function () {
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('is-jumping');
    }
  });
})();