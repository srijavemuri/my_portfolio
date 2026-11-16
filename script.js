"use strict";

const CONTACT_EMAIL = "srijavemuri07@gmail.com";
const WHATSAPP_NUMBER = "";
const PROFILE_URLS = {
  github: "https://github.com/srijavemuri",
  linkedin: "https://www.linkedin.com/in/srija-vemuri-2a848a2b2/"
};
const CERTIFICATES = [
  // Add real records here after placing each file in the project (for example, certificates/name.pdf).
  // Example only — replace every value with verified details before uncommenting:
  // { company: "REPLACE WITH COMPANY", role: "REPLACE WITH ROLE", date: "REPLACE WITH DATE", file: "certificates/REPLACE-ME.pdf", category: "internship", format: "pdf" }
];
const SKILL_LEVELS = {
  // Add a self-assessed integer from 1 to 100 to show a skill indicator.
  Java: null,
  Python: null,
  SQL: null,
  HTML: null,
  CSS: null,
  JavaScript: null,
  "Node.js": null,
  "Express.js": null,
  MongoDB: null,
  "Machine Learning": null,
  "Data Analysis": null
};
const ANALYTICS = {
  // Optional: set both values for your own Umami instance. No analytics loads by default.
  scriptUrl: "",
  websiteId: ""
};

const root = document.documentElement;
const body = document.body;
const themeButton = document.getElementById("theme-toggle");
const themeLabel = themeButton?.querySelector("span");
const themeIcon = themeButton?.querySelector(".theme-icon");
const menuButton = document.querySelector(".menu-toggle");
const navPanel = document.getElementById("primary-navigation");
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const progressBar = document.getElementById("scroll-progress-bar");
const backToTopButton = document.getElementById("back-to-top");
const whatsappButton = document.getElementById("whatsapp-button");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

document.getElementById("year").textContent = String(new Date().getFullYear());

document.querySelectorAll("[data-profile-link]").forEach((link) => {
  const profileUrl = PROFILE_URLS[link.dataset.profileLink];
  if (profileUrl) {
    link.href = profileUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  } else {
    link.hidden = true;
  }
});

document.querySelectorAll("[data-contact-email]").forEach((link) => {
  const query = new URL(link.href).search;
  link.href = `mailto:${CONTACT_EMAIL}${query}`;
  const address = link.querySelector(".email-address");
  if (address) address.textContent = CONTACT_EMAIL;
});

const certificateGrid = document.getElementById("certificate-grid");
const certificateEmpty = document.getElementById("certificate-empty");
const certificateDialog = document.getElementById("certificate-dialog");
const certificateDialogTitle = document.getElementById("certificate-dialog-title");
const certificateDialogContent = document.getElementById("certificate-dialog-content");
const certificateDialogActions = document.getElementById("certificate-dialog-actions");

