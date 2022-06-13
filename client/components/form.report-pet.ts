import { mainState } from "../state";
import { config } from "../../api/config";
const mapboxgl = require("mapbox-gl");
import MapboxClient from "mapbox";
const MAPBOX_TOKEN = config.mapboxToken;
const mapboxClient = new MapboxClient(MAPBOX_TOKEN);
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
        <div>
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
        </div>
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

      const eventReport = this.shadowRoot.querySelector(".form-report");
      eventReport.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = e.target["name"].value;
        const raza = e.target["raza"].value;
        
        const params = {
          name,
          raza,
          pictureURL: "",
          lat: 2,
          lng: 2,
          state: true,
          UserId: 1,
        };
        const res = await mainState.doReport(params);
        console.log("soy la respuesta del report", res);
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
  function initMap() {
    mapboxgl.accessToken = MAPBOX_TOKEN;
    let map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-64.196077, -31.409922],
      zoom: 4,
    });
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
    map.addControl(new mapboxgl.NavigationControl());

    return map;
  }

  function initSearchForm(callback) {
    const form = document.querySelector(".search-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      mapboxClient.geocodeForward(
        e.target["q"].value,
        {
          // country: "ar",
          autocomplete: true,
          language: "es",
        },
        function (err, data, res) {
          if (!err) callback(data.features);
        }
      );
    });
  }

  (function () {
    const map = initMap();
    initSearchForm(function (results) {
      const firstResult = results[0];
      const marker = new mapboxgl.Marker()
        .setLngLat(firstResult.geometry.coordinates)
        .addTo(map);

      map.setCenter(firstResult.geometry.coordinates);
      map.setZoom(13);
    });
  })();

  customElements.define("form-report-pet", ReportPet);
}
