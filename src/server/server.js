import express from "express";
import cors from "body-parser";
import bodyParser from "body-parser";
import { ExtendedAPIPlugin } from "webpack";
import { connectDB } from "./connect-db";

let port = 7777;

let app = express();

app.listen(port, console.log("Server listening on port", port));

// app.get("/", (req, res) => {
//   res.send("Hello world!");
// });

// Plugins
app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());

export const addNewTask = async (task) => {
  let db = await connectDB();
  let collection = db.collection(`tasks`);
  await collection.insertOne(task);
};

app.post("/task/new", async (req, res) => {
  let task = req.body.task;
  await addNewTask(task);
  res.status(200).send();
});