import * as jwt from "jsonwebtoken";
import { mainState } from "../../state";
import { Router } from "@vaadin/router";
class LoginPage extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
    <comp-header></comp-header>
    <div class="content-login">
    <form-login></form-login>
    </div>
    `;

    mainState.hiddeMap();
  }
}
customElements.define("login-page", LoginPage);
