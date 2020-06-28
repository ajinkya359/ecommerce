const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(
  session({
    secret: "seCRet",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000,
    }, // This time is in millisecond.
  })
);

const PORT = 5000;

app.use("/home",require("../routes/products"));
app.use("/", require("../routes/users"));
app.use("*", (req, res) => {
  res.send("You did something wrong man");
});
app.listen(PORT, console.log(`Server stated on port ${PORT}`));
