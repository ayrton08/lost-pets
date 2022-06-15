import * as jwt from "jsonwebtoken";
import { mainState } from "../state";
export function formLogin() {
  class FormLogin extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.render();
    }

    render() {
      this.attachShadow({ mode: "open" });
      const div = document.createElement("div");
      div.className = "root";

      const stateLogin = localStorage.getItem("token");
      if (stateLogin) {
        setTimeout(() => {
          div.textContent = `Regirigiendo... 🕒`;
        }, 5000);
        return (location.pathname = "home");
      }

      div.innerHTML = `
       
        <div>
              <form class="form-login">
                  <label>
                    <h3>Email</h3>
                    <input type="text" name="email" class="input-email" placeholder="Your Email" />
                  </label>
                  <label class="container-password">
                    <h3>Password</h3>
                    <input type="text" name="password" class="password-first" placeholder="Your Password" />
                    <div class="password-validator"></div>
                  </label>
                  <button>Login</button>
              </form>
          </div>
                  ${this.getStyles()}    
              `;
      this.shadowRoot.appendChild(div);
      const state = mainState.getState();
      const formLogin = this.shadowRoot.querySelector(".form-login");
      const valid = this.shadowRoot.querySelector(".password-validator");

      formLogin.addEventListener("submit", async (e) => {
        e.preventDefault();
        valid["style"].fontSize = "30px";
        valid.textContent = "⌛";

        const email = e.target["email"].value;
        const password = e.target["password"].value;
        const login = await mainState.login(email, password);

        if (state.myData.login) {
          try {
            valid["style"].color = "green";
            valid.textContent = "Login exitoso ✅";
            mainState.setToken(login);
            return (location.pathname = "home");
          } catch (error) {
            valid["style"].color = "red";
            valid["style"].fontSize = "20px";
            valid.textContent = "Email o contraseña incorrecta ❌";
            console.error(error);
          }
        }
      });
    }
    getStyles() {
      return `
              <style>
              .form-login{
                display: flex;
                flex-direction: column;
                background-color: #F9E79F;
                justify-content: center;
                align-items: center;
                border: solid 2px;
                gap: 10px;
                padding: 20px;
                width: 100%;
              },
              
             </style>
              `;
    }
  }
  customElements.define("form-login", FormLogin);
}
