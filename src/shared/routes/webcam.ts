import { Router, Request, Response } from "express";
import fs from "fs";

const router = Router();

router.post("/upload", (req: Request, res: Response) => {
  const imageSrc = req.body.image;

  // Devolver la URL de la imagen al cliente
  const imageUrl = `https://speech-therapy-server.onrender.com/public/${imageSrc}`;

  console.log("Imagen recibida:", imageSrc);
  res.send({ imageUrl });
  console.log("Imagen devuelta al cliente");
});

export default router;
