import moment from 'moment';
import HabitStatusModel from './habitStatus.schema.js';
import HabitModel from './habit.schema.js';

// Repository function to fetch all habits with their status data for the last 7 days
export const getAllHabitsDateRepo = async () => {
  try {
    // Find all habits
    const habits = await HabitModel.find({});

    // If no habits found, return false
    if (habits.length === 0) {
      return false;
    }

    // Fetch last 7 days' data for each habit
    const habitsWithData = await Promise.all(
      habits.map(async (habit) => {
        // Find habit status entries within the last 7 days
        const habitStatus = await HabitStatusModel.find({
          habitId: habit._id,
          date: {
            // Fetch data from the last 7 days
            $gte: moment().subtract(7, 'days').startOf('day').toDate(), 
            // Up to today's date
            $lte: moment().endOf('day').toDate(), 
          },
        });
        // Return habit and its status data for the last 7 days
        return { habit, habitStatus }; 
      })
    );

    return habitsWithData;
  } catch (error) {
    console.log('Error getting habits status, calendar view:', error);
    throw error;
  }
};

// Repository function to update the status of a habit for the calendar view
export const updateStatusHabitsDateRepo = async (id, status) => {
  try {
    // Find the habit status entry by its ID
    const habitStatus = await HabitStatusModel.findById(id);
    if (!habitStatus) {
      throw new Error('Habit status not found');
    }

    // Find the habit associated with the habit status
    const habit = await HabitModel.findById(habitStatus.habitId);

    // Get the current date without the time component
    const currentDate = moment().startOf('day');

    // Update the habit and habit status based on the status change
    if (status === 'done') {
      if (habitStatus.status !== 'done') {
        // Increment daysCompleted if the habit is marked as done and it wasn't already done today
        habit.daysCompleted++;
        // Increment streak if the habit was not already done today
        if (currentDate.isSame(moment(habitStatus.date).startOf('day'))) {
          habit.streak++;
        }
      }
    } else {
      if (habitStatus.status !== 'none' && habitStatus.status !== 'not done') {
        // Decrement daysCompleted if the habit is not marked as done today
        habit.daysCompleted--;
        // Reset streak if the habit was not already marked as done today
        if (currentDate.isSame(moment(habitStatus.date).startOf('day'))) {
          habit.streak = 0;
        }
      }
    }

    // Update the status of the habit status entry
    habitStatus.status = status;

    // Save both the habit and habit status
    await habit.save();
    await habitStatus.save();
  } catch (error) {
    console.log('Error while updating status for calendar view:', error);
    throw error;
  }
};
