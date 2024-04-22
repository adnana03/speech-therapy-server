import { Router, Request, Response } from "express";
import useIPCamera from "../hooks/useIPCamera";

const router = Router();

const { handleSingleCapture } = useIPCamera();

// Read single image
router.get("/", async (req: Request, res: Response) => {
  console.log("Received single capture petition");
  const imgURL = await handleSingleCapture();

  console.log("URL image => " + imgURL);
  res.sendFile(imgURL);
});

export default router;
