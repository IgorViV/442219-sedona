var navMain = document.querySelector('.page-nav');
var navToggle = document.querySelector('.page-nav__toggle');

  navMain.classList.remove('page-nav--nojs');

  navToggle.addEventListener('click', function() {
    if (navMain.classList.contains('page-nav--closed')) {
      navMain.classList.remove('page-nav--closed');
      navMain.classList.add('page-nav--opened');
    } else {
      navMain.classList.add('page-nav--closed');
      navMain.classList.remove('page-nav--opened');
    }
  });
