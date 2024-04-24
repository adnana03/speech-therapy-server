import { Router, Request, Response } from "express";

const router = Router();

router.post("/upload", (req: Request, res: Response) => {
  const imageSrc = req.body.image;
  console.log("Imagen recibida:", imageSrc);
  res.send("Imagen recibida correctamente.");
});

export default router;
