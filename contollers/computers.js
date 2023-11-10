import { Component } from "../models/Component.js";
import { Computer } from "../models/Computer.js"

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

export const deleteComputerById = async (req, res, next) => {
  const { id } = req.body;

  try {
    
   
    const deletedComputer = await Computer.findOneAndDelete({ _id: id });
    
    if (!deletedComputer) {
      return res.status(404).json({ message: "Комп'ютер не знайдено" });
    }

    return res.status(200).json({
      message: "Комп'ютер видалено успішно",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Виникла помилка при видаленні комп\'ютера' });
  }
};

export const updateComputer = async (req, res, next) => {
  const { id } = req.params;

  try {
    
    const filter = { _id: id };
    const computerOld = await Computer.find(filter)
    if (!computerOld) {
      return res.status(404).json({ message: "Компонент не знайдено" });
    }

    const { location, responsible, name } = req.body;
    if (name === '') {
      return res.status(400).json({ message: 'Поле "name" не може бути пустим' });
    }
    const update = {
      $set: {
        name,
        location,
        responsible,
      },
    };
    
    await Computer.updateOne(filter, update);

    const computer = await Computer.findOne(filter);
    
    return res.status(200).json({
      computer,
      massage: "Компонент оновлено успішно",
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Виникла помилка при оновлені компонент' });
  }
};

