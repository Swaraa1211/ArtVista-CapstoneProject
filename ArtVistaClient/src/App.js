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
import Cart from './pages/cartPage';
import Profile from './pages/profile';
import CreateArt from './pages/profile/createArt';
import UpdateAndDeleteArt from './pages/profile/updateAndDeleteArt';
import PortfolioPage from './pages/profile/portfolioPage';
import Favorites from './pages/profile/favoritesList';
import Bidding from './pages/Bidding';
import BidPrice from './pages/bidding/bidPrice';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/homePage" element={<HomePage />} />
            <Route path="/artistPortfolio" element={<ArtistPortfolioPage />} />
            <Route path="/bidding" element={<Bidding />} >
              <Route path="biddingPrice" element={<BidPrice />} />

            </Route>
            <Route path="/showcaseShowdown" element={<ShowcaseShowdownPage />} />
            <Route path="/profile" element={<Profile />}>
              <Route path="createArt" element={<CreateArt />} />
              <Route path="updateAndDeleteArt" element={<UpdateAndDeleteArt />} />
              <Route path="portfolio" element={<PortfolioPage />} />
              <Route path="favorites" element={<Favorites />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </Router>


    </>
  );
}

export default App;
