const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
// const serviceAccount = require("../abdmalikdev.json");

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const app = express();
app.get("/", (req, res) => res.status(200).send("Hey there!"));
app.get("/data", (req, res) => {
  db.settings({
    timestampsInSnapshots: true,
  });
  const allData = [];
  db.collection("project").
      orderBy("Name")
      .get()
      .then((snapshot) => {
        snapshot.forEach((hasil) => {
          allData.push(hasil.data());
        });
        // console.log(allData);
        res.send(allData);
      })
      .catch((error) => {
        // console.log(error);
      });
});
// app.post("/data", (req, res) => {
//   db.settings({
//     timestampsInSnapshots: true,
//   });
//   db.collection("project").add({
//     nama: req.body.Name,
//     Description: req.body.Description,
//   });
//   res.send({
//     nama: req.body.Name,
//     Description: req.body.Description,
//   });
// });
exports.api = functions.https.onRequest(app);
