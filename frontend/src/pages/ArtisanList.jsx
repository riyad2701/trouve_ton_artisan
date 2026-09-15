import { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';

export default function ArtisansList() {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    let url = 'http://localhost:5000/api/artisans?';
    if (categoryId) url += `categorie=${categoryId}&`;
    if (search) url += `search=${encodeURIComponent(search)}`;

    fetch(url)
      .then(res => res.json())
      .then(data => setArtisans(data));
  }, [categoryId, search]);

  return (
    <div>
      <h2 className="h4 mb-4">
        {search ? `Résultats pour "${search}"` : 'Liste des artisans'}
      </h2>
      {artisans.length === 0 ? (
        <p>Aucun artisan trouvé.</p>
      ) : (
        <div className="row">
          {artisans.map(artisan => (
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
      )}
    </div>
  );
}