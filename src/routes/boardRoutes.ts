import { Router } from "express";
import { getAllBoards, createBoard, editBoard } from "../controllers/boardController";

const router = Router()
router.route("/").get(getAllBoards).post(createBoard);
router.route("/:id").put(editBoard);

export default router;