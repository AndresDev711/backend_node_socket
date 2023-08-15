import express from "express";
import cors from "cors";
import {
  ORIGIN_LOCALHOST_ADMIN,
  ORIGIN_LOCALHOST_POSTMAN
} from "./core/config/cors.config.js";

const app = express();
app.use(express.json());

const whitelist = [
  ORIGIN_LOCALHOST_ADMIN,
  ORIGIN_LOCALHOST_POSTMAN
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (whitelist.includes(origin) || !origin) return callback(null, origin);

      return callback("Error Cors");
    },
  })
);

app.use("/api/v1", (req, res)=> {
  return res.json({message: "OK"})
});


app.use((req, res, next) => {
  return res.status(404).json({
    message: "Endpoint not fount",
  });
});

export default app;
