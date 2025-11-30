import mongoose, { Document, Schema } from 'mongoose';

export interface IExperience extends Document {
  title: string;
  subtitle: string;
  date: string;
  description?: string;
  type: 'work' | 'education';
  order: number;
}

const ExperienceSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['work', 'education'],
    required: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model<IExperience>('Experience', ExperienceSchema);
