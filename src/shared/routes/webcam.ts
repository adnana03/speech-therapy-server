import { Router, Request, Response } from "express";
import { FacialModuleDTO } from "../models/facialModule";
import fs from "fs";

const router = Router();

router.post("/singleImage", (req: Request, res: Response) => {
  const facialModule: FacialModuleDTO = req.body.facialModule;
  console.log(
    "Facial Module DTO Received: ",
    facialModule.task + ", ",
    facialModule.algorithm + ", ",
    facialModule.mode + ", "
  );

  if (facialModule.imageBase64) {
    res.send({ imageBase64: facialModule.imageBase64 });
    console.log("Imagen devuelta al cliente");
  } else {
    res
      .status(400)
      .send({ error: "No se encontró la imagen base64 en la solicitud" });
  }
});

router.post("/multipleImage", (req: Request, res: Response) => {
  const facialModule: FacialModuleDTO = req.body.facialModule;
  console.log(
    "Facial Module DTO Received: ",
    facialModule.task + ", ",
    facialModule.algorithm + ", ",
    facialModule.mode + ", "
  );

  if (facialModule.imagesBase64) {
    res.send({ imageBase64: facialModule.imagesBase64[0] });
    console.log("Imagen devuelta al cliente");
  } else {
    res
      .status(400)
      .send({ error: "No se han encontrado imágenes base64 en la solicitud" });
  }
});

router.post("/singleVideo", (req: Request, res: Response) => {
  try {
    // Comprobar si se ha proporcionado un vídeo en el DTO
    const facialModule: FacialModuleDTO = req.body.facialModule;
    console.log(
      "Facial Module DTO Received: ",
      facialModule.task + ", ",
      facialModule.algorithm + ", ",
      facialModule.mode + ", ",
      facialModule.videoChunksBase64 + ", "
    );

    if (facialModule.videoChunksBase64) {
      // Procesar el vídeo del DTO
      const videoData = facialModule.videoChunksBase64;

      console.log(
        "Video File type: ",
        JSON.stringify(facialModule.videoChunksBase64)
      );

      const videoChunksBuffer = videoData.map((chunk) =>
        Buffer.from(chunk, "base64")
      );
      // Concatenar los fragmentos para reconstruir el vídeo completo
      const videoBuffer: Buffer = Buffer.concat(videoChunksBuffer);

      res.send({ videoData: videoBuffer });

      console.log("Vídeo devuelto al cliente");
    } else {
      console.log("No se ha proporcionado ningún vídeo en el DTO.");
      return res
        .status(400)
        .send("No se ha proporcionado ningún vídeo en el DTO.");
    }
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).send("Se produjo un error al procesar la solicitud.");
  }
});

export default router;
