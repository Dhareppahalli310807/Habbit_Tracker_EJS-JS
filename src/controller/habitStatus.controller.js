import moment from 'moment';
import {
  getAllHabitsDateRepo,
  updateStatusHabitsDateRepo,
} from '../model/habitStatus.repository.js';
// get all habits for calendar view
export const getAllHabitsDate = async (req, res, next) => {
  try {
    const habits = await getAllHabitsDateRepo();
    if (!habits) {
      return res.status(200).render('calendarView', { habits: [] });
    }
    res.status(200).render('calendarView', { habits, moment });
  } catch (error) {
    console.log('controller error getting habits date');
  }
};
// update habits for calendar view
export const updateStatusHabitsDate = async (req, res, next) => {
  const { habitStatusId } = req.params;
  const { status } = req.body;
  try {
    await updateStatusHabitsDateRepo(habitStatusId, status);
    res.status(200).redirect('/');
  } catch (error) {
    console.log('controller error in updating habit statuss calendar view');
  }
};
