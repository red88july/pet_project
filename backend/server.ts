import express from 'express';
import {usersRouter} from "./routers/users";
import mongoose from "mongoose";

const app = express();
const port = 8000;

import connectToDB from "./connectToDB";

app.use(express.static('public'));
app.use(express.json());

app.use('/users', usersRouter);

const run = async () => {
    await mongoose.connect(connectToDB.plannerDB.db);

    app.listen(port, () => {
        console.log(`Server is running on ${port} port!`);
    })

    process.on('exit', ()=> {
        mongoose.disconnect();
    });
};

void run();
