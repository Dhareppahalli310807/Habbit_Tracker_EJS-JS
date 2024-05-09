import mongoose from 'mongoose';

const HabitStatusSchema = new mongoose.Schema({
  habitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit',
    required: true,
  },
  date: { type: Date, required: true },
  status: { type: String, enum: ['done', 'not done', 'none'], default: 'none' },
});

const HabitStatus = mongoose.model('HabitStatus', HabitStatusSchema);

export default HabitStatus;
