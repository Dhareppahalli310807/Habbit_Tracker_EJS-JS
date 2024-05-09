import moment from 'moment';
import HabitModel from './habit.schema.js';
import HabitStatusModel from './habitStatus.schema.js';

export const createDailyHabitStatus = async () => {
  try {
    // Get all habits from the database
    const habits = await HabitModel.find();

    // Get the current date
    const currentDate = moment().startOf('day');

    // Iterate over each habit
    for (const habit of habits) {
      // Check if a document already exists for today's date and this habit
      const existingStatus = await HabitStatusModel.findOne({
        habitId: habit._id,
        date: currentDate,
      });

      // If no document exists, create a new one
      if (!existingStatus) {
        await HabitStatusModel.create({
          habitId: habit._id,
          date: currentDate,
        });
        console.log(
          `Added new status for habit ${habit.habitName} for ${currentDate}`
        );
      }
      // Update the totalDays field in the habit
      const totalDays = await HabitStatusModel.countDocuments({
        habitId: habit._id,
      });
      habit.totalDays = totalDays;
      await habit.save();
    }

    console.log('Daily habit status update completed.');
  } catch (error) {
    console.error('Error in daily habit status update:', error);
  }
};
