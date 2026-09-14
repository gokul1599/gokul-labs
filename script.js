const username = "gokul1599";
const repoBase = "https://github.com/" + username + "/";

document.querySelectorAll("[data-repo]").forEach(link => {
  link.href = repoBase + link.dataset.repo;
});

["githubTop", "githubBottom"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.href = "https://github.com/" + username;
});

const email = "gokulkarpurapu@gmail.com";
const emailBtn = document.getElementById("emailBtn");
if (emailBtn) emailBtn.href = "mailto:" + email;

document.getElementById("year").textContent = new Date().getFullYear();

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav-links");
menuBtn?.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a => {
  a.addEventListener("click", () => nav.classList.remove("open"));
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
