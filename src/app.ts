import express from 'express';
import userRouter from './routes/users.router';
import eventRouter from './routes/events.router';

const app = express();

app.use('/users', userRouter);
app.use('/events', eventRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});