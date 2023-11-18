  
  async function createChart() {
     const API_KEY = "k5x2tg5do7xuuzbsp91uza45zwin0qvj02fb8vu6"
     const url = `
     https://www.meteosource.com/api/v1/free/point?lat=${localStorage.getItem("lat")}&lon=${localStorage.getItem("lon")}&sections=all&timezone=UTC&language=en&units=metric&key=${API_KEY}`

    const response = await fetch(url);
    const barChartdata = await response.json();
   

     const angle = barChartdata.hourly.data.map((x) => x.wind.angle);
     console.log(angle);

     const ctx = document.getElementById('myChart');

     new Chart(ctx, {
         type: 'line',
         data: {
             labels: ['Manchester', 'Liverpool', 'Blackburn', 'Hull'],
             datasets: [{
                label: 'Angles',
                 data: angle,
                 borderWidth: 1
             }]
         },
         options: {
             scales: {
                 y: {
                     beginAtZero: true
                 }
             }
         }
     });
     }
  

createChart()

 
document.getElementById('btnSwitch').addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
        document.documentElement.setAttribute('data-bs-theme', 'light')
    } else {
        document.documentElement.setAttribute('data-bs-theme', 'dark')
    }
})
   