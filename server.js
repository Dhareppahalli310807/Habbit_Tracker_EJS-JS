import express from 'express';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import { connectToDb } from './src/config.js';
import {
  addHabit,
  deleteHabit,
  getAllHabits,
  updateStatusHabits,
} from './src/controller/habit.controller.js';
import {
  getAllHabitsDate,
  updateStatusHabitsDate,
} from './src/controller/habitStatus.controller.js';
import { createDailyHabitStatus } from './src/model/createDailyHabitStatus.js';
// default
const app = express();
app.use(express.static('public'));
app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'src', 'views'));

//create daily habits document in habit status model
createDailyHabitStatus();

//routes
//habits view
app.get('/', getAllHabits);
//add habit in habits view
app.post('/', addHabit); 
// update status of the habit from habit view
app.post('/update/:habitId', updateStatusHabits); 
// delete habit from habit view
app.get('/delete/:habitId', deleteHabit); 
// calendar view
app.get('/calendarView', getAllHabitsDate);
// update status from calendar view
app.post('/calendarView/update/:habitStatusId', updateStatusHabitsDate); 

// server listenting
app.listen(8080, () => {
  console.log('Server listening at port 8080');
  connectToDb();
});
