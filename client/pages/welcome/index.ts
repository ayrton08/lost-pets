import { Router } from "@vaadin/router";
import { mainState } from "../../state";
class WelcomePage extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }

  async render() {
    this.innerHTML = `
      <comp-header></comp-header>
      <div class="content">
        <span class="title-main">¡Welcome!</span>
        <span class="title-welcome">To see the pets reported near you... we need permission to know your location</span>
        <button class="location">Give Location</button>
        <div class="buttons-intro"></div>
      </div>
      `;

    mainState.hiddeMap();

    const locationEl = this.querySelector(".location");
    locationEl.addEventListener("click", () => {
      return Router.go("/home");
    });
    const stateLogin = await mainState.myData();

    if (!stateLogin.id) {
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