function certificateType(certificate) {
  if (certificate.format === "pdf") return "pdf";
  if (certificate.format === "image") return "image";
  return /\.pdf(?:$|[?#])/i.test(certificate.file) ? "pdf" : "image";
}

function makeCertificatePreview(certificate, isDialog) {
  const type = certificateType(certificate);
  if (type === "pdf") {
    const frame = document.createElement("iframe");
    frame.src = `${certificate.file}#toolbar=0&navpanes=0`;
    frame.title = `${certificate.company} certificate preview`;
    frame.loading = "lazy";
    return frame;
  }

  const image = document.createElement("img");
  image.src = certificate.file;
  image.alt = `${certificate.company}${certificate.role ? ` — ${certificate.role}` : ""} certificate`;
  image.loading = isDialog ? "eager" : "lazy";
  image.onerror = () => {
    const fallback = document.createElement("span");
    fallback.className = "certificate-preview-fallback";
    fallback.textContent = "Certificate image could not be loaded.";
    image.replaceWith(fallback);
  };
  return image;
}

function openCertificatePreview(index) {
  const certificate = CERTIFICATES[index];
  if (!certificate) return;

  certificateDialogTitle.textContent = certificate.company;
  certificateDialogContent.replaceChildren(makeCertificatePreview(certificate, true));
  certificateDialogActions.replaceChildren();

  const viewLink = document.createElement("a");
  viewLink.href = certificate.file;
  viewLink.target = "_blank";
  viewLink.rel = "noopener noreferrer";
  viewLink.textContent = "Open original";
  certificateDialogActions.append(viewLink);

  const downloadLink = document.createElement("a");
  downloadLink.href = certificate.file;
  downloadLink.download = certificate.file.split("/").pop().split(/[?#]/)[0] || "certificate";
  downloadLink.textContent = "Download certificate";
  certificateDialogActions.append(downloadLink);

  certificateDialog.showModal();
}

function renderCertificates() {
  CERTIFICATES.forEach((certificate, index) => {
    const card = document.createElement("article");
    card.className = "certificate-card glass-panel";

    const preview = document.createElement("button");
    preview.className = "certificate-preview";
    preview.type = "button";
    preview.setAttribute("aria-label", `View certificate from ${certificate.company}`);
    preview.append(makeCertificatePreview(certificate, false));
    const previewAction = document.createElement("span");
    previewAction.className = "certificate-preview-action";
    previewAction.textContent = "View certificate";
    preview.append(previewAction);
    preview.addEventListener("click", () => openCertificatePreview(index));
    card.append(preview);

    const body = document.createElement("div");
    body.className = "certificate-card-body";
    const kicker = document.createElement("p");
    kicker.className = "certificate-card-kicker";
    kicker.textContent = certificate.category === "internship" ? "Internship" : "Certification";
    const company = document.createElement("h3");
    company.textContent = certificate.company;
    body.append(kicker, company);

    if (certificate.role) {
      const role = document.createElement("p");
      role.className = "certificate-role";
      role.textContent = certificate.role;
      body.append(role);
    }
    if (certificate.date || certificate.duration) {
      const date = document.createElement("p");
      date.className = "certificate-date";
      date.textContent = certificate.date || certificate.duration;
      body.append(date);
    }

    const actions = document.createElement("div");
    actions.className = "certificate-card-actions";
    const viewButton = document.createElement("button");
    viewButton.type = "button";
    viewButton.textContent = "View certificate ↗";
    viewButton.addEventListener("click", () => openCertificatePreview(index));
    const downloadLink = document.createElement("a");
    downloadLink.href = certificate.file;
    downloadLink.download = certificate.file.split("/").pop().split(/[?#]/)[0] || "certificate";
    downloadLink.textContent = "Download ↓";
    actions.append(viewButton, downloadLink);
    body.append(actions);
    card.append(body);
    certificateGrid.append(card);
  });

  certificateEmpty.hidden = CERTIFICATES.length > 0;
  certificateGrid.hidden = CERTIFICATES.length === 0;
}

renderCertificates();
document.querySelector(".certificate-dialog-close")?.addEventListener("click", () => certificateDialog.close());
certificateDialog?.addEventListener("click", (event) => {
  if (event.target === certificateDialog) certificateDialog.close();
});

function setTheme(theme) {
  const isLight = theme === "light";
  body.classList.toggle("light-mode", isLight);
  root.style.colorScheme = isLight ? "light" : "dark";
  if (themeLabel) themeLabel.textContent = isLight ? "Dark mode" : "Light mode";
  if (themeButton) themeButton.setAttribute("aria-label", `Switch to ${isLight ? "dark" : "light"} theme`);
  if (themeIcon) {
    themeIcon.innerHTML = isLight
      ? '<path d="M20.2 15.5A8.5 8.5 0 0 1 8.5 3.8 8.5 8.5 0 1 0 20.2 15.5Z"></path>'
      : '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"></path>';
  }
}

let storedTheme = null;
try {
  storedTheme = localStorage.getItem("srija-theme");
} catch (error) {
  console.warn("Theme preference could not be read from local storage.", error);
}
setTheme(storedTheme === "light" ? "light" : "dark");

themeButton?.addEventListener("click", () => {
  const nextTheme = body.classList.contains("light-mode") ? "dark" : "light";
  body.classList.add("theme-transition");
  setTheme(nextTheme);
  try {
    localStorage.setItem("srija-theme", nextTheme);
  } catch (error) {
    console.warn("Theme preference could not be saved to local storage.", error);
  }
  window.setTimeout(() => body.classList.remove("theme-transition"), 300);
});

function closeMenu() {
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", "Open navigation");
  navPanel?.classList.remove("is-open");
}

menuButton?.addEventListener("click", () => {
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isExpanded));
  menuButton.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  navPanel?.classList.toggle("is-open", !isExpanded);
});
navPanel?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});
document.addEventListener("click", (event) => {
  if (navPanel?.classList.contains("is-open") && !navPanel.contains(event.target) && !menuButton?.contains(event.target)) {
    closeMenu();
  }
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 760) closeMenu();
});

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

document.querySelectorAll(".skill-meter").forEach((meter) => {
  const skill = meter.dataset.skill;
  const level = SKILL_LEVELS[skill];
  const status = meter.querySelector(".meter-status");
  if (Number.isInteger(level) && level > 0 && level <= 100) {
    status.textContent = `${level}% self-rated`;
  }
});
const skillMeters = document.querySelectorAll(".skill-meter");
if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const meterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const meter = entry.target;
        const level = SKILL_LEVELS[meter.dataset.skill];
        if (Number.isInteger(level) && level > 0 && level <= 100) {
          meter.querySelector(".meter-track i").style.width = `${level}%`;
        }
        observer.unobserve(meter);
      }
    });
  }, { threshold: 0.2 });
  skillMeters.forEach((meter) => meterObserver.observe(meter));
} else {
  skillMeters.forEach((meter) => {
    const level = SKILL_LEVELS[meter.dataset.skill];
    if (Number.isInteger(level) && level > 0 && level <= 100) meter.querySelector(".meter-track i").style.width = `${level}%`;
  });
}

