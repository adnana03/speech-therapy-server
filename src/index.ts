const express = require("express");
const cors = require("cors");
const Stream = require("node-rtsp-stream");

const app = express();

app.use(cors());
app.use(express.json());

const port = 3000;

let stream: any = null;

app.post("/start", function (req: any, res: any) {
  if (stream !== null) {
    stream.stop();
    stream = null;
  }

  try {
    stream = new Stream({
      name: "videoStream",
      streamUrl: "rtsp://192.168.1.110:8080/h264_ulaw.sdp",
      wsPort: 9999,
      ffmpegOptions: {
        "-stats": "",
        "-r": 30,
      },
    });

    res.json({ url: `ws://127.0.0.1:${9999}` });
  } catch (e) {
    console.error(e);
  }
});

app.listen(port, () => {
  console.log(
    `server listening commands at http://127.0.0.1:${port} and serve stream at ws://127.0.0.1:${9999}`
  );
});
