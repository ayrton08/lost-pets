import "dotenv/config";

export const config = {
  env: process.env.NODE_ENV || "dev",
  port: process.env.API_PORT || 3000,
  dbUser: process.env.PG_USER,
  dbPassword: process.env.PG_PASSWORD,
  dbHost: process.env.PG_HOST,
  dbName: process.env.PGDATABASE,
  dbPort: Number(process.env.DB_PORT),
  algoliaUser: process.env.ALGOLIA_USER,
  algoliaPassword: process.env.ALGOLIA_PASSWORD,
  cloudinaryName: process.env.CLOUDINARY_NAME,
  cloudinaryKey: process.env.CLOUDINARY_KEY,
  cloudinarySecret: process.env.CLOUDINARY_SECRET,
  mapboxToken: process.env.MAPBOX_TOKEN,
  secretValidator: process.env.SECRET_VALIDATOR,
  apiUrl: process.env.API_BASE_URL,
  sendGrid: process.env.SENDGRID_API_KEY,
};
