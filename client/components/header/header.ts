import { mainState } from "../../state";
import { Router } from "@vaadin/router";

class Header extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }
  render() {
    this.attachShadow({ mode: "open" });
    const div = document.createElement("header");
    const stateLocal = localStorage.getItem("token");
    if (!stateLocal) {
      div.innerHTML = `
        <div class="container-header">
        <div class="izquierda">
          <a>
              <span class="logo">🐶</span>
          </a>
        </div>
        <div class="derecha">
           <button class="abre-ventana">☰</button>
        </div>
        </div>
        <div class="menu-modal">
        <button class="modal-close">❌</button>
          <a class="goto-login">Sing in to you account</a>
          <a class="goto-register">Creat an account</a>
        </div>
      ${this.getStyles()}`;
      this.shadowRoot.appendChild(div);

      const goToHome = this.shadowRoot.querySelector(".logo");
      goToHome.addEventListener("click", () => {
        Router.go("/home");
      });

      const goToLogin = this.shadowRoot.querySelector(".goto-login");
      goToLogin.addEventListener("click", () => {
        Router.go("/login");
      });

      const goToRegister = this.shadowRoot.querySelector(".goto-register");
      goToRegister.addEventListener("click", () => {
        Router.go("/register");
      });

      const openMenu = this.shadowRoot.querySelector(".abre-ventana");
      const closeMenu = this.shadowRoot.querySelector(".modal-close");
      openMenu.addEventListener("click", () => {
        const container = this.shadowRoot.querySelector(".menu-modal");
        container["style"].display = "flex";
      });
      closeMenu.addEventListener("click", () => {
        const container = this.shadowRoot.querySelector(".menu-modal");
        container["style"].display = "none";
      });
      return;
    } else {
      div.innerHTML = `
        <div class="container-header">
          <div class="izquierda">
            <a class="button-home">
                <span class="logo">🐶</span>
            </a>
          </div>
          <div class="derecha">
             <button class="abre-ventana">☰</button>
          </div>
        </div>
        
        <div class="menu-modal">
        <button class="modal-close">❌</button>
          
          <span class="my-data">Mis Datos</span>
          <span class="my-reports">Mis Mascotas Reportadas</span>
          <span class="do-report">Reportar Mascota</span>
          
          <div class="menu-footer">
              <div class="name-user"></div>
              <button class="close-session">Cerrar Seccion</button>
          </div>
        </div>
      ${this.getStyles()}`;
      this.shadowRoot.appendChild(div);

      const nameUser = this.shadowRoot.querySelector(".name-user");
      // if (stateLocal.fullname) {
      //   nameUser.textContent = `${stateLocal.fullname}`;
      // }
      const goToHome = this.shadowRoot.querySelector(".logo");
      goToHome.addEventListener("click", () => {
        Router.go("/home");
      });
      const closeSession = this.shadowRoot.querySelector(".close-session");
      closeSession.addEventListener("click", () => {
        mainState.logOut();
        return Router.go("/welcome");
      });

      const openMenu = this.shadowRoot.querySelector(".derecha");
      const closeMenu = this.shadowRoot.querySelector(".modal-close");
      openMenu.addEventListener("click", () => {
        const container = this.shadowRoot.querySelector(".menu-modal");
        container["style"].display = "flex";
        if (location.pathname.includes("view-reports")) {
          const mapa = document.querySelector(".mapboxgl-canvas");
          mapa["style"].display = "none";
        }
      });
      closeMenu.addEventListener("click", () => {
        const container = this.shadowRoot.querySelector(".menu-modal");
        container["style"].display = "none";
      });

      const myData = this.shadowRoot.querySelector(".my-data");
      myData.addEventListener("click", () => {
        Router.go("/my-data");
      });
      const doReport = this.shadowRoot.querySelector(".do-report");
      doReport.addEventListener("click", () => {
        Router.go("/do-report");
      });
      const myReports = this.shadowRoot.querySelector(".my-reports");
      myReports.addEventListener("click", () => {
        Router.go("/my-reports");
      });
    }
  }
  getStyles() {
    return `
                <style>
                .container-header {
                  display: flex;
                  padding: 20px;
                  text-align: center;
                  justify-content: space-between;
                  background-color: #D2B4DE;
                  font-size: 50px;
                }

                .menu-modal {
                  display: flex;
                  flex-direction: column;
                  justify-content: space-evenly;
                  text-align: center;
                  position: absolute;
                  top: 0px;
                  left: 0px;
                  right: 0px;
                  bottom: 0px;
                  background-color: #FFE082;
                  font-size: 40px;
                  font-weight: bold;
                  padding: 80px;
                  opacity: 0.9;
                  display: none;
                  
                }

                .menu-items {
                  display: flex;
                  flex-direction: column;
                  gap: 60px;
                  padding-top:60px;
                }

                .menu-footer {
                  padding-top:150px;
                  font-size: 20px
                }

                .modal-close {
                  position: absolute;
                  top: 35px;
                  left: 350px;
                  right: 30px;
                  bottom: 690px;
                }
               </style>
                `;
  }
}
customElements.define("comp-header", Header);
