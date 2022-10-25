import bcrpyt from "bcrypt";
import User from "../models/user.js";

export default class UserService {
  static async signUp(req, res, next) {
    try {
      console.log(req.body);

      // findOne : 검색된 최상단 데이터 한 가지 가지고 온다.(객체 형)
      // findAll : 검색된 데이터 모두 가지고 온다.(배열 형태)
      const exUser = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (exUser) {
        return res.status(403).send("이미 사용중인 이메일입니다.");
      }

      const hashedPassword = await bcrpyt.hash(req.body.password, 12);
      // 단방향 암호화

      await User.create({
        email: req.body.email,
        password: hashedPassword,
      });
      res.status(200).send("ok");
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}
