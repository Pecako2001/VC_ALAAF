document.addEventListener("DOMContentLoaded", function () {
  const menu = document.getElementById("menu");
  const hamburger = document.querySelector(".hamburger-menu");
  const menuLinks = document.querySelectorAll(".menu li a"); // Select all menu links

  // Toggle menu when hamburger is clicked
  hamburger.addEventListener("click", function () {
    menu.classList.toggle("active");
  });

  // Close menu when a menu link is clicked
  menuLinks.forEach(link => {
    link.addEventListener("click", function () {
      menu.classList.remove("active"); // Hide the menu
    });
  });

  // Optional: Close the menu when clicking outside
  document.addEventListener("click", function (event) {
    if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
      menu.classList.remove("active");
    }
  });
});
