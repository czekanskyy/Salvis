const nav: HTMLDivElement = document.querySelector('.nav__links')!;
const logo: HTMLDivElement = document.querySelector('.nav__logo')!;

// Nav links functionality
logo.addEventListener('click', () => document.querySelector('.hero')?.scrollIntoView({ behavior: 'smooth' }));

nav.addEventListener('click', e => {
  const target = e.target as HTMLElement;
  // console.log(target?.classList.contains('nav__link'));
  if (!target?.classList.contains('nav__link')) return;
  e.preventDefault();
  const href = target.getAttribute('href')!;
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
});

export {};
