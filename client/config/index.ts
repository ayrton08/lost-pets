import "dotenv/config";

export const config = {
  // env: process.env.NODE_ENV || "dev",
  // port: process.env.PORT || 3000,
  // dbUser: process.env.DB_USER,
  // dbPassword: process.env.DB_PASSWORD,
  // dbHost: process.env.DB_HOST,
  // dbName: process.env.DB_NAME,
  // dbPort: Number(process.env.DB_PORT),
  // algoliaUser: process.env.ALGOLIA_USER,
  // algoliaPassword: process.env.ALGOLIA_PASSWORD,
  // cloudinaryName: process.env.CLOUDINARY_NAME,
  // cloudinaryKey: process.env.CLOUDINARY_KEY,
  // cloudinarySecret: process.env.CLOUDINARY_SECRET,
  mapboxToken: process.env.MAPBOX_TOKEN,
  secretValidator: process.env.SECRET_VALIDATOR,
  apiUrl: process.env.API_URL,

};
console.log(config)