import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-4 pb-3 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase fw-bold">Lyon</h5>
            <p className="small mb-1">101 cours Charlemagne</p>
            <p className="small mb-1">CS 20033</p>
            <p className="small mb-1">69269 LYON CEDEX 02</p>
            <p className="small">+33 (0)4 26 73 40 00</p>
          </div>
          <div className="col-md-8 mb-3">
            <h5 className="text-uppercase fw-bold">Informations légales</h5>
            <ul className="list-unstyled d-flex flex-wrap gap-3">
              <li><Link to="/mentions-legales" className="text-white-50 text-decoration-none">Mentions légales</Link></li>
              <li><Link to="/donnees-personnelles" className="text-white-50 text-decoration-none">Données personnelles</Link></li>
              <li><Link to="/accessibilite" className="text-white-50 text-decoration-none">Accessibilité</Link></li>
              <li><Link to="/cookies" className="text-white-50 text-decoration-none">Gestion des cookies</Link></li>
            </ul>
          </div>
        </div>
        <hr className="border-secondary" />
        <p className="text-center small text-muted mb-0">© 2026 Region Auvergne-Rhône-Alpes - Tous droits réservés.</p>
      </div>
    </footer>
  );
}