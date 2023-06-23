import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.css';
import LoginPage from './pages/Auth/logIn';
import SignupPage from './pages/Auth/signUp';
import HomePage from './pages/homePage';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<SignupPage />} /> 
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/homePage" element={<HomePage />} /> 
          {/* <Route path="/test" element={<NavBar />}>
          
            <Route path="product" element={<h1>product</h1>}/>
            <Route path="cart" element={<h1>cart</h1>}/>
            <Route path="order" element={<h1>order</h1>}/>
          </Route> */}
      </Routes>
    </Router>
    {/* <Auth /> */}
    {/* <NavBar /> */}

    </>
  );
}

export default App;
