import express from "express";
import db from "./models/index.js";
import user from "./routes/user.js";
import passport from "passport";
import session from "express-session";

const app = express();
app.set("port", 3000);

db.sequelize
  .sync()
  .then(() => {
    console.log("DB 연결에 성공하였습니다.");
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "node-secret", // 키 이름
    resave: false, // 세션에 값이 똑같으면 다시 저장하지 않음
    savceUninitialized: false,
    // req 메시지가 들어왔을 때 session에 아무런 작업이 이루어지지 않을 때
    // 보통은 false, 만약 true 시 아무 내용이 없는 session이 계속 저정될 수 있
    cookie: {
      httpOnly: true,
      maxAge: 5 * 60000,
    },
  })
);

app.use("/user", user);

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번 서버 실행 중`);
});
