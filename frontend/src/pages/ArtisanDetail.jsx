import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ArtisanDetail() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/artisans/${id}`)
      .then(res => res.json())
      .then(data => setArtisan(data));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  if (!artisan) return <p>Chargement...</p>;

  return (
    <div className="row">
      <div className="col-md-6 mb-4">
        <h2>{artisan.nom}</h2>
        <p className="badge bg-primary fs-6">{artisan.specialite}</p>
        <p><strong>Note :</strong> {artisan.note} / 5</p>
        <p><strong>Ville :</strong> {artisan.ville}</p>
        <h3 className="h5 mt-4">À propos</h3>
        <p>{artisan.a_propos}</p>
      </div>

      <div className="col-md-6">
        <div className="card p-4 shadow-sm">
          <h3 className="h5 mb-3">Contacter l'artisan</h3>
          {sent ? (
            <div className="alert alert-success">Message envoyé avec succès !</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nom / Prénom</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Objet</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea className="form-control" rows="4" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">Envoyer</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}