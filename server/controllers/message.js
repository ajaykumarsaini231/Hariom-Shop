import { prisma } from "../scripts/prisma.js";
import nodemailer from "nodemailer";

import { transport } from "../middleware/sendmail.js";

export const createMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    // console.log(req.body)

    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Name, Email, and Message are required",
      });
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

    await transport.sendMail({
      from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
      to: "nabalsaini231@gmail.com",
  subject: `📩 New Inquiry: ${subject || "General Query"} - ${name}`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f4f4f9; padding: 20px; border-radius: 10px;">
      
      <div style="background-color: #2563eb; padding: 15px; text-align: center; border-radius: 10px 10px 0 0;">
        <h2 style="color: white; margin: 0; font-size: 20px;">Laptop Solutions & Enterprises</h2>
        <p style="color: #e0e7ff; margin: 5px 0 0; font-size: 14px;">New Customer Inquiry</p>
      </div>

      <div style="background-color: white; padding: 20px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
        
        <p style="font-size: 16px; color: #333;"><strong>Hello Admin,</strong></p>
        <p style="color: #555;">You have received a new message from the website contact form.</p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr style="background-color: #f9fafb;">
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555; width: 120px;">Name:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Email:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">
              <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
            </td>
          </tr>
          <tr style="background-color: #f9fafb;">
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Phone:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">
              <a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone || "N/A"}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Subject/Issue:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${subject || "General Inquiry"}</td>
          </tr>
        </table>

        <div style="margin-top: 20px;">
          <p style="font-weight: bold; color: #555; margin-bottom: 5px;">Customer Message:</p>
          <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #2563eb; border-radius: 4px; color: #333; line-height: 1.5;">
            ${message}
          </div>
        </div>

        <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #eee; padding-top: 15px;">
          <p>This email was sent automatically from your website.</p>
        </div>

      </div>
    </div>
  `,
    });

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

export const updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isSolved } = req.body;

    const updatedMessage = await prisma.message.update({
      where: { id },
      data: { isSolved },
    });

    return res.status(200).json({
      success: true,
      message: `Query marked as ${isSolved ? "Solved" : "Unsolved"}`,
      data: updatedMessage,
    });
  } catch (error) {
    console.error("Error updating status:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// 👇 ADD: Delete Message
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.message.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting message:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};