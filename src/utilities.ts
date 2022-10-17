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

export { fadeIn, fadeOut };
