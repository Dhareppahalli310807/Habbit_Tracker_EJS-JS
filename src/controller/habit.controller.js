import {
    addHabitRepo,
    deleteHabitRepo,
    getAllHabitsRepo,
    updateStatusHabitsRepo,
  } from '../model/habit.repository.js';
  //add habit controller
  export const addHabit = async (req, res, next) => {
    try {
      const habitName = req.body.habitName;
      await addHabitRepo(habitName);
      res.status(201).redirect('/');
    } catch (error) {
      console.log('Controller error add a habit');
    }
  };
  // get all habit controller
  export const getAllHabits = async (req, res, next) => {
    try {
      const habits = await getAllHabitsRepo();
      res.status(200).render('habitView', { habits });
    } catch (error) {
      console.log('Controller error get all habits');
    }
  };
  //update habit controller
  export const updateStatusHabits = async (req, res, next) => {
    const { habitId } = req.params;
    const { status } = req.body;
    try {
      await updateStatusHabitsRepo(habitId, status);
      res.status(200).redirect('/');
    } catch (error) {
      console.log('controller error in updating habit statuss');
    }
  };
  //delete habit controller
  export const deleteHabit = async (req, res, next) => {
    const { habitId } = req.params;
    try {
      await deleteHabitRepo(habitId);
      res.status(200).redirect('/');
    } catch (error) {
      console.log('Error while deleting habit');
    }
  };
  