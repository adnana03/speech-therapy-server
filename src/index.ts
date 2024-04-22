import express, { Request, Response } from "express";
import cors from "cors";
import taskRoutes from "./shared/routes/tasks";

const app = express();
const port = 3001;

app.use(cors());

app.use(express.json());
app.use("/tasks", taskRoutes);

app.get("/", (req: Request, res: Response) => {
  // Maneja tu lógica de la API aquí
  const data = { message: "¡Hola desde el servidor Express!" };
  res.json(data);
});

app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});
