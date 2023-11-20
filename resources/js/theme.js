 const CSS_STYLESHEET = document.getElementById("theme-css");
 const TOGGLE_BTN = document.getElementById("toggle-theme");
 const body = document.querySelector("body");

 if (TOGGLE_BTN) TOGGLE_BTN.addEventListener("click", changeTheme);

 function changeTheme() {
   // get current theme
   const oldTheme = getTheme();
   //invert the theme
   let newTheme;
   TOGGLE_BTN.classList.toggle("fa-moon");

   if (oldTheme === "dark") {
     newTheme = "light";
     body.style.transition = "1s";
   } else {
     newTheme = "dark";

     body.style.transition = "1s";
   }
   localStorage.setItem("theme", newTheme);
   CSS_STYLESHEET.href = `resources/css/dark-mode/${newTheme}.css`;
   // save the theme
 }

 function getTheme() {
   let theme = localStorage.getItem("theme");

   if (theme === null) {
     theme = "dark";
     localStorage.setItem("theme", theme);
   }

   return theme; //returns light or dark
 }

 //Anonyms function
 (() => {
   let theme = getTheme();
   CSS_STYLESHEET.href = `./resources/css/dark-mode/${theme}.css`;
 })();
