document.documentElement.classList.add("js");

const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealNodes = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );
  revealNodes.forEach((node) => observer.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("in"));
}

const glow = document.querySelector(".pointer-glow");
const finePointer = window.matchMedia("(pointer: fine)").matches;
if (glow && finePointer && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener("pointermove", (event) => {
    glow.classList.add("on");
    glow.style.left = event.clientX + "px";
    glow.style.top = event.clientY + "px";
  });
  window.addEventListener("pointerleave", () => glow.classList.remove("on"));
}
