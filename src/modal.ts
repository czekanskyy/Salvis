import { fadeIn, fadeOut } from './utilities';
import { setServedAreaCodes, setUserAreaCode } from './registerForm';

const modalElement: HTMLDivElement = document.querySelector('.modal')!;
const openModalButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.btn--open-modal')!;
const currentPhone: HTMLButtonElement = document.querySelector('#select')!;
const countryCodeOptions: HTMLDivElement = document.querySelector('.options')!;

let dataRequested = false;

// Show Sign up modal
// on every "sign up" button click
openModalButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // this code makes sure that country data API is called only one time
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

export {};
