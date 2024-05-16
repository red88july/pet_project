import mongoose from "mongoose";
import connectToDB from "./connectToDB";
import User from "./models/User";
import {randomUUID} from "crypto";
import Occasion from "./models/Occasion";
import Category from "./models/Category";
import occasion from "./models/Occasion";

const dropCollection = async (db: mongoose.Connection, collectionsName: string) => {
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
        await dropCollection(db, collectionsName);
    }

    const users = await User.create([
        {
            username: 'GreenHillers',
            firstName: 'Ivan',
            lastName: 'Ivanov',
            surName: 'Sergeevich',
            email: 'ivanov@gmail.com',
            password: 'Ivanov_123#',
            token: randomUUID(),
            avatar: 'fixtures/avatar/cobain.jpg',
            phoneNumber: '0555960011',
            role: 'admin',
        }, {
            username: 'EverBeMan',
            firstName: 'Maksim',
            lastName: 'Sokolov',
            surName: 'Pavlovich',
            email: 'maksim.ever1988@gmail.com',
            password: 'Sokolov_123#',
            token: randomUUID(),
            avatar: 'fixtures/avatar/charlie.jpg',
            phoneNumber: '0222669811',
            role: 'manager',
        }, {
            username: 'Speaker_Sid',
            firstName: 'Sergej',
            lastName: 'Sidorov',
            email: 'sidorov@gmail.com',
            password: 'Sidorov_123#',
            token: randomUUID(),
            avatar: 'fixtures/avatar/hansolo.jpg',
            phoneNumber: '050510012',
            role: 'speaker',
        }, {
            username: 'Speaker_Olga',
            firstName: 'Olga',
            lastName: 'Kuplinova',
            surName: 'Mihajlovna',
            email: 'kuplinova@gmail.com',
            password: 'Olga_123#',
            token: randomUUID(),
            avatar: 'fixtures/avatar/brave.jpg',
            phoneNumber: '0700112233',
            role: 'speaker',
        }, {
            username: 'Mr.Smile',
            firstName: 'Aleksandr',
            lastName: 'Kuplinov',
            surName: 'Sergeevich',
            email: 'kuplinov@gmail.com',
            password: 'Kuplinov_123#',
            token: randomUUID(),
            avatar: 'fixtures/avatar/jakson.jpg',
            phoneNumber: '0222967010',
            role: 'guest',
        }, {
            username: 'OkiDoki',
            firstName: 'Mikhail',
            lastName: 'Bulgakov',
            surName: 'Efremovich',
            email: 'bulgakov.1930@mail.com',
            password: 'Bulgakov_123#',
            token: randomUUID(),
            avatar: 'fixtures/avatar/hetfield.jpg',
            phoneNumber: '0550397890',
            role: 'guest',
        },
    ]);

    const category = await Category.create([
        {
            name: 'Спектакли',
        }, {
            name: 'Концерты',
        }, {
            name: 'Мода',
        }, {
            name: 'Бизнес',
        }, {
            name: 'Семинары',
        }, {
            name: 'Искусство',
        },
    ]);

    await Occasion.create([
        {
            user: users[0]._id,
            title: 'Лебединое озеро. Звезды России',
            location: 'Кыргызский национальный академический театр оперы и балета им. Абдыласа Малдыбаева',
            address: 'ул. Советская 167',
            city: 'Бишкек',
            date: "10.06.2024",
            time: '19:00',
            price: 800,
            description: `КСЕНИЯ ШЕВЦОВА Ведущая БАЛЕРИНА « Баварской государственной оперы»( Мюнхен), приглашенная БАЛЕРИНА МАМТ (г. Москва).
                          Победитель проекта «Большой балет» в номинации «ЛУЧШАЯ БАЛЕРИНА». Ксения из тех редких балерин, кто отличается Питерской школой. 
                          КАНАТ НАДЫРБЕК. Премьер балета КНАТОБ. Заслуженный артист КР. `,
            duration: '2 часа 45 минут',
            restrictions: 7,
            category: category[0]._id,
            image: 'fixtures/cover/lake.jpg',
        }, {
            user: users[0]._id,
            title: 'Симфония Анимэ',
            location: 'Кыргызский национальный академический театр оперы и балета им. Абдыласа Малдыбаева',
            address: 'ул. Советская 167',
            city: 'Бишкек',
            date: "10.08.2024",
            time: '19:00',
            price: 1000,
            description: `Погрузитесь в мир знаменитых аниме-мелодий и песен, оживленных мастерством симфонического оркестра, под руководством маэстро Кеничи Симура.
                          Кеничи Симура, чье искусство признано во всем мире, создает уникальное сочетание звуков игр и аниме-фильмов с классической симфонией, 
                          приглашая нас насладиться музыкальным величием. «Симфония Аниме из Японии» — это не только концерт, но и музыкальный феномен, порожденный японской 
                          культурой, где аниме-музыка возведена в ранг высокого искусства.`,
            duration: '1 час 30 минут',
            restrictions: 7,
            category: category[1]._id,
            image: 'fixtures/cover/kenchi.jpg',
        }, {
            user: users[1]._id,
            title: 'Dordoi Plaza Fashion Show',
            location: 'ТЦ "Dordoi Plaza"',
            address: 'ул. Ибраимова 115',
            city: 'Бишкек',
            date: '24.05.2024',
            time: '19:00',
            price: 1500,
            description: `Во все времена искусство, как зеркало будущего, отражает не только мир вокруг нас, но и великие мечты человечества о завтрашнем дне.
                          В стремлении к открытиям и инновациям, Дордой Плаза приглашает на модный показ "Dordoi Plaza Fashion Show 2024” вдохновленный футуристическим видением мира.
                          Это событие, где креативный взгляд на моду встретится с безграничным воображением, предлагая вам погрузиться в мир, 
                          где мода становится выразительным инструментом размышлений о будущем.`,
            duration: '1 час 20 минут',
            restrictions: 18,
            category: category[2]._id,
            image: 'fixtures/cover/fashionShow.jpg',
        }, {
            user: users[1]._id,
            title: 'Международный HR-форум Центральной Азии',
            location: 'Банкетный зал "PRESIDENT CITY HALL"',
            address: 'ул. Ауэзова 24',
            city: 'Бишкек',
            date: "28.05.2024 - 29.05.24",
            time: '09:00',
            price: 5000,
            description: `Более 15+ спикеров международного уровня с 20+ опытом в управлении персоналом и бизнесом, поделятся практическими алгоритмами
                          и действующими инструментами по поиску, привлечению, удержанию и управлению талантами не только рабочего и административного персонала, 
                          но и занимающих в компаниях самые высокие позиции.`,
            duration: '10 часов',
            restrictions: 18,
            category: category[3]._id,
            image: 'fixtures/cover/forum.jpg',
        }, {
            user: users[2]._id,
            title: 'Семинар-практикум «Адаптация персонала: Ключевые элементы системы»',
            location: 'БЦ "Россия"',
            address: 'пр. Раззакова 32',
            city: 'Бишкек',
            date: "15.10.2024",
            time: '13:00',
            price: 800,
            description: 'Эффективная система адаптации персонала – это значительное сокращение издержек предприятия. ' +
                'По данным исследований, проводимых западными компаниями, качественная программа адаптации способна уменьшить текучесть кадров на 10–20% в год.\n' +
                '\n' + 'Согласно глобальному исследованию компании «Korn/Ferry International», всего 30% топ-менеджеров довольны процессом адаптации в новой компании. ' +
                'Наибольший процент ответивших (38%) оценивают первые месяцы своего перехода как среднеэффективные,' +
                ' 22% опрашиваемых — ниже среднего, а 10% утверждают, что адаптация в компании находилась на очень низком уровне.',
            duration: '2 часа',
            restrictions: 18,
            category: category[4]._id,
            image: 'fixtures/cover/adaptationEmployee.jpg',
        }, {
            user: users[2]._id,
            title: 'Мастер класс по ораторскому искусству',
            location: 'Молодежный театр "Тунгуч"',
            address: 'ул. Чуй 168',
            city: 'Бишкек',
            date: "10.07.2024",
            time: '15:00',
            price: 800,
            description: 'Искусство красноречия - полезный навык для людей многих профессий. ' +
                'Это особая наука, гармонично сочетающая риторику с приемами актерского мастерства.' +
                ' Успех любого дела во многом зависит от умения его преподнести. ' +
                'Здесь незаменимы будут грамотная, хорошо поставленная речь и умение убеждать.',
            duration: '2 часа',
            restrictions: 18,
            category: category[4]._id,
            image: 'fixtures/cover/orator.jpg',
        }, {
            user: users[3]._id,
            title: 'мастер класс по скетчингу',
            location: 'Русский театр драмы им. Чингиза Айтматова',
            address: 'ул. Тыныстанова 122',
            city: 'Бишкек',
            date: "20.05.2024",
            time: '13:00',
            price: 500,
            restrictions: 5,
            description: `Скетч— это быстрая зарисовка. 
            Чаще всего ее выполняют маркерами, но можно работать карандашами, линерами, акварелью, восковыми мелками. 
            Картина выглядит как набросок, ведь проходит совсем немного времени от начала работы до результата, поэтому
             мастер-классы по рисованию в технике скетчинга хороши не только отдельно, но и как развлечение 
             на корпоративах, семейных праздниках, молодежных вечеринках.`,
            duration: '1,5 часа',
            category: category[5]._id,
            image: 'fixtures/cover/sketch.jpg',
        }, {
            user: users[3]._id,
            title: 'Рисуем в стиле Граттаж',
            location: 'Кыргызский Национальный Музей Изобразительных Искусств им. Гапара Айтиева',
            address: 'ул. Юсупа Абрахманова 196',
            city: 'Бишкек',
            date: "21.05.2024",
            time: '16:00',
            price: 600,
            description: `Нарисовать стильную картину можно даже царапинами— в этом вас убедит креативный мастер, показав класс владения техникой граттажа.
            Участники занятия получают бумагу, покрытую воском или парафином и залитую тушью, а затем процарапывают на этом полотне острым пером или палочкой нужное изображение. 
            Получается эффектная черно-белая композиция. Если как базовый слой использовать вместо воска или парафина масляную пастель, можно получить цветные узоры.`,
            duration: '1,5 часа',
            restrictions: 8,
            category: category[5]._id,
            image: 'fixtures/cover/grattaj.jpg',
        }, {
            user: users[4]._id,
            title: 'Тренинг "Стресс-Менеджмент"',
            location: 'БЦ "Россия"',
            address: 'пр. Раззакова 32',
            city: 'Бишкек',
            date: "21.05.2024",
            time: '18:00',
            price: 1000,

            description: `Современный человек постоянно подвергается воздействию стрессоров. 
               Сила их воздействия различна и зависит от многих факторов: возраста, пола, уровня восприимчивости, времени суток и т.д.
             Стрессоры воздействуют постоянно держа сотрудника в напряжении, чем снижает эффективность выполнения работы. Что делать? 
             Снимать стресс «не полезными» средствами или обучиться системе управления эмоциональными состояниями.`,
            duration: '1 часа',
            restrictions: 18,
            category: category[4]._id,
            image: 'fixtures/cover/stress.jpg',
        }, {
            user: users[4]._id,
            title: 'Управление. персонал, продажи: Быстрое распознавание характера партнера',
            location: 'БЦ "Victory"',
            address: 'ул. Ибраимова 103',
            city: 'Бишкек',
            date: "11.07.2024",
            time: '18:00',
            price: 1000,
            description: `НПрофайлинг — это наука, включающая в себя методы оценки и прогнозирования поведения человека на основе анализа внешности, невербального и вербального поведения. 
             Взгляд. Интонации голоса. Осанка. Манера говорить. Всё это расскажет огромный пласт информации о собеседнике.
             Более того, для того чтобы «прочитать» человека, зачастую не обязательно с ним разговаривать:
              стиль одежды, предпочитаемые цвета, манера поведения в группе людей и другие «мелочи» выдают о нём многое.`,
            duration: '2 часа',
            restrictions: 18,
            category: category[3]._id,
            image: 'fixtures/cover/personalMenegment.jpg',
        }, {
            user: users[5]._id,
            title: 'Lumen & Orchestra',
            location: 'Кыргызский национальный академический театр оперы и балета им. Абдыласа Малдыбаева',
            address: 'ул. Советская 167',
            city: 'Бишкек',
            date: "10.12.2024",
            time: '21:00',
            price: 3000,
            description: `Lumen впервые в своей истории готовят программу с симфоническим оркестром.
                          Lumen уже давно входят в число хедлайнеров нашей рок-сцены и останавливаться не собираются. 
                          В прошлом году группе исполнилось 25 лет, их песни покорили уже несколько поколений слушателей, а выступления группы — по-прежнему буря эмоций 
                          и шквал драйва.`,
            duration: '2 часа',
            restrictions: 18,
            category: category[1]._id,
            image: 'fixtures/cover/lumen.jpg',
        }, {
            user: users[5]._id,
            title: 'Nella Musica Orchestra. Миры Миядзаки',
            location: 'Кыргызский национальный академический театр оперы и балета им. Абдыласа Малдыбаева',
            address: 'ул. Советская 167',
            city: 'Бишкек',
            date: "08.11.2024",
            time: '20:00',
            price: 2100,
            description: `В программу концерта вошли саундтреки популярных фильмов японского режиссера-аниматора Хаяо Миядзаки:
             «Унесённые призраками», «Мой сосед Тоторо», «Ходячий замок», «Принцесса Мононоке», «Порко Россо». 
             Музыкальные темы в сочетании с видеоартом перенесут зрителей в знаменитые аниме-истории, подарив как взрослым, так и детям возможность 
             посетить фантазийную Японию, какой ее видит оскароносный художник: неотделимой от фольклора и народных традиций, полной магии и приключений, 
             находящейся на стыке реальности и сновидений.`,
            duration: '2 часа',
            restrictions: 5,
            category: category[1]._id,
            image: 'fixtures/cover/mizaki.jpg',
        },
    ])


    await db.close();
};

void run();