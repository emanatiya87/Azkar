document.addEventListener("DOMContentLoaded", function () {
  let darkLightIcone = document.getElementById("darkLightIcone");
  let body = document.body;

  // Check stored mode and apply it
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
  }

  darkLightIcone.addEventListener("click", function () {
    body.classList.toggle("dark-mode");

    // Save the current mode in localStorage
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
});
