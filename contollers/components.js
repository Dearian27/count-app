import { Component } from "../models/Component.js";
import { Computer } from "../models/Computer.js";

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
  } catch(error) {
    res.status(500).json({message: "Cannot get computer components"});
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
export const addComponentToComputer = async(req, res, next) => {
  const {type, id:componentId} = req.body;
  const { id } = req.params;  
  try {
    const computer = await Computer.findById(id);
    if (!computer) {
      return res.status(404).json({ message: 'Computer not found' });
    }
    const newComponent = await Component.findById(componentId);
    if (!newComponent) {
      return res.status(404).json({ message: 'Component not found' });
    }
    const componentType = computer.components.findIndex((comp) => comp.type == type);
    if (componentType === -1) {
      return res.status(404).json({ message: 'Component not found' });
    }
    const oldId = computer.components.find(component => component.type === type).id;    
    let oldComponent;
    if(oldId === newComponent._id) {
      return res.status(401).json({message: "Cannot change same component"});
    }
    if(oldId) {
      oldComponent = await Component.findById(oldId);  
    }
    
    let message;
    if(!oldComponent || oldComponent?._id === newComponent._id){
      message = "Початок експлуатації";
      const historyItem = {
        actionDate: Date.now(),
        componentType: type,
        id: newComponent._id,
        name: newComponent.name,
      }
      computer.history.push(historyItem);      
    } else {
      message = "Зміна комплектуючої";
      try {
        if(newComponent.anchor !== computer._id && newComponent.anchor) {    
          const oldComputer = await Computer.findById(newComponent.anchor);
          oldComputer.components.find(component => component.type === type).id = '';
          await oldComputer.save();
        }
      } catch(err) {
        console.log(err);
      }
      oldComponent.anchor = '';
      await oldComponent.save();
      const historyItem = {
        actionDate: Date.now(),
        componentType: type,
        id: newComponent._id,
        name: newComponent.name,
        oldId: oldComponent._id,
        oldName: oldComponent.name
      }
      computer.history.push(historyItem);
    }
    computer.components[componentType].id = newComponent._id;
    newComponent.anchor = computer._id;

    await newComponent.save();
    await computer.save();
    return res.status(200).json({component: newComponent, history: computer.history, computer, message});
  } catch(error) {
    return res.status(500).json({ message: 'Щось пішло не так'});
  }
}

export const getComponentsByType = async(req, res, next) => {
  const { type } = req.params; 
  try {
    const components = await Component.find({type: type});
    return res.status(200).json({components, message: 'Get components'});
  } catch (err) {
    console.log(err);
    return res.status(500).json({message: 'Error getting components'});
  }
}