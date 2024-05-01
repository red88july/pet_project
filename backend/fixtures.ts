    import mongoose from "mongoose";
    import connectToDB from "./connectToDB";
    import User from "./models/User";
    import {randomUUID} from "crypto";

    const dropCollectction = async (db: mongoose.Connection, collectionsName: string) => {
        try {
            await db.dropCollection(collectionsName);
        } catch (e) {
            console.log(`Collection ${collectionsName} was missing, skipping drop...`)
        }
    }

    const run = async () => {
        await mongoose.connect(connectToDB.plannerDB.db);
        const db = mongoose.connection;

        const collections = ['users', 'events'];

        for (const collectionsName of collections) {
            await dropCollectction(db, collectionsName);
        }

        const users = await User.create([
            {
                username: 'IvanovAdmin',
                firstName: 'Ivan',
                lastName: 'Ivanov',
                surName: 'Sergeevich',
                email: 'ivanov@gmail.com',
                password: 'Ivanov_123#',
                token: randomUUID(),
                avatar: 'fixtures/cobain.jpg',
                phoneNumber: '0555960011',
                role:'admin',
            }, {
                username: 'Speaker_Sid',
                firstName: 'Sergej',
                lastName: 'Sidorov',
                email: 'sidorov@gmail.com',
                password: 'Sidorov_123#',
                token: randomUUID(),
                avatar: 'fixtures/hansolo.jpg',
                phoneNumber: '050510012',
                role:'speaker',
            }, {
                username: 'Speaker_Olga',
                firstName: 'Olga',
                lastName: 'Kuplinova',
                surName: 'Mihajlovna',
                email: 'kuplinova@gmail.com',
                password: 'Olga_123#',
                token: randomUUID(),
                avatar: 'fixtures/brave.jpg',
                phoneNumber: '0700112233',
                role:'speaker',
            }, {
                username: 'Mr.Smile',
                firstName: 'Aleksandr',
                lastName: 'Kuplinov',
                surName: 'Sergeevich',
                email: 'kuplinov@gmail.com',
                password: 'Kuplinov_123#',
                token: randomUUID(),
                avatar: 'fixtures/jakson.jpg',
                phoneNumber: '0222967010',
                role:'user',
            }, {
                username: 'OkiDoki',
                firstName: 'Mikhail',
                lastName: 'Bulgakov',
                surName: 'Efremovich',
                email: 'bulgakov.1930@mail.com',
                password: 'Bulgakov_123#',
                token: randomUUID(),
                avatar: 'fixtures/hetfield.jpg',
                phoneNumber: '0550397890',
                role:'user',
            },
        ]);

        await db.close();
    };

    void run();