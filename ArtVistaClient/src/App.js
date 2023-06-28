import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './App.css';
import LoginPage from './pages/Auth/logIn';
import SignupPage from './pages/Auth/signUp';
import HomePage from './pages/homePage';
import PrivateRoute from './routes/privateRoute';
import ArtistPortfolioPage from './pages/artistPortfolioPage';
import ShowcaseShowdownPage from './pages/showcaseShowdownPage';
import Cart from './pages/cart';
import Profile from './pages/profile';
import ArtAnnouncement from './pages/artAnnouncement';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/homePage" element={<HomePage />} /> */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/homePage" element={<HomePage />} />
            <Route path="/artistPortfolio" element={<ArtistPortfolioPage />} />
            <Route path="/artAnnouncement" element={<ArtAnnouncement />} />
            <Route path="/showcaseShowdown" element={<ShowcaseShowdownPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />

          </Route>
        </Routes>
      </Router>


    </>
  );
}

export default App;
