import * as jwt from "jsonwebtoken";
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
    </div>
    `;
  }
}
customElements.define("login-page", LoginPage);
