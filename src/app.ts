import express from 'express';
import userRouter from './routes/users.router';
import eventRouter from './routes/events.router';
import adminRouter from './routes/admin.router';
import env from './config/env.config';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRouter);
app.use('/events', eventRouter);
app.use('/admin', adminRouter);

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});