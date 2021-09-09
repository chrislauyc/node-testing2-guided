const express = require("express");

const Hobbits = require("./hobbits/hobbits-model.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/hobbits", (req, res) => {
  Hobbits.getAll()
    .then(hobbits => {
      res.status(200).json(hobbits);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get("/hobbits/:id", async(req, res) => {
  try{
    res.status(200).json(await Hobbits.getById(req.params.id));
  }
  catch(err){
    next(err);
  }
});

server.post("/hobbits", async(req, res) => {
  try{
    res.status(201).json(await Hobbits.insert(req.body));
  }
  catch(err){
    next(err);
  }
});

server.delete("/hobbits/:id", async(req, res) => {
  try{
    res.status(200).json(await Hobbits.remove(req.params.id));
  }
  catch(err){
    next(err);
  }
});

server.put("/hobbits/:id", async(req, res) => {
  try{
    res.status(200).json(await Hobbits.update(req.params.id,req.body));
  }
  catch(err){
    next(err);
  }
});
server.use((err,req,res,next)=>{
  res.status(500).json(err);
});
module.exports = server;
