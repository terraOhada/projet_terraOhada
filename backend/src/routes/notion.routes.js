import express from 'express';
import { getJuristes, syncJuristes } from '../controllers/notion.controller.js';

const notionRouter = express.Router();

notionRouter.get('/juristes', getJuristes);
notionRouter.post('/sync', syncJuristes);

// Webhook pour Notion
notionRouter.post('/webhook', async (req, res) => {
    if (['page.created', 'page.updated'].includes(req.body.type)) {
        await syncJuristes(req, res);
    } else {
        res.status(200).end();
    }
});

export default notionRouter;