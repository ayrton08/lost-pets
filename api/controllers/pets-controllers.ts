import { Pets } from "../models/pets";
import { index } from "../lib/algolia";

export class PetsController {
  constructor() {}

  async reportLostPet(params) {
    try {
      const newPet = await Pets.create(params);
      return newPet;
    } catch (error) {
      return new Error("No pudimos crear el report de la pet")
    }
  }

  async findAllPets() {
    try {
      const allPets = await Pets.findAll();
      return allPets;
    } catch (error) {
      return new Error("No pudimos encontrar todos los pets reportados")
    }
  }

  async findClose(lat, lng) {
    const { hits } = await index.search("", {
      aroundLatLng: [lat, lng].join(","),
      aroundRadius: 5000,
    });
    return hits;
  }

  async updateReportAlgolia(id, name, state, lat, lng) {
    const algoliaRes = await index.saveObject({
      objectID: id,
      name: name,
      state: state,
      _geoloc: {
        lat: lat,
        lng: lng,
      },
    });
    return algoliaRes;
  }

  bodyToIndex(body, id?) {
    if(!body.lat || !body.lng || !body.name || !body.state  ){
      return new Error("Faltan parametros")
    }
    const rta: any = {};
    if (body.name) {
      rta.name = body.name;
    }
    if (body.state) {
      rta.state = body.state;
    }
    if (body.lat && body.lng) {
      rta._geoloc = {
        lat: body.lat,
        lng: body.lng,
      };
    }
    if (id) {
      rta.objectID = id;
    }
    return rta;
  }
}
