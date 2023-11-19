import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import {
  createComponent,
  getAllComponents,
  getComponentsByType,
  addComponentToComputer,
  deleteComponent,
  removeComponent,
  updateComponent,
  changeComponentOfComputer,
  changeMultipleComponentInComputer,
} from "./contollers/components";
import {
  createComputer,
  getComputers,
  getComputersById,
  deleteComputerById,
  updateComputer,
} from "./contollers/computers";
import {
  deleteUser,
  getUsers,
  lowerUser,
  promoteUser,
  signIn,
  signUp,
} from "./contollers/auth";
import { verifyToken } from './contollers/verifyToken';


function getAuthRouter() {
  const router = express.Router();

  router.post("/signup", signUp);
  router.post("/signin", signIn);
  router.get("/", getUsers);
  router.post("/promote/:id", verifyToken, promoteUser);
  router.post("/low/:id", verifyToken, lowerUser);
  router.delete("/delete/:id", verifyToken, deleteUser);

  return router;
}

function getComponentsRouter() {
  const router = express.Router();

  router.get("/", getAllComponents);
  router.get("/:type", getComponentsByType);
  // router.get('/:id', getComputerComponents);
  router.post("/create", createComponent);
  router.post("/remove/:id", verifyToken, removeComponent);
  router.put("/:id", changeComponentOfComputer);
  router.put("/multiple/:id", changeMultipleComponentInComputer);
  router.put("/add/:id", addComponentToComputer);
  router.post("/update/:id", verifyToken, updateComponent);
  router.delete("/delete/:id", verifyToken, deleteComponent);

  return router;
}

function getComputersRouter() {
  const router = express.Router();

  router.get("/", getComputers);
  router.get("/:id", getComputersById);
  router.post("/", createComputer);
  router.post("/update/:id", updateComputer);
  router.delete("/delete/:id", verifyToken, deleteComputerById);

  return router;
}

const app = express();
const PORT = process.env.PORT || 8879;

config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
mongoose.set("strictQuery", false);
app.use(
  cors({
    // origin: [process.env.CORS_ORIGIN, process.env.CORS_ORIGIN_LOCAL],
    // origin: process.env.CORS_ORIGIN,
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/api/auth", getAuthRouter());
app.use("/api/computers", getComputersRouter());
app.use("/api/components", getComponentsRouter());

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

const connect = () => {
  mongoose
    .connect(process.env.MONGO, {})
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Irror");
      throw err;
    });
};

app.listen(PORT, () => {
  connect();
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
