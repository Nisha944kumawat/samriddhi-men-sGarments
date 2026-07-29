"use strict";

/* ==========================================================
   UPDATE BUSINESS DETAILS ONLY HERE
   Changes automatically apply across the complete website.
   ========================================================== */
const BUSINESS = {
  name: "Samriddhi Men's Designer",
  owner: "Rahul Kumar Singhania",
  phone: "8278608678",
  whatsapp: "918278608678",
  email: "samriddhimensdesigner@gmail.com",
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
  address:
    "Alwar Bypass Rd, near Tirupati restaurant, near Havells, Saidpur, Bhiwadi, Rajasthan 301019",
  map:
    "https://www.google.com/maps/search/?api=1&query=Samriddhi+Men%27s+Designer+Bhiwadi+Rajasthan+301019",
  gstin: "08CUSPS9019R1Z8",
};

const getAll = (selector) => document.querySelectorAll(selector);
const phoneHref = `tel:+91${BUSINESS.phone}`;
const whatsappHref = `https://wa.me/${BUSINESS.whatsapp}`;

getAll(".business-phone-link").forEach((link) => link.href = phoneHref);
getAll(".business-whatsapp-link").forEach((link) => link.href = whatsappHref);
getAll(".business-email-link").forEach((link) => link.href = `mailto:${BUSINESS.email}`);
getAll(".business-map-link").forEach((link) => link.href = BUSINESS.map);
getAll(".instagram-link").forEach((link) => link.href = BUSINESS.instagram);
getAll(".facebook-link").forEach((link) => link.href = BUSINESS.facebook);
getAll(".phone-display").forEach((item) => item.textContent = `+91 ${BUSINESS.phone}`);
getAll(".email-display").forEach((item) => item.textContent = BUSINESS.email);
getAll(".address-display").forEach((item) => item.textContent = BUSINESS.address);
getAll(".owner-name").forEach((item) => item.textContent = BUSINESS.owner);
getAll(".gst-number").forEach((item) => item.textContent = BUSINESS.gstin);
document.querySelector("#currentYear").textContent = new Date().getFullYear();

const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

getAll(".buy-now").forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.dataset.product;
    const message = `Hello ${BUSINESS.name}, I am interested in your ${product}. Please share more details.`;
    window.open(`${whatsappHref}?text=${encodeURIComponent(message)}`, "_blank");
  });
});

getAll(".faq-item > button").forEach((button) => {
  button.addEventListener("click", () => {
    const currentItem = button.closest(".faq-item");
    getAll(".faq-item").forEach((item) => {
      if (item !== currentItem) {
        item.classList.remove("active");
        item.querySelector("button b").textContent = "+";
      }
    });
    currentItem.classList.toggle("active");
    button.querySelector("b").textContent = currentItem.classList.contains("active") ? "−" : "+";
  });
});

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");

getAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    lightboxImage.src = item.querySelector("img").src;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  });
});

const closeLightbox = () => {
  lightbox.hidden = true;
  document.body.style.overflow = "";
};

document.querySelector("#lightboxClose").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
});

document.querySelector("#contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message =
    `New Website Enquiry\n\n` +
    `Name: ${data.get("name")}\n` +
    `Phone: ${data.get("phone")}\n` +
    `Collection: ${data.get("collection")}\n` +
    `Message: ${data.get("message")}`;
  window.open(`${whatsappHref}?text=${encodeURIComponent(message)}`, "_blank");
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

getAll(".reveal").forEach((element) => revealObserver.observe(element));
