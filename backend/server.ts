import express from 'express';
import {usersRouter} from "./routers/users";
import mongoose from "mongoose";
import connectToDB from "./connectToDB";

const app = express();
const port = 8000;

app.use('/users', usersRouter);

app.use(express.json());

const run = async () => {
    await mongoose.connect(connectToDB.plannerDB.db);

    app.listen(port, () => {
        console.log(`Server is running on ${port} port!`);
    })
};

void run();
