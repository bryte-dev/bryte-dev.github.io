const PROJECTS = {
  smartjam: {
    status: { en: "TPI project · Prototype", fr: "Projet TPI · Prototype" },
    description: {
      en: "A C# desktop application that detects musical notes in real time from an audio signal. It combines audio capture, pitch detection, frequency-to-note conversion, signal meters, and the foundations of musical analysis.",
      fr: "Une application desktop en C# qui détecte les notes musicales en temps réel à partir d'un signal audio. Elle combine capture audio, détection de hauteur, conversion fréquence-note, vu-mètres et bases d'analyse musicale."
    },
    repo: "https://github.com/bryte-dev/SmartJam",
    repoLabel: { en: "View SmartJam on GitHub ↗", fr: "Voir SmartJam sur GitHub ↗" }
  },
  audioblocks: {
    status: { en: "Released · Desktop application", fr: "Publié · Application desktop" },
    description: {
      en: "A real-time virtual pedalboard with effects such as distortion, fuzz, reverb, delay, chorus, compression, and EQ. The project also includes presets, WAV recording, a metronome, and Windows publishing.",
      fr: "Un pédalier virtuel temps réel avec distortion, fuzz, reverb, delay, chorus, compression et égalisation. Le projet comprend aussi des presets, l'enregistrement WAV, un métronome et une version publiée pour Windows."
    },
    repo: "https://github.com/bryte-dev/AUDIOBLOCKS",
    repoLabel: { en: "View AudioBlocks on GitHub ↗", fr: "Voir AudioBlocks sur GitHub ↗" }
  },
  enigmai: {
    status: { en: "Prototype · Local AI", fr: "Prototype · IA locale" },
    description: {
      en: "A desktop riddle game using a local language model to generate riddles, answers, and hints. Electron connects the React interface to a Python FastAPI service running a local GGUF model through llama.cpp.",
      fr: "Un jeu d'énigmes desktop utilisant un modèle de langage local pour générer énigmes, réponses et indices. Electron relie l'interface React à un service Python FastAPI exécutant un modèle GGUF local avec llama.cpp."
    },
    repo: "https://github.com/bryte-dev/EnigmAI",
    repoLabel: { en: "View EnigmAI on GitHub ↗", fr: "Voir EnigmAI sur GitHub ↗" }
  },
  citypulse: {
    status: { en: "Product prototype · Marketing-focused", fr: "Prototype produit · Orienté marketing" },
    description: {
      en: "An event discovery platform created with a strong product and marketing focus. It explores how local events can be presented, organized, and promoted through a clear digital experience.",
      fr: "Une plateforme de découverte d'événements créée avec un fort accent produit et marketing. Elle explore comment présenter, organiser et promouvoir des événements locaux dans une expérience numérique claire."
    },
    repo: "https://github.com/bryte-dev/CityPulse",
    repoLabel: { en: "View CityPulse on GitHub ↗", fr: "Voir CityPulse sur GitHub ↗" }
  },
  flixmatch: {
    status: { en: "Full-stack prototype", fr: "Prototype full-stack" },
    description: {
      en: "A movie and TV show discovery platform inspired by the idea of Tinder for Movies. Users can search content, explore details, build watchlists, save favorites, and organize what they have seen.",
      fr: "Une plateforme de découverte de films et séries inspirée du concept Tinder for Movies. Les utilisateurs peuvent rechercher du contenu, consulter les détails, créer des watchlists, sauvegarder leurs favoris et organiser ce qu'ils ont vu."
    },
    repo: "https://github.com/bryte-dev/FlixMatch",
    repoLabel: { en: "View FlixMatch on GitHub ↗", fr: "Voir FlixMatch sur GitHub ↗" }
  },
  jamlog: {
    status: { en: "In progress · Full-stack", fr: "En développement · Full-stack" },
    description: {
      en: "A backend and frontend application for musicians to organize projects, songs, events, and shared files. The two repositories form the foundation of a collaborative music management platform.",
      fr: "Une application backend et frontend permettant aux musiciens d'organiser projets, morceaux, événements et fichiers partagés. Les deux dépôts forment la base d'une plateforme collaborative de gestion musicale."
    },
    repo: "https://github.com/bryte-dev/JamLog",
    repoLabel: { en: "View JamLog on GitHub ↗", fr: "Voir JamLog sur GitHub ↗" }
  }
};

