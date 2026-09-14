const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

$("#year").textContent = new Date().getFullYear();

const menu = $(".menu");
const nav = $("#nav");
menu?.addEventListener("click", () => nav.classList.toggle("open"));
$$("nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
$$(".reveal").forEach(el => observer.observe(el));

const glow = $(".cursor-glow");
window.addEventListener("pointermove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

const canvas = $("#particles");
const ctx = canvas.getContext("2d");
let particles = [];
function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  const count = Math.min(75, Math.floor(innerWidth / 18));
  particles = Array.from({length: count}, () => ({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*1.3 + .3,
    vx: (Math.random()-.5)*.16,
    vy: (Math.random()-.5)*.16
  }));
}
function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "rgba(181,255,77,.38)";
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if(p.x<0)p.x=canvas.width;if(p.x>canvas.width)p.x=0;
    if(p.y<0)p.y=canvas.height;if(p.y>canvas.height)p.y=0;
    ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
  });
  requestAnimationFrame(draw);
}
resize(); draw(); addEventListener("resize", resize);

$$("a[href^='#']").forEach(link => {
  link.addEventListener("click", e => {
    const target = $(link.getAttribute("href"));
    if(target){ e.preventDefault(); target.scrollIntoView({behavior:"smooth"}); }
  });
});
