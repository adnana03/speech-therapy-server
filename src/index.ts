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
