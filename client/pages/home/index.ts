import { mainState } from "../../state";
// const API_BASE_URL = config.apiUrl
const API_BASE_URL = "https://lost-pets-production.up.railway.app/api/v1";
class HomePage extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
    <comp-header></comp-header>
    <div class="content-home">
      <span class="title-welcome">Lost pets near you</span>
      <div class="services-section-two"></div>
      <div class="form-info"><div>
    </div>
    
    `;

    // const goToMap = this.querySelector(".see-map");
    // goToMap.addEventListener("click", () => {
    //   return Router.go("/view-reports");
    // });
    mainState.hiddeMap();

    const state = mainState.getState();
    navigator.geolocation.getCurrentPosition((position) => {
      state.myData.location.lat = position.coords.latitude;
      state.myData.location.lng = position.coords.longitude;
      mainState.setState(state);

      getDataPets().then(async (data) => {
        data.map((item) => {
          if (item.state) {
            return addPetCard(item);
          }
        });
      });
    });

    function addPetCard(params = {}) {
      const cardDiv = document.createElement("div");
      cardDiv.className = "pets-card";
      cardDiv.innerHTML = `
        
                <img class="logo-section-two" style="width: 100%;" src='${
                  params["pictureURL"]
                }' />
                <span class="title-name">Nombre:  <span class="title">${
                  params["name"]
                }</span></span>
                <span class="title-name">Raza:  <span class="title">${
                  params["raza"] || ""
                }</span></span>
                <span class="title-location">Location:  <span class="title">${
                  params["location"] || ""
                }</span></span>
                <a id='${params["objectID"]}' class="editar">Reportar</a>
       `;

      cardDiv.addEventListener("click", async () => {
        const id = Number(`${params["objectID"]}`);
        const search = await mainState.findById(id);
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
            <span >Reported at: <span class="time-report">${search.createdAt.slice(
              0,
              16
            )}</span></span>

            <img class="card-info-pic" src="${search.pictureURL}"></img>
            <label>
              <span>Your Name</span>
              <input type="text" name="fullname" class="input-email" placeholder="Your Name" />
            </label>
            <label class="container-cellphone">
              <span>Your Cellphone</span>
              <input type="text" name="cellphone" class="password-first" placeholder="Your Cellphone" />
            </label>
            <label class="textarea-last-place">
                <span>¿Where did you see?</span>
                <textarea name="last-place" class="last-place"></textarea>
            </label>
            <br>
            <button>Send</button>
        </form>
        
      `;
        const formSend = document.querySelector(".form-report");
        formSend.addEventListener("submit", async (e) => {
          e.preventDefault();
          const data = {
            fullname: formSend["fullname"].value,
            cellphone: formSend["cellphone"].value,
            message: formSend["last-place"].value,
            title: search.name,
            emailOwner: search.email,
          };
          const state = await mainState.sendInfoPet(data);

          formInfo.innerHTML = `
          <div class="report-send">¡Report sent successfully! ✅</div>
          `;
        });

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
  }
}
customElements.define("home-page", HomePage);
