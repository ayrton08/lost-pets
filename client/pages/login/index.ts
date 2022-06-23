import * as jwt from "jsonwebtoken";
import { mainState } from "../../state";
import { Router } from "@vaadin/router";
class LoginPage extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  async render() {
    const stateLogin = await mainState.myData();
    if (!stateLogin.id) {
      return Router.go("/login");
    }
    this.innerHTML = `
    <comp-header></comp-header>
    <div class="content-login">
    <form-login></form-login>
    </div>
    `;
  }
}
customElements.define("login-page", LoginPage);
