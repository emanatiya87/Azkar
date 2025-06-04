let prays = document.getElementById("prays");
let hijriDate = document.getElementById("hijriDate");
let city = document.getElementById("city");
console.log(city.value);
// fetch data of times
function fetchAPI(cityName) {
  fetch(`https://api.aladhan.com/v1/timingsByCity?country=EG&city=${cityName}`)
    .then((res) => res.json())
    .then((data) => {
      displayPrayTimes(data.data.timings);
      displayHijriDate(data.data.date.hijri);
    });
}
// fun finction to appear cairo as starting
fetchAPI("Al Qāhirah");
//   display play times
function displayPrayTimes(time) {
  prays.innerHTML = `
     <div class="d-flex justify-content-between align-items-center border rounded-4 px-3 mb-2 shadow">
        <div >
          <h3 class="text-info ">الفجر</h3>
          <h3>${convertTo12Hour(time.Fajr)}</h3>
        </div>
        <div class=" text-secondary">
        <i class="fa-regular fa-sun"></i>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center border rounded-4 px-3 mb-2 shadow">
        <div >
          <h3 class="text-info ">الشروق</h3>
          <h3>${convertTo12Hour(time.Sunrise)}</h3>
        </div>
        <div class=" text-secondary">
        <i class="fa-solid fa-sun"></i>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center border rounded-4 px-3 mb-2 shadow">
        <div >
          <h3 class="text-info ">الضهر</h3>
          <h3>${convertTo12Hour(time.Dhuhr)}</h3>
        </div>
        <div class=" text-secondary">
         <i class="fa-solid fa-sun"></i>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center border rounded-4 px-3 mb-2 shadow">
        <div >
          <h3 class="text-info ">العصر</h3>
          <h3>${convertTo12Hour(time.Asr)}</h3>
        </div>
        <div class=" text-secondary">
         <i class="fa-solid fa-sun"></i>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center border rounded-4 px-3 mb-2 shadow">
        <div >
          <h3 class="text-info ">المغرب</h3>
          <h3>${convertTo12Hour(time.Maghrib)}</h3>
        </div>
        <div class=" text-secondary">
        <i class="fa-regular fa-moon"></i>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center border rounded-4 px-3 mb-2 shadow">
        <div >
          <h3 class="text-info ">العشاء</h3>
          <h3>${convertTo12Hour(time.Isha)}</h3>
        </div>
        <div class=" text-secondary">
         <i class="fa-solid fa-moon"></i>
        </div>
      </div>
    `;
}
// display hijry date
function displayHijriDate(date) {
  hijriDate.innerText = `${date.weekday.ar} ${date.month.days} ${date.month.ar} ${date.year}`;
}
// change pray times relative to city
city.addEventListener("change", function () {
  fetchAPI(city.value);
});
//  convert time to 12 instead of 24
function convertTo12Hour(time24) {
  let [hour, minute] = time24.split(":");
  let hour12 = hour % 12 || 12; // convert to 12-hour format
  let ampm = hour < 12 || hour == 24 ? "AM" : "PM";
  return `${hour12}:${minute} ${ampm}`;
}
