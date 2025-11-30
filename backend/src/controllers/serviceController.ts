import { Request, Response } from 'express';
import Service from '../models/Service';

interface AuthRequest extends Request {
  user?: any;
}

// @desc    Get all services (public)
// @route   GET /api/services
// @access  Public
export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.find({ active: true })
      .sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      data: services
    });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single service (public)
// @route   GET /api/services/:id
// @access  Public
export const getService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      data: service
    });
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create new service (admin)
// @route   POST /api/services
// @access  Private/Admin
export const createService = async (req: AuthRequest, res: Response) => {
  try {
    const serviceData = {
      ...req.body,
      createdBy: req.user._id
    };

    const service = await Service.create(serviceData);

    res.status(201).json({
      success: true,
      data: service,
      message: 'Service created successfully'
    });
  } catch (error: any) {
    console.error('Create service error:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Service with this title already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update service (admin)
// @route   PUT /api/services/:id
// @access  Private/Admin
export const updateService = async (req: AuthRequest, res: Response) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedBy: req.user._id },
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      data: service,
      message: 'Service updated successfully'
    });
  } catch (error: any) {
    console.error('Update service error:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Service with this title already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete service (admin)
// @route   DELETE /api/services/:id
// @access  Private/Admin
export const deleteService = async (req: AuthRequest, res: Response) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
