// Loading Screen
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 3000);
});

// Progress Bar + Header Scroll + Parallax
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrolled / maxHeight) * 100;
  document.getElementById('progressBar').style.width = progress + '%';
  
  // Header effect
  const header = document.getElementById('header');
  if (scrolled > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  
  /*
window.addEventListener('scroll' , () =>{
    const scrolled = window.pageYOffset
    const maxh = document.documentElement.scrollHeight - window.innerHeight

    const progress = (scrolled / maxh)* 100;

    document.getElementById('progress').style.width = progress + '%'

    //header fix

  const header = document.getElementById('header')

  if(scrolled > 100){
    header.classList.add('scrolled')

  }else{
    header.classList.remove('scrolled')
  }
*/
  //parallax

  const herobg = document.getElementById('herobg')

  if(herobg){
  herobg.style.transform = `translateY(${scrolled * .5}px)`
  }
})

// nav + sidebar

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

// Toggle menu
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('active') && 
      !navLinks.contains(e.target) && 
      !navToggle.contains(e.target)) {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
  }
});






// Particle Generation
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
    particlesContainer.appendChild(particle);
  }
}

// Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.05,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Stagger child animations
      const children = entry.target.querySelectorAll('.feature-card, .gallery-item, .team-card, .timeline-item, .stat-item');
      children.forEach((child, index) => {
        setTimeout(() => {
          child.classList.add('visible');
        }, index * 20);
      });
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section, .feature-card, .gallery-item, .team-card, .timeline-item, .stat-item').forEach(el => {
  observer.observe(el);
});

// Counter Animation
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 400;
  const increment = target / (duration / 16);
  let current = 0;
  
  const updateCounter = () => {
    current += increment;
    if (current < target) {
      el.textContent = Math.floor(current).toLocaleString() + '+';
      requestAnimationFrame(updateCounter);
    } else {
      el.textContent = target.toLocaleString() + '+';
    }
  };
  updateCounter();
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      const number = entry.target.querySelector('.stat-number');
      animateCounter(number);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(item => statsObserver.observe(item));

// 3D Tilt Effect for Gallery
document.querySelectorAll('.gallery-item').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });
});

// Magnetic Button Effect
document.querySelectorAll('.cta-btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
  
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
});

// Testimonials Auto-Carousel
let currentTestimonial = 0;
const testimonialTrack = document.getElementById('testimonialTrack');
const totalTestimonials = document.querySelectorAll('.testimonial').length;

if (testimonialTrack && totalTestimonials > 0) {
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    testimonialTrack.style.transform = `translateX(-${currentTestimonial * 100}%)`;
  }, 5000);
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
