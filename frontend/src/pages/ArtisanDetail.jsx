import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';

export default function ArtisanDetail() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);

  useEffect(() => {
    fetch('/data.xlsx')
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);

        // Décodage de l'URL et recherche par nom
        const searchName = decodeURIComponent(id || '').trim().toLowerCase();
       
        const artisanTrouve = data.find(
          (item) => String(item.Nom || '').trim().toLowerCase() === searchName
        );

        if (artisanTrouve) {
          setArtisan(artisanTrouve);
        } else {
          console.log('Artisan non trouvé pour :', searchName);
        }
      })
      .catch((err) => console.error('Erreur chargement artisan :', err));
  }, [id]);

  if (!artisan) {
    return (
      <div className="container mt-4">
        <p>Chargement des détails de l'artisan...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4">
        <h2>{artisan.Nom}</h2>
        <p className="text-muted">
          <strong>Spécialité :</strong> {artisan['Spécialité']}
        </p>
        <p>
          <strong>Note :</strong> {artisan.Note} / 5
        </p>
        <p>
          <strong>Ville :</strong> {artisan.Ville}
        </p>
        <hr />
        <h5>À propos</h5>
        <p>{artisan['A propos']}</p>
        <hr />
        <p>
          <strong>Email :</strong> {artisan.Email}
        </p>
        {artisan['Site Web'] && (
          <p>
            <strong>Site Web :</strong>{' '}
            <a href={artisan['Site Web']} target="_blank" rel="noreferrer">
              {artisan['Site Web']}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
