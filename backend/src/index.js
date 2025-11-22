import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors"


import authRouter from './routes/auth.route.js';
import { connectDB } from './utils/db.js';
import decisionRouter from './routes/decision.route.js';
import fileRouter from './routes/file.route.js';
import favoriteRouter from './routes/favorite.route.js';
import userRouter from './routes/user.route.js';
import commentRouter from './routes/comment.route.js';
import notionRouter from './routes/notion.routes.js';
import planRouter from './routes/plan.route.js';
import jobRouter from './routes/job.route.js';



const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to set CORS headers
const CLIENT_URL = process.env.CORS_ORIGIN || 'http://localhost:5173'

const allowedOrigins = ['https://www.terraohada.com', 'https://mvp-terraohada-frontend.vercel.app', 'http://localhost:5173', CLIENT_URL];



// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Remplacez par l'origine de votre site web
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Ajoutez les méthodes HTTP autorisées
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Ajoutez les en-têtes autorisés
//     next();
// });

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Non autorisé par CORS'));
        }
    },
    credentials: true, // <-- 4. AJOUTER CETTE LIGNE
};

app.use(cors(corsOptions));

app.use('/documents', express.static('uploads/documents'));

// cancelPlan(225460)

// les routes
app.use("/api/auth", authRouter);
app.use('/api/decision', decisionRouter)
app.use("/api/file", fileRouter)
app.use('/api/favorite', favoriteRouter);
app.use('/api/users', userRouter);
app.use('/api/comment', commentRouter);
app.use('/api/notion', notionRouter);
app.use('/api/plan', planRouter);
app.use('/api/job', jobRouter);

app.get('/', (req, res) => {
    res.send('API is running...');
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    await connectDB()
    console.log(`Server is running on port ${PORT}`);
})



// Middleware to log incoming requests