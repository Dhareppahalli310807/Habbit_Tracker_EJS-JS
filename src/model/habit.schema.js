import mongoose from 'mongoose';

const HabitSchema = new mongoose.Schema({
  habitName: { type: String, required: true },
  streak: { type: Number, default: 0 },
  daysCompleted: { type: Number, default: 0 },
  totalDays: { type: Number, default: 0 },
});

const Habit = mongoose.model('Habit', HabitSchema);

export default Habit;
