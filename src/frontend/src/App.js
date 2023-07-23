import './App.css';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { GalaxyHomePage } from './pages/GalaxyHomePage'
import { StarSystemPage } from './pages/StarSystemPage'
import { PlanetPage } from './pages/PlanetPage';
import { ProfilePage } from './pages/ProfilePage'
import { GalleryPage } from './pages/GalleryPage';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<GalaxyHomePage />} />
          <Route path="/starsystem" element={<Outlet />}>
              <Route index element={<StarSystemPage />} />
              <Route path="planets" element={<PlanetPage />} />
          </Route>
          <Route path='profile' element={<ProfilePage />} />
          <Route path='gallery' element={<GalleryPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
