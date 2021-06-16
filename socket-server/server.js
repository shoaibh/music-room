const io = require("socket.io")(3001, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})

const defaultValue = ""

io.on("connection", socket => {
    socket.on("get-room", async roomId => {
        socket.join(roomId)
        socket.emit("load-room", roomId)

        socket.on("change-song", delta => {
            socket.broadcast.to(roomId).emit("receive-change-song", delta)
        })
    })

    socket.on("refresh-rooms",()=>{
        socket.broadcast.emit("refresh")
    })
})
