const HeroSection: HTMLElement = document.querySelector('.hero')!;
const HeroBgImage: HTMLImageElement = document.querySelector('.hero__bg')!;

// Resize & change opacity of hero bg on scroll
const handleHeroScroll = () => {
  const height = HeroSection.getBoundingClientRect().height;
  const bottom = HeroSection.getBoundingClientRect().bottom;
  const distance = Number((Math.round(Math.sqrt(bottom / height) * 100) / 100).toFixed(2));
  HeroBgImage.style.opacity = `${Math.pow(distance, 2)}`;
  HeroBgImage.style.transform = `scale(${2 - Math.sqrt(distance)})`;
};

const observerCallback = (entries: IntersectionObserverEntry[]) => {
  const isInView = entries[0].isIntersecting;
  // Add / Remove scrolling handler based on observer isIntersecting to save some memory
  if (isInView) document.addEventListener('scroll', handleHeroScroll);
  else document.removeEventListener('scroll', handleHeroScroll);
};

const observer = new IntersectionObserver(observerCallback, {
  root: null,
  threshold: 0.01,
  rootMargin: '0px',
});

observer.observe(HeroSection);

export {};
