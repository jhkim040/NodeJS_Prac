import express, { application } from "express";
import session from "express-session";
const app = express();
app.set("port", 3000);
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

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "1234" && password === "1234") {
    req.session.member = {
      email,
      password,
    };
    res.status(201).send({ message: "success" });
  } else {
    res
      .status(403)
      .send({ message: "failure", error: "아이디 혹은 비밀번호가 틀렸습니다" });
  }
});

app.post("/logout", (req, res) => {
  console.log(req.session.member);
  req.session.destroy(() => {
    console.log("로그아웃이 실행되었습니다.");
  });
  res.status(200).send({ message: "success" });
});

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번으로 서버 실행 중 `);
});
