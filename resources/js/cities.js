 const cityInput = document.getElementById("city-input");
 const searchBtn = document.getElementById("search-btn");
 const card = document.getElementById("card");
 

 async function searchWeather(input) {
   const API_KEY = `k5x2tg5do7xuuzbsp91uza45zwin0qvj02fb8vu6`;


   const WEATHER_API_URL = `https://www.meteosource.com/api/v1/free/find_places_prefix?text=${input}&key=${API_KEY}`

   fetch(WEATHER_API_URL).then((data) => {
     return data.json();
   }).then((jsonData) => {
     console.log(jsonData);
     let data1 = "";
     jsonData.map((item) => {

       data1 += ` <div id="card" class="card mt-3">
 
              <table>
                <tr>
                 <h1 class = "name"> ${item.adm_area1} <h1><h1 class = "name">${item.adm_area2}</h1>
                   
              </table>
                
           </div>
        `

     })
     document.getElementById('cities').innerHTML = data1;

   }).catch((err) => {
     console.log(err);
   })

 }

 window.onload = () => {
   cityInput.onkeyup = (event) => {
     console.log(cityInput.value);
     searchWeather(cityInput.value);
   };
 }
 
 
 if (localStorage.getItem("Mytheme"))
   body.classList.toggle(localStorage.getItem("Mytheme"));