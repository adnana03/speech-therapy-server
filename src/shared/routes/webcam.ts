import { Router, Request, Response } from "express";
import fs from "fs";
import multer from "multer";
import { FacialModuleDTO } from "../models/facialModule";

const router = Router();

router.post("/singleImageUpload", (req: Request, res: Response) => {
  const facialModule: FacialModuleDTO = req.body;
  console.log(
    "Facial Module DTO Received: ",
    facialModule.task + ", ",
    facialModule.algorithm + ", ",
    facialModule.mode + ", ",
    facialModule.imageBase64
  );

  res.send({ imageBase64: facialModule.imageBase64 });
  console.log("Imagen devuelta al cliente");
});

router.post("/multipleImageUpload", (req: Request, res: Response) => {
  const imagesSrc = req.body.images;

  console.log("Imágenes recibidas:", imagesSrc.length);
  res.send("Imágenes recibidas correctamente");
});

const upload = multer({ dest: "uploads/" });

router.post("/singleVideoUpload", upload.single("video"), (req, res) => {
  try {
    // Comprobar si se ha enviado un archivo
    if (!req.file) {
      console.log("No se ha proporcionado ningún archivo de vídeo.");
      return res
        .status(400)
        .send("No se ha proporcionado ningún archivo de vídeo.");
    }

    // Devolver el archivo al cliente como respuesta
    const videoPath = req.file.path;
    const videoFile = fs.readFileSync(videoPath);

    console.log(
      "Se ha recibido el siguiente archivo => ",
      JSON.stringify(req.file)
    );

    // Eliminar el archivo temporal después de la lectura
    fs.unlinkSync(videoPath);

    // Configurar los encabezados para la descarga del archivo
    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Content-Disposition", "attachment; filename=video.mp4");

    // Enviar el archivo al cliente
    res.send(videoFile);
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).send("Se produjo un error al procesar la solicitud.");
  }
});

export default router;
