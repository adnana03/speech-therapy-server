import express from "express";
import https from "https";
import fs from "fs";

const app = express();

const options: https.ServerOptions = {
  key: fs.readFileSync("~/self-signed-cert/server.key"),
  cert: fs.readFileSync("~/self-signed-cert/server.crt"),
};

const server = https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end("Hello, HTTPS World!");
});

const PORT = 443;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
