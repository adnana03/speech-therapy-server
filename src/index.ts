import express, { Request, Response } from "express";
const app = express();
const port = 3001; // o cualquier otro puerto que prefieras

app.get("/api/data", (req: Request, res: Response) => {
  // Maneja tu lógica de la API aquí
  const data = { message: "¡Hola desde el servidor!" };
  res.json(data);
});

app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});
