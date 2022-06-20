import { Router } from "@vaadin/router";
class WelcomePage extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <comp-header></comp-header>
      <div class="content">
        <span class="title-main">¡Bienvenido!</span>
        <span class="title-welcome">Para ver las mascotas reportadas cerca tuyo necesitamos permiso para conocer tu ubicación</span>
        <button class="location">Give Location</button>
        <div class="buttons-intro"></div>
      </div>
      `;
    const locationEl = this.querySelector(".location");
    locationEl.addEventListener("click", () => {
      return Router.go("/home");
    });
    const login = localStorage.getItem("token");
    if (!login) {
      const divButton = this.querySelector(".buttons-intro");
      divButton.innerHTML = `
        <button class="button-login" >Login</button>
        <button class="button-register" >Register</button>`;
      const loginButton = divButton.querySelector(".button-login");
      const registerButton = divButton.querySelector(".button-register");
      loginButton.addEventListener("click", () => {
        return Router.go("/login");
      });
      registerButton.addEventListener("click", () => {
        return Router.go("/register");
      });
    }
  }
}
customElements.define("welcome-page", WelcomePage);
