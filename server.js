const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");

const connectDB = require("./config/database.js");
const mainRoutes = require("./routes/main.js");
const benefitRoutes = require("./routes/benefits.js");
const commentRoutes = require("./routes/comments.js");
const effectRoutes = require("./routes/effects.js");
const natureRoutes = require("./routes/nature.js");
const researchRoutes = require("./routes/research.js");
const scentRoutes = require("./routes/scents.js");
const strainRoutes = require("./routes/strains.js");
const terpRoutes = require("./routes/terps.js");
const userRoutes = require("./routes/users.js");

const PORT = process.env.PORT || 2121;
const app = express();

dotenv.config();
require("./config/passport")(passport);
connectDB();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.CONNECTION_URL }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", mainRoutes);
app.use("/terps", terpRoutes);
app.use("/strains", strainRoutes);
app.use("/scents", scentRoutes);
app.use("/research", researchRoutes);
app.use("/nature", natureRoutes);
app.use("/effects", effectRoutes);
app.use("/benefits", benefitRoutes);
app.use("/comments", commentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
