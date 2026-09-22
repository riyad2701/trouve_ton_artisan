import { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import * as XLSX from 'xlsx';

export default function ArtisansList() {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
  fetch('/data.xlsx')
    .then((res) => res.arrayBuffer())
    .then((buffer) => {
      const workbook = XLSX.read(buffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      let data = XLSX.utils.sheet_to_json(sheet);

      // Filtrer par Catégorie OU par Spécialité
      if (categoryId) {
      data = data.filter((item) =>
      String(item['Catégorie']).trim().toLowerCase() === String(categoryId).trim().toLowerCase() ||
      String(item['Spécialité']).trim().toLowerCase() === String(categoryId).trim().toLowerCase()
      );
    }

      // Filtrer par recherche (colonne "Nom")
      if (search) {
      data = data.filter((item) =>
      item.Nom?.toLowerCase().includes(search.toLowerCase())
      );
    }
    
      setArtisans(data);
    })
    .catch((err) => console.error('Erreur Excel :', err));
    }, [categoryId, search]);


  return (
    <div>
      <h2 className="h4 mb-4">
        {search ? `Résultats pour "${search}"` : 'Liste des artisans'}
      </h2>

       {artisans.map((artisan, index) => (
  <div key={index} className="col-md-4 mb-3">
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h3 className="h5 card-title">{artisan.Nom}</h3>
        <p className="card-text text-muted mb-1">{artisan['Spécialité']}</p>
        <p className="card-text"><strong>Note :</strong> {artisan.Note} / 5</p>
        <p className="card-text"><small className="text-secondary">{artisan.Ville}</small></p>
        <Link to={`/artisan/${encodeURIComponent(artisan.Nom)}`} className="btn btn-primary w-100">
          Voir la fiche
        </Link>
      </div>
    </div>
    </div>
    ))}
  </div>
    )}