import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTaskStatus,
  getTasksForUser,
} from "../controllers/taskControllers";

const router = Router();
router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:taskId/status", updateTaskStatus);
router.get("/users/:userId", getTasksForUser);
export default router;
