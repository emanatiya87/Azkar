document.addEventListener("DOMContentLoaded", function () {
  let body = document.body;
  // Check stored mode and apply it
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
  }
});
