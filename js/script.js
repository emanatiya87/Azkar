function decrease(count) {
  let number = parseInt(count.innerHTML);
  number == 0 ? 0 : number--;
  count.innerHTML = number;
  console.log(number);
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
  let cartona = "";
  alazkar.innerHTML = " ";
  data.forEach((zekr) => {
    cartona += `
       <div class="row">
          <div class="col-md-8 text-center">${zekr.content} </div>
          <div class="col-md-4">
            <div
              class="counter d-flex justify-content-center align-items-center mx-auto"
              onclick="decrease(this)"
            >
              ${zekr.count}
            </div>
          </div>
        </div>
          <br>
      `;
    alazkar.innerHTML = cartona;
  });
}
