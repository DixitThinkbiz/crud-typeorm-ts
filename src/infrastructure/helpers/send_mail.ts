import nodemailer from 'nodemailer';

// Create a transporter
export const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
        user: '23sendmail@gmail.com',
        pass: 'rwsepjwczrxbltvr' 
    }
});


