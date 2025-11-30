import Contact from '../models/Contact';

export const sendContactNotification = async (contact: any) => {
  try {
    // For now, just log the contact notification
    // In a real application, you would integrate with an email service like SendGrid, Nodemailer, etc.

    console.log('📧 Contact Form Notification:');
    console.log(`From: ${contact.name} <${contact.email}>`);
    console.log(`Message: ${contact.message}`);
    console.log(`Submitted at: ${contact.createdAt}`);
    console.log('---');

    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100));

    return true;
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
};
