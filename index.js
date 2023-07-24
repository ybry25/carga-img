const express = require("express");
const cors = require("cors");
const multer = require("multer");
const sharp = require("sharp");

const app = express();
const PORT = 3000;
app.use(cors());

const helperImg = (filePath, fileName, size = 300) => {
  return sharp(filePath).resize(size).toFile(`./optimize/${fileName}`);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    cb(null, `yb-${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
  helperImg(req.file.path, `resize-${req.file.filename}`, 100);
  res.send({ data: "Imagen cargada" });
});

app.listen(PORT, () => {
  console.log(`Listo por el puerto ${PORT}`);
});
