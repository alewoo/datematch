import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendConfirmationEmail(email: string) {
  try {
    const data = await resend.emails.send({
      from: "DateMatch <onboarding@resend.dev>", // Resend provides this default sender
      to: email,
      subject: "Welcome to DateMatch!",
      html: `
        <h1>Welcome to DateMatch! 🎉</h1>
        <p>Thanks for joining! We'll notify you when we find potential matches.</p>
        <p>Best regards,<br>The DateMatch Team</p>
      `,
    });
    return data;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error; // Rethrow the error so the API route knows about it
  }
}
