import { config } from "../../api/config";
import MapboxClient from "mapbox";
const mapboxgl = require("mapbox-gl");
const MAPBOX_TOKEN = config.mapboxToken;
const mapboxClient = new MapboxClient(MAPBOX_TOKEN);

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

export function map() {
  const map = initMap();
  initSearchForm(function (results) {
    const firstResult = results[0];
    const marker = new mapboxgl.Marker()
      .setLngLat(firstResult.geometry.coordinates)
      .addTo(map);

    map.setCenter(firstResult.geometry.coordinates);
    map.setZoom(13);
  });
}
