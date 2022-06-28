import { config } from "../../api/config";
import MapboxClient from "mapbox";
import { mainState } from "../state";
const mapboxgl = require("mapbox-gl");
const MAPBOX_TOKEN = config.mapboxToken;
const mapboxClient = new MapboxClient(MAPBOX_TOKEN);
const state = mainState.getState();

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
    state.locationReport = e.target["q"].value;
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
export function map() {
  const map = initMap();
  initSearchForm(function (results) {
    const resultsSearch = results[1];

    state.myData.location.lng = resultsSearch.geometry.coordinates[0];
    state.myData.location.lat = resultsSearch.geometry.coordinates[1];
    const firstResult = [state.myData.location.lng, state.myData.location.lat];

    const marker = new mapboxgl.Marker().setLngLat(firstResult).addTo(map);
    map.setCenter(firstResult);
    map.setZoom(16);
  });
}
