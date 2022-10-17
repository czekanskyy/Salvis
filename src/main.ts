import './styles/index.scss';
import { setSelectedAreaCode, setServedAreaCodes, setUserAreaCode } from './registerForm';
import { fadeIn, fadeOut } from './utilities';
import './hero';
import './navbar';

let dataRequested = false;

const countryCodeBtn: HTMLButtonElement = document.querySelector('.btn--select')!;
const countryCodeOptions: HTMLDivElement = document.querySelector('.options')!;
const countrySearch: HTMLInputElement = document.querySelector('#phone-search')!;
const currentPhone: HTMLButtonElement = document.querySelector('#select')!;
const modalElement: HTMLDivElement = document.querySelector('.modal')!;
const signupButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.btn--sign-up')!;
const mobileMenuToggler: HTMLButtonElement = document.querySelector('.toggler')!;
const mobileMenu: HTMLDivElement = document.querySelector('.mobile-menu')!;

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
