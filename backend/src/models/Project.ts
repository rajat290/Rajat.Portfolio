import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  longDescription: string;
  images: string[];
  points: string[];
  tech: Array<{
    name: string;
    icon: string;
    color: string;
  }>;
  links: Array<{
    name: string;
    url: string;
  }>;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
    maxlength: [300, 'Description cannot exceed 300 characters']
  },
  longDescription: {
    type: String,
    required: [true, 'Project long description is required'],
    trim: true
  },
  images: [{
    type: String,
    required: [true, 'At least one image is required'],
    validate: {
      validator: function(v: string[]) {
        return v.length > 0;
      },
      message: 'At least one image is required'
    }
  }],
  points: [{
    type: String,
    trim: true
  }],
  tech: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    icon: {
      type: String,
      required: true,
      trim: true
    },
    color: {
      type: String,
      required: true,
      trim: true
    }
  }],
  links: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    url: {
      type: String,
      required: true,
      trim: true,
      match: [/^https?:\/\/.+/, 'Please enter a valid URL starting with http:// or https://']
    }
  }],
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
ProjectSchema.index({ featured: -1, order: 1 });
ProjectSchema.index({ createdAt: -1 });
ProjectSchema.index({ title: 'text', description: 'text' }); // Text search

// Virtual for getting featured projects
ProjectSchema.virtual('isFeatured').get(function() {
  return this.featured;
});

// Pre-save middleware to set default order
ProjectSchema.pre('save', async function(next) {
  if (this.isNew && this.order === 0) {
    try {
      const count = await mongoose.model('Project').countDocuments();
      this.order = count + 1;
    } catch (error) {
      return next(error as Error);
    }
  }
  next();
});

export default mongoose.model<IProject>('Project', ProjectSchema);
