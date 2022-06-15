import { User } from "./user";
import { Pets } from "./pets";
import { Auth } from "./auth";

User.hasMany(Pets);
Pets.belongsTo(User);

export { User, Pets, Auth };
