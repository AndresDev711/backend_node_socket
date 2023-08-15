import express from "express";
import morgan from "morgan";
import cors from "cors";
import { Server as SocketServer } from "socket.io";
import http from "http";

import {
  ORIGIN_LOCALHOST_ADMIN,
  ORIGIN_LOCALHOST_POSTMAN,
} from "./core/config/cors.config.js";

const whitelist = [ORIGIN_LOCALHOST_ADMIN, ORIGIN_LOCALHOST_POSTMAN];

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: ORIGIN_LOCALHOST_POSTMAN,
    ORIGIN_LOCALHOST_ADMIN,
  },
});

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: function (origin, callback) {
      if (whitelist.includes(origin) || !origin) return callback(null, origin);

      return callback("Error Cors");
    },
  })
);

app.use("/api/v1", (req, res) => {
  return res.json({ message: "OK" });
});

app.use((req, res, next) => {
  return res.status(404).json({
    message: "Endpoint not fount",
  });
});

io.on("connection", ()=>{
  console.log("a user conected")
})

export default server;
