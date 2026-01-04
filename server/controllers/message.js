import { PrismaClient } from "@prisma/client";

import nodemailer from "nodemailer";
const prisma = new PrismaClient();

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
    pass: process.env.NODE_CODE_SENDING_EMAIL_PASSWORD,
  },
});
// Create new message
export const createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, Email, and Message are required" });
    }

    const newMessage = await prisma.message.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
      },
    });
      const mailOptions = {
      from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
      to: "nabalsaini231@gmail.com", // Admin Email
      subject: `New Message: ${subject || "No Subject"} - from ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>New Message Received</title></head>
        <body style="margin: 0; padding: 0; font-family: sans-serif; background-color: #f1f5f9; color: #334155;">
          <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <div style="height: 6px; background: linear-gradient(to right, #4f46e5, #9333ea); width: 100%;"></div>
            <div style="padding: 40px;">
              <h1 style="color: #0f172a; margin-top: 0;">New Inquiry Received</h1>
              <p style="font-size: 16px; color: #475569;">You have received a new message from the <strong>Contact Us</strong> form.</p>
              
              <div style="margin: 24px 0; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; padding: 16px 0;">
                <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #4f46e5; text-decoration: none;">${email}</a></p>
                <p style="margin: 8px 0;"><strong>Phone:</strong> ${phone || "N/A"}</p>
                <p style="margin: 8px 0;"><strong>Subject:</strong> ${subject || "N/A"}</p>
              </div>

              <p style="font-weight: bold; margin-bottom: 8px;">Message:</p>
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px;">
                <p style="margin: 0; white-space: pre-wrap; color: #334155; line-height: 1.6;">${message}</p>
              </div>
            </div>
            
            <div style="background-color: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; font-size: 14px; color: #64748b;">&copy; ${new Date().getFullYear()} Ajay Kumar Saini Admin Panel.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transport.sendMail(mailOptions);

    return res.status(201).json({
      success: true,
      message: "Message sent successfully!",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error creating message:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all messages (for admin dashboard maybe)
export const getMessages = async (req, res) => {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
