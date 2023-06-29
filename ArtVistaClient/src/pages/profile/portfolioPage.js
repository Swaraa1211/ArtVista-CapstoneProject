import { useState, useEffect } from 'react';
import { CreatePortfolioForm, UpdatePortfolioForm } from './portfolioForm';
import { getArtist } from '../../API/artistPortfolio'; // Replace with your API call to fetch portfolio data

const PortfolioPage = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch portfolio data from the server
    const fetchPortfolio = async () => {
      try {
        const portfolioData = await getArtist(); // Replace with your API call to fetch portfolio data
        setPortfolio(portfolioData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      }
    };

    fetchPortfolio();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {portfolio ? (
        <UpdatePortfolioForm portfolio={portfolio} />
      ) : (
        <CreatePortfolioForm />
      )}
    </div>
  );
};

export default PortfolioPage;
