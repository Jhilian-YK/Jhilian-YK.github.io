const sectionLinks = document.querySelectorAll("[data-target]");
const pageViews = document.querySelectorAll(".page-view");
const projectDetailIds = ["project-one", "project-two", "project-three"];
const pageTitles = {
  home: "Home",
  site: "SITE",
  projects: "Projects",
  hobbies: "Hobbies",
};

function showSection(sectionId, scrollTargetId = null) {
  const activeSectionId = projectDetailIds.includes(sectionId)
    ? "projects"
    : document.getElementById(sectionId)
      ? sectionId
      : "home";

  pageViews.forEach((pageView) => {
    pageView.classList.toggle("active", pageView.id === activeSectionId);
  });

  sectionLinks.forEach((sectionLink) => {
    sectionLink.classList.toggle("active", sectionLink.dataset.target === activeSectionId);
  });

  document.title = `${pageTitles[activeSectionId]} | Jhilian Yan-Klassen`;

  const targetId = scrollTargetId || (projectDetailIds.includes(sectionId) ? sectionId : null);
  if (targetId) {
    requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  } else {
    window.scrollTo({ top: 0, left: 0 });
  }
}

sectionLinks.forEach((sectionLink) => {
  sectionLink.addEventListener("click", (event) => {
    event.preventDefault();
    history.pushState(null, "", `#${sectionLink.dataset.target}`);
    showSection(sectionLink.dataset.target);
  });
});

document.querySelectorAll(".project-preview-card").forEach((projectCard) => {
  projectCard.addEventListener("click", (event) => {
    const targetId = projectCard.getAttribute("href")?.replace("#", "");
    if (!targetId) {
      return;
    }

    event.preventDefault();
    history.pushState(null, "", `#${targetId}`);
    showSection("projects", targetId);
  });
});

const siteModal = document.querySelector("#site-modal");
const siteModalTitle = document.querySelector("#site-modal-title");
const siteModalAge = document.querySelector("#site-modal-age");
const siteModalBlurb = document.querySelector("#site-modal-blurb");
const siteModalUnderGrade = document.querySelector("#site-modal-under-grade");
const siteModalBelowTitle = document.querySelector("#site-modal-below-title");
const siteModalBadge = document.querySelector("#site-modal-badge");
const siteModalRequirements = document.querySelector("#site-modal-requirements");
const siteModalRequirementsText = document.querySelector("#site-modal-requirements-text");
const siteModalCloseButton = siteModal?.querySelector(".site-modal__close");
let modalTrigger = null;

function closeSiteModal() {
  if (!siteModal || siteModal.hidden) {
    return;
  }

  siteModal.classList.remove("is-open");
  document.body.classList.remove("modal-open");
  window.setTimeout(() => {
    siteModal.hidden = true;
    modalTrigger?.focus();
  }, 180);
}

function openSiteModal(featureCard) {
  if (!siteModal || !siteModalTitle || !siteModalAge || !siteModalBlurb || !siteModalUnderGrade || !siteModalBelowTitle || !siteModalBadge || !siteModalRequirements || !siteModalRequirementsText) {
    return;
  }

  modalTrigger = featureCard;
  siteModalTitle.textContent = featureCard.querySelector("h2")?.textContent || "Course details";
  siteModalAge.textContent = featureCard.querySelector(".age-range")?.textContent || "";
  siteModalBlurb.textContent = featureCard.querySelector(".full-site-blurb")?.textContent.trim() || "";
  const requirementStyle = featureCard.dataset.requirementStyle || "";
  const requirement = featureCard.dataset.requirement || "";
  siteModal.className = `site-modal is-open requirements--${requirementStyle}`;
  siteModalUnderGrade.textContent = requirement;
  siteModalBelowTitle.textContent = `What you need: ${requirement}`;
  siteModalBadge.textContent = requirement;
  siteModalRequirementsText.textContent = requirement;

  siteModal.hidden = false;
  document.body.classList.add("modal-open");
  siteModalCloseButton?.focus();
}

document.querySelectorAll(".expandable-site-feature").forEach((featureCard) => {
  featureCard.addEventListener("click", () => openSiteModal(featureCard));

  featureCard.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openSiteModal(featureCard);
    }
  });
});

siteModal?.querySelectorAll("[data-modal-close]").forEach((closeControl) => {
  closeControl.addEventListener("click", closeSiteModal);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSiteModal();
  }
});

window.addEventListener("popstate", () => {
  showSection(window.location.hash.replace("#", "") || "home");
});

window.addEventListener("hashchange", () => {
  showSection(window.location.hash.replace("#", "") || "home");
});

showSection(window.location.hash.replace("#", "") || "home");
