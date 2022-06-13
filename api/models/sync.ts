import { sequelize } from "./connection";
import "./index"

sequelize.sync({ force: true }).then((res) => console.log(res));
