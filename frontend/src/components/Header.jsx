import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Logo.png';

export default function Header() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/artisans?search=${encodeURIComponent(search)}`);
  };

  return (
    <header className="bg-white shadow-sm mb-4">
      <div className="container d-flex align-items-center justify-content-between py-3">
        <Link to="/" className="navbar-brand fw-bold text-primary fs-3">
        <img src={logo} alt="Trouve ton artisan" style={{ height: '40px' }} />
        </Link>
        <nav>
          <ul className="nav">
            {categories.map(cat => (
              <li key={cat.id} className="nav-item">
                <Link to={`/categorie/${cat.id}`} className="nav-link text-dark fw-bold">
                  {cat.nom}
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