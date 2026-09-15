import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [topArtisans, setTopArtisans] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/artisans/top')
      .then(res => res.json())
      .then(data => setTopArtisans(data));
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
          {topArtisans.map(artisan => (
            <div key={artisan.id} className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="h5 card-title">{artisan.nom}</h3>
                  <p className="card-text text-muted mb-1">{artisan.specialite}</p>
                  <p className="card-text"><strong>Note :</strong> {artisan.note} / 5</p>
                  <p className="card-text"><small className="text-secondary">{artisan.ville}</small></p>
                  <Link to={`/artisan/${artisan.id}`} className="btn btn-primary w-100">
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