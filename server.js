/* This is importing all the packages that are needed for the server to run. */
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");

/* This is importing all the routes that are needed for the server to run. */
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

/* This is setting the port that the server will run on. */
const PORT = process.env.PORT || 2121;
const app = express();

/* This is importing the dotenv package, the passport package, and the database package. */
dotenv.config();
require("./config/passport")(passport);
connectDB();

/* This is setting the view engine to ejs and using the public folder. */
app.set("view engine", "ejs");
app.use(express.static("public"));

/* This is allowing the server to communicate with the client. */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:2121",
      "http://127.0.0.1:3000",
    ],
    credentials: true,
  })
);

/* This is setting up the middleware for the server. */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(methodOverride("_method"));
app.use(flash());

/* This is setting up the session for the server. */
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.CONNECTION_URL }),
  })
);

/* This is setting up passportJS for the server. */
app.use(passport.initialize());
app.use(passport.session());

/* This is setting up the routes for the server. */
app.use("/", mainRoutes);
app.use("/terps", terpRoutes);
app.use("/strains", strainRoutes);
app.use("/scents", scentRoutes);
app.use("/research", researchRoutes);
app.use("/nature", natureRoutes);
app.use("/effects", effectRoutes);
app.use("/benefits", benefitRoutes);
app.use("/comments", commentRoutes);

/* This is telling the server to listen on the port that is set in the PORT variable. */
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
