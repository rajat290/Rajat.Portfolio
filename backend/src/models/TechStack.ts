import mongoose, { Document, Schema } from 'mongoose';

export interface ITechStack extends Document {
  category: string;
  icon: string;
  technologies: Array<{
    name: string;
    icon: string;
    color: string;
  }>;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TechStackSchema: Schema = new Schema({
  category: {
    type: String,
    required: [true, 'Technology category is required'],
    trim: true,
    maxlength: [50, 'Category cannot exceed 50 characters'],
    enum: ['Frontend', 'Backend', 'Programming', 'Databases', 'Tools & DevOps']
  },
  icon: {
    type: String,
    required: [true, 'Category icon is required'],
    trim: true,
    maxlength: [20, 'Icon cannot exceed 20 characters']
  },
  technologies: [{
    name: {
      type: String,
      required: [true, 'Technology name is required'],
      trim: true,
      maxlength: [50, 'Technology name cannot exceed 50 characters']
    },
    icon: {
      type: String,
      required: [true, 'Technology icon is required'],
      trim: true,
      maxlength: [20, 'Icon cannot exceed 20 characters']
    },
    color: {
      type: String,
      required: [true, 'Technology color is required'],
      trim: true,
      maxlength: [30, 'Color cannot exceed 30 characters']
    }
  }],
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
TechStackSchema.index({ order: 1 });
TechStackSchema.index({ category: 1 });

// Virtual for technology count
TechStackSchema.virtual('techCount').get(function(this: ITechStack) {
  return this.technologies.length;
});

// Pre-save middleware to set default order
TechStackSchema.pre('save', async function(next) {
  if (this.isNew && this.order === 0) {
    try {
      const count = await mongoose.model('TechStack').countDocuments();
      this.order = count + 1;
    } catch (error) {
      return next(error as Error);
    }
  }
  next();
});

// Validation to ensure technologies array is not empty
TechStackSchema.pre('validate', function(this: ITechStack, next) {
  if (!this.technologies || this.technologies.length === 0) {
    this.invalidate('technologies', 'At least one technology is required');
  }
  next();
});

export default mongoose.model<ITechStack>('TechStack', TechStackSchema);
