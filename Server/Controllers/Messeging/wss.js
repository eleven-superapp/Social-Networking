const server = require("../..");
const ws = require("ws");
const wss = new ws.WebSocketServer({ server })
let clientId = 0;
const clients = new Map();
wss.on('connection', function connection(ws, request) {
    const id = ++clientId; // Generate a unique ID for the client
    clients.set(ws, id);
    console.log(`Client connected with ID: ${id}`);
    ws.on('message', function message(data) {
        console.log(`Received message ${data} from client ${id}`);
        // Example: Broadcasting message to all clients
        wss.clients.forEach(client => {
            if (client.readyState === ws.OPEN) {
                client.send(`Client ${id} says: ${data}`);
            }
        });
    });
    ws.on('close', () => {
        console.log(`Client disconnected with ID: ${id}`);
        clients.delete(ws); // Remove the client from the map
    });
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

module.exports = wss;