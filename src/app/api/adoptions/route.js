import { Server } from "socket.io";

export default function handler(req, res) {
  if (res.socket.server.io) {
    res.end(); // already set up
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    console.log("User connected");

    // Example: Emit a new adoption request
    socket.emit("new-adoption-request", {
      title: "New Adoption Request",
      desc: "Anisur Rahman wants to adopt Buddy.",
      time: "Just now",
    });
  });

  res.end();
}