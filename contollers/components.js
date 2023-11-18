import { Component } from "../models/Component.js";
import { Computer } from "../models/Computer.js";
import { User } from "../models/User.js";

export const getAllComponents = async(req, res, next) => { 
  try {
    const components = await Component.find({});
    return res.status(200).json({components, message: 'Get components'});
  } catch (err) {
    console.log(err);
    return res.status(500).json({message: 'Error getting components'});
  }
}

export const getComponents = async(req, res, next) => {
  const { id } = req.params;
  try {
    const component = await Component.findById(id);
    
    return res.status(200).json({
      component,
      message: "get component",
    })

  } catch(error) {
    res.status(500).json({message: 'something went wrong'});
  }
}

/** 
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
*/


export const createComponent = async(req, res, next) => {
  const {type, name} = req.body;
  if(!type || !name) return res.status(404).json({message: 'Please, provide credentials.'});
  try {
    const component = new Component({type, name});
    component.save();
    res.status(200).json({component, message: 'Компонент створено успішно!'});
  } catch(error) {
    res.status(500).json({message: 'Щось пішло не так.'})
  }
}

export const changeComponentOfComputer = async(req, res, next) => {
  const { type, id:componentId } = req.body;
  const { id } = req.params;
  
  if(type === 'ram' || type === 'disk') {
    return res.status(418).json({ message: 'Invalid type of component'});
  }
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
    let oldComponent;
    let oldComputer;
    if(newComponent.anchor) {
      oldComputer = await Computer.findById(newComponent.anchor);
    } 

    if((computer._id.toString() === newComponent?.anchor || '')) {
      return res.status(401).json({message: "Cannot change same component"});
    }
    const oldId = computer.components.find(component => component.type === type).id[0];
    if(oldId) {
      oldComponent = await Component.findById(oldId);  
    }
    let message;
    if(!computer.components.find(component => component.type === type).id[0] && !newComponent.anchor){
      message = "Початок експлуатації";
      const historyItem = {
        date: Date.now(),
        componentType: type,
        id: newComponent._id,
        name: newComponent.name,
      }
      computer.history.push(historyItem);    
    } else {
      message = "Зміна комплектуючої";
      const historyItem = {
        date: Date.now(),
        componentType: type,
        id: newComponent._id,
        name: newComponent.name,
        oldId: oldComponent?._id || '',
        oldName: oldComponent?.name || ''
      }
      computer.history.push(historyItem);
      
      if(newComponent.anchor) {
        oldComputer.components.find(component => component.type === type).id.pop();
        if(oldComputer._id !== computer._id) {
          const oldHistoryItem = {
            date: Date.now(),
            componentType: type,
            id: '',
            name: '',
            oldId: newComponent._id,
            oldName: newComponent.name
          }
          oldComputer?.history.push(oldHistoryItem);
        }
      }
    }
    if(oldComponent) {
      oldComponent.anchor = '';
      await oldComponent.save();
    }
    computer.components[componentType].id[0] = newComponent._id;
    newComponent.anchor = computer._id;

    await newComponent.save();
    await computer.save();
    await oldComputer?.save();
    return res.status(200).json({message: "Компонент додано успішно!"});
  } catch(error) {
    console.log(error);
    return res.status(500).json({ message: 'Щось пішло не так.'});
  }
}

export const changeMultipleComponentInComputer = async (req, res, next) => {
  const {type, id:componentId, currentComponentId} = req.body;
  const { id } = req.params;
  
  const oldComponent = await Component.findById(currentComponentId);
  if(!oldComponent) {
    return res.status(500).json({message: 'Nothing to change'});
  }
  if(type !== 'ram' && type !== 'disk') {
    return res.status(418).json({ message: 'Invalid type of component'});
  }
  const computer = await Computer.findById(id);
  if (!computer) {
    return res.status(404).json({ message: 'Computer not found' });
  }
  if(computer.components.find(component => component.type === type).id.includes(componentId)) {
    return res.status(500).json({ message: 'Component has already installed'})
  }
  
  const addedComponent = await Component.findById(componentId);
  if (!addedComponent) {
    return res.status(404).json({ message: 'Component not found' });
  }

  const ccIndex = computer.components.find(component => component.type === type).id.findIndex(id => id === currentComponentId);
  if(ccIndex !== -1) {
    computer.components.find(component => component.type === type).id[ccIndex] = componentId;
  } else {
    computer.components.find(component => component.type === type).id.push(componentId);
  }
  
  
  let oldComputer;
  if(addedComponent?.anchor) {
    oldComputer = await Computer.findById(addedComponent.anchor);
    if(oldComputer) {
      oldComputer.components.find(comp => comp.type === type).id = oldComputer.components.find(comp => comp.type === type).id.filter(id => id !== addedComponent._id.toString());      
      const historyItem = {
        date: Date.now(),
        componentType: type,
        id: '',
        name: '',
        oldId: addedComponent._id,
        oldName: addedComponent.name
      }
      oldComputer.history.push(historyItem);
    }
  }

  oldComponent.anchor = '';
  addedComponent.anchor = computer._id;

  const historyItem = {
    date: Date.now(),
    componentType: type,
    id: addedComponent._id,
    name: addedComponent.name,
    oldId: oldComponent._id || '',
    oldName: oldComponent.name || ''
  }
  computer.history.push(historyItem);

  await addedComponent.save();
  await computer.save();
  await oldComputer?.save();
  await oldComponent.save();
  return res.status(200).json({message: "Компонент додано успішно!"});
}

