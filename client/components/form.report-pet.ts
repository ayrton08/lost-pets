import { mainState } from "../state";
import Dropzone from "dropzone";
import { map } from "./mapa";

export function reportPet() {
  class ReportPet extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.render();
    }

    render() {
      this.attachShadow({ mode: "open" });
      const div = document.createElement("div");
      div.className = "container-report";
      div.innerHTML = `
        <form class="form-report">
            <label>
              <h3>Nombre</h3>
              <input type="text" name="name" class="input-name" placeholder="Your Name" />
            </label>
            <label>
              <h3>Raza</h3>
              <input type="text" name="raza" class="raza" placeholder="Raza" />
            </label>
              <div class="profile-picture-container">
                <img class="profile-picture" />
                <h3>Arraste su foto aqui</h3>
              </div>
            <label>
                <div>aca va el map</div>
            </label>
            <span>
              Buscá un punto de referencia para reportar a tu mascota. Puede ser una dirección, un barrio o una ciudad.
            </span>
            <button>Reportar como Perdido</button>
            <button>Cancelar</button>
        </form>
          ${this.getStyles()}`;
      this.shadowRoot.appendChild(div);

      const body = document.querySelector("body");
      const searchMap = document.querySelector(".search-form");
      const mapa = document.querySelector(".mapboxgl-map");

      if (location.pathname.includes("do-report")) {
        body["style"].backgroundColor = "#FFCCBC";
        searchMap["style"].display = "inherit";
        mapa["style"].overflow = "inherit";
      }

      const token = localStorage.getItem("token");

      const form = this.shadowRoot.querySelector(".form-report");
      const profile = this.shadowRoot.querySelector(
        ".profile-picture-container"
      );
      let imageDataURL;

      const myDropzone = new Dropzone(profile, {
        url: "/falsa",
        autoProcessQueue: false,
        clickable: true,
      });
      myDropzone.on("addedfile", function (file) {
        // usando este evento pueden acceder al dataURL directamente
        imageDataURL = file;
        console.log(file);
      });

      const state = mainState.getState();
      navigator.geolocation.getCurrentPosition((position) => {
        state.myData.location.lat = position.coords.latitude;
        state.myData.location.lng = position.coords.longitude;
        mainState.setState(state);
      });
      console.log(state)

      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = e.target["name"].value;
        const raza = e.target["raza"].value;
        const data = {
          name,
          raza,
          pictureURL: imageDataURL.dataURL,
          lat: state.myData.location.lat,
          lng: state.myData.location.lng,
          state: true,
        };
        console.log("data", data);
        const res = await mainState.doReport(data, token);
      });
    }
    getStyles() {
      return `
                <style>
                .container-report{
                  display: flex;
                  flex-direction: column;
                  width: 80%;
                  text-align: center;
                  border: solid 3px;
                  background-color: #CFD8DC;
                  align-content: center;
                  justify-content: center;
                  margin:20px;
  
                }

                .form-report {
                  display:flex;
                  flex-direction:column;
                  gap:30px;
                  padding:30px;
                  align-items: center;
                }

                button {
                  max-width:50%;
                }
               </style>
                `;
    }
  }
  map();

  customElements.define("form-report-pet", ReportPet);
}
