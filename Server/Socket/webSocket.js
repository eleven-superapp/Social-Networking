const { WebSocket } = require("ws");
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const { chat } = require("../Chatbot/contorller");
const app = require("..");
const User = require("../Models/User");
const { Messages } = require("../Models/Messeging");
const Group = require("../Models/Groups");

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

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            ws.send("Invalid token");
            ws.close();
            return;
        }

        const id = decoded.user._id;
        const username = decoded.user.username;
        ws.username = username;
        ws.id = id;
        clients.set(id, ws);
        console.log(`User connected: ${username} (${id})`);

        ws.on("close", () => {
            console.log(`User disconnected: ${username} (${id})`);
            clients.delete(id);
        });

        ws.on("message", async (message) => {
            const eleven = await User.findOne({ username: "Eleven Ai" });
            const newMessage = JSON.parse(message.toString());
            const { text, reciever, sender, groupId,senderUsername } = newMessage;

            if (reciever == eleven._id) {
                const result = await chat.sendMessage(text);
                clients.get(sender).send(JSON.stringify({
                    text: result.response.text(),
                    receiver: sender,
                    sender: "ai",
                    status: "Sent"
                }));
            } else if (groupId) {
                try {
                    // Save group message to the database
                    const group = await Group.findById(groupId);
                    if (!group) {
                        ws.send(JSON.stringify({ error: "Group not found" }));
                        return;
                    }

                    const newMessageForDb = new Messages({
                        text: text,
                        sender: sender,
                        group: groupId,
                        status: "Sent"
                    });
                    await newMessageForDb.save().then(async (message) => {
                        // Add the message id to the group's messages array

                        group.messeges.push(message._id)
                        await group.save();
                        
                        // Broadcast the message to all group members
                        group.members.forEach(memberId => {
                        if (memberId.toString() !== sender) {
                            const recipientSocket = clients.get(memberId.toString());
                            if (recipientSocket) {
                                recipientSocket.send(JSON.stringify({
                                    _id:message._id,
                                    text:message.text,
                                    sender: message.sender,
                                    groupId: message.group,
                                    status: "Sent",
                                    createdAt:message.createdAt,
                                    senderUsername: senderUsername
                                }));
                            }
                        }
                    });
                    
                })
                } catch (err) {
                    console.error("Error processing group message:", err);
                }
            } else {
                try {
                    // Save private message to the database
                    const newMessageForDb = new Messages({
                        text: text,
                        receiver: reciever,
                        sender: sender,
                        status: "Sent"
                    });
                    await newMessageForDb.save();

                    // Send message to the recipient if connected
                    const recipientSocket = clients.get(reciever);
                    if (recipientSocket) {
                        recipientSocket.send(JSON.stringify({
                            text: text,
                            sender: sender,
                            receiver: reciever,
                            status: "Sent"
                        }));
                    } else {
                        console.log(`Recipient not connected: ${reciever}`);
                    }
                } catch (err) {
                    console.error("Error saving or sending message:", err);
                }
            }
        });

        // Send the list of connected clients to all clients
        const clientList = [...clients.values()].map((c) => ({ username: c.username, id: c.id }));
        clients.forEach((client) => client.send(JSON.stringify(clientList)));
    });
});

module.exports = { WebSocket };
