import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { firstName, surname, email, phone, message, course, sendTo } =
      req.body;

    let recipientEmail;
    if (sendTo === 'cecilia') {
      recipientEmail = 'cilla@cilla.com';
    } else if (sendTo === 'karin') {
      recipientEmail = 'karin@karin.com';
    } else {
      return res.status(400).json({ error: 'Invalid recipient' });
    }

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: email,
        to: recipientEmail,
        subject: `Bokning av kursplats: ${course}`,
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

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
