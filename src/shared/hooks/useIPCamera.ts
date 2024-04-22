import axios from "axios";
import { saveAs } from "file-saver";

const useIPCamera = () => {
  let imgRef: string = "";

  const handleSingleCapture = async (): Promise<string> => {
    try {
      const response = await axios.get("https://192.168.1.110:8080/photo.jpg", {
        responseType: "blob", // Especifica el tipo de respuesta como un blob (archivo binario)
      });

      // Guarda el blob como un archivo JPG
      saveAs(response.data, "captura.jpg");

      // Actualiza la referencia de la imagen para mostrar la captura
      if (imgRef) {
        const imgUrl = URL.createObjectURL(response.data);
        imgRef = imgUrl;
      }
    } catch (error) {
      console.error("Error al capturar la imagen:", error);
    }

    return imgRef;
  };

  return { handleSingleCapture };
};

export default useIPCamera;
