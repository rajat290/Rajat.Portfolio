import { Request, Response } from 'express';
import TechStack from '../models/TechStack';

interface AuthRequest extends Request {
  user?: any;
}

// @desc    Get all tech stack categories (public)
// @route   GET /api/techstack
// @access  Public
export const getTechStack = async (req: Request, res: Response) => {
  try {
    const techStack = await TechStack.find({})
      .sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      data: techStack
    });
  } catch (error) {
    console.error('Get tech stack error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single tech stack category (public)
// @route   GET /api/techstack/:id
// @access  Public
export const getTechStackCategory = async (req: Request, res: Response) => {
  try {
    const category = await TechStack.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Tech stack category not found'
      });
    }

    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Get tech stack category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create new tech stack category (admin)
// @route   POST /api/techstack
// @access  Private/Admin
export const createTechStackCategory = async (req: AuthRequest, res: Response) => {
  try {
    const categoryData = {
      ...req.body,
      createdBy: req.user._id
    };

    const category = await TechStack.create(categoryData);

    res.status(201).json({
      success: true,
      data: category,
      message: 'Tech stack category created successfully'
    });
  } catch (error: any) {
    console.error('Create tech stack category error:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Tech stack category with this name already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update tech stack category (admin)
// @route   PUT /api/techstack/:id
// @access  Private/Admin
export const updateTechStackCategory = async (req: AuthRequest, res: Response) => {
  try {
    const category = await TechStack.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedBy: req.user._id },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Tech stack category not found'
      });
    }

    res.json({
      success: true,
      data: category,
      message: 'Tech stack category updated successfully'
    });
  } catch (error: any) {
    console.error('Update tech stack category error:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Tech stack category with this name already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete tech stack category (admin)
// @route   DELETE /api/techstack/:id
// @access  Private/Admin
export const deleteTechStackCategory = async (req: AuthRequest, res: Response) => {
  try {
    const category = await TechStack.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Tech stack category not found'
      });
    }

    res.json({
      success: true,
      message: 'Tech stack category deleted successfully'
    });
  } catch (error) {
    console.error('Delete tech stack category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
