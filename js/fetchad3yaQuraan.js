let ad3yaQuraan = document.getElementById("ad3yaQuraan");
fetch("js/azkar.json")
  .then((response) => response.json())
  .then((data) => {
    displayAzkarAlmasaa(data);
  })
  .catch((error) => console.error("Error loading JSON:", error));

// Function to display Azkar on the page
function displayAzkarAlmasaa(data) {
  let cartona = " ";
  ad3yaQuraan.innerHTML = " ";
  data["أدعية قرآنية"].forEach((zekr) => {
    cartona += `
<div class="row">
  <div class="col-md-8 text-center content"  dir="rtl">
    ${zekr.content}<br /><span>${zekr.reference}</span>
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
    ad3yaQuraan.innerHTML = cartona;
  });
}
