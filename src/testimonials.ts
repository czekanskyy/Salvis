const testimonials: NodeListOf<HTMLElement> = document.querySelectorAll('.testimonial');

const transforms = [0, 1024, 2048];

// Swithc to next testimonial and every nth (arr len) switch go to first one
const toggleTestimonials = () => {
  testimonials.forEach((testimonial, id) => {
    transforms[testimonials.length - 1] === 0 ? (transforms[id] += 2048) : (transforms[id] -= 1024);
    testimonial.style.transform = `translateX(${transforms[id]}px)`;
  });
};

// Every 8 seconds toggle testimonial to the next one
setInterval(toggleTestimonials, 8000);

export {};
