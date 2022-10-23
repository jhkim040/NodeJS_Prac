import express from "express";
import morgan from "morgan";
import multer from "multer";
import fs from "fs";
import path from "path";

const app = express();
app.set("port", 3000);

const __dirname = path.resolve();
app.use(morgan("dev"), express.json(), express.urlencoded({ extended: false }));
app.use("/upload", express.static(path.join(__dirname, "upload")));
app.use("/", express.static(path.join(__dirname, "public")));

const uploadGoods = multer({
  // multer 저장소 setting
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/goods"); // 도착지 설정 done(error, 폴더명)
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); // 파일명의 확장자 가져옴
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
      // 확장자를 제외한 파이명 + 현재 시간 + 확장자명
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  // 기준은 byte 5MG
});

try {
  fs.readdirSync("uploads");
} catch (error) {
  fs.mkdirSync("uploads/");
}
app.post("/upload", uploadGoods.single("image"), (req, res) => {
  try {
    fs.readdirSync("uploads/goods");
  } catch (error) {
    fs.mkdirSync("uploads/goods");
  }
});

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")} 번 포트에서 실행 중!!!`);
});
