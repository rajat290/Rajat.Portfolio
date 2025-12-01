import { Request, Response } from 'express';
import Experience from '../models/Experience';

interface AuthRequest extends Request {
  user?: any;
}

// @desc    Get all experiences (public)
// @route   GET /api/experience
// @access  Public
export const getExperiences = async (req: Request, res: Response) => {
  try {
    const experiences = await Experience.find({})
      .sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      data: experiences
    });
  } catch (error) {
    console.error('Get experiences error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single experience (public)
// @route   GET /api/experience/:id
// @access  Public
export const getExperience = async (req: Request, res: Response) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    res.json({
      success: true,
      data: experience
    });
  } catch (error) {
    console.error('Get experience error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create new experience (admin)
// @route   POST /api/experience
// @access  Private/Admin
export const createExperience = async (req: AuthRequest, res: Response) => {
  try {
    const experienceData = {
      ...req.body,
      createdBy: req.user._id
    };

    const experience = await Experience.create(experienceData);

    res.status(201).json({
      success: true,
      data: experience,
      message: 'Experience created successfully'
    });
  } catch (error: any) {
    console.error('Create experience error:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Experience with this title already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update experience (admin)
// @route   PUT /api/experience/:id
// @access  Private/Admin
export const updateExperience = async (req: AuthRequest, res: Response) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedBy: req.user._id },
      { new: true, runValidators: true }
    );

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    res.json({
      success: true,
      data: experience,
      message: 'Experience updated successfully'
    });
  } catch (error: any) {
    console.error('Update experience error:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Experience with this title already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete experience (admin)
// @route   DELETE /api/experience/:id
// @access  Private/Admin
export const deleteExperience = async (req: AuthRequest, res: Response) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    res.json({
      success: true,
      message: 'Experience deleted successfully'
    });
  } catch (error) {
    console.error('Delete experience error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update experience order (admin)
// @route   PUT /api/experience/:id/order
// @access  Private/Admin
export const updateExperienceOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { order } = req.body;

    if (typeof order !== 'number' || order < 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order value'
      });
    }

    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      { order, updatedBy: req.user._id },
      { new: true, runValidators: true }
    );

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    res.json({
      success: true,
      data: experience,
      message: 'Experience order updated successfully'
    });
  } catch (error) {
    console.error('Update experience order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
