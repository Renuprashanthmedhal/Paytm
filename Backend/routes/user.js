const express = require("express");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
const { signUpValidation } = require("../validations");
const { signInValidation } = require("../validations");
const { user, accTable } = require("../db");
const { SECRETE_KEY } = require("./config");
const authMiddleware = require("./authMIddleware");
const { default: mongoose } = require("mongoose");

userRouter.get("/", (req, res) => {
  res.send("from user rputer");
});

userRouter.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signUpValidation.safeParse(req.body);
  if (!success) {
    return res.status(500).json({
      message: "Please enter valid inputs",
      success: false,
    });
  }
  const isUserExists = await user.findOne({ username: body.username });
  if (isUserExists) {
    return res.status(500).json({
      message: "Username alraedy taken, please choose another username",
      success: false,
    });
  }
  const createUser = await user.create(body);
  const userid = createUser._id;
  const randomBalance = (1 + Math.random() * 10000).toFixed(2)
  await accTable.create({
    userid: userid,
    balance: randomBalance,
  });
  res.send({
    message: "User created successfully.",
    success: true,
  });
});

userRouter.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const isIserExist = await user.findOne({
    username,
    password,
  });
  if (isIserExist) {
    const token = jwt.sign({ userid:isIserExist._id }, SECRETE_KEY);
    res.json({
      message: "Login success",
      success: true,
      token: token,
    });
  } else {
    res.status(401).json({
      message: "Invalid cred",
      success: false,
    });
  }
});

userRouter.put("/", authMiddleware, async (req, res) => {
  const body = req.body;
  const { success } = signInValidation.safeParse(req.body);
  if (!success) {
    return res.status(500).json({
      message: "Please enter valid inputs",
      success: false,
    });
  }
  await user.updateOne({ _id: req.userid }, body);
  res.json({
    message: "Updated successfully",
    success: true,
  });
});

userRouter.get("/bulk",authMiddleware, async (req, res) => {
  const filterKey = req.query.filter || "";

  const filterUsers = await user.find({
    $or: [
      {
        firstname: {
          $regex: filterKey,
          $options: "i"
        },
      },
      {
        lastname: {
          $regex: filterKey,
          $options: "i"
        },
      },
    ],
  });
  res.json({
    users: filterUsers.map((user) => ({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      userid: user._id,
    })),
  });
});

module.exports = userRouter;
