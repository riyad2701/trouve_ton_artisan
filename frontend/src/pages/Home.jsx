import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';

export default function Home() {
  const [topArtisans, setTopArtisans] = useState([]);

  useEffect(() => {
  fetch('/data.xlsx')
    .then((res) => res.arrayBuffer())
    .then((buffer) => {
      const workbook = XLSX.read(buffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);

      // Filtrer pour récupérer les artisans du mois (ex: colonne 'top' ou 'topArtisan' à true)
      const top = data.filter((item) => item.top === true || item.top === 1 || item.top === 'top');
      setTopArtisans(top.length > 0 ? top : data.slice(0, 3)); // Prend les 3 premiers si aucun filtre ne correspond
    })
    .catch((err) => console.error('Erreur chargement Excel Home :', err));
}, []);

  return (
    <div>
      {/* Section Comment trouver */}
      <section className="bg-light p-4 rounded mb-5">
        <h1 className="h3 text-primary mb-3">Comment trouver mon artisan ?</h1>
        <ol className="mb-0">
          <li>Choisir la catégorie d'artisanat dans le menu.</li>
          <li>Choisir un artisan.</li>
          <li>Le contacter via le formulaire de contact.</li>
          <li>Une réponse sera apportée sous 48h.</li>
        </ol>
      </section>

      {/* Section Artisans du mois */}
      <section>
        <h2 className="h4 mb-4">Les artisans du mois</h2>
        <div className="row">
          {topArtisans.map((artisan, index) => (
    <div key={index} className="col-md-4 mb-3">
      <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h3 className="h5 card-title">{artisan.Nom}</h3>
        <p className="card-text text-muted mb-1">{artisan['Spécialité']}</p>
        <p className="card-text"><strong>Note :</strong> {artisan.Note} / 5</p>
        <p className="card-text"><small className="text-secondary">{artisan.Ville}</small></p>
        <Link to={`/artisan/${index + 1}`} className="btn btn-primary w-100">
          Voir la fiche
        </Link>
      </div>
      </div>
      </div>
      ))}
        </div>
      </section>
      </div>
      );
    }