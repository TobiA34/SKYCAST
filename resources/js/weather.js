 let lat;
 let lon;
 let map;

 const spinner = document.getElementById("spinner");
 const API_KEY = "k5x2tg5do7xuuzbsp91uza45zwin0qvj02fb8vu6"
 const url = `
     https://www.meteosource.com/api/v1/free/point?lat=${localStorage.getItem("lat")}&lon=${localStorage.getItem("lon")}&sections=all&timezone=UTC&language=en&units=metric&key=${API_KEY}`
 const weekday = ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"];

 spinner.hidden = false;

 fetch(url).then(() => {
     spinner.hidden = true;
     return getData();
 }).then(() => {

     return getHourlyForecast();
 }).then(() => {
     return getDailyForecast();
     //hide spinner
 }).catch(() => {})

 function askPermission() {
     if ('geolocation' in navigator) {
         navigator.geolocation.getCurrentPosition(success, error)
     }
 }

 function success(position) {
     localStorage.setItem("lat", position.coords.latitude);
     localStorage.setItem("lon", position.coords.longitude);
 }

 function error() {
     alert("You need to accept permission to use this app do this by going go to:  \nsettings -> privacy and security - click location")
 }

 async function showError(error) {
     switch (error.code) {
         case error.PERMISSION_DENIED:
             x.innerHTML = "User denied the request for Geolocation."
             break;
         case error.POSITION_UNAVAILABLE:
             x.innerHTML = "Location information is unavailable."
             break;
         case error.TIMEOUT:
             x.innerHTML = "The request to get user location timed out."
             break;
         case error.UNKNOWN_ERROR:
             x.innerHTML = "An unknown error occurred."
             break;
     }
 }

 async function getData() {
     const response = await fetch(url);
     const data = await response.json();

     if (response.status != 200) {
         alert("Something has gone wrong");
     } else {
         length = data.length;
         var temp = "";
         temp += ` <div class="w-50 text-center mx-auto ">
                      <h1>Current Weather</h1>
                      <h1 id="temp">${Math.round(data.current.temperature)}°C</h1>

                      <h1 id="sum">${data.current.summary}</h1>
                    </h1>`

         document.getElementById("current-weather-container").innerHTML = temp;
     }

 }

 async function getHourlyForecast() {
     const response = await fetch(url);
     const data = await response.json();


     console.log(data);
     if (response.status != 200) {
         alert("Something has gone wrong");
     }
     length = data.hourly.data.length;
     let temp = "";
     for (i = 0; i < length; i++) {
         let myDate = new Date(data.hourly.data[i].date);
         let hours = myDate.getHours();
         let tempWholeNumber = Math.round(data.hourly.data[i].temperature);

         temp += `
             <div class="card-body  ms-5 rounded">
              <h3 class="text-center">${hours}</h3>
               <img class="w-70" src="resources/images/weather-icons/${data.hourly.data[i].icon}.png" alt="weather icons">
              <h3 class = "text-center mt-2 fw-bold">${tempWholeNumber}°C</h5>
            </div>`
     }
     document.getElementById("hourly-forcast").innerHTML = temp;
 }

 async function getDailyForecast() {

     const response = await fetch(url);
     if (response.status != 200) {
         alert("Something has gone wrong");
     }
     const data = await response.json();
     console.log(data);
     length = data.daily.data.length;
     var temp = "";

     for (i = 0; i < length; i++) {
         var myDate = new Date(data.daily.data[i].day);
         let day = weekday[myDate.getDay()];
         let tempWholeNumber = Math.round(data.daily.data[i].all_day.temperature);

         temp += ` 
              <div>
         <div class="col">
         <div class="container text-center">
  <div class="row mt-4 col-xs-8 col-sm-12col-md-12 col-lg-12">
      <hr class="mx-auto w-55">

    <div class ="col col-md-4">
      <div class="row w-100">
        <h2>${day}<img class="w-70 ms-4" src="resources/images/weather-icons/${data.current.icon_num++}.png" alt = "weather icons"></h2>
              
      </div>

    </div>
    <div class="col">
    </div>
    <div class="col">
      <h2 class ="fw-bold">${tempWholeNumber}°C</h2>
    </div>
  </div>
  </div>
</div>
      </div>
         `
     }
     document.getElementById("daily-forecast").innerHTML = temp;
 }

 $("input[id='lightSwitch']").on("change", function () {
     if ($("html").attr("data-bs-theme") == 'light') {
         $("html").attr("data-bs-theme", "dark");
     } else if ($("html").attr("data-bs-theme") == "dark") {
         $("html").attr("data-bs-theme", "light");
     }
 });
 askPermission();

 async function initMap() {
     const response = await fetch(url);
     const data = await response.json();

     const uluru = {
         lat: Number(localStorage.getItem("lat")),
         lng: Number(localStorage.getItem("lon"))
     };
     const map = new google.maps.Map(document.getElementById("map"), {
         zoom: 10,
         center: uluru,
     });
     const contentString =
         `<div class="card bg-light w-100 text-dark text-center" id="content">
     <div id="siteNotice">
    </div> 
    <img class="img-icon mx-auto" src="resources/images/weather-icons/${data.current.icon_num}.png" alt="weather icons">
    <h1 class="mx-auto text-dark" id="firstHeading" class="firstHeading">${Math.round(data.current.temperature)}</h1>
    <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">${data.hourly.data[0].summary}</p>
   </div>
      </div>;`
     const infowindow = new google.maps.InfoWindow({
         content: contentString,
         ariaLabel: "Uluru",
     });
     const marker = new google.maps.Marker({
         position: uluru,
         map,
         title: "Uluru (Ayers Rock)",
     });

     marker.addListener("click", () => {
         infowindow.open({
             anchor: marker,
             map,
         });
     });
 }

 window.initMap = initMap;