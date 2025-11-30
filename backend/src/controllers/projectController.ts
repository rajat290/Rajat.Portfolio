import { Request, Response } from 'express';
import Project from '../models/Project';

interface AuthRequest extends Request {
  user?: any;
}

// @desc    Get all projects (public)
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({})
      .sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single project (public)
// @route   GET /api/projects/:id
// @access  Public
export const getProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create new project (admin)
// @route   POST /api/projects
// @access  Private/Admin
export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const projectData = {
      ...req.body,
      createdBy: req.user._id
    };

    const project = await Project.create(projectData);

    res.status(201).json({
      success: true,
      data: project,
      message: 'Project created successfully'
    });
  } catch (error: any) {
    console.error('Create project error:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Project with this title already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update project (admin)
// @route   PUT /api/projects/:id
// @access  Private/Admin
export const updateProject = async (req: AuthRequest, res: Response) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedBy: req.user._id },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project,
      message: 'Project updated successfully'
    });
  } catch (error: any) {
    console.error('Update project error:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Project with this title already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete project (admin)
// @route   DELETE /api/projects/:id
// @access  Private/Admin
export const deleteProject = async (req: AuthRequest, res: Response) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update project order (admin)
// @route   PUT /api/projects/:id/order
// @access  Private/Admin
export const updateProjectOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { order } = req.body;

    if (typeof order !== 'number' || order < 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order value'
      });
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { order, updatedBy: req.user._id },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project,
      message: 'Project order updated successfully'
    });
  } catch (error) {
    console.error('Update project order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
