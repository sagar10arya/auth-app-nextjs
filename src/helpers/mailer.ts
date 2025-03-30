import nodemailer from 'nodemailer'
import User from '@/models/userModel';
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId, }: { email: string; emailType: "VERIFY" | "RESET"; userId: any; }) => {
  try {
    // create hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: "sagar@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify Your Password" : "Reset Password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?Token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
      or copy the link in the browser. <br> ${
        process.env.DOMAIN
      }/verifyemail?Token=${hashedToken}
      </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};