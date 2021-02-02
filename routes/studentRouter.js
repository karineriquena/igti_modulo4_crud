import express from 'express';
import mongoose from 'mongoose';
import studentModel from '../models/studentModel.js';

const studentRouter = express.Router();

studentRouter.post('/', async (req, res) => {
  try {
    const student = new studentModel(req.body);
    await student.save();
    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

studentRouter.get('/', async (req, res) => {
  try {
    const students = await studentModel.find();
    res.send(students);
  } catch (error) {
    res.status(500).send(error);
  }
});

studentRouter.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // new: true -> retorna o documento atualizado
    const student = await studentModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!student) {
      res.status(404).send('Documento não encontrado na coleção');
    }

    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

studentRouter.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const ret = await studentModel.findByIdAndDelete(id);
    if (!ret) {
      res.status(404).send('Documento não encontrado na coleção');
    }
    res.end();
  } catch (error) {
    res.status(500).send(error);
  }
});

export default studentRouter;
