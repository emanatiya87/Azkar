let Podcast = document.getElementById("Podcast");
fetch("js/azkar.json")
  .then((response) => response.json())
  .then((data) => {
    displayPodcast(data);
  })
  .catch((error) => console.error("Error loading JSON:", error));

// Function to display Azkar on the page
function displayPodcast(data) {
  let cartona = " ";
  Podcast.innerHTML = " ";
  data["بودكاست"].forEach((zekr) => {
    cartona += `
<div class="row">
  <div class="col-md-8 text-center content">
    <a href="${zekr.URL}"><i class="fa-solid fa-link"></i>${zekr.content}</a>  <br /><span>${zekr.description}</span>
    <iframe width="250" height="200" src="${zekr.vidieo}" allowfullscreen></iframe>
  </div>
 
</div>

`;
    Podcast.innerHTML = cartona;
  });
}
