const { WebSocket } = require("ws");
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const { chat } = require("../Chatbot/contorller");
const app = require("..");
const User = require("../Models/User");
const { Messages } = require("../Models/Messeging");
app.use(cookieParser());
const server = app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});

// WebSocket Setup
const wss = new WebSocket.Server({ server });
const clients = new Map(); // Map to store connected clients

wss.on("connection", (ws, req) => {

    const token = req.headers.cookie?.split("socialToken=")[1];
    if (!token) {
        ws.send("Login first");
        console.log("Login First");
        ws.close();
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, { user }) => {
        if (err) {
            ws.send("Invalid token");
            ws.close();
            return;
        }
        const id = user._id;
        const username = user.username;
        ws.username = username;
        ws.id = id;
        clients.set(id, ws);
        console.log(`User connected: ${username} (${id})`);
        ws.on("close", () => {
            console.log(`User disconnected: ${username} (${id})`);
            clients.delete(id);
        })

        ws.on("message", async (message) => {
            const eleven = await User.findOne({ username: "Eleven Ai" })
            const newMessage = JSON.parse(message.toString());
            const { text, reciever, sender } = newMessage;

            if (reciever == eleven._id) {
                const result = await chat.sendMessage(text);
                clients.get(sender).send(JSON.stringify({
                    text: result.response.text(),
                    receiver: sender,
                    sender: "ai",
                    status: "Sent"
                }))
            } else {
                try {
                    const newMessageForDb = new Messages({
                        text: text,
                        receiver: reciever,
                        sender: sender,
                        status: "Sent"
                    });
                    console.log("Saving message to database:", newMessageForDb);
                    await newMessageForDb.save();

                    // Send message to the recipient if connected
                    const recipientSocket = clients.get(reciever);
                    if (recipientSocket) {
                        recipientSocket.send(JSON.stringify(newMessage));
                        console.log(`Message sent to recipient: ${reciever}`);
                    } else {
                        console.log(`Recipient not connected: ${reciever}`);
                    }
                } catch (err) {
                    console.error("Error saving or sending message:", err);
                }
            }
        });

        // Broadcast connected clients
        const clientList = [...clients.values()].map((c) => ({ username: c.username, id: c.id }));
        clients.forEach((client) => client.send(JSON.stringify(clientList)));
    });
});

module.exports = { WebSocket };
