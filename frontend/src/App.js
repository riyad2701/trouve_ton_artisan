import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ArtisanDetail from './pages/ArtisanDetail';
import ArtisanList from './pages/ArtisanList';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="container flex-grow-1 my-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categorie/:categoryId" element={<ArtisanList />} />
            <Route path="/artisans" element={<ArtisanList />} />
            <Route path="/artisan/:id" element={<ArtisanDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
