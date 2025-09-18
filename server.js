import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = 3000;

app.get('/proxy', async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).send('URL manquante');

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept': '*/*'
            }
        });

        if (!response.ok) {
            return res.status(response.status).send('Erreur serveur IPTV');
        }

        response.body.pipe(res);

    } catch (err) {
        console.error('Erreur proxy:', err);
        res.status(500).send('Erreur proxy');
    }
});

app.listen(PORT, () => console.log(`✅ Proxy IPTV running on http://localhost:${PORT}`));