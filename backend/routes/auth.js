const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Abcd";

router.post(
  "/createUser",
  body("name").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    let success=false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // const user =User(req.body.name)
    // user.save()
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success,error: "emal already exists" });
      }
      // User.create({
      //   name: req.body.name,
      //   email:req.body.email,
      //   password: req.body.password,
      // }).then(user => res.json(user))
      // .catch(err=>{console.log(err)
      // res.json({error:'email already exists'})})
      const salt = await bcrypt.genSalt(10);
      const sec = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: sec,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      // console.log(jwtData)
      res.json( {success:true,authToken});
      // res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);
// Authenticate user While logging in
router.post(
  "/login",
  body("email").isEmail(),
  body("password", "Password cannot be blank").exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        let success=false
        return res.status(400).json({success, error: "Try to login with currect credentials" });
      }
      // let user = await User.findOne({ email: req.body.email });

      const passcompare = await bcrypt.compare(password, user.password);
      console.log(passcompare);
      if (!passcompare) {
        let success=false
        return res.status(400).json({success, error: "Try to login with correct credentials1" });
      } else {
        const data = {
          user: {
            id: user.id,
          },
        };

        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(jwtData)
        let success=true
        res.json({success,authToken});
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// Getting user Details after login
router.post("/getUser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user); // Send the user data in the respon
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
