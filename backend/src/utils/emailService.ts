import nodemailer from 'nodemailer';
import Contact from '../models/Contact';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendContactNotification = async (contact: any) => {
  try {
    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission from ${contact.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>

          <div style="background-color: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #4F46E5;">Contact Details:</h3>
            <p><strong>Name:</strong> ${contact.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${contact.email}" style="color: #4F46E5;">${contact.email}</a></p>
            <p><strong>Submitted:</strong> ${new Date(contact.createdAt).toLocaleString()}</p>
          </div>

          <div style="background-color: #ffffff; border: 1px solid #e9ecef; padding: 20px; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #333;">Message:</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${contact.message}</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
            <a href="mailto:${contact.email}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Reply to ${contact.name}
            </a>
          </div>

          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This email was sent from your portfolio contact form.
          </p>
        </div>
      `,
      text: `
New Contact Form Submission

From: ${contact.name} <${contact.email}>
Submitted: ${new Date(contact.createdAt).toLocaleString()}

Message:
${contact.message}

---
This email was sent from your portfolio contact form.
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Contact notification email sent:', info.messageId);

    return true;
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
};
