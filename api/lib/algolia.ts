import algoliasearch from "algoliasearch";
import { config } from "../config";
const client = algoliasearch(config.algoliaUser, config.algoliaPassword);

const index = client.initIndex("Pets");

export { index };
