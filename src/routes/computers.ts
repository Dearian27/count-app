import express from "express";
import {
  createComputer,
  getComputers,
  getComputersById,
  deleteComputerById,
  updateComputer,
} from "../contollers/computers";
import { verifyToken } from "../contollers/verifyToken";

export function getComputersRouter() {
  const router = express.Router();

  router.get("/", getComputers);
  router.get("/:id", getComputersById);
  router.post("/", createComputer);
  router.post("/update/:id", updateComputer);
  router.delete("/delete/:id", verifyToken, deleteComputerById);

  return router;
}
