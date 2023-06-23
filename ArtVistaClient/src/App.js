import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import LoginPage from './pages/Auth/logIn';
import SignupPage from './pages/Auth/signUp';
import HomePage from './pages/homePage';
import PrivateRoute from './routes/privateRoute';
import ArtistPortfolio from './pages/artistPortfolio';

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
            <Route path="/artistPortfolio" element={<ArtistPortfolio />} />
          </Route>
        </Routes>
      </Router>


    </>
  );
}

export default App;
