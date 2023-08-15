import app from "./app.js";
import { PORT } from "./core/config/env.config.js";
//import cronExpire from "./cron/controllers/cron.controller.js";

app.listen(PORT);
console.log("Server: ", PORT);