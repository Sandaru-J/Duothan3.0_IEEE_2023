import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import sendMail from './utils/email/sendEmail.js';
import sendSMS from './utils/sms/sendSMS.js';
import connect from './db/connect.js';

import paymentRoutes from './routes/paymentRoutes.js';
import authRoutes from './routes/authRoutes.js';
import medicineRoutes from './routes/medicineRoutes.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET',
    'POST',
    'DELETE',
    'PATCH',
    'OPTIONS'
  );
  next();
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.set('io', io);

app.get('/api', (req, res) => {
  console.log('Hello World!');
  res.send('Hello World!');
});

app.use('/api/payment', paymentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/medicine', medicineRoutes);

//Email

// await sendMail({
//   receiver: 'vdhambarage@gmail.com',
//   name: 'Venushka',
// });

//SMS

// await sendSMS();

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connect();
    server.listen(PORT, () => {
      console.log('App listening on port ' + PORT);
    });
  } catch (error) {}
};

start();
