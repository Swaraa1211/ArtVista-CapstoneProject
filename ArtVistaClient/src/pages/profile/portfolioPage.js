import { useState, useEffect } from 'react';
import { CreatePortfolioForm, UpdatePortfolioForm } from './portfolioForm';
import { getArtist, getArtistById } from '../../API/artistPortfolio';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../constant/atomRecoil';

const PortfolioPage = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  //const { userId } = useRecoilValue(userAtom);
  const userToken = localStorage.getItem('userToken');
    const parsedToken = JSON.parse(userToken);
    const userId = parsedToken.data.userId;
    const username = parsedToken.data.username;
  const [artist, setArtist] = useState([]);
  const [selectedArtistId, setSelectedArtistId] = useState(null);

  const fetchArtist = async () => {
    try {
      const response = await getArtist();
      setArtist(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        await fetchArtist();
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    const selectedArtist = artist.find(item => item.user_id === userId);
    if (selectedArtist) {
      setSelectedArtistId(selectedArtist.artist_id);
    }
  }, [artist, userId]);

  console.log("artistId: " + selectedArtistId);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        if (selectedArtistId) {
          const portfolioData = await getArtistById(selectedArtistId);
          setPortfolio(portfolioData);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        setIsLoading(false);
      }
    };

    fetchPortfolio();
  }, [selectedArtistId]);

  console.log("portfolio after artistID" + portfolio);

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
