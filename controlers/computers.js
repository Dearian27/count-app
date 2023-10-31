import { Component } from "../model/Component.js";
import { Computer } from "../model/Computer.js"

export const getComputers = async(req, res, next) => {
  try {
    const computers = await Computer.find({});
    return res.status(200).json({
      computers,
      message: "get computers",
    })
  } catch(error) {
    res.status(500).json({message: 'something went wrong'});
  }
}

export const getComputersById = async(req, res, next) => {
  const { id } = req.params;
  try {
    const computers = await Computer.findOne({_id: id});
    return res.status(200).json({
      computers,
      message: "get computers",
    })
  } catch(error) {
    res.status(500).json({message: 'something went wrong'});
  }
}

export const createComputer = async(req, res, next) => {
  const { name } = req.body;
  try {
    if(!name) res.status(400).send('Bad Request: Field "name" is required');
    const computer = await new Computer({name});
    computer.save();
    res.status(200).json({
      computer,
      message: "Computer has been created"
    })
  } catch (err) {
    console.log(err);
  }
}