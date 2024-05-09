import moment from 'moment';
import HabitModel from './habit.schema.js';
import HabitStatusModel from './habitStatus.schema.js';

// Repository function to add a new habit
export const addHabitRepo = async (habitName) => {
  try {
    // Create a new habit model instance with the habit name and total days set to 1
    const newHabit = new HabitModel({ habitName, totalDays: 1 });

    // Save the new habit to the database
    await newHabit.save();

    // Create a moment date representing today's date without the time component
    const currentDate = moment().startOf('day');

    // Save the habit status with the formatted date
    await HabitStatusModel.create({
      // Link the habit status to the newly created habit
      habitId: newHabit._id, 
      // Convert moment date to JavaScript Date object
      date: currentDate.toDate(), 
    });
  } catch (error) {
    console.log('Error while adding a new habit:', error);
    throw error;
  }
};

// Repository function to fetch all habits for the current date
export const getAllHabitsRepo = async () => {
  try {
    // Get the current date without the time component
    const currentDate = moment().startOf('day');

    // Find all habit status entries for the current date and populate the linked habit model
    const habits = await HabitStatusModel.find({ date: currentDate }).populate(
      'habitId'
    );
    return habits;
  } catch (error) {
    console.error('Error while fetching habits for the current date:', error);
    throw error;
  }
};

// Repository function to update the status of a habit
export const updateStatusHabitsRepo = async (id, status) => {
  try {
    // Find the habit model by its ID
    const habit = await HabitModel.findById(id);
    if (!habit) {
      throw new Error('Habit not found');
    }

    // Count the number of habit status entries for the habit
    const habitStatusCount = await HabitStatusModel.countDocuments({
      habitId: id,
    });

    // Get the current date without the time component
    const currentDate = moment().startOf('day');

    // Find the habit status entry for today
    let habitStatus = await HabitStatusModel.findOne({
      habitId: id,
      date: currentDate,
    });

    // If no habit status entry exists for today, create a new one
    if (!habitStatus) {
      habitStatus = new HabitStatusModel({ habitId: id, date: currentDate });
    }

    // Update the habit model based on the status
    if (status === 'done') {
      // Increment daysCompleted if the habit is marked as done and it wasn't already done today
      if (habitStatus.status !== 'done') {
        habit.daysCompleted++;
        habit.streak++;
      }
    } else {
      // Reset streak if the habit is not done
      if (habitStatus.status !== 'none' && habitStatus.status !== 'not done') {
        habit.streak = 0;
        habit.daysCompleted--;
      }
    }

    // Update totalDays with the count of habit status entries
    habit.totalDays = habitStatusCount;

    // Update the status of the habit status entry
    habitStatus.status = status;

    // Save both the habit status entry and the habit model
    await habitStatus.save();
    await habit.save();
  } catch (error) {
    console.log('Error while updating status:', error);
    throw error;
  }
};

// Repository function to delete a habit and its associated habit status entries
export const deleteHabitRepo = async (id) => {
  try {
    // Delete the habit model by its ID
    await HabitModel.findByIdAndDelete(id);

    // Delete all habit status entries associated with the habit ID
    await HabitStatusModel.deleteMany({ habitId: id });
  } catch (error) {
    console.log('Error while deleting habit:', error);
    throw error;
  }
};
