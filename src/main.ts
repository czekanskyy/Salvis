import './styles/index.scss';
import { setSelectedAreaCode, setServedAreaCodes, setUserAreaCode } from './registerForm';

let dataRequested = false;

const nav: HTMLDivElement = document.querySelector('.nav__links')!;
const logo: HTMLDivElement = document.querySelector('.nav__logo')!;
const countryCodeBtn: HTMLButtonElement = document.querySelector('.btn--select')!;
const countryCodeOptions: HTMLDivElement = document.querySelector('.options')!;
const countrySearch: HTMLInputElement = document.querySelector('#phone-search')!;
const currentPhone: HTMLButtonElement = document.querySelector('#select')!;
const modalElement: HTMLDivElement = document.querySelector('.modal')!;
const signupButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.btn--sign-up')!;
const HeroSection: HTMLElement = document.querySelector('.hero')!;
const HeroBgImage: HTMLImageElement = document.querySelector('.hero__bg')!;
const mobileMenuToggler: HTMLButtonElement = document.querySelector('.toggler')!;
const mobileMenu: HTMLDivElement = document.querySelector('.mobile-menu')!;

const fadeIn = (el: HTMLElement) => {
  el.classList.remove('hidden');
  setTimeout(() => {
    el.classList.add('fade');
  }, 10);
};

const fadeOut = (el: HTMLElement) => {
  el.classList.remove('fade');
  setTimeout(() => {
    el.classList.add('hidden');
  }, 250);
};

const handleHeroScroll = () => {
  const height = HeroSection.getBoundingClientRect().height;
  const bottom = HeroSection.getBoundingClientRect().bottom;
  const distance = Number((Math.round(Math.sqrt(bottom / height) * 100) / 100).toFixed(2));
  HeroBgImage.style.opacity = `${Math.pow(distance, 2)}`;
  HeroBgImage.style.transform = `scale(${2 - Math.sqrt(distance)})`;
};

const observerOptions = {
  root: null,
  threshold: 0.01,
  rootMargin: '0px',
};

const observerCallback = (entries: IntersectionObserverEntry[]) => {
  const isInView = entries[0].isIntersecting;
  // console.log(isInView);
  if (isInView) document.addEventListener('scroll', handleHeroScroll);
  else document.removeEventListener('scroll', handleHeroScroll);
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
observer.observe(HeroSection);

// Nav functionality
logo.addEventListener('click', () => document.querySelector('.hero')?.scrollIntoView({ behavior: 'smooth' }));

nav.addEventListener('click', e => {
  const target = e.target as HTMLElement;
  // console.log(target?.classList.contains('nav__link'));
  if (!target?.classList.contains('nav__link')) return;
  e.preventDefault();
  const href = target.getAttribute('href')!;
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
});

// Show Sign up modal
signupButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (!dataRequested) {
      setUserAreaCode(currentPhone);
      setServedAreaCodes(countryCodeOptions);
      dataRequested = true;
    }
    fadeIn(modalElement);
    document.body.classList.add('no-scroll');
  });
});

// Hide Sign up modal
modalElement.addEventListener('click', e => {
  const target = e.target as HTMLElement;
  if (target.classList.contains('modal--container') || target.closest('.btn--close-modal')) {
    fadeOut(modalElement);
    document.body.classList.remove('no-scroll');
  }
});

// Show / Hide country codes (phone) select menu
const showCountryCodes = function () {
  fadeIn(countryCodeOptions);
};
const hideCountryCodes = function () {
  fadeOut(countryCodeOptions);
};

countryCodeBtn.addEventListener('click', e => {
  e.preventDefault();
  countryCodeOptions.classList.contains('hidden') ? showCountryCodes() : hideCountryCodes();
});

countryCodeOptions.addEventListener('click', e => {
  const target = e.target as HTMLElement;
  if (target.closest('.country')) {
    setSelectedAreaCode(target.closest('.country')!, currentPhone);
    hideCountryCodes();
  }
});

// Search input
countrySearch.addEventListener('input', e => {
  const target = e.target as HTMLInputElement;
  const text = target.value;
  console.log(text);
});

mobileMenuToggler.addEventListener('click', () => {
  const icons: NodeListOf<HTMLImageElement> = mobileMenuToggler.querySelectorAll('img')!;
  icons.forEach(icon => {
    icon.classList.toggle('hidden');
  });
  document.body.classList.toggle('no-scroll');
  if (mobileMenu.classList.contains('hidden')) {
    fadeIn(mobileMenu);
  } else {
    fadeOut(mobileMenu);
  }
});
