import { mainState } from "../../state";
import { config } from "../../config";
const API_BASE_URL = "http://localhost:3000/api/v1";

class MyData extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
      <comp-header></comp-header>  
      <div class="content-data">
        <span class="title-welcome">Mis Datos</span>
      <form class="my-data-form">
        <label>
          <h3>Fullname</h3>
          <input type="text" name="fullname" class="fullname"  />
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
        </form>
      </div>
      
      `;
    (async function () {
      const state = await mainState.myData();
      const name = document.querySelector(".fullname");
      name["value"] = state.fullname;
      const passwordFirst = document.querySelector(".password-first");
      const passwordSecond = document.querySelector(".password-second");

      const saveData = document.querySelector(".save-data");
      saveData.addEventListener("click", (e) => {
        e.preventDefault();
        const fullnameEl = document.querySelector(".fullname");
        const newFullName = fullnameEl["value"];
        const passwordEl = document.querySelector(".password-first");
        const newPassword = fullnameEl["value"];
        const passwordSecond = document.querySelector(".password-second");

        if (name["value"] != state.fullname) {
          console.log("el nombre cambio", name["value"]);

          const newData = mainState.updateDataUser(newFullName);
        }
        if (passwordFirst["value"] === passwordSecond["value"]) {
          console.log("el password cambio");

          const newData = mainState.updateDataUser(newPassword);
        }
      });
    })();
  }
}
customElements.define("my-data-page", MyData);
