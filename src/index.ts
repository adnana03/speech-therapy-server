import express, { Request, Response } from "express";
import { Server as SocketIOServer, Socket } from "socket.io";
import cors from "cors";
import fs from "fs";
import https from "https";
import webcamRoutes from "./shared/routes/webcam";
import taskRoutes from "./shared/routes/tasks";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static("public"));

app.use(express.json());
app.use("/webcam", webcamRoutes);
app.use("/tasks", taskRoutes);

app.get("/", (req: Request, res: Response) => {
  // Maneja tu lógica de la API aquí
  const data = { message: "¡Hola desde el servidor Express!" };
  res.json(data);
});

const PORT_ENDPOINT = 3001;
app.listen(PORT_ENDPOINT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// ****** SOCKET *************************************************************

// Ruta al certificado y clave TLS/SSL
const tlsOptions = {
  key: fs.readFileSync("mk-signed-cert/192.168.1.109-key.pem"),
  cert: fs.readFileSync("mk-signed-cert/192.168.1.109.pem"),
};

// Crear servidor HTTPS
const httpsServer = https.createServer(tlsOptions, app);

// Crear instancia de Socket.IO para los servidores HTTP y HTTPS
const httpsIo = new SocketIOServer(httpsServer, {
  cors: {
    origin: "*",
  },
});

// Manejo de conexiones WebSocket para el servidor HTTPS
httpsIo.on("connection", (socket: Socket) => {
  console.log("Cliente WebSocket conectado al servidor HTTPS");

  socket.on("tomarFoto", () => {
    console.log("Solicitud para tomar la foto recibida");

    setTimeout(() => {
      socket.emit("fotoLista", "Una imagen enviada");
      console.log("Imagen enviada...");
    }, 5000);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

// Configurar el puerto
const PORT = 443;

httpsServer.listen(PORT, () => {
  console.log("Servidor HTTPS y WebSocket escuchando en el puerto 443");
});
