import { mainState } from "../../state";
import { config } from "../../config";
// const API_BASE_URL = config.apiUrl me tira undefided la variable de ambiente
const API_BASE_URL = "http://localhost:3000/api/v1"
export function homePage(params) {
  const div = document.createElement("div");
  div.className = "contenedor";
  div.innerHTML = `
    <comp-header></comp-header>
    <div class="content-home">
      <span class="title-welcome">Mascotas perdidas cerca tuyo</span>
      <div>Aqui van las tarjetitas de las mascotas encontradas</div>
      <div class="services-section-two"></div>
    </div>
    <template id="portfolio-template">
            <div class="pets-card">
                <img class="logo-section-two" />
                <span class="title"></span>
                <a class="informacion"></a>
            </div>
    </template>
    `;

  const state = mainState.getState();
  navigator.geolocation.getCurrentPosition((position) => {
    state.myData.location.lat = position.coords.latitude;
    state.myData.location.lng = position.coords.longitude;
    mainState.setState(state);

    getDataPets().then((data) => {
      for (const c of data) {
        console.log(c);
        addPetCard(c);
      }
    });
  });

  function addPetCard(params = {}) {
    const template = document.querySelector("#portfolio-template");
    const container = document.querySelector(".services-section-two");

    template["content"].querySelector(".logo-section-two").src =
      params["image"];
    template["content"].querySelector(".title").textContent = params["name"];
    template["content"].querySelector(".informacion").textContent =
      "Reportar Informacion";

    const clone = document.importNode(template["content"], true);
    container.appendChild(clone);
  }

  async function getDataPets() {
    const lat = state.myData.location.lat;
    const lng = state.myData.location.lng;
    console.log("location", { lat, lng });
    const response = await fetch(
      `${API_BASE_URL}/pets/find-by-location?lat=${lat}&lng=${lng}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  }

  return div;
}
