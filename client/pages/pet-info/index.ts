import { mainState } from "../../state";
// const API_BASE_URL = config.apiUrl me tira undefided la variable de ambiente
const API_BASE_URL = "http://localhost:3000/api/v1";
export function petInfoPage(params) {
  const div = document.createElement("div");
  div.className = "contenedor";
  div.innerHTML = `
    <comp-header></comp-header>
    <div class="content-home">
      <span class="title-welcome">Mis Mascotas Reportadas</span>
      <div class="services-section-two"></div>
    </div>
    <template id="portfolio-template">
            <div class="pets-card">
                <img class="logo-section-two" style="max-width:200px;" />
                <span class="title"></span>
                <a class="informacion"></a>
            </div>
    </template>
    `;
  const state = mainState.getState();
  console.log("state",state);

  return div;
}
