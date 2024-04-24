import { Router, Request, Response } from "express";
import fs from "fs";

const router = Router();

router.post("/singleUpload", (req: Request, res: Response) => {
  const imageSrc = req.body.image;

  console.log("Imagen recibida:", imageSrc);
  res.send({ imageSrc });
  console.log("Imagen devuelta al cliente");
});

router.post("/multipleUpload", (req: Request, res: Response) => {
  const imagesSrc = req.body.images;

  console.log("Imágenes recibidas:", imagesSrc);
  console.log("Ejemplo de imágen recibida", imagesSrc[0]);
  res.send("Imágenes recibidas correctamente");
});

export default router;
