import { Router } from "express";
import { getAllBoards, createBoard, editBoard, editSubTask } from "../controllers/boardController";

const router = Router()
router.route("/").get(getAllBoards).post(createBoard);
router.route("/:id").put(editBoard);
router.route("/:id/:columnsId/:taskId/:subtaskId").put(editSubTask);

export default router;