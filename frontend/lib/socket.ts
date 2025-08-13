import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket() {
  if (!socket) {
    socket = io("http://localhost:4000", {
      transports: ["websocket"], // prefer ws
      autoConnect: true
    });
  }
  return socket;
}
