import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const port = 3001; // o cualquier otro puerto que prefieras

app.use(cors());

app.get("/api/data", (req: Request, res: Response) => {
  // Maneja tu lógica de la API aquí
  const data = { message: "¡Hola desde el servidor!" };
  res.json(data);
});

app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});
