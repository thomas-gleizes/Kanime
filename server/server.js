const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

// scripts ressources
const animesRoute = require("./routes/animes");
const usersRoute = require("./routes/users");
const adminRoute = require("./routes/admin");
const sagasRoute = require("./routes/sagas");
const scriptsRoutes = require("./routes/scripts");
const errorsRoutes = require("./routes/errors");

const app = express();
dotenv.config();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "999mb" })); // TODO decrease limit and compresse payload
app.use(express.static("public"));

app.all("*", (req, res, next) => {
  const { method, params } = req;
  console.log("method :", method, "| query :", params);

  next();
});

app.use("/api/animes", animesRoute);
app.use("/api/users", usersRoute);
app.use("/api/admins", adminRoute);
app.use("/api/sagas", sagasRoute);
app.use("/api/scripts", scriptsRoutes);
app.use("/api/errors", errorsRoutes);

app.get("/api/", (req, res) => {
  res.send({
    routes: {
      animes: {
        GET: [{ path: "/", query: "limit" }, { path: "/id/:id" }],
      },
      users: {
        POST: [{ path: "login", body: [{}] }],
      },
    },
  });
});

app.listen(process.env.PORT, async () => {
  await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(
    "\x1b[32m",
    "=============================================================== Server start ===============================================================",
    "\x1b[0m"
  );
});
