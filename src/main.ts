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

const handleHeroScroll = (e: Event) => {
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

const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
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
  btn.addEventListener('click', e => {
    if (!dataRequested) {
      setUserAreaCode(currentPhone);
      setServedAreaCodes(countryCodeOptions);
      dataRequested = true;
    }
    modalElement.classList.remove('hidden');
    setTimeout(() => {
      modalElement.classList.add('fade');
    }, 10);
    document.body.classList.add('no-scroll');
  });
});

// Hide Sign up modal
modalElement.addEventListener('click', e => {
  const target = e.target as HTMLElement;
  if (target.classList.contains('modal--container') || target.closest('.btn--close-modal')) {
    modalElement.classList.remove('fade');
    setTimeout(() => {
      modalElement.classList.add('hidden');
    }, 250);
    document.body.classList.remove('no-scroll');
  }
});

// Show / Hide country codes (phone) select menu
const showCountryCodes = function () {
  countryCodeOptions.classList.remove('hidden');
  setTimeout(() => {
    countryCodeOptions.classList.add('fade');
  }, 10);
};
const hideCountryCodes = function () {
  countryCodeOptions.classList.remove('fade');
  setTimeout(() => {
    countryCodeOptions.classList.add('hidden');
  }, 250);
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
