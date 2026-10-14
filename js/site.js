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

document.querySelectorAll("[data-ca]").forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.getAttribute("data-ca");
    const action = button.querySelector(".ca-action");
    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      const field = document.createElement("textarea");
      field.value = value;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.left = "-999px";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    if (!action) return;
    const previous = action.textContent;
    action.textContent = "Copied";
    button.classList.add("copied");
    window.setTimeout(() => {
      action.textContent = previous;
      button.classList.remove("copied");
    }, 1400);
  });
});

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