const filters = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const filterEmpty = document.getElementById("filter-empty");
filters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    let visibleCount = 0;
    filters.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    projectCards.forEach((card) => {
      const visible = filter === "all" || card.dataset.category === filter;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    filterEmpty.hidden = visibleCount > 0;
  });
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  const values = new FormData(contactForm);
  const name = String(values.get("name")).trim();
  const email = String(values.get("email")).trim();
  const subject = String(values.get("subject")).trim();
  const message = String(values.get("message")).trim();
  if (name.length < 2 || subject.length < 2 || message.length < 10) {
    formStatus.textContent = "Please check each field and provide a message of at least 10 characters.";
    return;
  }

  const mailto = new URL(`mailto:${CONTACT_EMAIL}`);
  mailto.searchParams.set("subject", subject);
  mailto.searchParams.set("body", `Hi Srija,\n\n${message}\n\n— ${name}\n${email}`);
  formStatus.textContent = "Opening your email app with this message. Nothing is sent or stored by the website.";
  window.location.href = mailto.toString();
});

if (WHATSAPP_NUMBER && /^\d{8,15}$/.test(WHATSAPP_NUMBER)) {
  whatsappButton.disabled = false;
  whatsappButton.removeAttribute("aria-describedby");
  whatsappButton.addEventListener("click", () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank", "noopener,noreferrer");
  });
}

function updateScrollUI() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${Math.min(progress, 100)}%`;
  backToTopButton.classList.toggle("is-visible", window.scrollY > 500);
}
window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();
backToTopButton?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" }));

const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
const cursor = document.querySelector(".custom-cursor");
if (finePointer.matches && !reducedMotion.matches && cursor) {
  body.classList.add("cursor-ready");
  window.addEventListener("pointermove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  }, { passive: true });
  document.querySelectorAll("a, button, summary").forEach((element) => {
    element.addEventListener("pointerenter", () => body.classList.add("cursor-hover"));
    element.addEventListener("pointerleave", () => body.classList.remove("cursor-hover"));
  });
  document.addEventListener("mouseleave", () => { body.classList.remove("cursor-ready", "cursor-hover"); });
  document.addEventListener("mouseenter", () => body.classList.add("cursor-ready"));
}

const hero = document.querySelector(".hero");
const heroArt = document.querySelector(".hero-art");
if (finePointer.matches && !reducedMotion.matches && hero && heroArt) {
  hero.addEventListener("pointermove", (event) => {
    const bounds = hero.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 8;
    heroArt.style.translate = `${x}px ${y}px`;
  }, { passive: true });
  hero.addEventListener("pointerleave", () => { heroArt.style.translate = "0 0"; });
}

if (ANALYTICS.scriptUrl && ANALYTICS.websiteId && !navigator.doNotTrack && navigator.globalPrivacyControl !== true) {
  const analyticsScript = document.createElement("script");
  analyticsScript.defer = true;
  analyticsScript.src = ANALYTICS.scriptUrl;
  analyticsScript.dataset.websiteId = ANALYTICS.websiteId;
  analyticsScript.dataset.doNotTrack = "true";
  analyticsScript.onerror = () => console.error("Configured analytics script could not be loaded.");
  document.head.append(analyticsScript);
}
