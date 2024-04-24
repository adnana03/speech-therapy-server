import { Router, Request, Response } from "express";
import fs from "fs";

const router = Router();

router.post("/upload", (req: Request, res: Response) => {
  const imageSrc = req.body.image;

  // Convertir la imagen base64 a un archivo
  const imageData = imageSrc.replace(/^data:image\/\w+;base64,/, "");
  const imageBuffer = Buffer.from(imageData, "base64");
  const imageName = `image_${Date.now()}.jpeg`;
  fs.writeFileSync(`public/${imageName}`, imageBuffer);

  // Devolver la URL de la imagen al cliente
  const imageUrl = `https://speech-therapy-server.onrender.com/public/${imageName}`;
  res.send({ imageUrl });

  console.log("Imagen recibida:", imageSrc);
  res.send("Imagen recibida correctamente.");
});

export default router;
