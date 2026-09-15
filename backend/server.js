const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const db = require('./config/db');

const app = express();

// Sécurité & Middleware
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Routes pour l'API
// 1. Récupérer toutes les catégories (pour le menu)
app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM categories');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Récupérer les 3 artisans du mois (top = 1)
app.get('/api/artisans/top', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT a.*, s.nom AS specialite
      FROM artisans a
      JOIN specialites s ON a.specialite_id = s.id
      WHERE a.top = 1
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Récupérer un artisan par son ID (page fiche artisan)
app.get('/api/artisans/:id', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT a.*, s.nom AS specialite, c.nom AS categorie
      FROM artisans a
      JOIN specialites s ON a.specialite_id = s.id
      JOIN categories c ON s.categorie_id = c.id
      WHERE a.id = ?
    `, [req.params.id]);

    if (rows.length === 0) return res.status(404).json({ message: 'Artisan non trouvé' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Récupérer les artisans par catégorie ou recherche
app.get('/api/artisans', async (req, res) => {
  try {
    const { categorie, search } = req.query;
    let query = `
      SELECT a.*, s.nom AS specialite, c.id AS categorie_id
      FROM artisans a
      JOIN specialites s ON a.specialite_id = s.id
      JOIN categories c ON s.categorie_id = c.id
      WHERE 1=1
    `;
    const params = [];

    if (categorie) {
      query += ' AND c.id = ?';
      params.push(categorie);
    }
    if (search) {
      query += ' AND (a.nom LIKE ? OR a.ville LIKE ? OR s.nom LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term);
    }

    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur prêt sur http://localhost:${PORT}`));