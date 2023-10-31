import { Component } from "../model/Component.js";
import { Computer } from "../model/Computer.js";

export const getAllComponents = async(req, res, next) => { 
  try {
    const components = await Component.find({});
    return res.status(200).json({components, message: 'Get components'});
  } catch (err) {
    console.log(err);
    return res.status(500).json({message: 'Error getting components'});
  }
}

export const getComputerComponents = async(req, res, next) => {
  const { id } = req.params;
  try {
    const computer = await Computer.findOne({_id: id});
    if(!computer) return res.status(500).json({message: 'Please, provide credentials'});
    return res.status(200).json({components: computer.components, message: 'Components of the computer'});
    // const result = await Computer.findOne({
    //   components: {
    //     $elemMatch: { type: 'cpu' }
    //   }
    // });
  } catch(error) {

  }
}

export const createComponent = async(req, res, next) => {
  const {type, name} = req.body;
  if(!type || !name) return res.status(404).json({message: 'Please, provide credentials'});
  try {
    const component = new Component({type, name});
    component.save();
    res.status(200).json({component, message: 'Component created successfully'});
  } catch(error) {
    res.status(500).json({message: 'Something went wrong'})
  }
}

export const addComponent = async(req, res, next) => {
  const {type, name} = req.body;
  if(!type || !name) return res.status(404).json({message: 'Please, provide credentials'});
  try {
    const component = new Component({type, name});
    component.save();
    res.status(200).json({component, message: 'Component created successfully'});
  } catch(error) {
    res.status(500).json({message: 'Something went wrong'})
  }
}

export const addComponentToComputer = async(req, res, next) => {
  const { id } = req.params;
  try {
    const computer = Computer.findOne({id: id});
    if(!computer) return res.status(404).json({message: 'Computer not found'});
    
    
  } catch(error) {
    return res.status(500).json({ message: 'something went wrong'});
  }
}