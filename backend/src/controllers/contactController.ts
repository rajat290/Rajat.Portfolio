import { Request, Response } from 'express';
import Contact from '../models/Contact';
import { sendContactNotification } from '../utils/emailService';

interface AuthRequest extends Request {
  user?: any;
}

// @desc    Submit contact form (public)
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    // Create contact record
    const contact = await Contact.create({
      name,
      email,
      message,
      status: 'new'
    });

    // Send email notification (async - don't wait for it)
    try {
      await sendContactNotification(contact);
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      success: true,
      data: contact,
      message: 'Contact form submitted successfully'
    });
  } catch (error: any) {
    console.error('Submit contact error:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Contact form already submitted'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get all contact messages (admin)
// @route   GET /api/contact
// @access  Private/Admin
export const getContacts = async (req: AuthRequest, res: Response) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query: any = {};
    if (status && status !== 'all') {
      query.status = status;
    }

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: contacts,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single contact message (admin)
// @route   GET /api/contact/:id
// @access  Private/Admin
export const getContact = async (req: AuthRequest, res: Response) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update contact status (admin)
// @route   PUT /api/contact/:id
// @access  Private/Admin
export const updateContact = async (req: AuthRequest, res: Response) => {
  try {
    const { status, repliedAt } = req.body;

    const updateData: any = {
      status,
      updatedBy: req.user._id
    };

    if (status === 'replied' && repliedAt) {
      updateData.repliedAt = new Date(repliedAt);
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    res.json({
      success: true,
      data: contact,
      message: 'Contact status updated successfully'
    });
  } catch (error: any) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete contact message (admin)
// @route   DELETE /api/contact/:id
// @access  Private/Admin
export const deleteContact = async (req: AuthRequest, res: Response) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact message deleted successfully'
    });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get contact statistics (admin)
// @route   GET /api/contact/stats
// @access  Private/Admin
export const getContactStats = async (req: AuthRequest, res: Response) => {
  try {
    const total = await Contact.countDocuments();
    const newCount = await Contact.countDocuments({ status: 'new' });
    const readCount = await Contact.countDocuments({ status: 'read' });
    const repliedCount = await Contact.countDocuments({ status: 'replied' });

    // Get recent contacts (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentContacts = await Contact.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    res.json({
      success: true,
      data: {
        total,
        new: newCount,
        read: readCount,
        replied: repliedCount,
        recent: recentContacts
      }
    });
  } catch (error) {
    console.error('Get contact stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
