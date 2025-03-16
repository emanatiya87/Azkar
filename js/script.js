setTimeout(function () {
  let loadingPage = document.getElementById("loadingPage");
  if (loadingPage) {
    loadingPage.style.visibility = "hidden";
  }
}, 1000);
let doaa = document.getElementById("doaa");
let exit = document.getElementById("exit");
exit.addEventListener("click", function () {
  doaa.style.display = "none";
});
let doaaContent = document.getElementById("doaaContent");
fetch("js/azkar.json")
  .then((response) => response.json())
  .then((data) => {
    const randomIndex = Math.floor(Math.random() * data["دعاء"].length);
    doaaContent.innerHTML = data["دعاء"][randomIndex].content;
  })
  .catch((error) => console.error("Error loading JSON:", error));
