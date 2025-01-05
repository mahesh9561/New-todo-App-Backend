const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 8000;
const connectDB = require('./config/db');
const taskRoute = require('./routes/task');
const authRoute = require('./routes/auth')
const app = express();

app.use(cors(
    { origin: 'https://new-todo-app-mern.vercel.app', credentials: true }
));

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use('/api/task', taskRoute);
app.use('/api/auth', authRoute);

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
