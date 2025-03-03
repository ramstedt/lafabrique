import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { firstName, surname, email, phone, message, course, sendTo } =
      await req.json();

    let recipientEmail;
    if (sendTo === 'karin') {
      recipientEmail = process.env.KARIN_EMAIL;
    } else if (sendTo === 'cecilia') {
      recipientEmail = process.env.CECILIA_EMAIL;
    } else {
      return new Response(JSON.stringify({ error: 'Invalid recipient' }), {
        status: 400,
      });
    }

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: recipientEmail,
      subject: `Bokningsförfrågan: ${course}`,
      text: `
        Förnamn: ${firstName}
        Efternamn: ${surname}
        Email: ${email}
        Telefon: ${phone}
        
        Meddelande:
        ${message}
      `,
      replyTo: email,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Error sending email' }), {
      status: 500,
    });
  }
}
