import 'dotenv/config';
import express from "express";
import http from "http";
import cors from "cors";
import { Server as SocketIOServer } from "socket.io";

const app = express();
app.use(cors());

const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: CORS_ORIGIN, methods: ["GET", "POST"] }
});

const rand = (min, max) => Math.random() * (max - min) + min;


const DOG_STATUSES = [
  "moving", "moving", "moving", 
  "idle",
  "low_battery",
  "offline"
];
const baseCenter = { lat: 37.7749, lng: -122.4194 }; 

const mkDog = (id, name) => ({
  id,
  name,
  lat: baseCenter.lat + rand(-0.05, 0.05),
  lng: baseCenter.lng + rand(-0.05, 0.05),
  speed: rand(0, 12),        // km/h
  heading: rand(0, 360),     // degrees
  battery: Math.floor(rand(40, 100)), // percent
  status: DOG_STATUSES[Math.floor(rand(0, DOG_STATUSES.length))],
  updatedAt: Date.now()
});

let dogs = [
  mkDog("d1", "Rex"),
  mkDog("d2", "Bella"),
  mkDog("d3", "Milo"),
  mkDog("d4", "Luna"),
];


function moveDog(d) {
  const step = (d.speed / 3600) * 0.5;
  const headingRad = (d.heading * Math.PI) / 180;
  const degPerKmLat = 1 / 110.574;
  const degPerKmLng = 1 / (111.320 * Math.cos((d.lat * Math.PI) / 180));

  d.lat += step * degPerKmLat * Math.sin(headingRad);
  d.lng += step * degPerKmLng * Math.cos(headingRad);

  if (Math.random() < 0.15) d.heading = (d.heading + rand(-30, 30)) % 360;
  if (Math.random() < 0.1) d.speed = Math.max(0, Math.min(18, d.speed + rand(-2, 3)));

  if (Math.random() < 0.05) {
    d.status = DOG_STATUSES[Math.floor(rand(0, DOG_STATUSES.length))];
  }

  if (d.battery <= 10) d.status = "low_battery";

  d.updatedAt = Date.now();
  return d;
}

// --- Socket wiring -----------------------------------------------------------
io.on("connection", (socket) => {
  console.log("client connected", socket.id);
  socket.emit("dogs:initial", dogs);

  socket.on("disconnect", () => {
    console.log("client disconnected", socket.id);
  });
});


setInterval(() => {
  dogs = dogs.map(moveDog);
  io.emit("dogs:update", dogs);
}, 500);

app.get("/", (_req, res) => {
  res.send("Dog Tracker API is running.");
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
