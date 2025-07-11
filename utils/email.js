import nodemailer from 'nodemailer';
import { EMAIL_PASSWORD, EMAIL_USER } from '../env.js';

export const sendEmail = async (to, subject, text, html = '') => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASSWORD,
            },
        });

        const info = await transporter.sendMail({
            from: `"Organic_Food App" <${EMAIL_USER}>`,
            to,
            subject,
            text,
            html,
        });

        console.log('Email sent:', info.messageId);
    } catch (error) {
        console.error('Email send failed:', error.message);
        throw new Error('Failed to send email');
    }
};
export const sendSportsEmail = async (to, subject, text, html = '') => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASSWORD,
            },
        });

        const info = await transporter.sendMail({
            from: `"Sports Web " <${EMAIL_USER}>`,
            to,
            subject,
            text,
            html,
        });

        console.log('Email sent:', info.messageId);
    } catch (error) {
        console.error('Email send failed:', error.message);
        throw new Error('Failed to send email');
    }
};
