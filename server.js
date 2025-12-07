const express = require('express');
const bookRouter = require('./src/routes/bookRouter');
const issueBookRouter = require('./src/routes/IssueBookRouter');
const userRouter = require('./src/routes/userRouter');
const { limiter, securityHeaders } = require('./middleWare/security');
const db = require('./src/config/db');
require('dotenv').config();
const app = express();
app.use(express.json());

const requestLogger = (req, res, next) => {
  console.log(`${req.method} ${req.path} :${new Date().toISOString()}`);
  next();
};

app.get('/', (req, res) => {
  res.json('wellcome to Library Management API');
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is Running successfully',
  });
});
app.use(requestLogger);
app.use(securityHeaders);
app.use(limiter);
app.use('/books/', bookRouter);
app.use('/issue-books/', issueBookRouter);
app.use('/users/', userRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server is Running in the ${PORT}`);
});
