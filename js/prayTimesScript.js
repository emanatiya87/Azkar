let prays = document.getElementById("prays");
let hijriDate = document.getElementById("hijriDate");
// fetch data of times
fetch("https://api.aladhan.com/v1/timingsByCity?country=EG&city=Al Qāhirah")
  .then((res) => res.json())
  .then((data) => {
    displayPrayTimes(data.data.timings);
    displayHijriDate(data.data.date.hijri);
  });
//   display play times
function displayPrayTimes(time) {
  prays.innerHTML = `
     <div class="d-flex justify-content-between align-items-center border rounded-4 px-3 mb-2 shadow">
        <div >
          <h3 class="text-info ">الفجر</h3>
          <h3>${time.Fajr}</h3>
        </div>
        <div class=" text-secondary">
         <i class="fa-solid fa-clock"></i>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center border rounded-4 px-3 mb-2 shadow">
        <div >
          <h3 class="text-info ">الشروق</h3>
          <h3>${time.Sunrise}</h3>
        </div>
        <div class=" text-secondary">
        <i class="fa-solid fa-sun"></i>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center border rounded-4 px-3 mb-2 shadow">
        <div >
          <h3 class="text-info ">الضهر</h3>
          <h3>${time.Dhuhr}</h3>
        </div>
        <div class=" text-secondary">
         <i class="fa-solid fa-clock"></i>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center border rounded-4 px-3 mb-2 shadow">
        <div >
          <h3 class="text-info ">العصر</h3>
          <h3>${time.Asr}</h3>
        </div>
        <div class=" text-secondary">
         <i class="fa-solid fa-clock"></i>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center border rounded-4 px-3 mb-2 shadow">
        <div >
          <h3 class="text-info ">المغرب</h3>
          <h3>${time.Maghrib}</h3>
        </div>
        <div class=" text-secondary">
         <i class="fa-solid fa-clock"></i>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center border rounded-4 px-3 mb-2 shadow">
        <div >
          <h3 class="text-info ">العشاء</h3>
          <h3>${time.Isha}</h3>
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
