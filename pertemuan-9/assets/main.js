document.addEventListener("DOMContentLoaded", () => {
  // Fungsi untuk toggle accordion
  const toggleAccordion = (trigger) => {
    const content = trigger.nextElementSibling;
    const icon = trigger.querySelector("i");
    const isExpanding = !content.classList.contains("active");

    // Tutup semua accordion yang sedang terbuka
    const accordions = document.querySelectorAll(".accordion-content");
    accordions.forEach((accordion) => {
      if (accordion !== content && accordion.classList.contains("active")) {
        const accordionTrigger = accordion.previousElementSibling;
        accordionTrigger.classList.remove("active");
        accordion.classList.remove("active");
        accordion.style.height = "0px";
        accordion.addEventListener("transitionend", function handler() {
          if (!accordion.classList.contains("active")) {
            accordion.style.display = "none";
          }
          accordion.removeEventListener("transitionend", handler);
        });
      }
    });

    // Toggle kelas active
    trigger.classList.toggle("active");
    content.classList.toggle("active");

    // Animasi height untuk efek smooth
    if (isExpanding) {
      content.style.display = "block";
      requestAnimationFrame(() => {
        content.style.height = content.scrollHeight + "px";
      });
    } else {
      content.style.height = content.scrollHeight + "px";
      requestAnimationFrame(() => {
        content.style.height = "0px";
        content.addEventListener("transitionend", function handler() {
          if (!content.classList.contains("active")) {
            content.style.display = "none";
          }
          content.removeEventListener("transitionend", handler);
        });
      });
    }
  };

  // Toggle sidebar pada tampilan mobile
  const toggleSidebar = () => {
    const sidebar = document.querySelector("aside.container");
    sidebar.classList.toggle("active");
  };

  // Event listener untuk tombol menu pada mobile
  const menuButton = document.querySelector("nav button:first-child");
  menuButton.addEventListener("click", toggleSidebar);

  // Event listener untuk semua accordion triggers
  const accordionTriggers = document.querySelectorAll(".accordion-trigger");
  accordionTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => toggleAccordion(trigger));
  });
});
