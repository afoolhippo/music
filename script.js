const liveEvents = [
  {
    monthDay: '10.24',
    weekday: 'SAT',
    year: '2026',
    title: 'fun gumbo<br>「馬力音〜UMANONE〜」',
    venue: 'BLOWIN’ NEW SOUL',
    area: '福岡市東区馬出',
    start: '18:00',
    appearance: '18:50〜19:10',
    price: '2,000円＋別途オーダー'
  }
];

const liveList = document.querySelector('#liveList');

if (liveList) {
  liveList.innerHTML = liveEvents.slice(0, 3).map((event) => `
    <article class="notice-board">
      <p class="notice-board__date"><strong>${event.monthDay}</strong><span>${event.weekday}<br>${event.year}</span></p>
      <div class="notice-board__body">
        <h3>${event.title}</h3>
        <dl>
          <div><dt>会場</dt><dd>${event.venue}<br><small>${event.area}</small></dd></div>
          <div><dt>開演</dt><dd>${event.start}</dd></div>
          <div><dt>出演</dt><dd>a fool hippo<br><strong>${event.appearance}</strong></dd></div>
          <div><dt>料金</dt><dd>${event.price}</dd></div>
        </dl>
      </div>
    </article>
  `).join('');
}

const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

reveals.forEach((element) => observer.observe(element));

const heroVideo = document.querySelector('.hero__video');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (heroVideo && reduceMotion) {
  heroVideo.pause();
}

if (heroVideo && !reduceMotion) {
  let ticking = false;

  const updateHero = () => {
    const distance = Math.min(window.scrollY, window.innerHeight);
    const shift = distance * 0.08;
    const scale = 1.03 + distance * 0.00004;
    heroVideo.style.transform = `translateY(${shift}px) scale(${scale})`;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHero);
      ticking = true;
    }
  }, { passive: true });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  });
});
