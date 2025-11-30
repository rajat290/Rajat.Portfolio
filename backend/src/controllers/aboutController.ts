import { Request, Response } from 'express';
import About from '../models/About';

interface AuthRequest extends Request {
  user?: any;
}

// @desc    Get all about sections (public)
// @route   GET /api/about
// @access  Public
export const getAboutSections = async (req: Request, res: Response) => {
  try {
    const aboutSections = await About.find({})
      .sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      data: aboutSections
    });
  } catch (error) {
    console.error('Get about sections error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single about section (public)
// @route   GET /api/about/:id
// @access  Public
export const getAboutSection = async (req: Request, res: Response) => {
  try {
    const aboutSection = await About.findById(req.params.id);

    if (!aboutSection) {
      return res.status(404).json({
        success: false,
        message: 'About section not found'
      });
    }

    res.json({
      success: true,
      data: aboutSection
    });
  } catch (error) {
    console.error('Get about section error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create new about section (admin)
// @route   POST /api/about
// @access  Private/Admin
export const createAboutSection = async (req: AuthRequest, res: Response) => {
  try {
    const aboutData = {
      ...req.body,
      createdBy: req.user._id
    };

    const aboutSection = await About.create(aboutData);

    res.status(201).json({
      success: true,
      data: aboutSection,
      message: 'About section created successfully'
    });
  } catch (error: any) {
    console.error('Create about section error:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'About section with this title already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update about section (admin)
// @route   PUT /api/about/:id
// @access  Private/Admin
export const updateAboutSection = async (req: AuthRequest, res: Response) => {
  try {
    const aboutSection = await About.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedBy: req.user._id },
      { new: true, runValidators: true }
    );

    if (!aboutSection) {
      return res.status(404).json({
        success: false,
        message: 'About section not found'
      });
    }

    res.json({
      success: true,
      data: aboutSection,
      message: 'About section updated successfully'
    });
  } catch (error: any) {
    console.error('Update about section error:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'About section with this title already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete about section (admin)
// @route   DELETE /api/about/:id
// @access  Private/Admin
export const deleteAboutSection = async (req: AuthRequest, res: Response) => {
  try {
    const aboutSection = await About.findByIdAndDelete(req.params.id);

    if (!aboutSection) {
      return res.status(404).json({
        success: false,
        message: 'About section not found'
      });
    }

    res.json({
      success: true,
      message: 'About section deleted successfully'
    });
  } catch (error) {
    console.error('Delete about section error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update about section order (admin)
// @route   PUT /api/about/:id/order
// @access  Private/Admin
export const updateAboutSectionOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { order } = req.body;

    if (typeof order !== 'number' || order < 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order value'
      });
    }

    const aboutSection = await About.findByIdAndUpdate(
      req.params.id,
      { order, updatedBy: req.user._id },
      { new: true, runValidators: true }
    );

    if (!aboutSection) {
      return res.status(404).json({
        success: false,
        message: 'About section not found'
      });
    }

    res.json({
      success: true,
      data: aboutSection,
      message: 'About section order updated successfully'
    });
  } catch (error) {
    console.error('Update about section order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
