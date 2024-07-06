/**
 * Define Global Variables
 */
const sections = document.querySelectorAll("section");
const navList = document.getElementById("navbar__list");
const topButton = document.createElement("button");
let isScrolling;

/**
 * End Global Variables
 * Start Helper Functions
 */

/**
 * Check if section is in viewport
 * @param {HTMLElement} section - The section element to check
 * @returns {boolean} - True if the section is in the viewport, otherwise false
 */
function isInViewport(section) {
  const rect = section.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * End Helper Functions
 * Begin Main Functions
 */

/**
 * Build the navigation menu
 * This function dynamically creates the navigation menu
 * based on the sections present in the HTML.
 */
function buildNav() {
  sections.forEach((section) => {
    const navItem = document.createElement("li");
    navItem.innerHTML = `<a href="#${section.id}" class="menu__link">${section.dataset.nav}</a>`;
    navList.appendChild(navItem);
  });
}

/**
 * Add 'active' class to section and corresponding nav link
 * when the section is near the top of the viewport.
 */
function makeActive() {
  const VALUE = 150; // Distance from the top of the viewport to trigger the active state
  sections.forEach((section) => {
    const box = section.getBoundingClientRect();
    const navLink = document.querySelector(`a[href="#${section.id}"]`);
    if (box.top <= VALUE && box.bottom >= VALUE) {
      // Apply active state on current section and corresponding Nav link
      section.classList.add("active");
      navLink.classList.add("active");
    } else {
      // Remove active state from other sections and corresponding Nav links
      section.classList.remove("active");
      navLink.classList.remove("active");
    }
  });
}

/**
 * Scroll to the section when the corresponding nav link is clicked
 * @param {Event} event - The event object
 */
function scrollToSection(event) {
  event.preventDefault();
  const link = event.target.closest("a");
  if (link) {
    const targetId = link.getAttribute("href").slice(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: "smooth" });
  }
}

/**
 * Toggle visibility of the navigation bar while scrolling
 */
function handleNavVisibility() {
  document.querySelector(".navbar__menu").style.display = "block";
  clearTimeout(isScrolling);
  isScrolling = setTimeout(() => {
    document.querySelector(".navbar__menu").style.display = "none";
  }, 2000);
}

/**
 * Create and show the scroll-to-top button
 */
function createTopButton() {
  topButton.innerText = "Top";
  topButton.className = "top-button";
  topButton.style.display = "none";
  document.body.appendChild(topButton);

  topButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/**
 * Show or hide the scroll-to-top button based on scroll position
 */
function handleTopButtonVisibility() {
  if (window.scrollY > window.innerHeight) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
}

/**
 * Toggle section collapse
 */
function toggleSectionCollapse(event) {
  if (event.target.tagName === "H2") {
    const section = event.target.parentElement.parentElement;
    section.classList.toggle("collapsed");
  }
}

/**
 * End Main Functions
 * Begin Events
 */

/**
 * Ensure DOM is fully loaded before attaching event listeners
 */
document.addEventListener("DOMContentLoaded", () => {
  // Build the navigation menu
  buildNav();
  // Create the scroll-to-top button
  createTopButton();
  // Scroll to section on link click
  navList.addEventListener("click", scrollToSection);
  // Set sections as active while scrolling
  window.addEventListener("scroll", makeActive);
  // Hide navigation bar while not scrolling
  window.addEventListener("scroll", handleNavVisibility);
  // Show or hide the scroll-to-top button
  window.addEventListener("scroll", handleTopButtonVisibility);
  // Toggle section collapse
  document.querySelectorAll("section h2").forEach((h2) => {
    h2.addEventListener("click", toggleSectionCollapse);
  });

  // Add CSS styles dynamically
  const style = document.createElement("style");
  style.innerHTML = `
        .top-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            padding: 10px;
            background-color: #000;
            color: 	#ff0000;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .collapsed .landing__container {
            display: none;
        }
        .navbar__menu {
            transition: opacity 0.5s;
        }
        .navbar__menu.hidden {
            opacity: 0;
        }
        .active {
            border: 2px solid #333;
            color: #333;
        }
        .menu__link.active {
            border-bottom: 5px solid #333;
            color: #333;
        }
      `;
  document.head.appendChild(style);
});
