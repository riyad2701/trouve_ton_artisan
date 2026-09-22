import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import logo from '../Logo.png';

export default function Header() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
  fetch('/data.xlsx')
    .then((res) => res.arrayBuffer())
    .then((buffer) => {
      const workbook = XLSX.read(buffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);
     
      // Extraction des catégories uniques depuis le fichier Excel
      const uniqueCategories = [...new Set(data.map((item) =>  item['Spécialité']).filter(Boolean))];
      setCategories(uniqueCategories);
    })
    .catch((err) => console.error('Erreur chargement catégories :', err));
}, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/artisans?search=${encodeURIComponent(search)}`);
  };

  return (
    <header className="bg-white shadow-sm mb-4">
      <div className="container d-flex align-items-center justify-content-between py-3">
        <Link to="/" className="navbar-brand fw-bold text-primary fs-3">
        <img src={logo} alt="Trouve ton artisan" style={{ height: '100px' }} />
        </Link>
        <nav>
          <ul className="nav">
            {categories.map((cat, index) => (
            <li key={index} className="nav-item">
            <Link to={`/categorie/${cat}`} className="nav-link text-dark fw-bold">
            {cat}
            </Link>
            </li>
          ))}
          </ul>
        </nav>
        <form onSubmit={handleSearch} className="d-flex">
          <input
            type="search"
            className="form-control me-2"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">OK</button>
        </form>
      </div>
    </header>
  );
}