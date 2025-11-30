import mongoose, { Document, Schema } from 'mongoose';

export interface IAbout extends Document {
  name: string;
  title: string;
  bio: string;
  journey: string;
  approach: string[];
  interests: string;
  image: string;
  tags: string[];
  technologies: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const AboutSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    required: true
  },
  journey: {
    type: String,
    required: true
  },
  approach: [{
    type: String,
    required: true
  }],
  interests: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    required: true
  }],
  technologies: [{
    type: String,
    required: true
  }],
  order: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

export default mongoose.model<IAbout>('About', AboutSchema);
