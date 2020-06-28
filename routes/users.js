const express = require("express");
const router = express.Router();
const mySqlConnection = require("../database/database");
const bcrypt = require("bcrypt");
const { response } = require("express");
const reactPort = "http://localhost:3000/";
router.post("/signup", (req, res) => {
  const { name, email, password, password2, phone } = req.body;

  let errors = [];

  if (!name || !email || !password || !password2 || !phone) {
    const body = {
      authorized: false,
      reason: "Please enter all fields",
    };
    res.send(JSON.stringify(body));
  }

  if (password != password2) {
    const body = {
      authorized: false,
      reason: "Passwords do not match",
    };
    res.send(JSON.stringify(body));
  }

  if (password.length < 6) {
    const body = {
      authorized: false,
      reason: "Password must be at least 6 characters",
    };
    res.send(JSON.stringify(body));
  }

  mySqlConnection.query(
    "SELECT * FROM users WHERE email = ?",

    [email],

    (err, rows) => {
      if (err) res.status(500).send(err);
      else if (rows.length) {
        const body = {
          authorized: false,
          reason: "Email already exists",
        };
        res.send(JSON.stringify(body));
      } else {
        pwdHash = bcrypt.hashSync(password, 10);

        var sql = `INSERT INTO users (name, email, phone, pwdHash) VALUES ?`;

        const values = [[name, email, phone, pwdHash]];

        mySqlConnection.query(sql, [values], function (err) {
          if (err) res.status(500).send(err);
          else {
            const body = {
              authorized: true,
            };
            res.send(JSON.stringify(body));
          }
        });
      }
    }
  );
});
router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  console.log([email])
  mySqlConnection.query(
    "select * from users where email=?",
    [email],
    (err, rows) => {
      if (err) res.send(err);
      else if (rows.length === 0) {
        const body = {
          authorized: false,
          reason: "No Matching Found.Not Registered?",
        };
        res.status(404).send(JSON.stringify(body));
      } else {
        const user = rows[0];
        if (bcrypt.compareSync(password, user.pwdHash)) {
          req.session.user = user;
          const body = {
            authorized: true,
          };
          res.send(JSON.stringify(body));
          // res.status(200).send(user);
        } else {
          const body = {
            authorized: false,
            reason: "Incorrect Password",
          };
          res.send(JSON.stringify(body));
        }
      }
    }
  );
});
module.exports = router;
