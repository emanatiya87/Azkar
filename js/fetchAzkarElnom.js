let azkarElnom = document.getElementById("azkarElnom");
fetch("js/azkar.json")
  .then((response) => response.json())
  .then((data) => {
    displayAzkarElnom(data);
  })
  .catch((error) => console.error("Error loading JSON:", error));

// Function to display Azkar on the page
function displayAzkarElnom(data) {
  let cartona = " ";
  azkarElnom.innerHTML = " ";
  data["أذكار النوم"].forEach((zekr) => {
    cartona += `
<div class="row">
  <div class="col-md-8 text-center content"><span><b>${zekr.reference}</b></span>
    ${zekr.content}<br /><span>${zekr.description}</span>
  </div>
  <div class="col-md-4 bigCounter">
    <div
      class="counter d-flex justify-content-center align-items-center mx-auto"
      onclick="decrease(this)"
      id="counter"
      data-original-count="${zekr.count}"
    >
      ${zekr.count}
    </div>
    <div id="reset" onclick="reset(this)">
      <i class="fa-solid fa-rotate-right"></i>
    </div>
  </div>
</div>

`;
    azkarElnom.innerHTML = cartona;
  });
}
