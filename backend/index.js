import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import mongoose from "mongoose";

const app = express();
//middleware
app.use(cors());
app.use(express.json());

/* mongoose*/
mongoose
  .connect(
    "mongodb+srv://sansavi84:123@cluster0.nyiyalq.mongodb.net/passkey?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected To Database passkey");
  })
  .catch(() => {
    console.log("Failed to connect");
  });

const credential = mongoose.model("credential", {}, "bulkmail");

credential
  .find()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });

/* main().catch(console.error); */

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "designdynasty84@gmail.com",
    pass: "avig pllg idbd jkxy",
  },
});

app.post("/sendmail", (req, res) => {
  var msg = req.body.msg;
  console.log(msg);
  var emailList = req.body.emailList;

  new Promise(async (resolve, reject) => {
    try {
      for (let i = 0; i < emailList.length; i++) {
        await transporter.sendMail({
          from: "designdynasty84@gmail.com",
          to: emailList[i],
          subject: "Bulk Mail Trial",
          text: msg,
        });
        console.log("email sent to :" + emailList[i]);
      }
      resolve("Success");
    } catch (error) {
      reject("Failed");
    }
  })
    .then(() => {
      res.send(true);
    })
    .catch(() => {
      res.send(false);
    });
});
// starting server

app.listen(5000, () => {
  console.log("Server Started");
});
