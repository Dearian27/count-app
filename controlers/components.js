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

export const addComponentToComputer = async(req, res, next) => {
  
  
  const {type, id:componentId} = req.body;
  const { id } = req.params;
  
  try {
    const computer = await Computer.findById(id);
    const component = await Component.findById(componentId);
    
    if (!computer) {
      return res.status(404).json({ message: 'Computer not found' });
    }

    if (!component) {
      return res.status(404).json({ message: 'Component not found' });
    }

    const componentType = computer.components.findIndex((comp) => comp.type == type);
   
    if (componentType === -1) {
      return res.status(404).json({ message: 'Component not found' });
    }
  
    const currentComponent = computer.components[componentType];
    const historyItem = {...currentComponent}
    if(currentComponent._id != null){
     computer.history.push();
      
     // res.json({message:"Початок експлуатації", id:currentComponent._id});
    }
    
  

    //TODO якщо id if(id old) "{компонент} змінено на" + "{id old}"
    //TODO else "компонент почав експлуатацію"
    //TODO res.json({message:"компонент почав експлуатацію", id: null});

    currentComponent._id = componentId;
    component.anchor = computer._id;
    await component.save();
    await computer.save();
   
    return res.status(200).json({computer, message: 'Add components'});
  } catch(error) {
    return res.status(500).json({ message: 'something went wrong'});
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