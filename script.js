/* Menu + theme + date (keeps original behavior) */
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
if (hamburger) hamburger.addEventListener("click", mobileMenu);
function mobileMenu(){hamburger.classList.toggle("active");navMenu.classList.toggle("active");}
const navLink = document.querySelectorAll(".nav-link");
navLink.forEach((n) => n.addEventListener("click", () => {hamburger.classList.remove("active");navMenu.classList.remove("active");}));
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
if (toggleSwitch) {
  const currentTheme = localStorage.getItem("theme") || null;
  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
    if (currentTheme === "dark") toggleSwitch.checked = true;
  }
  toggleSwitch.addEventListener("change", function (e) {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, false);
}
// date
let myDate = document.querySelector("#datee");
if (myDate) myDate.innerHTML = new Date().getFullYear();

/* Scroll reveal */
const sections = document.querySelectorAll("section, header, footer");
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("show-section"); } });
  }, { threshold: 0.18 });
  sections.forEach(sec => observer.observe(sec));
} else { sections.forEach(s => s.classList.add("show-section")); }

/* Card tilt */
const cards = document.querySelectorAll(".card");
cards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (x - cx) / cx;
    const dy = (y - cy) / cy;
    const rotX = (dy * 6).toFixed(2);
    const rotY = (dx * -6).toFixed(2);
    card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(6px)`;
    card.classList.add('tilt-hover');
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(0px)`;
    card.classList.remove('tilt-hover');
  });
});

/* Three.js hero particles */
(function initHeroParticles(){
  const hero = document.querySelector('#hero');
  const wrap = document.querySelector('#hero-canvas-wrap');
  if (!hero || !wrap || typeof THREE === 'undefined') return;
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
  renderer.setSize(hero.clientWidth, hero.clientHeight);
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  wrap.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, hero.clientWidth / hero.clientHeight, 0.1, 1000);
  camera.position.z = 6;
  const count = 700;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i*3] = (Math.random() - 0.5) * 20;
    positions[i*3 + 1] = (Math.random() - 0.5) * 8;
    positions[i*3 + 2] = (Math.random() - 0.5) * 10;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.035, transparent: true, opacity: 0.9 });
  const points = new THREE.Points(geometry, material);
  scene.add(points);
  const amb = new THREE.AmbientLight(0xffffff, 0.2); scene.add(amb);
  let time = 0;
  function animate() {
    time += 0.005;
    requestAnimationFrame(animate);
    points.rotation.y = Math.sin(time) * 0.12;
    points.rotation.x = Math.cos(time * 0.6) * 0.03;
    renderer.render(scene, camera);
  }
  animate();
  function resize() {
    const w = hero.clientWidth;
    const h = hero.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
})();

/* Optional: set resume nav link to download */
(function setResumeDownloadLink(){
  const navResume = document.querySelector('.nav-menu .btn-primary');
  if (navResume) { navResume.setAttribute('href', 'assets/resume.pdf'); navResume.setAttribute('download',''); }
})();
