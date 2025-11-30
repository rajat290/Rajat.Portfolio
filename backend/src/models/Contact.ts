import mongoose, { Document, Schema } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  repliedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
    match: [/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    maxlength: [255, 'Email cannot exceed 255 characters'],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters'],
    minlength: [10, 'Message must be at least 10 characters long']
  },
  status: {
    type: String,
    enum: {
      values: ['new', 'read', 'replied'],
      message: 'Status must be new, read, or replied'
    },
    default: 'new'
  },
  repliedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
ContactSchema.index({ status: 1, createdAt: -1 });
ContactSchema.index({ email: 1 });
ContactSchema.index({ createdAt: -1 });

// Virtual for time since creation
ContactSchema.virtual('timeSinceCreation').get(function(this: IContact) {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - (this as IContact).createdAt.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
  return `${Math.ceil(diffDays / 30)} months ago`;
});

// Pre-save middleware to set repliedAt when status changes to replied
ContactSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'replied' && !this.repliedAt) {
    this.repliedAt = new Date();
  }
  next();
});

// Static method to get unread messages count
ContactSchema.statics.getUnreadCount = function() {
  return this.countDocuments({ status: 'new' });
};

// Static method to get messages by status
ContactSchema.statics.getByStatus = function(status: string) {
  return this.find({ status }).sort({ createdAt: -1 });
};

export default mongoose.model<IContact>('Contact', ContactSchema);
