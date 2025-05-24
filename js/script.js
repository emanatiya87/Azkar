setTimeout(function () {
  let loadingPage = document.getElementById("loadingPage");
  if (loadingPage) {
    loadingPage.style.visibility = "hidden";
    var myModal = new bootstrap.Modal(document.getElementById("welcomeModal"));
    myModal.show();
  }
}, 1000);
let doaaContent = document.getElementById("doaaContent");
fetch("js/azkar.json")
  .then((response) => response.json())
  .then((data) => {
    const randomIndex = Math.floor(Math.random() * data["دعاء"].length);
    doaaContent.innerHTML = data["دعاء"][randomIndex].content;
  })
  .catch((error) => console.error("Error loading JSON:", error));
