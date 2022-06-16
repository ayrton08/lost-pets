import { mainState } from "../../state";
import { config } from "../../config";
// const API_BASE_URL = config.apiUrl me tira undefided la variable de ambiente
const API_BASE_URL = "http://localhost:3000/api/v1";
export function homePage(params) {
  const div = document.createElement("div");

  const login = localStorage.getItem("token");
  if (!login) {
    div.innerHTML = `
      <span>¡No estas logeado!</span>

    `;
  }
  div.className = "contenedor";
  div.innerHTML = `
    <comp-header></comp-header>
    <div class="content-home">
      <span class="title-welcome">Mascotas perdidas cerca tuyo</span>
      <div class="services-section-two"></div>
      <div class="form-info"><div>
    </div>
    
    `;

  const state = mainState.getState();
  navigator.geolocation.getCurrentPosition((position) => {
    state.myData.location.lat = position.coords.latitude;
    state.myData.location.lng = position.coords.longitude;
    mainState.setState(state);

    getDataPets().then(async (data) => {
      // console.log(data);
      for (const c of data) {
        addPetCard(c);
      }
    });
  });

  function addPetCard(params = {}) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "pets-card";
    cardDiv.innerHTML = `
        
                <img class="logo-section-two" style="width: 100%;" src='${params["pictureURL"]}' />
                <span class="title-name">Nombre: ${params["name"]} <span class="title"></span></span>
                <a id='${params["objectID"]}'>Reportar</a>
       `;

    cardDiv.addEventListener("click", async () => {
      const id = Number(`${params["objectID"]}`);
      const search = await mainState.findById(id);
      console.log("resultado", search);
      window.scroll({
        top: 100,
        left: 100,
        behavior: "smooth",
      });
      const formInfo = document.querySelector(".form-info");
      formInfo.innerHTML = `
        <button class="close-report">❌</button>
        <form class="form-report">
            
            <span class="name-pet">${search.name}</span>
            <span >Reportado el: <span class="time-report">${search.createdAt.slice(
              0,
              16
            )}</span></span>

            <img class="card-info-pic" src="${search.pictureURL}"></img>
            <label>
              <span>Tu Nombre</span>
              <input type="text" name="email" class="input-email" placeholder="Your Name" />
            </label>
            <label class="container-password">
              <span>Tu Telefono</span>
              <input type="text" name="password" class="password-first" placeholder="Your Cellphone" />
            </label>
            <label class="textarea-last-place">
                <span>¿Donde lo viste?</span>
                <textarea name="last-place" class="last-place"></textarea>
            </label>
            <br>
            <button>Enviar</button>
        </form>
        
      `;

      const buttonClose = document.querySelector(".close-report");
      buttonClose.addEventListener("click", () => {
        formInfo.innerHTML = "";
      });
    });

    const divNew = document.querySelector(".content-home");
    divNew.appendChild(cardDiv);
  }

  async function getDataPets() {
    const lat = state.myData.location.lat;
    const lng = state.myData.location.lng;
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
