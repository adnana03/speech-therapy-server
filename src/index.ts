/*
import express, { Request, Response } from "express";
import cors from "cors";
import taskRoutes from "./shared/routes/tasks";
import camaraRoutes from "./shared/routes/camaraIP";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.static("public"));

app.use(express.json());
app.use("/tasks", taskRoutes);
app.use("/camaraIP", camaraRoutes);

app.get("/", (req: Request, res: Response) => {
  const data = { message: "¡Hola desde el servidor Express!" };
  res.json(data);
});

app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});

*/

import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import useIPCamera from "./shared/hooks/useIPCamera";

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const { handleSingleCapture } = useIPCamera();

io.on("connection", (socket: Socket) => {
  console.log("Cliente conectado");

  socket.on("tomarFoto", async () => {
    console.log("Solicitud para tomar la foto recibida");

    const imgURL = await handleSingleCapture();

    console.log("Enviando url image...");

    if (imgURL) {
      socket.emit("fotoLista", imgURL);
    } else {
      socket.emit("fotoLista", "No se ha podido obtener la imagen");
    }
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Servidor WebSocket escuchando en el puerto ${PORT}`);
});
