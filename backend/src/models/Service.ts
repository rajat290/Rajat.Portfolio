import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  title: string;
  description: string;
  icon: string;
  price: string;
  ctaText: string;
  ctaLink: string;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  ctaText: {
    type: String,
    required: true
  },
  ctaLink: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model<IService>('Service', ServiceSchema);