export const addComponentToComputer = async(req, res, next) => {
  const { type, id:componentId } = req.body;
  const { id } = req.params;

  if(type !== 'ram' && type !== 'disk') {
    return res.status(418).json({ message: 'Неправильний тип комопнента.'});
  }

  let computer;
  try {
    computer = await Computer.findById(id);
  } catch(error) {
    console.log(error);
    return res.status(404).json({message: 'Комп\'ютер не знайдено.'})
  }

  let addedComponent;
  try {
    addedComponent = await Component.findById(componentId);
  } catch(error) {
    console.log(error);
    return res.status(404).json({message: 'Компонент не знайдено.'})
  }

  let oldComputer;
  if(addedComponent?.anchor) {
    if(addedComponent.anchor === addedComponent._id) {
      return res.status(500).json({message: 'Компонент уже встановлено.'});
    }
    oldComputer = await Computer.findById(addedComponent.anchor);
    if(oldComputer) {
      oldComputer.components.find(comp => comp.type === type).id = oldComputer.components.find(comp => comp.type === type).id.filter(id => id !== addedComponent._id.toString());
    }
  }
  
  computer.components.find(comp => comp.type === type).id = computer.components.find(comp => comp.type === type).id.filter(id => id !== addedComponent._id.toString());
  computer.components.find(comp => comp.type === type).id.push(addedComponent._id.toString());

  addedComponent.anchor = computer._id;

  const historyItem = {
    date: Date.now(),
    componentType: type,
    id: addedComponent._id,
    name: addedComponent.name,
    oldId: '',
    oldName: ''
  }
  computer.history.push(historyItem);

  if(oldComputer) {
    const historyItem = {
      date: Date.now(),
      componentType: type,
      id: '',
      name: '',
      oldId: addedComponent._id,
      oldName: addedComponent.name
    }
    oldComputer.history.push(historyItem);
  }
  
  await computer.save();
  await oldComputer?.save();
  await addedComponent.save();

  return res.status(200).json({message: 'Компонент додано успішно!'});

}

export const getComponentsByType = async(req, res, next) => {
  const { type } = req.params; 
  try {
    const components = await Component.find({type: type});
    return res.status(200).json({components, message: 'Компоненти отримано!'});
  } catch (err) {
    console.log(err);
    return res.status(500).json({message: 'Помилка отримання компонентів.'});
  }
};

export const deleteComponent = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(req.user.id);
  if(user.status !== "admin" && user.status !== "teacher") {
    return res.status(403).json({ message: 'Ви не маєте доступу.' });
  }
  try {
    const component = await Component.findById(id);
    
    if (!component) {
      return res.status(404).json({ message: 'Компонент не знайдено' });
    }
    
    if(component.anchor) {
      const computer = await Computer.findById(component.anchor); 
      if(computer) {
        const index = computer.components.find(c => c.type === component.type).id.indexOf(id);
        computer.components.find( c => c.type === component.type).id.splice(index, 1);
        const historyItem = {
          date: Date.now(),
          componentType: component.type,
          id: '',
          name: '',
          oldId: component._id,
          oldName: component.name
        }
        computer.history.push(historyItem);

        await computer.save();
      }
    }
    
    const deletedComponents = await Component.findOneAndDelete({ _id: id });
    if (!deletedComponents) {
      return res.status(404).json({ message: "Компонент не знайдено." });
    }

    return res.status(200).json({
      message: "Компонент видалено успішно!",
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Виникла помилка при видаленні компонента.' });
  }
};


export const updateComponent = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    
    const filter = { _id: id };
    if (!filter) {
      return res.status(404).json({ message: "Компонент не знайдено" });
    }
    
    if (!name) {
      return res.status(404).json({ message: "Невказані зміни" });
    }
 
    const update = { $set: { name } };

    const result = await Component.updateOne(filter, update);
    const component = await Component.find(filter)
    
    return res.status(200).json({
      component,
      massage: "Компонент оновлено успішно",
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Виникла помилка при оновлені компонент' });
  }
};

export const removeComponent = async (req, res, next) => {
  const { id } = req.params;

 
  try {
    const component = await Component.findById(id);
    if (!component) {
      return res.status(404).json({ message: 'Компонент не знайдено.' });
    }

    if(!component.anchor){
      return res.status(418).json({ message: 'Комп\'ютер компонента не знайдено.' });
    }

    const computer = await Computer.findById(component.anchor); 
    if (!computer) {
      return res.status(404).json({ message: 'Комп\'ютер не знайдено.' });
    }

    component.anchor  = "";
    const index = computer.components.find(c => c.type === component.type).id.indexOf(id);
    computer.components.find( c => c.type === component.type).id.splice(index, 1);
    
    await component.save();
    await computer.save();
    return res.status(200).json({
      message: "Компонент вилучено успішно.",
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Виникла помилка при вилучені компонента.' });
  }
};