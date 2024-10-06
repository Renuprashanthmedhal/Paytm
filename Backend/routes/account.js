const express = require("express");
const authMiddleware = require("./authMIddleware");
const { accTable } = require("../db");
const { default: mongoose } = require("mongoose");
const accountRouter = express.Router();

accountRouter.get("/", (req, res) => {
  res.send("from account rputer");
});

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  const balance = await accTable.findOne({ userid: req.userid });
  if(!balance){
    return res.json({
        message: "Couldn't fetch balance.",
        success: false

    })
  }
  res.json({
    message: "fetched balance successfully",
    success: true,
    balance: balance,
  });
});

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    const amount = req.body.amount;
    const touserid = req.body.touserid;
    const currUserid = req.userid;

    const currUser = await accTable
      .findOne({ userid: currUserid })
      .session(session);
    if(currUserid === touserid){
        await session.abortTransaction();
      return res.json({
        message: "cant trasnfer money to same account",
        success: false,
      });
    }
    if (currUser.balance < amount) {
      await session.abortTransaction();
      return res.json({
        message: "insufficient balance in your account",
        success: false,
      });
    }

    const isUserExist = await accTable
      .findOne({ userid: touserid })
      .session(session);
    if (!isUserExist) {
      await session.abortTransaction();
      return res.json({
        message: "Target user is not found",
        success: false,
      });
    }
    await accTable
      .updateOne(
        { userid: currUserid },
        {
          $inc: {
            balance: -amount,
          },
        }
      )
      .session(session);
    await accTable
      .updateOne(
        { userid: touserid },
        {
          $inc: {
            balance: amount,
          },
        }
      )
      .session(session);
    await session.commitTransaction();
    res.json({
      message: "amount sent successfully",
      success: true,
    });
});

module.exports = accountRouter;
