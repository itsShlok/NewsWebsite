const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

const bcrypt = require('bcryptjs');
const  jwt = require('jsonwebtoken');
const JWT_SECRET="LOLLLLLLL"

router.post(
  "/createUser",
  body("name").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // const user =User(req.body.name)
    // user.save()
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "emal already exists" });
      }
      // User.create({
      //   name: req.body.name,
      //   email:req.body.email,
      //   password: req.body.password,
      // }).then(user => res.json(user))
      // .catch(err=>{console.log(err)
      // res.json({error:'email already exists'})})
      const salt =await bcrypt.genSalt(10)
      const sec=await bcrypt.hash(req.body.email,salt
        )
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password:sec,
      });
      const data={
        user:{
          id:user.id
        }
      }
      const authToken=  jwt.sign(data,JWT_SECRET);
      // console.log(jwtData) 
      res.json(authToken)
      // res.json(user);

    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);

module.exports = router;
