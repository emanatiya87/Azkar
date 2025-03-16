function decrease(count) {
  let number = parseInt(count.innerHTML);
  number == 0 ? 0 : number--;
  if (number == 0) {
    count.style.backgroundColor = "var(--right)";
  }
  count.innerHTML = number;
  // console.log(number);
}
fetch("js/azkar.json")
  .then((response) => response.json())
  .then((data) => {
    displayAzkar(data);
  })
  .catch((error) => console.error("Error loading JSON:", error));

let alazkar = document.getElementById("alazkar");
// Function to display Azkar on the page
function displayAzkar(data) {
  let cartona = " ";
  alazkar.innerHTML = " ";
  data["أذكار الصباح"].forEach((zekr) => {
    cartona += `
      
         <div class="row">
            <div class="col-md-8 text-center content"  dir="rtl"><span><b>${zekr.reference}</b></span>${zekr.content}<br><span>${zekr.description}</span></div>
            <div class="col-md-4 bigCounter">
              <div
                class="counter d-flex justify-content-center align-items-center mx-auto"
                onclick="decrease(this)" id="counter" data-original-count="${zekr.count}"
              >
                ${zekr.count}
              </div>
              <div id="reset" onclick="reset(this)" ><i class="fa-solid fa-rotate-right"></i></div>
            </div>
          </div>
           
        `;
    alazkar.innerHTML = cartona;
  });
}

// reset counter
function reset(ResetBtn) {
  let counter = ResetBtn.previousElementSibling;
  let number = counter.getAttribute("data-original-count");
  counter.innerHTML = number;
  counter.style.backgroundColor = "var(--primarycolor)";
}

// up btn
upBtn = document.getElementById("upBtn");
window.onscroll = function () {
  if (window.scrollY >= 800) {
    upBtn.style.display = "block";
  } else {
    upBtn.style.display = "none";
  }
};

upBtn.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
