// testEmail.js
import { sendEmail } from './utils/email.js';

sendEmail(
    'mrashok0205@gmail.com',
    'Test Email',
    'Plain text content',
    '<strong>This is HTML content</strong>'
);
