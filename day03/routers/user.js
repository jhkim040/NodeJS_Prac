import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("회원 조회 완료");
});
router.post("/", (req, res) => {
  res.send("회원 등록 완료");
});
router.delete("/", (req, res) => {
  res.send("회원 삭제 완료");
});
router.patch("/", (req, res) => {
  res.send("회원 수정 완료");
});

export default router;
