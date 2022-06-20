import { mainState } from "../../state";
import { config } from "../../config";
import { Router } from "@vaadin/router";
const API_BASE_URL = "http://localhost:3000/api/v1";

class MyData extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  async render() {
    const login = localStorage.getItem("token");
    const state = await mainState.myData();

    if (!login) {
      return Router.go("/login");
    }
    this.innerHTML = `
      <comp-header></comp-header>  
      <div class="content-data">
        <span class="title-welcome">Mis Datos</span>
      <form class="my-data-form">
        <label>
          <h3>Fullname</h3>
          <input type="text" name="fullname" class="fullname" value="${state.fullname}" />
        </label>
  
        <label class="container-password">
          <h3>Password</h3>
          <input type="password" name="password" class="password-first" placeholder="Nueva contraseña"/>
        </label>
        <label >
          <h3>Repeat Password</h3>
          <input type="password" name="password-repeat" class="password-second" placeholder="Repita la contraseña"/>
        </label>
  
        <button class="save-data">Guardar</button>
        <div class="result-changes"><div>
        </form>
      </div>
      
      `;

    const passwordFirst = document.querySelector(".password-first");
    const passwordSecond = document.querySelector(".password-second");

    const saveData = document.querySelector(".my-data-form");
    console.log("state", state);
    saveData.addEventListener("submit", async (e) => {
      e.preventDefault();
      const newFullname = saveData["fullname"].value;
      const password = saveData["password"].value;
      const passwordSecond = saveData["password-repeat"].value;
      const result = document.querySelector(".result-changes");

      if (newFullname != state.fullname) {
        console.log("el nombre cambio", newFullname);
        await mainState.updateDataUser(newFullname);
        return (result.textContent = "Cambios guardados ✅");
      }
      if (password && password === passwordSecond) {
        console.log("el password cambio");

        await mainState.updateDataUser(newFullname, password);
        return (result.textContent = "Cambios guardados ✅");
      } else {
        alert("No hay cambios");
      }
    });
  }
}
customElements.define("my-data-page", MyData);
