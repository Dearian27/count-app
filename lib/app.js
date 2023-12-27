"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _httpErrors = _interopRequireDefault(require("http-errors"));
var _express = _interopRequireDefault(require("express"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _dotenv = require("dotenv");
var _cors = _interopRequireDefault(require("cors"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _components = require("./contollers/components");
var _computers = require("./contollers/computers");
var _auth = require("./contollers/auth");
var _verifyToken = require("./contollers/verifyToken");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getAuthRouter() {
  const router = _express.default.Router();
  router.post("/signup", _auth.signUp);
  router.post("/signin", _auth.signIn);
  router.get("/", _auth.getUsers);
  router.post("/promote/:id", _verifyToken.verifyToken, _auth.promoteUser);
  router.post("/low/:id", _verifyToken.verifyToken, _auth.lowerUser);
  router.delete("/delete/:id", _verifyToken.verifyToken, _auth.deleteUser);
  return router;
}
function getComponentsRouter() {
  const router = _express.default.Router();
  router.get("/", _components.getAllComponents);
  router.get("/:type", _components.getComponentsByType);
  // router.get('/:id', getComputerComponents);
  router.post("/create", _components.createComponent);
  router.post("/remove/:id", _verifyToken.verifyToken, _components.removeComponent);
  router.put("/:id", _components.changeComponentOfComputer);
  router.put("/multiple/:id", _components.changeMultipleComponentInComputer);
  router.put("/add/:id", _components.addComponentToComputer);
  router.post("/update/:id", _verifyToken.verifyToken, _components.updateComponent);
  router.delete("/delete/:id", _verifyToken.verifyToken, _components.deleteComponent);
  return router;
}
function getComputersRouter() {
  const router = _express.default.Router();
  router.get("/", _computers.getComputers);
  router.get("/:id", _computers.getComputersById);
  router.post("/", _computers.createComputer);
  router.post("/update/:id", _computers.updateComputer);
  router.delete("/delete/:id", _verifyToken.verifyToken, _computers.deleteComputerById);
  return router;
}
const app = (0, _express.default)();
const PORT = process.env.PORT || 8879;
(0, _dotenv.config)();
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use((0, _cookieParser.default)());
_mongoose.default.set("strictQuery", false);
app.use((0, _cors.default)({
  // origin: [process.env.CORS_ORIGIN, process.env.CORS_ORIGIN_LOCAL],
  // origin: process.env.CORS_ORIGIN,
  origin: /https?:\/\//,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use("/api/auth", getAuthRouter());
app.use("/api/computers", getComputersRouter());
app.use("/api/components", getComponentsRouter());
app.use((req, res, next) => {
  next((0, _httpErrors.default)(404));
});
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});
const connect = () => {
  _mongoose.default.connect(process.env.MONGO, {}).then(() => {
    console.log("Connected to MongoDB");
  }).catch(err => {
    console.log("Irror");
    throw err;
  });
};
app.listen(PORT, () => {
  connect();
  console.log(`Server is running on http://localhost:${PORT}`);
});
var _default = exports.default = app;