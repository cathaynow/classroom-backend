import express from 'express';
import cors from 'cors';

import subjectRouter from "./routes/subject.js";
import userRouter from "./routes/users.js";
import classRouter from "./routes/classes.js";

import securityMiddleware from "./middleware/security.js";
import {auth} from "./lib/auth";
import {toNodeHandler} from "better-auth/node";

const app = express();
const port = 5555;

app.use(express.json());

app.use(securityMiddleware)

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.all('/api/auth/*splat', toNodeHandler(auth));


app.use('/api/subjects', subjectRouter)
app.use('/api/users', userRouter)
app.use('/api/classes', classRouter)

app.get('/', (req, res) => {
    res.json({message: 'Hello, welcome to the classroom API!'});
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
