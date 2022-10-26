import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const app = express();
app.set("port", 3000);
app.use(cookieParser("secret"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dotenv.config();

// 기본 쿠키
app.post("/setcookie", (req, res, next) => {
  try {
    // 쿠키 이름, 객체
    res.cookie(
      "token",
      { token: "token", expired: 5 * 60000 },
      {
        // signed: true, 암호화된 쿠키, cookieParser() 안에 암호화된 키 등록
        // secure: https에서만 사용이 가능
        // httpOnly: 웹 서버를 통해서만 사용이 가능
        maxAge: 5 * 60000,
      }
    );

    res.send({
      message: "success",
    });
  } catch (err) {
    console.log(err);
    next(err); // err 넣으면 error handling / 파라미터 없으면 다음 미들웨어 실행
  }
});

app.get("/showcookie", (req, res) => {
  console.log(req.cookies.token);
  //   res.send(req.signedCookies.token); // signed: true의 겨우
  res.send(req.cookies.token);
});

app.post("/clearcookie", (req, res) => {
  res.clearCookie("token");
  res.send({
    message: "success",
  });
});

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번 포트로 서버 실행 중!!`);
});

// jwt token
app.post("/jwtSetcookie", (req, res, next) => {
  try {
    const token = jwt.sign(
      { email: req.body.email },
      process.env.SECRET_JWT_TOKEN_KEY
    );
    res.cookie("access_token", token, { httpOnly: true });
    res.send({ message: "success" });
  } catch (err) {
    console.log(err);
    next(err); // err 넣으면 error handling / 파라미터 없으면 다음 미들웨어 실행
  }
});

app.get("/jwtShowcookie", (req, res) => {
  const token = req.cookies.access_token;
  //   console.log(jwt.verify(token, process.env.SECRET_JWT_TOKEN_KEY)); // 복호화
  console.log(jwt.decode(token)); // 복호화
  res.send(req.cookies.token);
});
