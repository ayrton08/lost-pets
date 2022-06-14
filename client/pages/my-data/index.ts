import { mainState } from "../../state";
import { config } from "../../config";
const API_BASE_URL = "http://localhost:3000/api/v1";
export function myDataPage(params) {
  const div = document.createElement("div");
  div.className = "contenedor";
  div.innerHTML = `
    <div class="content-home">
      <span class="title-welcome">Mis Datos</span>
    <form class="my-data">
      <label>
        <h3>Fullname</h3>
        <input type="text" name="fullname" class="fullname"  />
      </label>

      <label class="container-password">
        <h3>Password</h3>
        <input type="password" name="password" class="password-first"/>
      </label>
      <label >
        <h3>Repeat Password</h3>
        <input type="password" name="password-repeat" class="password-second"/>
      </label>

      <button class="save">Guardar</button>
  </form>
    </div>
    
    `;
  (async function () {
    const state = await mainState.myData();
    console.log("data", state);

    const form = document.querySelector(".my-data")
    form["fullname"].value = state.fullname

    // const name = document.querySelector(".fullname");
    // name["value"] = state.fullname;
    const passwordFirst = document.querySelector(".password-first");
    passwordFirst["value"] = "solorelleno";
    const passwordSecond = document.querySelector(".password-second");
    passwordSecond["value"] = "solorelleno";
  })();

  return div;
}
