export function welcomePage(params) {
  const div = document.createElement("div");
  div.className = "contenedor";
  div.innerHTML = `
    <comp-header></comp-header>
    <div class="content">
    <span class="title-main">¡Bienvenido!</span>
    <span class="title-welcome">Para ver las mascotas reportadas cerca tuyo necesitamos permiso para conocer tu ubicación</span>
    <button class="location">Give Location</button>
    <div class="buttons-intro">
    
      <button class="button-login">Login</button>
      <button class="button-register">Register</button>
    </div>
    </div>
    `;

  // corregir este evento: no me deja hacer el queryselector de los elementos de la page
  // const evento = document.querySelector(".root");
  // evento.addEventListener(
  //   "click",
  //   () => {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const lat = position.coords.latitude;
  //       const lng = position.coords.longitude;
  //       return params.goTo("/home", { lat, lng });
  //     });
  //   },
  //   { once: true }
  // );
  // const register = document.querySelector(".location");
  // register.addEventListener(
  //   "click",
  //   () => {
  //     return params.goTo("/register");
  //   },
  //   { once: true }
  // );
  return div;
}