let currentLanguage = localStorage.getItem("portfolio-language") || "en";

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const langToggle = document.querySelector("#langToggle");
const langLabel = document.querySelector("#langLabel");
const currentYear = document.querySelector("#current-year");
const ageValue = document.querySelector("#ageValue");
const revealElements = document.querySelectorAll(".reveal");
const modal = document.querySelector("#projectModal");
const modalBody = document.querySelector(".modal-body");
const modalClose = document.querySelector(".modal-close");
const modalOverlay = document.querySelector(".modal-overlay");
const mobileNavMediaQuery = window.matchMedia("(max-width: 720px)");

function calculateAge(birthDate) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) age -= 1;
  return age;
}

function updateAge() {
  if (ageValue) ageValue.textContent = String(calculateAge(new Date(2005, 7, 1)));
}

function updateLanguage() {
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll("[data-en][data-fr]").forEach((element) => {
    const value = element.dataset[currentLanguage];
    if (value !== undefined) element.textContent = value;
  });

  // Update resume link based on language
  const resumeButton = document.querySelector("#resumeButton");
  if (resumeButton) {
    const hrefKey = currentLanguage === "en" ? "enHref" : "frHref";
    const href = resumeButton.dataset[hrefKey];
    if (href) resumeButton.setAttribute("href", href);
  }

  if (langLabel) langLabel.textContent = currentLanguage === "en" ? "FR" : "EN";
  if (langToggle) langToggle.setAttribute("aria-label", currentLanguage === "en" ? "Passer en français" : "Switch to English");
  localStorage.setItem("portfolio-language", currentLanguage);
}

langToggle?.addEventListener("click", () => {
  currentLanguage = currentLanguage === "en" ? "fr" : "en";
  updateLanguage();
});

if (currentYear) currentYear.textContent = String(new Date().getFullYear());
updateAge();
updateLanguage();

function syncNavState() {
  if (!navLinks || !navToggle) return;
  if (mobileNavMediaQuery.matches) {
    const isOpen = navLinks.classList.contains("is-open");
    navLinks.setAttribute("aria-hidden", String(!isOpen));
    navToggle.setAttribute("aria-expanded", String(isOpen));
  } else {
    navLinks.classList.remove("is-open");
    navLinks.removeAttribute("aria-hidden");
    navToggle.setAttribute("aria-expanded", "false");
  }
}

navToggle?.addEventListener("click", () => {
  navLinks?.classList.toggle("is-open");
  syncNavState();
});
navLinks?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  navLinks.classList.remove("is-open");
  syncNavState();
}));
mobileNavMediaQuery.addEventListener?.("change", syncNavState);
syncNavState();

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => observer.observe(element));
}

function openProject(projectId) {
  const project = PROJECTS[projectId];
  if (!project || !modal || !modalBody) return;
  modalBody.innerHTML = `
    <p class="modal-status">${project.status[currentLanguage]}</p>
    <h2>${document.querySelector(`[data-project="${projectId}"] h3`)?.textContent || projectId}</h2>
    <p class="modal-description">${project.description[currentLanguage]}</p>
    <div class="tag-list">${[...document.querySelector(`[data-project="${projectId}"] .tag-list`).children].map((tag) => `<span>${tag.textContent}</span>`).join("")}</div>
    <a class="button modal-repo" href="${project.repo}" target="_blank" rel="noopener noreferrer">${project.repoLabel[currentLanguage]}</a>
  `;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modalClose?.focus();
}

function closeProject() {
  modal?.classList.remove("is-open");
  modal?.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

document.querySelectorAll(".project-expand").forEach((button) => {
  button.addEventListener("click", () => openProject(button.closest("[data-project]")?.dataset.project));
});
modalClose?.addEventListener("click", closeProject);
modalOverlay?.addEventListener("click", closeProject);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeProject();
});
