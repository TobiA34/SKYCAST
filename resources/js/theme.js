 const CSS_STYLESHEET = document.getElementById("theme-css");
 const TOGGLE_BTN = document.getElementById("toggle-theme");
 
 const body = document.querySelector("body");
 
 if (TOGGLE_BTN) TOGGLE_BTN.addEventListener("click", changeTheme);

 function changeTheme() {
    const oldTheme = getTheme();
    TOGGLE_BTN.textContent = "Light mode"
    let newTheme;
 
   if (oldTheme === "dark") {
 
     newTheme = "light";
     TOGGLE_BTN.textContent = "Dark mode";
     body.style.transition = "1s";
   } else {
     newTheme = "dark";
     TOGGLE_BTN.textContent = "Light mode";

     body.style.transition = "1s";
   }
   localStorage.setItem("theme", newTheme);
   CSS_STYLESHEET.href = `resources/css/dark-mode/${newTheme}.css`;
  }

 function getTheme() {
   let theme = localStorage.getItem("theme");

   if (theme === null) {
     theme = "dark";
     localStorage.setItem("theme", theme);
   }

   return theme;  
 }
 
 (() => {
   let theme = getTheme();
   CSS_STYLESHEET.href = `./resources/css/dark-mode/${theme}.css`;
 })();
