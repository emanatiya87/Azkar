let azkarSalah = document.getElementById("azkarSalah");
fetch("js/azkar.json")
  .then((response) => response.json())
  .then((data) => {
    displayTsabeeh(data);
  })
  .catch((error) => console.error("Error loading JSON:", error));

// Function to display Azkar on the page
function displayTsabeeh(data) {
  let cartona = " ";
  azkarSalah.innerHTML = " ";
  data["أذكار بعد السلام من الصلاة المفروضة"].forEach((zekr) => {
    cartona += `
<div class="row">
  <div class="col-md-8 text-center content">
   <span><b>${zekr.reference}</b></span> <br> ${zekr.content}<br /><span>${zekr.description}</span>
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
    azkarSalah.innerHTML = cartona;
  });
}
