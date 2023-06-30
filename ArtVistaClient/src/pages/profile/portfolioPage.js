import { useState, useEffect } from 'react';
import { CreatePortfolioForm, UpdatePortfolioForm } from './portfolioForm';
import { getArtist, getArtistById } from '../../API/artistPortfolio';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../constant/atomRecoil';

const PortfolioPage = () => {

//   const [portfolio, setPortfolio] = useState(null);
// const [isLoading, setIsLoading] = useState(true);
// const { userId, username } = useRecoilValue(userAtom);
// const user_id = userId;

// const fetchPortfolio = async () => {
//   try {
//     const portfolioData = await getArtistById(user_id);
//     setPortfolio(portfolioData);
//     setIsLoading(false);
//   } catch (error) {
//     console.error('Error fetching portfolio:', error);
//   }
// };

// useEffect(() => {
//   const fetchData = async () => {
//     fetchPortfolio();
//   };

//   fetchData();
// }, []); 


  const [portfolio, setPortfolio] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userId, username } = useRecoilValue(userAtom);
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
    // const fetchArtist = async () =>{
    //   try{
    //     const artistData = await getArtist();
    //     console.log("artistData "+artistData.data);
    //     setArtist(artistData.data);
    //     //console.log("artistId " + artistID)

    //   }catch(error){
    //     console.error("error" , error);
    //   }
    // }
    const fetchPortfolio = async () => {
      try {
        const portfolioData = await getArtistById(selectedArtistId); 
        setPortfolio(portfolioData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      }
    };

    // fetchArtist();
    fetchPortfolio();
  }, []);
  console.log("portfolio after artistID" + portfolio)

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