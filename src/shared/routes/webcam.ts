import { Router, Request, Response } from "express";
import fs from "fs";
import multer from "multer";
import { FacialModuleDTO } from "../models/facialModule";

const router = Router();

router.post("/singleImageUpload", (req: Request, res: Response) => {
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

router.post("/multipleImageUpload", (req: Request, res: Response) => {
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

router.post("/singleVideoUpload", (req, res) => {
  try {
    // Comprobar si se ha proporcionado un vídeo en el DTO
    const facialModule: FacialModuleDTO = req.body.facialModule;

    if (facialModule.videoFormData) {
      console.log("No se ha proporcionado ningún vídeo en el DTO.");
      return res
        .status(400)
        .send("No se ha proporcionado ningún vídeo en el DTO.");
    }

    // Procesar el vídeo del DTO
    const videoData = facialModule.videoFormData;

    // Configurar los encabezados para la descarga del archivo (si es necesario)
    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Content-Disposition", "attachment; filename=video.mp4");

    // Enviar una respuesta al cliente si es necesario
    console.log("Vídeo enviado correctamente.");
    res.send(videoData);
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).send("Se produjo un error al procesar la solicitud.");
  }
});

export default router;
