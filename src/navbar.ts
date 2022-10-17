import { fadeIn, fadeOut } from './utilities';

const logo: HTMLDivElement = document.querySelector('.nav__logo')!;
const nav: HTMLDivElement = document.querySelector('.nav__links')!;
const navMobile: HTMLDivElement = document.querySelector('.nav__links--mobile')!;
const mobileMenuToggler: HTMLButtonElement = document.querySelector('.toggler')!;
const mobileMenu: HTMLDivElement = document.querySelector('.mobile-menu')!;
const icons: NodeListOf<HTMLImageElement> = mobileMenuToggler.querySelectorAll('img')!;

const showMobileMenu = () => {
  fadeIn(mobileMenu);
  icons[0].classList.add('hidden');
  icons[1].classList.remove('hidden');

  document.body.classList.add('no-scroll');
};
const hideMobileMenu = () => {
  fadeOut(mobileMenu);
  icons[0].classList.remove('hidden');
  icons[1].classList.add('hidden');

  document.body.classList.remove('no-scroll');
};

// Nav links functionality
logo.addEventListener('click', () => {
  document.querySelector('.hero')?.scrollIntoView({ behavior: 'smooth' });
  hideMobileMenu();
});

const scrollToSect = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  // console.log(target?.classList.contains('nav__link'));
  if (!target?.classList.contains('nav__link')) return;
  e.preventDefault();
  const href = target.getAttribute('href')!;
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
};

nav.addEventListener('click', scrollToSect);

navMobile.addEventListener('click', e => {
  scrollToSect(e);

  hideMobileMenu();
});

mobileMenuToggler.addEventListener('click', () => {
  if (mobileMenu.classList.contains('hidden')) {
    showMobileMenu();
  } else {
    hideMobileMenu();
  }
});

export {};
