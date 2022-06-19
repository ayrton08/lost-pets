const mapboxgl = require("mapbox-gl");
import MapboxClient from "mapbox";
const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYXlydG9uMDgiLCJhIjoiY2wzeDZhZ2syMHk0NDNqbzJnbmxvazRiNCJ9.5zxk9KddYfSgjIPoEBz76A";
const mapboxClient = new MapboxClient(MAPBOX_TOKEN);

class ReportMapPage extends HTMLElement {
  connectedCallbak() {
    this.render();
  }
  render() {
    this.innerHTML = `
    <comp-header></comp-header>
    `;

    const mapa = document.querySelector(".search-form");
    const body = document.querySelector("body");

    if (location.pathname.includes("view-report")) {
      mapa["style"].display = "inherit";
      body["style"].backgroundColor = "#F8BBD0";
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

        const [lng, lat] = firstResult.geometry.coordinates;
        fetch(
          `http://localhost:3000/api/v1/pets/find-by-location?lat=${lat}&lng=${lng}`,
          {
            method: "get",
          }
        )
          .then((res) => res.json())
          .then((results) => {
            console.log(results);

            const geojson = {
              type: "FeatureCollection",
              features: [],
            };

            let width = 60;
            let height = 60;
            for (const pet of results) {
              const lat = pet._geoloc.lat;
              const lng = pet._geoloc.lng;
              const newPet = {
                type: "Feature",
                properties: {
                  message: pet.name,
                  iconSize: [width++, height++],
                },
                geometry: {
                  type: "Point",
                  coordinates: [lng, lat],
                },
              };
              geojson.features.push(newPet);
            }

            for (const marker of geojson.features) {
              const el = document.createElement("div");
              let width = marker.properties.iconSize[0];
              let height = marker.properties.iconSize[1];
              el.className = "marker";
              el.style.backgroundImage = `url(https://placekitten.com/g/${width}/${height}/)`;
              el.style.width = `${width}px`;
              el.style.height = `${height}px`;
              el.style.backgroundSize = "100%";

              el.addEventListener("click", () => {
                window.alert(marker.properties.message);
              });

              new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .addTo(map);
            }
          });

        map.setCenter(firstResult.geometry.coordinates);
        map.setZoom(13);
      });
    })();
  }
}
customElements.define("report-map-page", ReportMapPage);
