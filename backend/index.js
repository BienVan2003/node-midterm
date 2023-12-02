const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/message");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database connection successful!");
    })
    .catch((err) => {
        console.log(err.message);
    });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () =>
    console.log(`Server is running port: ${process.env.PORT}`)
);
const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});

// Danh sách người dùng đang online, lưu theo cặp userId và socket.id
global.onlineUsers = new Map();

// Sự kiện khi có kết nối mới từ client
io.on("connection", (socket) => {
    // Lưu thông tin socket của client hiện tại vào biến toàn cục chatSocket
    global.chatSocket = socket;
    console.log("Một kết nối socket mới vừa tham gia: " + socket.id)
    // Sự kiện khi client gửi yêu cầu thêm người dùng mới vào danh sách online
    socket.on("add-user", (userId) => {
        console.log(`Một User đã online với userId:${userId} và socketId:${socket.id}`)
        onlineUsers.set(userId, socket.id);
    });

    // Sự kiện khi client gửi tin nhắn, gửi tin đến người nhận nếu người đó online
    socket.on("send-msg", (data) => {
        console.log(`data: ${data}`)
        const sendUserSocket = onlineUsers.get(data.to);
        console.log(`Tin nhắn được gửi tới người dùng: ${data.to}`)
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.msg);
            console.log(`Tới người dùng ${data.to} với nội dung ${data.msg}`)
        }
    });

    socket.on("disconnect", () => {
        console.log(`Một kết nối socket đã rời đi: ${socket.id}`);

        // Tìm userId dựa trên socket.id
        const disconnectedUserId = [...onlineUsers.entries()].find(([key, value]) => value === socket.id)?.[0];

        // Xóa người dùng từ danh sách online nếu có userId
        if (disconnectedUserId) {
            onlineUsers.delete(disconnectedUserId);
            console.log(`Người dùng ${disconnectedUserId} đã rời đi.`);
        }
    });
});

app.get("/test", (req, res) => {
    const totalOnlineUsers = onlineUsers.size;
    console.log(`Tổng số người dùng đang online: ${totalOnlineUsers}`);
    return res.send(`Tổng số người dùng đang online: ${totalOnlineUsers}`)
})
