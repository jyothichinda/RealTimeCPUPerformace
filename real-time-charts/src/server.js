const server = require("http").createServer();
const os = require("os-utils");

const io = require("socket.io")(server, {
  transports: ["websocket", "polling"],
});

// Listen for socket connections
io.on("connection", (client) => {
  console.log("Client connected");

  // Emit CPU usage data every second
  const interval = setInterval(() => {
    const currentTime = new Date().toLocaleTimeString();
    os.cpuUsage((cpuPercentage) => {
      client.emit("cpu", { time: currentTime, value: cpuPercentage });
    });
  }, 1000);

  // Clear interval on disconnect
  client.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
