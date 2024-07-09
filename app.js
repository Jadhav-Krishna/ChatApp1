const express = require("express")
const app = express();
const http = require("http")
const path = require("path")
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

app.get("/", (req, res) => {
    res.render("index")
})

server.listen(3000, () => {
    console.log("Server is running on port 3000")
})