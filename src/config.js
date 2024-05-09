import mongoose from 'mongoose';

export const connectToDb = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/Habit_Tracker');
    console.log('connected to Database');
  } catch (error) {
    console.log('error connecting to Database');
  }
};
