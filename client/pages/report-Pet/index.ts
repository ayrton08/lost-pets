import { Router } from "@vaadin/router";
class DoReport extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    const login = localStorage.getItem("token");
    if (!login) {
      return Router.go("/login");
    }
    this.innerHTML = `
    <comp-header></comp-header>
    <h3 class="title-report">Reportar mascota perdida</h3>
    <form-report-pet></form-report-pet>
    `;
    if (location.pathname.includes("do-report")) {
      const mapa = document.getElementById("map");
      mapa["style"].display = "flex";
    }
  }
}
customElements.define("report-page", DoReport);
