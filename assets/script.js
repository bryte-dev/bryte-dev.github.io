const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const currentYear = document.querySelector("#current-year");
const revealElements = document.querySelectorAll(".reveal");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => {
    const { top } = element.getBoundingClientRect();
    if (top < window.innerHeight * 0.92) {
      element.classList.add("is-visible");
      return;
    }

    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
